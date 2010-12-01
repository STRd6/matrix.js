$(function() {
  var TOLERANCE = 0.00001;

  function equalEnough(expected, actual, tolerance, message) {
    message = message || "" + expected + " within " + tolerance + " of " + actual;
    ok(expected + tolerance >= actual && expected - tolerance <= actual, message);
  }

  function matrixEqual(m1, m2) {
    equalEnough(m1.a, m2.a, TOLERANCE);
    equalEnough(m1.b, m2.b, TOLERANCE);
    equalEnough(m1.c, m2.c, TOLERANCE);
    equalEnough(m1.d, m2.d, TOLERANCE);
    equalEnough(m1.tx, m2.tx, TOLERANCE);
    equalEnough(m1.ty, m2.ty, TOLERANCE);
  }

  test("Matrix() (Identity)", function() {
    var matrix = Matrix();

    equals(matrix.a, 1, "a");
    equals(matrix.b, 0, "b");
    equals(matrix.c, 0, "c");
    equals(matrix.d, 1, "d");
    equals(matrix.tx, 0, "tx");
    equals(matrix.ty, 0, "ty");

    matrixEqual(matrix, Matrix.IDENTITY);
  });

  test("Empty Matrix", function() {
    var matrix = Matrix(0, 0, 0, 0, 0, 0);

    equals(matrix.a, 0, "a");
    equals(matrix.b, 0, "b");
    equals(matrix.c, 0, "c");
    equals(matrix.d, 0, "d");
    equals(matrix.tx, 0, "tx");
    equals(matrix.ty, 0, "ty");
  });

  test("Matrix.scale", function() {
    var matrix = Matrix.scale(2, 2);

    equals(matrix.a, 2, "a");
    equals(matrix.b, 0, "b");
    equals(matrix.c, 0, "c");
    equals(matrix.d, 2, "d");

    matrix = Matrix.scale(3);

    equals(matrix.a, 3, "a");
    equals(matrix.b, 0, "b");
    equals(matrix.c, 0, "c");
    equals(matrix.d, 3, "d");
  });

  test("Matrix.scale (about a point)", function() {
    var p = Point(5, 17);

    var transformedPoint = Matrix.scale(3, 7, p).transformPoint(p);

    equals(transformedPoint.x, p.x, "Point should remain the same");
    equals(transformedPoint.y, p.y, "Point should remain the same");
  });

  test("Matrix#scale (about a point)", function() {
    var p = Point(3, 11);

    var transformedPoint = Matrix.IDENTITY.scale(3, 7, p).transformPoint(p);

    equals(transformedPoint.x, p.x, "Point should remain the same");
    equals(transformedPoint.y, p.y, "Point should remain the same");
  });

  test("Matrix.rotation", function() {
    var matrix = Matrix.rotation(Math.PI / 2);

    equalEnough(matrix.a, 0, TOLERANCE);
    equalEnough(matrix.b, 1, TOLERANCE);
    equalEnough(matrix.c,-1, TOLERANCE);
    equalEnough(matrix.d, 0, TOLERANCE);
  });

  test("Matrix.rotation (about a point)", function() {
    var p = Point(11, 7);

    var transformedPoint = Matrix.rotation(Math.PI / 2, p).transformPoint(p);

    equals(transformedPoint.x, p.x, "Point should remain the same");
    equals(transformedPoint.y, p.y, "Point should remain the same");
  });

  test("Matrix#rotate (about a point)", function() {
    var p = Point(8, 5);

    var transformedPoint = Matrix.IDENTITY.rotate(Math.PI / 2, p).transformPoint(p);

    equals(transformedPoint.x, p.x, "Point should remain the same");
    equals(transformedPoint.y, p.y, "Point should remain the same");
  });

  test("Matrix#inverse (Identity)", function() {
    var matrix = Matrix().inverse();

    equals(matrix.a, 1, "a");
    equals(matrix.b, 0, "b");
    equals(matrix.c, 0, "c");
    equals(matrix.d, 1, "d");
    equals(matrix.tx, 0, "tx");
    equals(matrix.ty, 0, "ty");
  });

  test("Matrix#concat", function() {
    var matrix = Matrix.rotation(Math.PI / 2).concat(Matrix.rotation(-Math.PI / 2));

    matrixEqual(matrix, Matrix.IDENTITY);
  });

  test("Maths", function() {
    var a = Matrix(12, 3, 3, 1, 7, 9);
    var b = Matrix(3, 8, 3, 2, 1, 5);

    var c = a.concat(b);

    equals(c.a, 60);
    equals(c.b, 17);
    equals(c.c, 42);
    equals(c.d, 11);
    equals(c.tx, 34);
    equals(c.ty, 17);
  });

  test("Order of transformations should match manual concat", function() {
    var tx = 10;
    var ty = 5;
    var theta = Math.PI/3;
    var s = 2;

    var m1 = Matrix().translate(tx, ty).scale(s).rotate(theta);
    var m2 = Matrix().concat(Matrix.translation(tx, ty)).concat(Matrix.scale(s)).concat(Matrix.rotation(theta));

    matrixEqual(m1, m2);
  });

  test("Point#add", function() {
    var p1 = Point(5, 6);
    var p2 = Point(7, 5);

    var result = p1.add(p2);

    equals(result.x, p1.x + p2.x);
    equals(result.y, p1.y + p2.y);
  });

  test("Point#subtract", function() {
    var p1 = Point(5, 6);
    var p2 = Point(7, 5);

    var result = p1.subtract(p2);

    equals(result.x, p1.x - p2.x);
    equals(result.y, p1.y - p2.y);
  });

  test("Point#scale", function() {
    var p1 = Point(5, 6);
    var scalar = 2;

    var result = p1.scale(scalar);

    equals(result.x, p1.x * scalar);
    equals(result.y, p1.y * scalar);
  });

  test("Point#equal", function() {
    ok(Point(7, 8).equal(Point(7, 8)));
  });

  test("Point#magnitude", function() {
    equals(Point(3, 4).magnitude(), 5);
  });
});

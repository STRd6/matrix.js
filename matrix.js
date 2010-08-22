/**
 * Matrix v1.0.0
 * 
 * Loosely based on flash:
 * http://www.adobe.com/livedocs/flash/9.0/ActionScriptLangRefV3/flash/geom/Matrix.html
 */
(function() {
  function Point(x, y) {
    return {
      x: x || 0,
      y: y || 0,
      add: function(other) {
        return Point(this.x + other.x, this.y + other.y);
      }
    }
  }

  /**
   * Returns the Euclidean distance between two points.
   */
  Point.distance = function(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };

  /**
   * Returns the direction from p1 to p2 in radians.
   */
  Point.direction = function(p1, p2) {
    return Math.atan2(
      p2.y - p1.y,
      p2.x - p1.x
    );
  }

  /**
   * Creates a matrix for 2d affine transformations.
   *  _        _
   * | a  c tx  |
   * | b  d ty  |
   * |_0  0  1 _|
   *
   * concat, inverse, rotate, scale and translate return new matrices with the
   * transformations applied. The matrix is not modified in place.
   *
   * Returns the identity matrix when called with no arguments.
   */
  function Matrix(a, b, c, d, tx, ty) {
    a = a !== undefined ? a : 1;
    d = d !== undefined ? d : 1;

    return {
      a: a,
      b: b || 0,
      c: c || 0,
      d: d,
      tx: tx || 0,
      ty: ty || 0,

      /**
       * Return the result of this matrix (A) multiplied by another matrix (B), i.e. A x B
       * http://mathworld.wolfram.com/MatrixMultiplication.html
       */
      concat: function(matrix) {
        return Matrix(
          this.a * matrix.a + this.c * matrix.b,
          this.b * matrix.a + this.d * matrix.b,
          this.a * matrix.c + this.c * matrix.d,
          this.b * matrix.c + this.d * matrix.d,
          this.a * matrix.tx + this.c * matrix.ty + this.tx,
          this.b * matrix.tx + this.d * matrix.ty + this.ty
        );
      },

      deltaTransformPoint: function(point) {
        return Point(
          this.a * point.x + this.c * point.y,
          this.b * point.x + this.d * point.y
        );
      },

      /**
       * Returns the inverse of the matrix.
       * http://mathworld.wolfram.com/MatrixInverse.html
       */
      inverse: function() {
        var determinant = this.a * this.d - this.b * this.c;
        return Matrix(
          this.d / determinant,
          -this.b / determinant,
          -this.c / determinant,
          this.a / determinant,
          (this.c * this.ty - this.d * this.tx) / determinant,
          (this.b * this.tx - this.a * this.ty) / determinant
        );
      },

      rotate: function(theta, aboutPoint) {
        return Matrix.rotation(theta, aboutPoint).concat(this);
      },

      scale: function(sx, sy) {
        return Matrix.scale(sx, sy).concat(this);
      },

      /**
       * Transforms a point by multiplying it through the matrix.
       * Returns the new point.
       */
      transformPoint: function(point) {
        return Point(
          this.a * point.x + this.c * point.y + this.tx,
          this.b * point.x + this.d * point.y + this.ty
        );
      },

      translate: function(tx, ty) {
        return Matrix.translation(tx, ty).concat(this);
      }
    }
  }

  /**
   * Returns a matrix that corresponds to a rotation of angle theta in radians.
   * If optional aboutPoint argument is given, the rotation takes place about
   * that point.
   */
  Matrix.rotation = function(theta, aboutPoint) {
    var rotationMatrix = Matrix(
      Math.cos(theta),
      Math.sin(theta),
      -Math.sin(theta),
      Math.cos(theta)
    );

    if(aboutPoint) {
      rotationMatrix =
        Matrix.translation(aboutPoint.x, aboutPoint.y).concat(
          rotationMatrix
        ).concat(
          Matrix.translation(-aboutPoint.x, -aboutPoint.y)
        );
    }

    return rotationMatrix;
  };

  /**
   * Returns a matrix that corresponds to a scaling by factors of sx, sy.
   * If only one parameter is given the matrix is scaled uniformly.
   */
  Matrix.scale = function(sx, sy) {
    sy = sy || sx;

    return Matrix(sx, 0, 0, sy);
  };

  /**
   * Returns a matrix that corresponds to a translation of tx, ty.
   */
  Matrix.translation = function(tx, ty) {
    return Matrix(1, 0, 0, 1, tx, ty);
  };

  Matrix.IDENTITY = Matrix();
  Matrix.HORIZONTAL_FLIP = Matrix(-1, 0, 0, 1);
  Matrix.VERTICAL_FLIP = Matrix(1, 0, 0, -1);

  // Export to window
  window['Matrix'] = Matrix;
  window['Point'] = Point;
}());

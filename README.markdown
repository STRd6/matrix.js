# Matrix.js 1.2.0

[Matrix.js Documentation](http://strd6.com/matrix.js/docs)

[Unit Tests](http://strd6.com/matrix.js/matrix_test.html)

[Guided Demo](http://strd6.com/2010/06/matrix-js-demo/)

## Using with HTML5 Canvas

You'll probably want this (transformation is a Matrix instance):

    function withTransformation(transformation, block) {
      context.save();
 
      context.transform(
        transformation.a,
        transformation.b,
        transformation.c,
        transformation.d,
        transformation.tx,
        transformation.ty
      );
 
      try {
        block();
      } finally {
        context.restore();
      }
    }

## Changelog

### v1.2.0

Added a bunch of utility methods to Points.

`subtract`, `scale`, `equal`, and `magnitude`.

### v1.1.0

Instance method transforamtions (scale, rotate, and translate) are now consistent with concatenation order.

    var m1 = Matrix().translate(tx, ty).scale(s).rotate(theta);
    var m2 = Matrix().concat(Matrix.translation(tx, ty)).concat(Matrix.scale(s)).concat(Matrix.rotation(theta));
    
    matrixEqual(m1, m2);

This means that if you were using a version prior to 1.1.0 **the order of concatenation has changed**.

Added an optional `aboutPoint` parameter to the scale instance and class methods.

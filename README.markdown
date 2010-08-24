= Matrix.js 1.0.1 =

[Matrix.js Documentation](http://strd6.com/matrix.js/docs)

[Unit Tests](http://strd6.com/matrix.js/matrix_test.html)

[Guided Demo](http://strd6.com/2010/06/matrix-js-demo/)

== Using with HTML5 Canvas ==

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

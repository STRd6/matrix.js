= Matrix.js 1.0.0 =

TODO: Extract docs from code...

In the meantime read the source and tests, they're pretty ok.

== Using with HTML5 Canvas ==

You'll probably want this:

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

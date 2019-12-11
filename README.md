strokerouter
============

strokerouter lets you hook functions up to keystrokes. It has no dependencies.

Usage
-----

**With Browserify:**

    var StrokeRouter = require('strokerouter');

    var docStrokeRouter = StrokeRouter(document);

    // Single key routes.
    docStrokeRouter.routeKeyUp('escape', null, function escape() {
      console.log('Escape pressed.');
    });
    docStrokeRouter.routeKeyUp('u', null, function u() {
      console.log('U pressed.');
    });

    document.addEventListener('keyup', docStrokeRouter.onKeyUp);

    // Unroute a keystoke so that there is no longer a response to it.
    docStrokeRouter.unrouteKeyUp('u', null);


Now when the user hits Esc or U, a message will be logged to the console.

See an example running here: [examples/browserify](http://jimkang.com/strokerouter/examples/browserify).

**With script tags:**

    <script src="strokerouter-dist.min.js"></script>
    <script>
        var docStrokeRouter = StrokeRouter(document);

        // Single key routes.
        docStrokeRouter.routeKeyUp('escape', null, function escape() {
          console.log('Escape pressed.');
        });
        docStrokeRouter.routeKeyUp('u', null, function u() {
          console.log('U pressed.');
        });

        document.addEventListener('keyup', docStrokeRouter.onKeyUp);

        // Unroute a keystoke so that there is no longer a response to it.
        docStrokeRouter.unrouteKeyUp('u', null);
    </script>

See an example running here: [examples/basic.html](http://jimkang.com/strokerouter/examples/basic.html).

**D3**

To work with events wrapped by [d3-selection](github.com/d3/d3-selection), pass the d3 selection object (the thing you require/import from d3-selection) as the second param of the constructor:

    var d3 = require('d3-selection');
    var strokerouter = StrokeRouter(myEl, d3);

Then, use the `onKeyUpD3` and `onKeyDownD3` methods as event listeners.

    document.addEventListener('keyup', onKeyUpD3);

Installation
------------

    npm install strokerouter

License
-------

The MIT License (MIT)

Copyright (c) 2016 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

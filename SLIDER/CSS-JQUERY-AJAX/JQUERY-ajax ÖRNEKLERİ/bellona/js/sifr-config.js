/*****************************************************************************
It is adviced to place the sIFR JavaScript calls in this file, keeping it
separate from the `sifr.js` file. That way, you can easily swap the `sifr.js`
file for a new version, while keeping the configuration.

You must load this file *after* loading `sifr.js`.

That said, you're of course free to merge the JavaScript files. Just make sure
the copyright statement in `sifr.js` is kept intact.
*****************************************************************************/

// Make an object pointing to the location of the Flash movie on your web server.
// Try using the font name as the variable name, makes it easy to remember which
// object you're using. As an example in this file, we'll use SifrFont1.
var SifrFont1 = { src: '/i/sifr/sifr.swf', ratios: [8, 1.41, 11, 1.31, 15, 1.29, 16, 1.28, 24, 1.26, 27, 1.24, 33, 1.23, 36, 1.22, 37, 1.23, 48, 1.22, 52, 1.21, 53, 1.22, 80, 1.21, 84, 1.2, 85, 1.21, 89, 1.2, 90, 1.21, 1.2] };


// Now you can set some configuration settings.
// See also <http://wiki.novemberborn.net/sifr3/JavaScript+Configuration>.
// One setting you probably want to use is `sIFR.useStyleCheck`. Before you do that,
// read <http://wiki.novemberborn.net/sifr3/DetectingCSSLoad>.

// sIFR.useStyleCheck = true;

// Next, activate sIFR:
sIFR.activate(SifrFont1);

// If you want, you can use multiple movies, like so:
//
//    var SifrFont1 = { src: '/path/to/SifrFont1.swf' };
//    var garamond = { src '/path/to/garamond.swf' };
//    var rockwell = { src: '/path/to/rockwell.swf' };
//    
//    sIFR.activate(SifrFont1, garamond, rockwell);
//
// Remember, there must be *only one* `sIFR.activate()`!

// Now we can do the replacements. You can do as many as you like, but just
// as an example, we'll replace all `<h1>` elements with the SifrFont1 movie.
// 
// The first argument to `sIFR.replace` is the `SifrFont1` object we created earlier.
// The second argument is another object, on which you can specify a number of
// parameters or "keyword arguemnts". For the full list, see "Keyword arguments"
// under `replace(kwargs, mergeKwargs)` at 
// <http://wiki.novemberborn.net/sifr3/JavaScript+Methods>.
// 
// The first argument you see here is `selector`, which is a normal CSS selector.
// That means you can also do things like '#content h1' or 'h1.title'.
//
// The second argument determines what the Flash text looks like. The main text
// is styled via the `.sIFR-root` class. Here we've specified `background-color`
// of the entire Flash movie to be a light grey, and the `color` of the text to
// be red. Read more about styling at <http://wiki.novemberborn.net/sifr3/Styling>.
// #ED1C24
sIFR.replace(SifrFont1, {
 selector: 'h1.BoxTitle',
 css: [
  '.sIFR-root {background-color:white; color:#ED1C24; }'
  , 'a { text-decoration: none; }'
        , 'a:link { color: #777777; }'
        , 'a:hover { color: #000000; }'
         ], wmode: 'transparent', transparent: true
});

sIFR.replace(SifrFont1, {
 selector: 'h1.BoxTitleS',
 css: [
  '.sIFR-root {background-color:white; color:#ED1C24; }'
  , 'a { text-decoration: none; }'
        , 'a:link { color: #777777; }'
        , 'a:hover { color: #000000; }'
         ], wmode: 'transparent', transparent: true
});

sIFR.replace(SifrFont1, {
	selector: 'div.ThumbCategory h2',
	css: [
 '.sIFR-root {text-align:center; background-color:#FFFFFF; color:#ED1C24; }'
  , 'a { text-decoration: none; }'
        , 'a:link { color: #005C64; }'
        , 'a:hover { color: #000000; }'
         ]
});



if (IE6) {
	sIFR.replace(SifrFont1, {
	selector: 'h1.CategoryTitle',
		css: [
  '.sIFR-root { background-color:#F2F2F2; color: #ED1C24; }'
  , 'a { text-decoration: none; }'
        , 'a:link { color: #777777; }'
        , 'a:hover { color: #000000; }'
         ]
	});
}
else {
	
	sIFR.replace(SifrFont1, {
		selector: 'h1.CategoryTitle',
		css: [
  '.sIFR-root { background-color:#F2F2F2; color: #ED1C24; }'
  , 'a { text-decoration: none; }'
        , 'a:link { color: #777777; }'
        , 'a:hover { color: #000000; }'
         ], wmode: 'transparent', transparent: true
	});

}
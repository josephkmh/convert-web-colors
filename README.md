convert-web-colors is a web color conversion library for JavaScript and node. It supports conversion between rgb, hsl and hex strings, both with and without alpha channels (transparency).

#Install
    $ npm install convert-web-colors

#Usage
Just provide a string or array in one of the supported formats:

```javascript
var converter = require('convert-web-colors');

var colors = converter.convert('rgb(120,113,54)'); // converter.convert([120,113,54]) would return the same result

var rgba = colors.rgba; // rgba(120, 113, 54, 1)
var rgb  = colors.rgb;  // rgb(120, 113, 54)

var hsla = colors.hsla; // hsl(54, 37.9%, 34.1%)
var hsl  = colors.hsl;  // hsla(53.6, 37.9%, 34.1%, 1)

var hexa = colors.hexa; // #787136FF
var hex  = colors.hex;  // #787136
```

##Arrays
By default, an object containing color values as strings will be returned. If you want to receive an array of values instead, pass in an object as the second parameter with a property: <code>returnArrays: true;</code>

```javascript
var converter = require('convert-web-colors', { returnArrays: true });

var colors = converter.convert('rgb(120,113,54)');

var rgb  = colors.rgb;  // [120, 113, 54]
var rgba = colors.rgba; // [120, 113, 54, 1]

var hsl  = colors.hsl;  // [54, 37.9, 34.1]
var hsla = colors.hsla; // [53.6, 37.9, 34.1, 1]

var hexa = colors.hexa; // #787136FF
var hex  = colors.hex;  // #787136
```

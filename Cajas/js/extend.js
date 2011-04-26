/**
 *I need it...
 */
Array.prototype.oc = function(){
    var o = {};
    for(var i=0;i<this.length;i++)
    {
        o[this[i]]='';
    }
    return o;
}

/**
 *Por las duedas...
 */
if (!Array.prototype.forEach)
{
    Array.prototype.forEach = function(fun /*, thisp */)
    {
        "use strict";

        if (this === void 0 || this === null)
            throw new TypeError();

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function")
            throw new TypeError();

        var thisp = arguments[1];
        for (var i = 0; i < len; i++)
        {
            if (i in t)
                fun.call(thisp, t[i], i, t);
        }
    };
}

/**
 * Para Log
 */
var log = console.log;
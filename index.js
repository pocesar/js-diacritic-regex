(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    'use strict';
    exports.mappings = {
        'a': String.fromCharCode(65, 97, 192, 224, 193, 225, 194, 226, 195, 227, 196, 228),
        'e': String.fromCharCode(69, 101, 200, 232, 201, 233, 202, 234, 203, 235),
        'i': String.fromCharCode(73, 105, 204, 236, 205, 237, 206, 238, 207, 239),
        'o': String.fromCharCode(79, 111, 210, 242, 211, 243, 212, 244, 213, 245, 214, 246),
        'n': String.fromCharCode(78, 110, 209, 241),
        'u': String.fromCharCode(85, 117, 217, 249, 218, 250, 219, 251, 220, 252),
        'c': String.fromCharCode(67, 99, 199, 231),
        'y': String.fromCharCode(89, 121, 221, 253, 159, 255)
    };
    function mergeMappings(innerMappings) {
        var base = {};
        for (var mapping in exports.mappings) {
            base[mapping] = exports.mappings[mapping];
        }
        if (innerMappings) {
            for (var mapping in innerMappings) {
                base[mapping] = innerMappings[mapping];
            }
        }
        return base;
    }
    function replacer(input, mappings) {
        return input.split('').map(function (letter) {
            for (var mapping in mappings) {
                if (mapping && mapping !== mappings[mapping] && (mapping === letter || mappings[mapping].indexOf(letter) !== -1)) {
                    letter = Array.isArray(mappings[mapping]) ? mappings[mapping].join('') : "[" + mappings[mapping] + "]";
                    break;
                }
            }
            return letter;
        }).join('');
    }
    /** Generate a function that returns a RegExp, that can be reused with the same options */
    function toRegex(options) {
        if (options === void 0) { options = {}; }
        var innerMappings = mergeMappings(typeof options.mappings === 'object' ? options.mappings : null);
        return function (input) {
            return new RegExp(replacer(input, innerMappings), typeof options.flags === 'string' ? options.flags : 'i');
        };
    }
    exports.toRegex = toRegex;
    /** Generate a function that returns a string, that can be reused with the same options */
    function toString(options) {
        if (options === void 0) { options = {}; }
        var innerMappings = mergeMappings(typeof options.mappings === 'object' ? options.mappings : null);
        return function (input) {
            return replacer(input, innerMappings);
        };
    }
    exports.toString = toString;
});

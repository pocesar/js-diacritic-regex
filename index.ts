'use strict';

export interface Mappings {
    [index: string]: string;
}

export const mappings: Mappings = {
    'a': String.fromCharCode(65,97,192,224,193,225,194,226,195,227,196,228),
    'e': String.fromCharCode(69,101,200,232,201,233,202,234,203,235),
    'i': String.fromCharCode(73,105,204,236,205,237,206,238,207,239),
    'o': String.fromCharCode(79,111,210,242,211,243,212,244,213,245,214,246),
    'n': String.fromCharCode(78,110,209,241),
    'u': String.fromCharCode(85,117,217,249,218,250,219,251,220,252),
    'c': String.fromCharCode(67,99,199,231),
    'y': String.fromCharCode(89,121,221,253,159,255)
}

export interface RegexOptions {
    /** overwrite or pass your own mappings */
    mappings?: Mappings;
    /** RegExp flags, i, u, m, etc. g is always set regardless */
    flags?: string;
}

export interface StringOptions {
    /** overwrite or pass your own mappings */
    mappings?: Mappings;
}

function mergeMappings(innerMappings?: Mappings) {
    var base: Mappings = {};

    for (let mapping in mappings) {
        base[mapping] = mappings[mapping];
    }

    if (innerMappings) {
        for (let mapping in innerMappings) {
            base[innerMappings[mapping]] = innerMappings[mapping];
        }
    }

    return Object.keys(base).map((e) => {
        return base[e];
    });
}

function replacer(input: string, mappings: string[]): string {
    return input.split('').map((letter: string) => {
        return mappings.reduce((e, mapping) => {
            return mapping && mapping !== letter && mapping.indexOf(letter) !== -1 ? `[${mapping}]` : e;
        }, letter);
    }).join('');
}

/** Generate a function that returns a RegExp, that can be reused with the same options */
export function toRegex(options: RegexOptions = {}) {
    var innerMappings = mergeMappings(typeof options.mappings === 'object' ? options.mappings : null);

    return (input: string): RegExp => {
        return new RegExp(replacer(input, innerMappings), typeof options.flags === 'string' ? options.flags : 'i');
    }
}

/** Generate a function that returns a string, that can be reused with the same options */
export function toString(options: StringOptions = {}) {
    var innerMappings = mergeMappings(typeof options.mappings === 'object' ? options.mappings : null);

    return (input: string): string => {
        return replacer(input, innerMappings);
    }
}
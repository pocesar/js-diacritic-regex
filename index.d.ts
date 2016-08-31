export interface Mappings {
    [index: string]: string | string[];
}
export declare const mappings: Mappings;
export interface StringOptions {
    /** overwrite or pass your own mappings */
    mappings?: Mappings;
}
export interface RegexOptions extends StringOptions {
    /** RegExp flags, i, u, m, etc. g is always set regardless */
    flags?: string;
}
/** Generate a function that returns a RegExp, that can be reused with the same options */
export declare function toRegex(options?: RegexOptions): (input: string) => RegExp;
/** Generate a function that returns a string, that can be reused with the same options */
export declare function toString(options?: StringOptions): (input: string) => string;

export interface Mappings {
    [index: string]: string | string[];
}
/**
 * expect the transliterated value as key, and a string with replacements
 */
export declare let mappings: Mappings;
export interface StringOptions {
    /**
     * overwrite or pass your own mappings.
     * existing mappings will be overwritten, else it'll be appended to defaults
     */
    mappings?: Mappings;
}
export interface RegexOptions extends StringOptions {
    /**
     * RegExp flags, ium. Defaults to i
     */
    flags?: string;
}
/** Generate a function that returns a RegExp, that can be reused with the same options */
export declare function toRegex(options?: RegexOptions): (input: string) => RegExp;
/** Generate a function that returns a string, that can be reused with the same options */
export declare function toString(options?: StringOptions): (input: string) => string;

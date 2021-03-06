/**
 * Created by Lobova.A on 03.05.2017.
 */

module.exports = {
  //"at-rule-blacklist": "string",
  //"at-rule-empty-line-before": "never",
  "at-rule-name-case": "lower",
  // "at-rule-name-newline-after": "always",
  "at-rule-name-space-after": "always",
  // "at-rule-no-unknown": true,
  // "at-rule-no-vendor-prefix": true,
  "at-rule-semicolon-newline-after": "always",
  "at-rule-semicolon-space-before": "never",
  "at-rule-whitelist": ["keyframes", "media", "apply", "font-face", "custom-media", "supports"],
  "block-closing-brace-empty-line-before": "never",
  "block-closing-brace-newline-after": "always",
  //"block-closing-brace-newline-before": "always",
  // "block-closing-brace-space-after": "always",
  // "block-closing-brace-space-before": "always",
  "block-no-empty": true, //ok
  "block-opening-brace-newline-after": "always",
  // "block-opening-brace-newline-before": "always",
  //"block-opening-brace-space-after": "always",
  "block-opening-brace-space-before": "always",
  //
  "color-hex-case": "lower",
  //"color-hex-length": "long", // error in node_modules *****
  //  "color-named": "never",
  "color-no-invalid-hex": true,
  //
  // "comment-empty-line-before": "always",
  // "comment-no-empty": true,
  // "comment-whitespace-inside": "always",
  // //"comment-word-blacklist": string,
  //
  // //"custom-media-pattern": string,
  // "custom-property-empty-line-before": "never",
  // //"custom-property-pattern": string,
  //
  // "declaration-bang-space-after": "never",
  // "declaration-bang-space-before": "always",
  // "declaration-block-no-duplicate-properties": true,
  // "declaration-block-no-redundant-longhand-properties": true,
  // "declaration-block-no-shorthand-property-overrides": true,
  "declaration-block-semicolon-newline-after": "always",
  "declaration-block-semicolon-newline-before": "never-multi-line",
  "declaration-block-semicolon-space-before": "never",
  "declaration-block-single-line-max-declarations": 1,
  "declaration-block-trailing-semicolon": "always",
  //"declaration-colon-newline-after": "never", // Invalid option value "never" for rule *****
  "declaration-colon-space-after": "always",
  "declaration-colon-space-before": "never",
  "declaration-empty-line-before": "never",
  // "declaration-no-important": true,
  // "declaration-property-unit-blacklist": {},
  // "declaration-property-unit-whitelist": {},
  // "declaration-property-value-blacklist": {},
  // "declaration-property-value-whitelist": {},
  //"font-family-name-quotes": "always-unless-keyword", // mixins.css Expected quotes around "a" *****
  //"font-family-no-duplicate-names": true, // Error node_modules\normalize *****
  //"font-weight-notation": "numeric", // Error node_modules\normalize (normal = 100, bold = 700) *****
  //"function-blacklist": string|[],
  "function-calc-no-unspaced-operator": true, // ok *****
  // "function-comma-newline-after": "always"|"always-multi-line"|"never-multi-line",
  "function-comma-newline-before": "never-multi-line",
  "function-comma-space-after": "always", // ok *****
  "function-comma-space-before": "never",
  // "function-linear-gradient-no-nonstandard-direction": true,
  //"function-max-empty-lines": int,
  "function-name-case": "lower",
  // "function-parentheses-newline-inside": "always"|"always-multi-line"|"never-multi-line",
  "function-parentheses-space-inside": "never",
  // "function-url-data-uris": "always"|"never",
  // "function-url-no-scheme-relative": true,
  "function-url-quotes": "always",
  //"function-url-scheme-whitelist": string|[],
  //"function-whitelist": string|[],
  // "function-whitespace-after": "always"|"never",
  //
  //"indentation": int|"tab",
  // "keyframe-declaration-no-important": true,
  //
  //"length-zero-no-unit": true, // Error node_modules\perfect-scrollbar ***** мб поставить false
  //"max-empty-lines": 2,
  "max-nesting-depth": 4,
  "media-feature-colon-space-after": "always",
  "media-feature-colon-space-before": "never",
  // //"media-feature-name-blacklist": string|[],
  "media-feature-name-case": "lower",
  // "media-feature-name-no-unknown": true,
  // "media-feature-name-no-vendor-prefix": true,
  // //"media-feature-name-whitelist": string|[],
  "media-feature-parentheses-space-inside": "never",
  "media-feature-range-operator-space-after": "always",
  "media-feature-range-operator-space-before": "always",
  // "media-query-list-comma-newline-after": "always"|"always-multi-line"|"never-multi-line",
  // "media-query-list-comma-newline-before": "always"|"always-multi-line"|"never-multi-line",
  // "media-query-list-comma-space-after": "always"|"never"|"always-single-line"|"never-single-line",
  // "media-query-list-comma-space-before": "always"|"never"|"always-single-line"|"never-single-line",
  // //"no-descending-specificity": true,
  // //"no-duplicate-selectors": true,
  // "no-empty-source": true,
  //"no-eol-whitespace": true, // Error new-style *****
  //"no-extra-semicolons": true, // Error new-style *****
  // "no-invalid-double-slash-comments": true,
  // "no-missing-end-of-source-newline": true,
  "no-unknown-animations": true,
  //"number-leading-zero": "always", // Error node_modules *****
  //"number-max-precision": 2, // Error node_modules *****
  //"number-no-trailing-zeros": true, //Ругается на rgba *****
  // //"property-blacklist": string|[],
  "property-case": "lower",
  // "property-no-unknown": true,
  // "property-no-vendor-prefix": true,
  // //"property-whitelist": string|[],
  //"rule-empty-line-before": "inside-block-and-after-rule",
  "selector-attribute-brackets-space-inside": "never",
  //"selector-attribute-operator-blacklist": string|[],
  "selector-attribute-operator-space-after": "never",
  "selector-attribute-operator-space-before": "never",
  //"selector-attribute-operator-whitelist": string|[],
  "selector-attribute-quotes": "always",
  //"selector-class-pattern": string,
  "selector-combinator-space-after": "always",
  "selector-combinator-space-before": "always",
  "selector-descendant-combinator-no-non-space": true,
  //"selector-id-pattern": string,
  // "selector-list-comma-newline-after": "always-multi-line",
  // "selector-list-comma-newline-before": "always-multi-line",
  // "selector-list-comma-space-after": "always",
  // "selector-list-comma-space-before": "always",
  "selector-max-empty-lines": 0,
  "selector-max-compound-selectors": 4,
  //"selector-max-specificity": string,
  //"selector-nested-pattern": string,
  //"selector-no-attribute": true,
  // посмотреть "selector-no-combinator": true,
  //"selector-max-id": true,
  // посмотреть"selector-no-qualifying-type": true,
  // посмотреть"selector-no-type": true,
  // "selector-no-universal": true,
  // "selector-no-vendor-prefix": true,
  //"selector-pseudo-class-blacklist": string|[],
  // "selector-pseudo-class-case": "lower",
  // "selector-pseudo-class-no-unknown": true,
  // "selector-pseudo-class-parentheses-space-inside": "never",
  ///"selector-pseudo-class-whitelist": string|[],
  // "selector-pseudo-element-case": "lower",
  // посмтореть"selector-pseudo-element-colon-notation": "double",
  // "selector-pseudo-element-no-unknown": true,
  "selector-type-case": "lower",
  // "selector-type-no-unknown": true,
  // посмотреть "shorthand-property-no-redundant-values": true,
  // "string-no-newline": true,
  //"string-quotes": "double"
  //"time-min-milliseconds": int,
  //"unit-blacklist": string|[],
  "unit-case": "lower",
  // "unit-no-unknown": true,
  //"unit-whitelist": string|[],
  // "value-keyword-case": "lower"
  // "value-list-comma-newline-after": "always"|"always-multi-line"|"never-multi-line",
  // "value-list-comma-newline-before": "always"|"always-multi-line"|"never-multi-line",
  //"value-list-comma-space-after": "always",
  "value-list-comma-space-before": "never"
  //"value-list-max-empty-lines": int,
  // посмотреть"value-no-vendor-prefix": true
};

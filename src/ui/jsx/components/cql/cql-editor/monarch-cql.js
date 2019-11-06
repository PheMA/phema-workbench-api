module.exports = {
  // Set defaultToken to invalid to see what you do not tokenize yet
  defaultToken: "invalid",

  keywords: [
    "after",
    "all",
    "and",
    "as",
    "asc",
    "ascending",
    "before",
    "between",
    "by",
    "called",
    "case",
    "cast",
    "code",
    "Code",
    "codesystem",
    "codesystems",
    "collapse",
    "concept",
    "Concept",
    "contains",
    "context",
    "convert",
    "date",
    "day",
    "days",
    "default",
    "define",
    "desc",
    "descending",
    "difference",
    "display",
    "distinct",
    "div",
    "duration",
    "during",
    "else",
    "end",
    "ends",
    "except",
    "exists",
    "expand",
    "false",
    "flatten",
    "from",
    "function",
    "hour",
    "hours",
    "if",
    "implies",
    "in",
    "include",
    "includes",
    "included in",
    "intersect",
    "Interval",
    "is",
    "let",
    "library",
    "List",
    "maximum",
    "meets",
    "millisecond",
    "milliseconds",
    "minimum",
    "minute",
    "minutes",
    "mod",
    "month",
    "months",
    "not",
    "null",
    "occurs",
    "of",
    "on or",
    "or",
    "or after",
    "or before",
    "or less",
    "or more",
    "or on",
    "overlaps",
    "parameter",
    "per",
    "predecessor",
    "private",
    "properly",
    "public",
    "return",
    "same",
    "second",
    "seconds",
    "singleton",
    "start",
    "starts",
    "sort",
    "successor",
    "such that",
    "then",
    "time",
    "timezoneoffset",
    "to",
    "true",
    "Tuple",
    "union",
    "using",
    "valueset",
    "version",
    "week",
    "weeks",
    "where",
    "when",
    "width",
    "with",
    "within",
    "without",
    "xor",
    "year",
    "years"
  ],

  // System defined types
  typeKeywords: [
    "Any",
    "Boolean",
    "Code",
    "Concept",
    "Date",
    "DateTime",
    "Decimal",
    "Integer",
    "Quantity",
    "Ratio",
    "String",
    "Time"
  ],

  operators: [
    "=",
    ">",
    "<",
    "!",
    "~",
    "?",
    ":",
    "==",
    "<=",
    ">=",
    "!=",
    "&&",
    "||",
    "++",
    "--",
    "+",
    "-",
    "*",
    "/",
    "&",
    "|",
    "^",
    "%",
    "<<",
    ">>",
    ">>>",
    "+=",
    "-=",
    "*=",
    "/=",
    "&=",
    "|=",
    "^=",
    "%=",
    "<<=",
    ">>=",
    ">>>="
  ],

  // we include these common regular expressions
  symbols: /[=><!~?:&|+\-*\/\^%]+/,

  // C# style strings
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

  // The main tokenizer for our languages
  tokenizer: {
    root: [
      // identifiers and keywords
      [
        /[a-z_$][\w$]*/,
        {
          cases: {
            "@typeKeywords": "keyword",
            "@keywords": "keyword",
            "@default": "identifier"
          }
        }
      ],
      [/[A-Z][\w\$]*/, "type.identifier"], // to show class names nicely

      // whitespace
      { include: "@whitespace" },

      // delimiters and operators
      [/[{}()\[\]]/, "@brackets"],
      [/[<>](?!@symbols)/, "@brackets"],
      [/@symbols/, { cases: { "@operators": "operator", "@default": "" } }],

      // @ annotations.
      // As an example, we emit a debugging log message on these tokens.
      // Note: message are supressed during the first load -- change some lines to see them.
      [
        /@\s*[a-zA-Z_\$][\w\$]*/,
        { token: "annotation", log: "annotation token: $0" }
      ],

      // numbers
      [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
      [/\d+/, "number"],

      // delimiter: after number because of .\d floats
      [/[;,.]/, "delimiter"],

      // strings
      [/'([^'\\]|\\.)*$/, "string.invalid"], // non-teminated string
      [/'/, { token: "string.quote", bracket: "@open", next: "@string" }],

      // characters
      [/'[^\\']'/, "string"],
      [/(')(@escapes)(')/, ["string", "string.escape", "string"]],
      [/'/, "string.invalid"]
    ],

    comment: [
      [/[^\/*]+/, "comment"],
      [/\/\*/, "comment", "@push"], // nested comment
      ["\\*/", "comment", "@pop"],
      [/[\/*]/, "comment"]
    ],

    string: [
      [/[^']+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/'/, { token: "string.quote", bracket: "@close", next: "@pop" }]
    ],

    whitespace: [
      [/[ \t\r\n]+/, "white"],
      [/\/\*/, "comment", "@comment"],
      [/\/\/.*$/, "comment"]
    ]
  }
};

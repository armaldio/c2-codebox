define(function (require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

    var BatchFileHighlightRules = function () {
        // regexp must not have capturing parentheses. Use (?:) instead.
        // regexps are ordered -> the first match is used

        this.$rules = {
            start:
               [{
                   token: 'keyword.command.dosbatch',
                   regex: '\\b(?:append|assoc|at|attrib|break|cacls|cd|chcp|chdir|chkdsk|chkntfs|cls|cmd|color|comp|compact|convert|copy|date|del|dir|diskcomp|diskcopy|doskey|echo|endlocal|erase|fc|find|findstr|format|ftype|graftabl|help|keyb|label|md|mkdir|mode|more|move|path|pause|popd|print|prompt|pushd|rd|recover|ren|rename|replace|restore|rmdir|set|setlocal|shift|sort|start|subst|time|title|tree|type|ver|verify|vol|xcopy)\\b',
                   caseInsensitive: true
               },
                 {
                     token: 'keyword.control.statement.dosbatch',
                     regex: '\\b(?:goto|call|exit)\\b',
                     caseInsensitive: true
                 },
                 {
                     token: 'keyword.control.conditional.if.dosbatch',
                     regex: '\\bif\\s+not\\s+(?:exist|defined|errorlevel|cmdextversion)\\b',
                     caseInsensitive: true
                 },
                 {
                     token: 'keyword.control.conditional.dosbatch',
                     regex: '\\b(?:if|else)\\b',
                     caseInsensitive: true
                 },
                 {
                     token: 'keyword.control.repeat.dosbatch',
                     regex: '\\bfor\\b',
                     caseInsensitive: true
                 },
                 {
                     token: 'keyword.operator.dosbatch',
                     regex: '\\b(?:EQU|NEQ|LSS|LEQ|GTR|GEQ)\\b'
                 },
                 {
                     token: ['doc.comment', 'comment'],
                     regex: '(?:^|\\b)(rem)($|\\s.*$)',
                     caseInsensitive: true
                 },
                 {
                     token: 'comment.line.colons.dosbatch',
                     regex: '::.*$'
                 },
                 { include: 'variable' },
                 {
                     token: 'punctuation.definition.string.begin.shell',
                     regex: '"',
                     push: [
                        { token: 'punctuation.definition.string.end.shell', regex: '"', next: 'pop' },
                        { include: 'variable' },
                        { defaultToken: 'string.quoted.double.dosbatch' }]
                 },
                 { token: 'keyword.operator.pipe.dosbatch', regex: '[|]' },
                 {
                     token: 'keyword.operator.redirect.shell',
                     regex: '&>|\\d*>&\\d*|\\d*(?:>>|>|<)|\\d*<&|\\d*<>'
                 }],
            variable: [
             { token: 'constant.numeric', regex: '%%\\w+|%[*\\d]|%\\w+%' },
             { token: 'constant.numeric', regex: '%~\\d+' },
             {
                 token: ['markup.list', 'constant.other', 'markup.list'],
                 regex: '(%)(\\w+)(%?)'
             }]
        }

        this.normalizeRules();
    };

    BatchFileHighlightRules.metaData = {
        name: 'Batch File',
        scopeName: 'source.dosbatch',
        fileTypes: ['bat']
    }


    oop.inherits(BatchFileHighlightRules, TextHighlightRules);

    exports.BatchFileHighlightRules = BatchFileHighlightRules;
});
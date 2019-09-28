/**
 * @fileoverview Warns about using lodash map function instead of native implementation
 * @author I.Shishkin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/map"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } });
ruleTester.run("map", rule, {

    valid: [
        // give me some code that won't trigger a warning
        "_.map({ a: 1, b: 2 }, item => ++item)",
        "_.map({ a: 1, b: 2 }, fn)",
        "Array.isArray(collection) ? collection.map(fn) : _.map(collection, fn)"
    ],

    invalid: [
        {
            code: "_.map([1, 2, 3], fn)",
            errors: [{
                message: "Consider to use native javascript map implementation"
            }]
        },
        {
            code: "_.map(collection, fn)",
            errors: [{
                message: "Consider to use native javascript map implementation"
            }]
        }
    ]
});

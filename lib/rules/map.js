/**
 * @fileoverview Warns about using lodash map function instead of native implementation
 * @author I.Shishkin
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Warns about using lodash map function instead of native implementation",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            MemberExpression(node) {
                if (node.object.name === "_" && node.property.name === "map") {
                  context.report({
                    node,
                    message: "Consider to use native javascript map implementation",
                  });
                }
            }
        };
    }
};

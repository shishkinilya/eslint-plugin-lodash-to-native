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
        fixable: "code",  // or "code" or "whitespace"
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
            CallExpression(node) {
                const { callee, arguments: args } = node;

                let isFixed = false;
                
                if (
                    callee.type === "MemberExpression"
                    && callee.object.name === "_" 
                    && callee.property.name === "map"
                    && !isFixed
                ) {
                    const [collection, callback] = args;
                    
                    if (collection.type === "ObjectExpression") {
                        return;
                    }

                    if (node.parent.type === "ConditionalExpression" && node.parent.alternate === node) {
                        return;
                    }

                    context.report({
                        node: callee,
                        message: "Consider to use native javascript map implementation",
                        fix: function(fixer) {
                            const sourceCode = context.getSourceCode();
                            const collectionText = sourceCode.getText(collection);
                            const callbackText = sourceCode.getText(callback);
                            const fixedCode = `Array.isArray(${collectionText}) ? ${collectionText}.map(${callbackText}) : _.map(${collectionText}, ${callbackText})`;

                            isFixed = true;

                            return fixer.replaceText(node, fixedCode);
                        }
                    });
                }
            },

        };
    }
};

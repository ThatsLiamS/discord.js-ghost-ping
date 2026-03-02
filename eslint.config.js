import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig } from "eslint/config";

export default defineConfig(
	js.configs.recommended,
	tseslint.configs.recommended,

	{
		files: ["**/*.ts", "**/*.d.ts"],
		
		plugins: {
			'@stylistic': stylistic
		},

		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module", 
			globals: {
				...globals.node,
				...globals.es2021,
			},
		},

		rules: {
			// --- Standard Logical Rules ---
			"arrow-spacing": ["warn", { "before": true, "after": true }],
			"comma-style": "error",
			"curly": ["error", "multi-line", "consistent"],
			"dot-location": ["error", "property"],
			"handle-callback-err": "off",
			"max-nested-callbacks": ["error", { "max": 4 }],
			"max-statements-per-line": ["error", { "max": 2 }],
			"no-console": "off",
			"no-floating-decimal": "error",
			"no-inline-comments": "error",
			"no-lonely-if": "error",
			"no-multi-spaces": "error",
			"no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 1, "maxBOF": 0 }],
			"no-trailing-spaces": ["error"],
			"no-var": "error",
			"prefer-const": "error",
			"space-in-parens": "error",
			"space-unary-ops": "error",
			"spaced-comment": "error",
			"yoda": "error",

			// --- Logical TypeScript Rules (These stayed in typescript-eslint) ---
			"no-shadow": "off",
			"@typescript-eslint/no-shadow": ["error", { "allow": ["err", "resolve", "reject"] }],
			
			"no-empty-function": "off",
			"@typescript-eslint/no-empty-function": "error",

			// --- Stylistic Formatting Rules (Moved to @stylistic) ---
			"brace-style": "off",
			"@stylistic/brace-style": ["error", "stroustrup", { "allowSingleLine": true }],
			
			"comma-dangle": "off",
			"@stylistic/comma-dangle": ["error", "always-multiline"],
			
			"comma-spacing": "off",
			"@stylistic/comma-spacing": "error",
			
			"indent": "off",
			"@stylistic/indent": ["error", "tab"],
			
			"keyword-spacing": "off",
			"@stylistic/keyword-spacing": "error",
			
			"object-curly-spacing": "off",
			"@stylistic/object-curly-spacing": ["error", "always"],
			
			"quotes": "off",
			"@stylistic/quotes": ["error", "single"],
			
			"semi": "off",
			"@stylistic/semi": ["error", "always"],
			
			"space-before-blocks": "off",
			"@stylistic/space-before-blocks": "error",
			
			"space-before-function-paren": "off",
			"@stylistic/space-before-function-paren": ["error", {
				"anonymous": "never",
				"named": "never",
				"asyncArrow": "always"
			}],
			
			"space-infix-ops": "off",
			"@stylistic/space-infix-ops": "error"
		},
	},
);

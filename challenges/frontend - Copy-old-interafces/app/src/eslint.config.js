import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
      files: ["app/**/*.js"],
      rules: {
        semi: ["error", "always"], // Enforce semicolons at the end of statements
        quotes: ["error", "single"], // Use single quotes for strings
        indent: ["error", 2], // Enforce 2 spaces for indentation
        eqeqeq: "error", // Enforce the use of === and !=

 }}     ];
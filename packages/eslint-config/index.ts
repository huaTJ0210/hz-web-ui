module.exports = {
  overrides: [
    {
      env: {
        browser: true,
        es2021: true,
        node: true,
      },
      extends: [
        "standard-with-typescript",
        "plugin:vue/vue3-essential",
        "prettier",
        "plugin:prettier/recommended",
      ],
      overrides: [
        {
          env: {
            node: true,
          },
          files: [".eslintrc.{js,cjs}"],
          parserOptions: {
            sourceType: "script",
          },
        },
      ],
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      plugins: ["vue", "@typescript-eslint", "prettier"],
      rules: {},
    },
  ],
};

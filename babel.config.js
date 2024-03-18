module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            src: "./src",
            screens: "./src/screens",
            components: "./src/components",
            contexts: "./src/contexts",
            hooks: "./src/hooks",
            routes: "./src/routes",
            shared: "./src/shared",
          },
        },
      ],
    ],
  };
};

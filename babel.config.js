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
            services: "./src/services",
            contexts: "./src/contexts",
            hooks: "./src/hooks",
            types: "./src/types",
            shared: "./src/shared",
          },
        },
      ],
    ],
  };
};

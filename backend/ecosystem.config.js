module.exports = {
  apps: [
    {
      name: "experiment",
      script: "./index.js",
      watch: true,
      env: {
        PORT: 3001,
        NODE_ENV: "development",
      },
      env_production: {
        PORT: 3001,
        NODE_ENV: "production",
      },
    },
  ],
};

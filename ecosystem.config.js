module.exports = {
    apps : [{
      name: "warehouse",
      script: "./index.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  }
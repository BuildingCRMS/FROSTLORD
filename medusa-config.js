const { loadEnv, defineConfig } = require('@medusajs/framework/utils')

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: {
      ssl: false,
    },
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:8000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:7001,http://localhost:7000",
      authCors: process.env.AUTH_CORS || "http://localhost:8000",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    workerMode: process.env.MEDUSA_WORKER_MODE || "shared",
  },
  admin: {
    backendUrl: process.env.MEDUSA_BACKEND_URL || "http://localhost:9000",
  },
  modules: [
    {
      resolve: "@medusajs/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/file-local",
            id: "local",
            options: {
              backend_url: process.env.MEDUSA_BACKEND_URL || "http://localhost:9000",
              upload_dir: "uploads",
            },
          },
        ],
      },
    },
    {
      resolve: "@medusajs/notification",
      options: {
        providers: [
          // ... notification providers
        ],
      },
    },
    {
      resolve: "@medusajs/payment",
      options: {
        providers: [
          // ... payment providers
        ],
      },
    },
  ],
}) 
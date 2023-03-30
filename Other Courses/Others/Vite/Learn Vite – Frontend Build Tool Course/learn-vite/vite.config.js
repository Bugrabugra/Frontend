import { defineConfig, loadEnv } from "vite";


export default defineConfig(({command, mode, ssrBuild}) => {
  console.log({command, mode, ssrBuild})

  const env = loadEnv(mode, process.cwd(), "VITE_")
  console.log(env)

  if (mode === "production") {
    return {
      base: "/vite/"
    }
  }

  return {
    clearScree: false,
    envPrefix: "APP_",
    server: {
      port: 3000,
      open: "index.html"
    },
    preview: {
      port: 8080
    }
  }
})

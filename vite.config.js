import { resolve } from 'path'

export default {
  root: resolve(__dirname, 'src'),
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        login: resolve(__dirname, "src/pages/loginPage.html"),
        index: resolve(__dirname, "src/index.html"),
      },
    },
  },

  server: {
    port: 8080,
    open: "/pages/loginPage.html",
  },
  // Optional: Silence Sass deprecation warnings. See note below.
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          'import',
          'mixed-decls',
          'color-functions',
          'global-builtin',
        ],
      },
    },
  },
}
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.ape'],
  css: {
    preprocessorOptions: {
      less: {}
    }
  },
  plugins: [
    react(),
    svgr({
      icon: 16,
      svgProps: {
        stroke: '#fff',
        color: '#fff'
      },
      svgoConfig: {
        plugins: [
          'preset-default',
          'removeUselessStrokeAndFill',
          {
            name: 'removeAttrs',
            params: {
              // remove stroke and fill in path：https://github.com/svg/svgo/issues/440#issuecomment-396329184
              attrs: '*:(stroke|fill):((?!^none$).)*'
            },
          },
        ]
      }
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(process.cwd(), './src')
    },
  },
  server: {
    open: true
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/main.tsx'),
      name: 'rcaudio',
      fileName: 'index'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react']
    }
  }
});

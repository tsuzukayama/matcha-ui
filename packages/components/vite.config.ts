import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts'],
    pool: 'threads',
    minWorkers: 1,
    maxWorkers: 1,
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    sourcemap: true,
    // In watch mode we build JS and CSS in parallel; wiping dist would delete styles.css.
    emptyOutDir: process.env.VITE_EMPTY_OUT_DIR !== 'false',
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
  plugins: [
    dts({
      entryRoot: 'src',
      tsconfigPath: 'tsconfig.json',
      insertTypesEntry: true,
    }),
  ],
});

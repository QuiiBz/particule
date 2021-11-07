/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const esbuild = require('esbuild');

const args = process.argv.slice(2);
const watch = args.includes('--watch');

const formats = ['cjs', 'esm', 'iife'];
const entrypoints = [
  ['./src/index.ts', './dist/index'],
  ['./src/helpers/localStorage.ts', './dist/helpers/localStorage'],
  ['./src/helpers/reset.ts', './dist/helpers/reset'],
];

const build = async () => {
  for (const format of formats) {
    console.log(`┌ Building ${format}...`);

    for (const entrypoint of entrypoints) {
      const [entry, out] = entrypoint;
      const outfile = `${out}.${format}.js`;
      const icon = entrypoint === entrypoints[entrypoints.length - 1] ? '└' : '├';

      try {
        await esbuild.build({
          entryPoints: [entry],
          outfile,
          external: ['react'],
          format,
          minify: true,
          bundle: true,
          watch,
        });

        console.log(`${icon} ${entry} -> ${outfile}`);
      } catch (error) {
        console.error(error);
      }
    }

    console.log('');
  }
};

build();

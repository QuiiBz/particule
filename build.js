#!/usr/bin/env node

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable guard-for-in */

const { build, glob } = require('estrella');

const formats = ['esm', 'cjs'];

const run = async () => {
  for (const format of formats) {
    await build({
      entry: glob('./src/**/*.ts'),
      outdir: './dist/esm',
      format,
      tslint: false,
    });
  }
};

run();

import * as esbuild from 'esbuild';

let ctx = await esbuild.context({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'node',
    outfile: 'dist/index.js',
    format: 'esm',
    inject: ['cjs-shim.ts'],
});

await ctx.watch();

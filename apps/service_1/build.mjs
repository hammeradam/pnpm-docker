import * as esbuild from 'esbuild';

await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    sourcemap: true,
    platform: 'node',
    outdir: 'dist',
    outExtension: { '.js': '.mjs' },
    format: 'esm',
    inject: ['cjs-shim.ts'],
});

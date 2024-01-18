import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

    return defineConfig({
        plugins: [react()],

        server: {
            proxy: {
                [process.env.SERVICE_1_PATH_PREFIX!]: {
                    target: process.env.SERVICE_1_TARGET,
                    changeOrigin: true,
                    rewrite: (path) =>
                        path.replace(
                            new RegExp(`^${process.env.SERVICE_1_PATH_PREFIX}`),
                            '',
                        ),
                },
                [process.env.SERVICE_2_PATH_PREFIX!]: {
                    target: process.env.SERVICE_2_TARGET,
                    changeOrigin: true,
                    rewrite: (path) =>
                        path.replace(
                            new RegExp(`^${process.env.SERVICE_2_PATH_PREFIX}`),
                            '',
                        ),
                },
            },
        },
    });
};

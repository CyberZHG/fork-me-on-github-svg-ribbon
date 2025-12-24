import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'
import type { ViteDevServer } from 'vite'
import type { IncomingMessage, ServerResponse } from 'http'

const wasmMiddleware = () => {
    return {
        name: 'wasm-middleware',
        configureServer(server: ViteDevServer) {
            server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
                if (req.url && req.url.endsWith('.wasm')) {
                    const wasmPath = path.join(__dirname, 'node_modules/sp-svg-diagram/wasm', path.basename(req.url));
                    const wasmFile = fs.readFileSync(wasmPath);
                    res.setHeader('Content-Type', 'application/wasm');
                    res.end(wasmFile);
                    return;
                }
                next();
            });
        },
    };
};

export default defineConfig({
    base: "fork-me-on-github-svg-ribbon",
    plugins: [
        tailwindcss(),
        wasmMiddleware(),
    ],
    esbuild: {
        supported: {
            'top-level-await': true
        },
    },
    optimizeDeps: {
        esbuildOptions: {
            supported: {
                "top-level-await": true
            },
        },
    },
})

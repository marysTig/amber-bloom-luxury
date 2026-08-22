// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import path from "path";
import type { Plugin } from "vite";

const MOCK_PATH = path.resolve(__dirname, "src/mock-async-hooks.ts");

/**
 * node:async_hooks only exists in Node.js. For browser bundles Vite would stub
 * it as an empty object, making `new AsyncLocalStorage()` throw.
 *
 * Rules:
 *   SSR build  -> externalize as native Node module (real async-context tracking)
 *   Browser build -> resolve to our polyfill so the UI doesn't crash
 *
 * We must NOT use resolve.alias because that applies to BOTH builds and breaks
 * the server-side context that server functions depend on.
 *
 * We also exclude the packages that import node:async_hooks from optimizeDeps
 * pre-bundling (esbuild runs independently of Rollup plugins), so this Rollup
 * resolveId hook is the single place that handles the shim for browser builds.
 */
function nodeAsyncHooksBrowserShim(): Plugin {
  return {
    name: "node-async-hooks-browser-shim",
    enforce: "pre",
    resolveId(id, _importer, options) {
      if (id !== "node:async_hooks" && id !== "async_hooks") return;

      // Treat every environment that is NOT the browser 'client' bundle as server.
      // In dev SSR, Vite sets environment.name to 'ssr' or 'server'.
      // options.ssr is true for Rollup SSR builds but unreliable for transitive
      // imports in Vite's dev module graph — so we check environment.name first.
      const envName = this.environment?.name;
      const isServer = envName !== "client";

      console.log(
        `[async-hooks-shim] ${id} | env=${envName ?? "?"} | ssr=${options?.ssr} → ${isServer ? "external" : "mock"}`
      );

      if (isServer) {
        return { id: "node:async_hooks", external: true };
      }
      return MOCK_PATH;
    },
  };
}

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: [nodeAsyncHooksBrowserShim()],
    optimizeDeps: {
      // Keep these out of esbuild pre-bundling so our resolveId hook
      // can intercept their node:async_hooks import correctly.
      exclude: [
        "@tanstack/start-storage-context",
        "@tanstack/start-server-core",
        "@tanstack/start-client-core",
      ],
    },
  },
});

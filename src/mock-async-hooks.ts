// Browser shim for node:async_hooks (not available in browsers).
// Uses a simple stack so nested .run() calls preserve context correctly.

let ASL: any = undefined;
let AR: any = undefined;

if (typeof window === "undefined" && typeof process !== "undefined") {
  try {
    // Attempt to use Node's module.createRequire to load node:async_hooks synchronously
    const req = typeof require !== "undefined" ? require : (await import("module")).createRequire(import.meta.url);
    const hooks = req("node:async_hooks");
    ASL = hooks.AsyncLocalStorage;
    AR = hooks.AsyncResource;
  } catch (err) {
    console.error("Failed to dynamically load node:async_hooks", err);
  }
}

let _currentStore: unknown = undefined;

class MockAsyncLocalStorage<T = unknown> {
  private _stack: (T | undefined)[] = [];

  getStore(): T | undefined {
    return _currentStore as T | undefined;
  }

  run<R>(store: T, callback: (...args: unknown[]) => R, ...args: unknown[]): R {
    const prev = _currentStore;
    _currentStore = store;
    try {
      return callback(...args) as R;
    } finally {
      _currentStore = prev;
    }
  }

  exit<R>(callback: (...args: unknown[]) => R, ...args: unknown[]): R {
    const prev = _currentStore;
    _currentStore = undefined;
    try {
      return callback(...args) as R;
    } finally {
      _currentStore = prev;
    }
  }

  enterWith(store: T): void {
    _currentStore = store;
    this._stack.push(store);
  }
}

export const AsyncLocalStorage = ASL || MockAsyncLocalStorage;

class MockAsyncResource {
  constructor(_type: string) {}
  runInAsyncScope<R>(fn: () => R): R {
    return fn();
  }
  static bind<T extends (...args: unknown[]) => unknown>(fn: T): T {
    return fn;
  }
  bind<T extends (...args: unknown[]) => unknown>(fn: T): T {
    return fn;
  }
  emitDestroy() {}
}

export const AsyncResource = AR || MockAsyncResource;

export function createHook() {
  return { enable() {}, disable() {} };
}

export function executionAsyncId() { return 0; }
export function triggerAsyncId() { return 0; }

export default {
  AsyncLocalStorage,
  AsyncResource,
  createHook,
  executionAsyncId,
  triggerAsyncId,
};


// global.d.ts
export {};  // This ensures it is treated as a module

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export { };
declare global {
  interface Error { }
  interface Window {
    __INITIAL_STATE__: any;
  }
}
declare module '*.jpg';
/// <reference types="vite/client" />

declare module '*.svg' {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export { ReactComponent };

  const src: string;
  export default src;
}
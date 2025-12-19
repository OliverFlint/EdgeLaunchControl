export interface Api {
  profileRoot: string;
  readfile: (path: string, encoding?: BufferEncoding) => Promise<string>;
  readfileSync: (path: string, encoding?: BufferEncoding) => string;
  launchProfile: (name: string) => void;
  openExternal: (url: string, options?: Electron.OpenExternalOptions) => void;
}

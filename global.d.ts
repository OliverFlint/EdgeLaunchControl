interface Api {
  profileRoot: string;
  readfile: (
    path: string,
    encoding: BufferEncoding = "utf-8",
  ) => Promise<string>;
  readfileSync: (path: string, encoding?: BufferEncoding) => string;
  launchProfile: (name: string) => void;
  openExternal: (url: string, options?: Electron.OpenExternalOptions) => void;
}

declare const api: Api;

type ProfileData = {
  last_used?: string;
  profiles_order?: string[];
  info_cache?: {
    [key: string]: {
      name?: string;
      avatar_icon?: string;
    };
  };
};

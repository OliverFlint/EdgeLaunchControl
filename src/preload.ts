// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, shell } from "electron";
import fs from "node:fs";
import { execFile } from "node:child_process";
import { Api } from "./interfaces/Api";

console.log("Preload script loading...");

const api: Api = {
  profileRoot: window.process.env.LOCALAPPDATA,
  readfile: (path: string, encoding: BufferEncoding = "utf-8") => {
    return new Promise<string>((resolve, reject) => {
      fs.readFile(path, { encoding: encoding }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
  readfileSync: (path: string, encoding: BufferEncoding = "utf-8") => {
    return fs.readFileSync(path, { encoding: encoding });
  },
  launchProfile: (name: string) => {
    console.log(`Lauching profile: ${name}`);
    execFile(
      `C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe`,
      [`--profile-directory=${name}`],
      (error, stdout, stderr) => {
        console.log(error);
        console.log(stdout);
        console.log(stderr);
      },
    );
  },
  openExternal: (url: string, options?: Electron.OpenExternalOptions) => {
    shell.openExternal(url, options);
  },
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("api", api);
  } catch (e) {
    console.error("Error exposing API in preload script:", e);
  }
} else {
  window.api = api;
}

console.log(window.process.platform);
console.log(window.process.env.LOCALAPPDATA);

console.log("Preload script loaded.");

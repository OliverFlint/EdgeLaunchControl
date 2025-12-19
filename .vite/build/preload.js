"use strict";
const electron = require("electron");
const fs = require("node:fs");
const node_child_process = require("node:child_process");
console.log("Preload script loading...");
const api = {
  profileRoot: window.process.env.LOCALAPPDATA,
  readfile: (path, encoding = "utf-8") => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { encoding }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
  readfileSync: (path, encoding = "utf-8") => {
    return fs.readFileSync(path, { encoding });
  },
  launchProfile: (name) => {
    console.log(`Lauching profile: ${name}`);
    node_child_process.execFile(
      `C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe`,
      [`--profile-directory=${name}`],
      (error, stdout, stderr) => {
        console.log(error);
        console.log(stdout);
        console.log(stderr);
      }
    );
  },
  openExternal: (url, options) => {
    electron.shell.openExternal(url, options);
  }
};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("api", api);
  } catch (e) {
    console.error("Error exposing API in preload script:", e);
  }
} else {
  window.api = api;
}
console.log(window.process.platform);
console.log(window.process.env.LOCALAPPDATA);
console.log("Preload script loaded.");

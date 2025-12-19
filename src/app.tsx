import React from "react";
import { createRoot } from "react-dom/client";
import { Home } from "./home";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

const root = createRoot(document.body);
root.render(
  <FluentProvider theme={webLightTheme}>
    <Home />
  </FluentProvider>,
);

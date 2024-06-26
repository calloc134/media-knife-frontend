import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./route";
import { RouterProvider } from "@tanstack/react-router";
import "./index.css";
import "@fontsource/zen-kaku-gothic-new/400.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./route";
import { RouterProvider } from "@tanstack/react-router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

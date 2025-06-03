import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { LazyMotion, domAnimation } from "framer-motion";

createRoot(document.getElementById("root")!).render(
  <LazyMotion features={domAnimation}>
    <App />
  </LazyMotion>
);

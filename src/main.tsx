import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { LazyMotion, domAnimation } from "framer-motion";

// iOS Safari only applies :active styles once the page has a touch listener, so
// the `active:` variants used for tap feedback stay dead without this no-op.
document.addEventListener("touchstart", () => {}, { passive: true });

createRoot(document.getElementById("root")!).render(
  <LazyMotion features={domAnimation}>
    <App />
  </LazyMotion>
);

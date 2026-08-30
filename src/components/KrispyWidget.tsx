import { useEffect } from "react";

declare global {
  interface Window {
    krispy?: {
      open: () => void;
      close: () => void;
      toggle: () => void;
      isOpen: () => boolean;
    };
  }
}

const SCRIPT_ID = "krispy-chat-widget";

export function KrispyWidget() {
  useEffect(() => {
    const api = import.meta.env.VITE_KRISPY_API?.trim();
    const src = import.meta.env.VITE_KRISPY_WIDGET_URL?.trim();
    const tenant = import.meta.env.VITE_KRISPY_TENANT?.trim() || "labelle";

    // The current demo remains fully local until a self-hosted Krispy Worker is configured.
    if (!api || !src || document.getElementById(SCRIPT_ID)) return;

    let validApi: URL;
    let validSrc: URL;
    try {
      validApi = new URL(api);
      validSrc = new URL(src);
    } catch {
      console.error("Krispy configuration contains an invalid URL.");
      return;
    }
    if (validApi.protocol !== "https:" || validSrc.protocol !== "https:") {
      console.error("Krispy configuration must use HTTPS.");
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = validSrc.toString();
    script.async = true;
    script.dataset.api = validApi.toString().replace(/\/$/, "");
    script.dataset.tenant = tenant;
    script.dataset.title = "LaBelle Front Desk";
    script.dataset.accent = "#1686d9";
    document.body.appendChild(script);

    return () => {
      script.remove();
      document.querySelector(".krispy-widget")?.remove();
    };
  }, []);

  return null;
}

import { useEffect } from "react";

const SMARTSUPP_KEY = "775e25f94ddb22a3892c9bafb60bb0e51545cf19";

declare global {
  interface Window {
    _smartsupp?: { key?: string };
    smartsupp?: unknown;
  }
}

/** Loads the Smartsupp live chat widget on the client only. */
export function LiveChat() {
  useEffect(() => {
    if (window.smartsupp) return;

    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = SMARTSUPP_KEY;

    const queue: unknown[] = [];
    const api = function (...args: unknown[]) {
      queue.push(args);
    } as unknown as { _: unknown[] };
    api._ = queue;
    window.smartsupp = api;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.async = true;
    script.src = "https://www.smartsuppchat.com/loader.js?";
    document.head.appendChild(script);
  }, []);

  return null;
}

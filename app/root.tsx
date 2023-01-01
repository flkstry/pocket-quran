import React from "react";
import { useLocation, useMatches } from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import styles from "./styles/app.css";

// meta function
let isMount = true;
export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Pocket Quran",
    viewport: "width=device-width,initial-scale=1",
});

// links function
export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: styles }];
};

// main app function
export default function App() {
    let location = useLocation();
    let matches = useMatches();
    React.useEffect(() => {
        let mounted = isMount;
        isMount = false;
        if ("serviceWorker" in navigator) {
            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller?.postMessage({
                    type: "REMIX_NAVIGATION",
                    isMount: mounted,
                    location,
                    matches,
                    manifest: window.__remixManifest,
                });
            } else {
                let listener = async () => {
                    await navigator.serviceWorker.ready;
                    navigator.serviceWorker.controller?.postMessage({
                        type: "REMIX_NAVIGATION",
                        isMount: mounted,
                        location,
                        matches,
                        manifest: window.__remixManifest,
                    });
                };
                navigator.serviceWorker.addEventListener(
                    "controllerchange",
                    listener
                );
                return () => {
                    navigator.serviceWorker.removeEventListener(
                        "controllerchange",
                        listener
                    );
                };
            }
        }
    }, [location]);

    return (
        <html lang="en">
            <head>
                <Meta /> <Links />
            </head>
            <body>
                <Outlet /> <ScrollRestoration /> <Scripts /> <LiveReload />
            </body>
        </html>
    );
}

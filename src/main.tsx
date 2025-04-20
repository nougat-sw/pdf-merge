import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import FileContext from "./contexts/FileContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <FileContext>
            <App />
        </FileContext>
    </StrictMode>,
);

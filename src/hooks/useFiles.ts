import { useContext } from "react";
import { FileContext } from "../contexts/FileContext";

export default function useFiles() {
    const context = useContext(FileContext);

    if (!context) {
        throw new Error("useFiles must be used inside <FileContext>");
    }

    return context;
}

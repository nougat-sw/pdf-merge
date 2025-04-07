import { createContext, useState } from "react";
import type { FileContextType } from "../types/FileContextType";
import type { FileWithHash } from "../types/FileWithHash";
import xxhash from "xxhash-wasm";

const defaultContext: FileContextType = {
    files: [],
    addFile: () => {},
};

const FileContext = createContext<FileContextType>(defaultContext);

export default function FileContextProvider({ children }: { children: React.ReactNode }) {
    const [files, setFiles] = useState<Array<FileWithHash>>([]);

    async function hashWithXXHash(file: File): Promise<string> {
        const { create64 } = await xxhash();

        const buffer = await file.arrayBuffer();

        const hash = create64().update(new Uint8Array(buffer)).digest().toString(16);

        return hash;
    }

    async function addFile(file: File) {
        const hash = await hashWithXXHash(file);

        if (files.some((file) => file.hash === hash)) {
            console.warn("duplicate: " + file.name);
        }

        const fileWithHash = {
            hash,
            file,
        };

        setFiles((files) => [...files, fileWithHash]);
    }

    return <FileContext.Provider value={{ files, addFile }}>{children}</FileContext.Provider>;
}

export { FileContext };

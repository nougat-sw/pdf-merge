import { createContext, useState } from "react";
import type { FileContextType } from "../types/FileContextType";
import type { FileWithHash } from "../types/FileWithHash";
import getFileHash from "../lib/hashFile.ts";

const defaultContext: FileContextType = {
    files: [],
    addFiles: () => {},
    deleteSelected: () => {},
    deleteAll: () => {},
    toggleIsSelected: () => {},
    selectAll: () => {},
    deselectAll: () => {},
    deleteByHash: () => {},
};

const FileContext = createContext<FileContextType>(defaultContext);

export default function FileContextProvider({ children }: { children: React.ReactNode }) {
    const [files, setFiles] = useState<Array<FileWithHash>>([]);

    async function addFiles(files: Array<File>) {
        const hashedFiles: FileWithHash[] = [];

        for (const file of files) {
            const hash = await getFileHash(file);

            if (hashedFiles.some((item) => item.hash === hash)) {
                continue;
            }

            hashedFiles.push({
                file,
                hash,
                isSelected: false,
            });
        }

        setFiles((files) => [...files, ...hashedFiles]);
    }

    function deleteAll() {
        setFiles([]);
    }

    function deleteSelected() {
        setFiles((files) => files.filter((file) => !file.isSelected));
    }

    function deleteByHash(hash: string) {
        setFiles((files) => files.filter((file) => file.hash !== hash));
    }

    function toggleIsSelected(hash: string) {
        setFiles((files) =>
            files.map((file) => {
                if (file.hash === hash) return { ...file, isSelected: !file.isSelected };
                else return file;
            }),
        );
    }

    function selectAll() {
        setFiles((files) =>
            files.map((file) => {
                return { ...file, isSelected: true };
            }),
        );
    }

    function deselectAll() {
        setFiles((files) =>
            files.map((file) => {
                return { ...file, isSelected: false };
            }),
        );
    }

    return (
        <FileContext.Provider
            value={{
                files,
                addFiles,
                deleteAll,
                deleteSelected,
                toggleIsSelected,
                selectAll,
                deselectAll,
                deleteByHash,
            }}
        >
            {children}
        </FileContext.Provider>
    );
}

export { FileContext };

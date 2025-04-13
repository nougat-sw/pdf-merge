import type { FileContextType } from "../types/FileContextType";
import type { AppFile } from "../types/AppFile";
import { createContext, useState } from "react";
import getFileHash from "../lib/hashFile.ts";
import { PDFDocument } from "pdf-lib";

const FileContext = createContext<FileContextType | null>(null);

export default function FileContextProvider({ children }: { children: React.ReactNode }) {
    const [files, setFiles] = useState<Array<AppFile>>([]);

    async function addFiles(files: Array<File>) {
        const filesToAdd: AppFile[] = [];

        for (const file of files) {
            const hash = await getFileHash(file);

            if (filesToAdd.some((item) => item.hash === hash)) {
                continue;
            }

            filesToAdd.push({
                file,
                hash,
                isSelected: false,
            });
        }

        setFiles((files) => [...files, ...filesToAdd]);
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

    async function getNbOfPages(file: File) {
        return (await PDFDocument.load(await file.arrayBuffer())).getPageCount();
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
                getNbOfPages,
            }}
        >
            {children}
        </FileContext.Provider>
    );
}

export { FileContext };

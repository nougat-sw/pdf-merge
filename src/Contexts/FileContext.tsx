import type { FileContextType } from "../types/FileContextType";
import type { UIFile } from "../types/UIFile";
import { createContext, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { nanoid } from "nanoid";

const FileContext = createContext<FileContextType | null>(null);

export default function FileContextProvider({ children }: { children: React.ReactNode }) {
    const [files, setFiles] = useState<Array<UIFile>>([]);

    function addFiles(files: Array<File>) {
        const filesToAdd: UIFile[] = [];

        for (const file of files) {
            filesToAdd.push({
                file,
                id: nanoid(10),
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

    function deleteById(id: string) {
        setFiles((files) => files.filter((file) => file.id !== id));
    }

    function toggleIsSelected(id: string) {
        setFiles((files) =>
            files.map((file) => {
                if (file.id === id) return { ...file, isSelected: !file.isSelected };
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
                deleteById,
                getNbOfPages,
            }}
        >
            {children}
        </FileContext.Provider>
    );
}

export { FileContext };

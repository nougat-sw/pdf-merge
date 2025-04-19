import type { AppFile } from "./AppFile.d";

type FileContextType = {
    files: Array<AppFile>;
    addFiles: (file: Array<File>) => void;
    deleteSelected: () => void;
    deleteAll: () => void;
    toggleIsSelected: (hash: string) => void;
    selectAll: () => void;
    deselectAll: () => void;
    deleteById: (id: string) => void;
    getNbOfPages: (file: File) => Promise<number>;
};

export { FileContextType };

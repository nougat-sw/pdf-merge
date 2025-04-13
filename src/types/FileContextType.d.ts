import type { AppFile } from "./AppFile.d";

type FileContextType = {
    files: Array<AppFile>;
    addFiles: (file: Array<File>) => void;
    deleteSelected: () => void;
    deleteAll: () => void;
    toggleIsSelected: (hash: string) => void;
    selectAll: () => void;
    deselectAll: () => void;
    deleteByHash: (hash: string) => void;
};

export { FileContextType };

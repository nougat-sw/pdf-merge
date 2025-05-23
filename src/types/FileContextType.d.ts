import type { UIFile } from "./UIFile.d";

type FileContextType = {
    files: Array<UIFile>;
    addFiles: (file: Array<File>) => void;
    deleteSelected: () => void;
    deleteAll: () => void;
    toggleIsSelected: (hash: string) => void;
    selectAll: () => void;
    deselectAll: () => void;
    deleteById: (id: string) => void;
    getNbOfPages: (file: File) => Promise<number>;
    setFiles: React.Dispatch<React.SetStateAction<UIFile[]>>;
};

export { FileContextType };

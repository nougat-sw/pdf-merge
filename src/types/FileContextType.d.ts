import type { FileWithHash } from "./FileWithHash.d";

type FileContextType = {
    files: Array<FileWithHash>;
    addFile: (file: File) => void;
};

export { FileContextType };

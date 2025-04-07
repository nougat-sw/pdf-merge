import { useContext } from "react";
import { FileContext } from "../Contexts/FileContext";

export default function FileList() {
    const { files } = useContext(FileContext);
    return (
        <ul>
            {files.map((file) => (
                <li key={file.hash}>{file.hash.length}</li>
            ))}
        </ul>
    );
}

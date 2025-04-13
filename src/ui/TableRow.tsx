import { filesize } from "filesize";
import { FaTrash } from "react-icons/fa";
import { truncateEnd } from "../lib/truncate";
import { useContext } from "react";
import { FileContext } from "../contexts/FileContext";
import type { AppFile } from "../types/AppFile";

export default function TableRow({ file }: { file: AppFile }) {
    const { deleteByHash, toggleIsSelected } = useContext(FileContext);

    return (
        <tr key={file.hash} className="divide-x divide-gray-300 odd:bg-gray-100">
            <td className="px-1 text-center">
                <input
                    type="checkbox"
                    className="accent-white"
                    checked={file.isSelected}
                    onChange={() => toggleIsSelected(file.hash)}
                />
            </td>
            <td className="px-1">{truncateEnd(file.file.name.split(".pdf")[0], 60) + ".pdf"}</td>
            <td className="px-1 text-center">{file.nbOfPages}</td>
            <td className="px-1 text-center">{filesize(file.file.size)}</td>
            <td className="px-1 text-center font-mono">{file.hash}</td>
            <td className="px-1 text-center">
                <button className="cursor-pointer text-red-400" onClick={() => deleteByHash(file.hash)}>
                    <FaTrash />
                </button>
            </td>
        </tr>
    );
}

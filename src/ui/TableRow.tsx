import { filesize } from "filesize";
import { FaTrash } from "react-icons/fa";
import { truncateEnd } from "../lib/truncate";
import { useEffect, useState } from "react";
import type { AppFile } from "../types/AppFile";
import useFiles from "../hooks/useFiles";

export default function TableRow({ file }: { file: AppFile }) {
    const [nbOfPages, setNbOfPages] = useState<number>(0);

    const { deleteById, toggleIsSelected, getNbOfPages } = useFiles();

    const name = truncateEnd(file.file.name.split(".pdf")[0], 60) + ".pdf";
    const size = filesize(file.file.size);

    useEffect(
        function () {
            getNbOfPages(file.file).then((num) => {
                setNbOfPages(num);
            });
        },
        [file.file, getNbOfPages],
    );

    function handleDelete() {
        deleteById(file.id);
    }

    return (
        <tr key={file.id} className="divide-x divide-gray-300 odd:bg-gray-100">
            <td className="px-1 text-center">
                <input
                    type="checkbox"
                    className="accent-white"
                    checked={file.isSelected}
                    onChange={() => toggleIsSelected(file.id)}
                />
            </td>
            <td className="px-1">{name}</td>
            <td className="px-1 text-center">{nbOfPages}</td>
            <td className="px-1 text-center">{size}</td>
            <td className="px-1 text-center">
                <button className="cursor-pointer text-red-400" onClick={handleDelete}>
                    <FaTrash />
                </button>
            </td>
        </tr>
    );
}

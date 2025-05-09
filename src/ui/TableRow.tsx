import { filesize } from "filesize";
import { FaTrash } from "react-icons/fa";
import { truncateEnd } from "../lib/truncate";
import { useEffect, useState } from "react";
import type { UIFile } from "../types/UIFile";
import useFiles from "../hooks/useFiles";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TableRow({ file }: { file: UIFile }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: file.id });

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

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <tr
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="divide-x divide-gray-300 border-b border-gray-300 select-none odd:bg-gray-100 active:cursor-grabbing"
        >
            <td className="w-12 px-1 text-center">
                <input
                    type="checkbox"
                    className="accent-white"
                    checked={file.isSelected}
                    onChange={() => toggleIsSelected(file.id)}
                />
            </td>
            <td className="max-w-3 overflow-hidden px-1 sm:max-w-none">{name}</td>
            <td className="px-1 text-center">{nbOfPages}</td>
            <td className="px-1 text-center">{size}</td>
            <td className="w-12 px-1 text-center">
                <button className="cursor-pointer text-red-400" onClick={() => deleteById(file.id)}>
                    <FaTrash />
                </button>
            </td>
        </tr>
    );
}

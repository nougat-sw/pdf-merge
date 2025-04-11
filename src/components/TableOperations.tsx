import { useContext } from "react";
import { FileContext } from "../Contexts/FileContext";

export default function TableOperations({ openFileDialog }: { openFileDialog: () => void }) {
    const { deleteSelected, deleteAll } = useContext(FileContext);

    return (
        <div className="flex justify-between gap-2">
            <div className="flex gap-2">
                <button
                    onClick={openFileDialog}
                    className="cursor-pointer rounded-md border border-gray-700 bg-gray-700 px-3 text-white ring-gray-700 ring-offset-2 ring-offset-gray-200 focus:ring-2 focus:outline-none active:ring"
                >
                    <span>Add</span>
                </button>
                <button
                    onClick={deleteSelected}
                    className="cursor-pointer rounded-md border border-gray-700 bg-white px-3 ring-gray-700 ring-offset-2 ring-offset-white focus:ring-2 focus:outline-none"
                >
                    Delete
                </button>
                <button
                    onClick={deleteAll}
                    className="cursor-pointer rounded-md border border-gray-700 bg-white px-3 ring-gray-700 ring-offset-2 ring-offset-white focus:ring-2 focus:outline-none"
                >
                    Delete All
                </button>
            </div>
            <button className="cursor-pointer rounded-md border border-gray-700 bg-gray-700 px-3 text-white ring-gray-700 ring-offset-2 ring-offset-gray-200 focus:ring-2 focus:outline-none active:ring">
                Merge
            </button>
        </div>
    );
}

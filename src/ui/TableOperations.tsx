import useFiles from "../hooks/useFiles";
import download from "../lib/download.ts";
import ConfirmDialog from "./ConfirmDialog";
import { useState } from "react";

export default function TableOperations({ openFileDialog }: { openFileDialog: () => void }) {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const [title, setTitle] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [onConfirm, setOnConfirm] = useState<() => void>(() => () => {});
    const [onClose, setOnClose] = useState<() => void>(() => () => {});

    const { deleteSelected, deleteAll, files } = useFiles();

    async function handleMerge() {
        const { default: merge } = await import("../lib/merge.ts");

        const merged = await merge(files.map((file) => file.file));

        const url = URL.createObjectURL(
            new Blob([merged], {
                type: "application/pdf",
            }),
        );

        download(url);

        URL.revokeObjectURL(url);
    }

    function showDialog(title: string, message: string, onConfirm: () => void, onClose: () => void) {
        setTitle(title);
        setMessage(message);
        setOnConfirm(() => onConfirm);
        setOnClose(() => onClose);

        setIsDialogOpen(true);
    }

    function handleDeleteSelected() {
        const selectedFilesCount = files.filter((file) => file.isSelected).length;
        const message = `Delete ${selectedFilesCount.toString()} file${selectedFilesCount > 1 ? "s" : ""}?`;

        function confirm() {
            deleteSelected();
            setIsDialogOpen(false);
        }

        showDialog("Confirm deletion", message, confirm, () => setIsDialogOpen(false));
    }

    function handleDeleteAll() {
        function confirm() {
            deleteAll();
            setIsDialogOpen(false);
        }

        showDialog("Confirm deletion", "Delete all files?", confirm, () => setIsDialogOpen(false));
    }

    return (
        <>
            <div className="flex justify-between gap-2">
                <div className="flex gap-2">
                    <button
                        onClick={openFileDialog}
                        className="cursor-pointer rounded-md border border-gray-700 bg-gray-700 px-3 text-white ring-gray-700 ring-offset-2 ring-offset-gray-200 focus:ring-2 focus:outline-none active:ring"
                    >
                        <span>Add</span>
                    </button>
                    <button
                        onClick={handleDeleteSelected}
                        disabled={!files.some((file) => file.isSelected)}
                        className="cursor-pointer rounded-md border border-gray-700 bg-white px-3 ring-gray-700 ring-offset-2 ring-offset-white focus:ring-2 focus:outline-none disabled:cursor-default disabled:bg-gray-300"
                    >
                        Delete
                    </button>
                    <button
                        onClick={handleDeleteAll}
                        disabled={files.length === 0}
                        className="cursor-pointer rounded-md border border-gray-700 bg-white px-3 ring-gray-700 ring-offset-2 ring-offset-white focus:ring-2 focus:outline-none disabled:cursor-default disabled:bg-gray-300"
                    >
                        Delete All
                    </button>
                </div>
                <button
                    disabled={files.length < 2}
                    onClick={handleMerge}
                    className="cursor-pointer rounded-md border border-gray-700 bg-gray-700 px-3 text-white ring-gray-700 ring-offset-2 ring-offset-gray-200 focus:ring-2 focus:outline-none active:ring disabled:cursor-default"
                >
                    Merge
                </button>
            </div>
            <ConfirmDialog
                title={title}
                isOpen={isDialogOpen}
                message={message}
                onClose={onClose}
                onConfirm={onConfirm}
            />
        </>
    );
}

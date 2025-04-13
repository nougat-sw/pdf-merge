import useFiles from "../hooks/useFiles";
import merge from "../lib/merge";

export default function TableOperations({ openFileDialog }: { openFileDialog: () => void }) {
    const { deleteSelected, deleteAll, files } = useFiles();

    async function handleMerge() {
        const merged = await merge(files.map((file) => file.file));

        const url = URL.createObjectURL(
            new Blob([merged], {
                type: "application/pdf",
            }),
        );

        console.log(url);

        const link = document.createElement("a");
        link.href = url;
        link.download = "merged.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

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
                    disabled={!files.some((file) => file.isSelected)}
                    className="cursor-pointer rounded-md border border-gray-700 bg-white px-3 ring-gray-700 ring-offset-2 ring-offset-white focus:ring-2 focus:outline-none disabled:cursor-default disabled:bg-gray-200"
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
            <button
                onClick={handleMerge}
                className="cursor-pointer rounded-md border border-gray-700 bg-gray-700 px-3 text-white ring-gray-700 ring-offset-2 ring-offset-gray-200 focus:ring-2 focus:outline-none active:ring"
            >
                Merge
            </button>
        </div>
    );
}

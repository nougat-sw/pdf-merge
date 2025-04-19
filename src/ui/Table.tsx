import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import TableOperations from "./TableOperations";
import TableRow from "./TableRow";
import useFiles from "../hooks/useFiles";

export default function Table() {
    const { addFiles, files, selectAll, deselectAll } = useFiles();

    const onDrop = useCallback(
        function (files: Array<File>) {
            addFiles(files);
        },
        [addFiles],
    );

    const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [],
        },
        noClick: true,
        multiple: true,
    });

    function handleCheckAll(event: React.ChangeEvent<HTMLInputElement>) {
        const isChecked = event.target.checked;

        if (isChecked) {
            selectAll();
        } else {
            deselectAll();
        }
    }

    const tableContent = files.map((file) => <TableRow key={file.id} file={file} />);

    const prompt = (
        <div className="text-center">
            {isDragActive ? (
                <>
                    <span className="font-bold">Drop</span> the files <span className="font-bold">here</span>
                </>
            ) : (
                <>
                    <span className="font-bold">Drag and Drop</span> or click <span className="font-bold">Add</span> to
                    get started{" "}
                </>
            )}
        </div>
    );

    return (
        <div className="flex flex-col gap-2">
            <div {...getRootProps()} className="min-h-52 overflow-hidden rounded-md border border-gray-400 bg-white">
                <input {...getInputProps()} />
                <table className="w-full table-auto border-collapse overflow-scroll">
                    <thead>
                        <tr className="bg-gray-700 text-white">
                            <th className="px-1">
                                {files.length > 0 && (
                                    <input
                                        type="checkbox"
                                        className="accent-white"
                                        onChange={handleCheckAll}
                                        checked={files.every((file) => file.isSelected)}
                                    />
                                )}
                            </th>
                            <th className="px-1">File Name</th>
                            <th className="px-1">Pages</th>
                            <th className="px-1">Size</th>
                            <th className="px-1"></th>
                        </tr>
                    </thead>
                    <tbody>{tableContent}</tbody>
                </table>
                {files.length === 0 && (
                    <div className="flex min-h-52 items-center justify-center p-2 text-xl">{prompt}</div>
                )}
            </div>
            <TableOperations openFileDialog={open} />
        </div>
    );
}

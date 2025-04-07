import { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineDownload } from "react-icons/ai";
import { FileContext } from "../Contexts/FileContext";

export default function MyDropzone() {
    const { addFile } = useContext(FileContext);

    const onDrop = useCallback(
        function (files: File[]) {
            for (const file of files) {
                addFile(file);
            }
        },
        [addFile],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div
            {...getRootProps()}
            className="cursor-pointer rounded-lg bg-gray-300 shadow-[0_2px_0_hsla(0,_0%,_100%,_.15)] inset-shadow-sm inset-shadow-black/10"
        >
            <input {...getInputProps()} />
            <div className="flex min-h-52 flex-col items-center justify-between py-6">
                <AiOutlineDownload className="text-5xl" />
                <div className="text-center text-xl">
                    {isDragActive ? (
                        <p>Drop the files here</p>
                    ) : (
                        <p>
                            Drag &amp; Drop
                            <br />
                            <span className="font-bold">or</span>
                            <br />
                            Click to Select
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

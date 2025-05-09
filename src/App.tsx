import Table from "./ui/Table";
import { Toaster } from "react-hot-toast";

export default function App() {
    return (
        <div className="flex min-h-dvh flex-col items-center justify-between bg-gray-200 text-gray-700">
            <div className="w-full p-3 text-center text-xl font-semibold">
                <h1>PDF Merge</h1>
            </div>
            <Table />
            <div className="w-full bg-white py-2 text-center text-sm">
                <a className="underline underline-offset-3" href="https://github.com/nougat-sw/pdf-merge">
                    Source Code
                </a>
            </div>
            <Toaster />
        </div>
    );
}

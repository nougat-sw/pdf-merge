import Table from "./ui/Table";
import { Toaster } from "react-hot-toast";

export default function App() {
    return (
        <div className="flex min-h-dvh items-center justify-center bg-gray-200 text-gray-700">
            <Table />
            <Toaster />
        </div>
    );
}

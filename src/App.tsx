import DropZone from "./components/DropZone";
import FileList from "./components/FileList";

export default function App() {
    return (
        <div className="flex h-dvh items-center justify-center bg-gray-200 text-gray-700">
            <div className="w-lg px-2">
                <DropZone />
                <FileList />
            </div>
        </div>
    );
}

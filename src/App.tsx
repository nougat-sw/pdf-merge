import Dropzone from "./components/Dropzone";

export default function App() {
    return (
        <div className="flex h-dvh items-center justify-center bg-gray-200 text-gray-700">
            <div className="flex w-6xl flex-col gap-2 px-2">
                <Dropzone />
            </div>
        </div>
    );
}

import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from "@headlessui/react";

export default function ConfirmDialog({
    isOpen,
    title,
    message,
    onConfirm,
    onClose,
}: {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onClose: () => void;
}) {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/20" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-2">
                <DialogPanel className="w-sm rounded-md border border-gray-700 bg-white px-4 py-2 text-gray-700">
                    <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
                    <p className="mt-2 mb-4">{message}</p>
                    <div className="flex justify-between">
                        <button
                            onClick={onConfirm}
                            className="cursor-pointer rounded-md border border-gray-700 bg-gray-700 px-3 text-white ring-gray-700 ring-offset-2 ring-offset-gray-200 focus:ring-2 focus:outline-none active:ring"
                        >
                            Confirm
                        </button>
                        <button
                            onClick={onClose}
                            className="cursor-pointer rounded-md border border-gray-700 bg-white px-3 ring-gray-700 ring-offset-2 ring-offset-white focus:ring-2 focus:outline-none"
                        >
                            Cancel
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

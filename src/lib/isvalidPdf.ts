import { PDFDocument } from "pdf-lib";

export default async function isValidPdf(file: File) {
    try {
        await PDFDocument.load(await file.arrayBuffer());
        return true;
    } catch {
        return false;
    }
}

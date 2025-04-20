import { PDFDocument } from "pdf-lib";

export default async function merge(files: Array<File>) {
    const merged = await PDFDocument.load(await files[0].arrayBuffer());

    for (let i = 1; i < files.length; i++) {
        const donor = await PDFDocument.load(await files[i].arrayBuffer());
        const pages = await merged.copyPages(donor, donor.getPageIndices());

        for (const page of pages) {
            merged.addPage(page);
        }
    }

    merged.setTitle("merged");

    const mergedBytes = await merged.save();

    return mergedBytes;
}

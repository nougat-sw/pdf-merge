import xxhash from "xxhash-wasm";

export default async function getFileHash(file: File): Promise<string> {
    const { create64 } = await xxhash();

    const buffer = await file.arrayBuffer();

    const hash = create64().update(new Uint8Array(buffer)).digest().toString(16);

    const leftPaddedHash = hash.padStart(16, "0");
    return leftPaddedHash;
}

export function truncateEnd(src: string, outLen: number) {
    if (src.length <= outLen) return src;

    const out = src.substring(0, outLen - 3) + "...";

    return out;
}

export function truncateStart(src: string, outLen: number) {
    if (src.length <= outLen) return src;

    const out = "..." + src.substring(3 + src.length - outLen);

    return out;
}

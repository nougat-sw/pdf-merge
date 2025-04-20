export default function download(url: string) {
    const link = document.createElement("a");
    link.download = "merged";
    link.href = url;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

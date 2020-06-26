import JSZip from "jszip";

export default function downloadZipWithFiles(urls) {
  const link = document.createElement("a");
  link.setAttribute("download", "images");
  document.body.appendChild(link);

  fetchBlobs(urls)
    .then(pack)
    .then(zipFile => {
      link.href = URL.createObjectURL(zipFile);
      link.click();
      document.body.removeChild(link);
    });
}

function fetchBlobs(urls) {
  return Promise.all(
    urls.map(url =>
      fetch(`${window.location.origin}/${url}`)
        .then(resp => resp.blob())
        .then(blob => {
          blob.name = url.slice(url.lastIndexOf("/") + 1);
          return blob;
        })
    )
  );
}

function pack(blobs) {
  const zip = new JSZip();
  const folder = zip.folder("my_images");
  blobs.forEach(blob => folder.file(blob.name, blob));
  return zip.generateAsync({ type: "blob" });
}

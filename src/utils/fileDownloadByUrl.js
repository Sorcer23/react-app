export default function fileDownloadByUrl(url, name = "") {
  const link = document.createElement("a");

  link.setAttribute("href", window.location.origin + "/" + url);
  link.setAttribute("download", name);

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

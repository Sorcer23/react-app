export default function normalizeExternalLink(url) {
  if (url == null) return "";
  if (url.includes("http")) return url;
  return "//" + url;
}

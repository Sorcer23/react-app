const ROOT = process.env.REACT_APP_SERVER_URL;

export default function getServerFileUrl(filePath, params) {
  const path = normalizePath(filePath);

  if (params == null) return `${ROOT}${path}`;

  const { width = 9999, height = 9999, method } = params;

  return `${ROOT}/image/${getMethodString(method)}${width}x${height}${path}`;
}

function getMethodString(name) {
  switch (name) {
    case "resize":
      return "r/";
    default:
      return "";
  }
}

function normalizePath(path) {
  if (path == null) return "";
  if (path[0] !== "/") return `/${path}`;
  return path;
}

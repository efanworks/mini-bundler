const fs = require("fs");
const path = require("path");

function tryFile(filePath) {
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return filePath;
  }
  return null;
}

function resolveAsFileOrDirectory(basePath) {
  const direct = tryFile(basePath);
  if (direct) return direct;

  const withJsExt = tryFile(`${basePath}.js`);
  if (withJsExt) return withJsExt;

  if (fs.existsSync(basePath) && fs.statSync(basePath).isDirectory()) {
    const indexFile = tryFile(path.join(basePath, "index.js"));
    if (indexFile) return indexFile;
  }

  throw new Error(`Cannot resolve module path: ${basePath}`);
}

function resolveEntry(entryPath, cwd = process.cwd()) {
  const absolutePath = path.isAbsolute(entryPath)
    ? entryPath
    : path.resolve(cwd, entryPath);
  return resolveAsFileOrDirectory(absolutePath);
}

function resolveImport(fromFilePath, requestPath) {
  if (!requestPath.startsWith(".")) {
    throw new Error(
      `Only relative imports are supported in MVP: "${requestPath}" in ${fromFilePath}`
    );
  }

  const dirname = path.dirname(fromFilePath);
  const absoluteCandidate = path.resolve(dirname, requestPath);
  return resolveAsFileOrDirectory(absoluteCandidate);
}

module.exports = {
  resolveEntry,
  resolveImport,
};

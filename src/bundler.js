const fs = require("fs");
const path = require("path");
const { buildDependencyGraph } = require("./graph");
const { createBundleCode } = require("./runtime-template");

function bundle(entryPath, outputPath, cwd = process.cwd()) {
  const graph = buildDependencyGraph(entryPath, cwd);
  const bundleCode = createBundleCode(graph.modules, graph.entryId);

  const absoluteOutputPath = path.isAbsolute(outputPath)
    ? outputPath
    : path.resolve(cwd, outputPath);

  fs.mkdirSync(path.dirname(absoluteOutputPath), { recursive: true });
  fs.writeFileSync(absoluteOutputPath, bundleCode, "utf8");

  return {
    outputPath: absoluteOutputPath,
    moduleCount: graph.modules.length,
  };
}

module.exports = {
  bundle,
};

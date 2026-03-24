const fs = require("fs");
const { collectDependencies, transformRequires } = require("./parser");
const { resolveEntry, resolveImport } = require("./resolver");

function buildDependencyGraph(entryPath, cwd = process.cwd()) {
  const entryFile = resolveEntry(entryPath, cwd);
  const modules = [];
  const moduleByFile = new Map();

  function ensureModule(filePath) {
    if (moduleByFile.has(filePath)) {
      return moduleByFile.get(filePath);
    }

    const module = {
      id: modules.length,
      filePath,
      rawCode: fs.readFileSync(filePath, "utf8"),
      requests: [],
      requestToFile: {},
      transformedCode: "",
    };

    modules.push(module);
    moduleByFile.set(filePath, module);
    return module;
  }

  ensureModule(entryFile);

  for (let i = 0; i < modules.length; i += 1) {
    const module = modules[i];
    const requests = collectDependencies(module.rawCode);
    module.requests = requests;

    requests.forEach((request) => {
      const depFile = resolveImport(module.filePath, request);
      module.requestToFile[request] = depFile;
      ensureModule(depFile);
    });
  }

  modules.forEach((module) => {
    const requestToId = {};
    Object.entries(module.requestToFile).forEach(([request, filePath]) => {
      requestToId[request] = moduleByFile.get(filePath).id;
    });
    module.transformedCode = transformRequires(module.rawCode, requestToId);
  });

  return {
    entryId: moduleByFile.get(entryFile).id,
    modules: modules.map((module) => ({
      id: module.id,
      filePath: module.filePath,
      transformedCode: module.transformedCode,
    })),
  };
}

module.exports = {
  buildDependencyGraph,
};

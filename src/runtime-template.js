function createBundleCode(modules, entryId) {
  const moduleFactories = modules
    .map((module) => {
      return `${module.id}: function(module, exports, __my_require__) {\n${module.transformedCode}\n}`;
    })
    .join(",\n");

  return `(function(modules) {
  var cache = {};

  function __my_require__(moduleId) {
    if (cache[moduleId]) {
      return cache[moduleId].exports;
    }

    var moduleFactory = modules[moduleId];
    if (!moduleFactory) {
      throw new Error("Module not found: " + moduleId);
    }

    var module = { exports: {} };
    cache[moduleId] = module;
    moduleFactory(module, module.exports, __my_require__);
    return module.exports;
  }

  __my_require__(${entryId});
})({\n${moduleFactories}\n});\n`;
}

module.exports = {
  createBundleCode,
};

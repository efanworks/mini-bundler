(function(modules) {
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

  __my_require__(0);
})({
0: function(module, exports, __my_require__) {
const logA = __my_require__(1);
const logB = __my_require__(1);
const message = __my_require__(2);
logA(`A says: ${message}`);
logB(`B says: ${message}`);
},
1: function(module, exports, __my_require__) {
console.log("logger module executed");
module.exports = function log(message) {
  console.log("[mini-bundler]", message);
};
},
2: function(module, exports, __my_require__) {
module.exports = "hello from message.js";
}
});

console.log("logger module executed");

module.exports = function log(message) {
  console.log("[mini-bundler]", message);
};

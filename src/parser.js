const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;

function parseToAst(code) {
  return parser.parse(code, {
    sourceType: "script",
  });
}

function collectDependencies(code) {
  const ast = parseToAst(code);
  const dependencies = [];

  traverse(ast, {
    CallExpression(path) {
      const { node } = path;
      const isRequireCall =
        node.callee.type === "Identifier" && node.callee.name === "require";
      const firstArg = node.arguments[0];
      const hasStringLiteralArg =
        node.arguments.length === 1 && firstArg && firstArg.type === "StringLiteral";

      if (isRequireCall && hasStringLiteralArg) {
        dependencies.push(firstArg.value);
      }
    },
  });

  return dependencies;
}

function transformRequires(code, requestToIdMap) {
  const ast = parseToAst(code);

  traverse(ast, {
    CallExpression(path) {
      const { node } = path;
      const isRequireCall =
        node.callee.type === "Identifier" && node.callee.name === "require";
      const firstArg = node.arguments[0];
      const hasStringLiteralArg =
        node.arguments.length === 1 && firstArg && firstArg.type === "StringLiteral";

      if (!isRequireCall || !hasStringLiteralArg) {
        return;
      }

      const request = firstArg.value;
      const depId = requestToIdMap[request];
      if (depId === undefined) {
        throw new Error(`Missing module id for dependency "${request}"`);
      }

      node.callee.name = "__my_require__";
      node.arguments = [
        {
          type: "NumericLiteral",
          value: depId,
        },
      ];
    },
  });

  return generator(ast, { comments: true }).code;
}

module.exports = {
  collectDependencies,
  transformRequires,
};

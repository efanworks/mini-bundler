const path = require("path");
const { Command } = require("commander");
const { bundle } = require("./bundler");

const program = new Command();

program
  .name("mini-bundler")
  .description("Minimal CommonJS require bundler")
  .version("1.0.0");

program
  .command("build <entry>")
  .description("Build a browser-ready bundle from an entry JS file")
  .option("-o, --output <file>", "Output bundle path", "dist/bundle.js")
  .action((entry, options) => {
    try {
      const result = bundle(entry, options.output, process.cwd());
      const relativeOut = path.relative(process.cwd(), result.outputPath) || result.outputPath;
      console.log(
        `Bundle generated: ${relativeOut} (modules: ${result.moduleCount})`
      );
    } catch (error) {
      console.error(`Build failed: ${error.message}`);
      process.exitCode = 1;
    }
  });

program.parse(process.argv);

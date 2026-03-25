const { Command } = require("commander");

const program = new Command();

program
    .name('greeting')
    .description('Greeting to you')
    .version('1.0.0')

program
    .command("start <name>")
    .description("greeting to your input name")
    .option("-a, --age <age>", "Person age", '18')
    .action((name, options) => {
        const { age } = options;
        console.log(`Hello baby ${name}, age: ${age}`);
    });

program.parse(process.argv);
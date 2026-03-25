const { Command } = require("commander");

const program = new Command();

program
    .name('greeting')
    .description('Greeting to you')
    .option('-a, --age <age>', 'Person age', 18)
    .option('-p, --phone <phone>', 'Phone number', 110)
    .version('1.0.1')

program
    .command("start <name>")
    .description("Greeting to your input name")
    .action((name, options) => {
        const { age } = options;
        console.log(`Hello baby ${name}, age: ${age}`);
    });

program
    .command('call <name>')
    .description('Call to your input name')
    .action((name, options) => {
        const { phone } = options;
        console.log(`Call ${name}, phone number: ${phone}`);
    })

program.parse(process.argv);
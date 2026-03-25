const { Command } = require("commander");

const program = new Command();

program
    .name('greeting')
    .description('Greeting to you')
    .version('1.0.1')

program
    .argument("<name>")
    .description("Greeting to your input name")
    .option("-a, --age <age>", "Person age", '18')
    .option("-p, --phone <phone>", "Phone number", '110')
    .action((name, options) => {
        const { age, phone } = options;
        console.log(`Hello baby ${name}, age: ${age}, phone: ${phone}`);
    });

program
    .command('call <name>')
    .description('Call to your input name')
    .option("-p, --phone <phone>", "Phone number", '110')
    .action((name, options) => {
        const { phone } = options;
        console.log(`Call ${name}, phone number: ${phone}`);
    })

program.parse(process.argv);
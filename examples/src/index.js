const logA = require("./logger");
const logB = require("./logger");
const message = require("./message");

logA(`A says: ${message}`);
logB(`B says: ${message}`);

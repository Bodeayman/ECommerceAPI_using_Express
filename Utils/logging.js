const fs = require('fs');

function logToFile(message) {
    const logMessage = `${new Date().toISOString()} - ${message}\n`;
    fs.appendFile('app.log', logMessage, (err) => {
        if (err) console.error('Error writing to log file', err);
    });
}

module.exports = logToFile
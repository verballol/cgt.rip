

const fs = require('fs');
const uglify = require('uglify-js');

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
    console.error('Usage: node obfuscator.js [input.js] [output.js]');
    process.exit(1);
}

const code = fs.readFileSync(inputFile, 'utf-8');
const result = uglify.minify(code);

if (result.error) {
    console.error(result.error);
    process.exit(1);
}

fs.writeFileSync(outputFile, result.code, 'utf-8');

console.log(`Obfuscated code written to ${outputFile}`);
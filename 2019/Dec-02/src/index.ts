
import { IntcodeProgram } from "./intcodeProgram";
import * as path from "path";

const ip = new IntcodeProgram();

const inputFile = path.join(__dirname, '../inputs.txt');

ip.loadFile(inputFile);

// AoC constraint: replace position 1 with 12 and 2 with 2
// ip.loaded[1] = 12;
// ip.loaded[2] = 2;

console.log('Part 1 answer: ' + ip.run(12, 2)[0]);

const brute = ip.bruteForceGetInputs(19690720);
console.log(`Part 2 answer: ${JSON.stringify(brute)}`);

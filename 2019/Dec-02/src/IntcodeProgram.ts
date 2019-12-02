import * as fs from "fs";
import { isNullOrUndefined } from "util";

export class IntcodeProgram {

    loaded: Int32Array = new Int32Array();

    run(noun: number, verb: number) {

        const opcodes = this.getLoaded(noun, verb);
        let receivedExitCode = false;

        for(let i = 0; i < opcodes.length; i += 4) {

            if (opcodes[i] === 99) {
                receivedExitCode = true; // not required per AoC problem, but seems like a good idea
                break;
            }

            const input1index = opcodes[i + 1];
            const input2index = opcodes[i + 2];
            const outputIndex = opcodes[i + 3];

            if (opcodes[i] === 1) {
                opcodes[outputIndex] = opcodes[input1index] + opcodes[input2index];
            } else if (opcodes[i] === 2) {
                opcodes[outputIndex] = opcodes[input1index] * opcodes[input2index];
            } else {
                throw new Error('Opcode must be 1, 2, or 99.');
            }

            // initially used Int16Array, which overflowed and caused negative numbers
            if (opcodes[outputIndex] < 0) {
                throw new Error('Overflow Int Array');
            }

        }

        // if not receivedExitCode should probably squawk...

        return opcodes;
    }

    loadFile(filepath: string) {
        const data = fs.readFileSync(filepath);

        const strings = data.toString().trim().split(',');
        const opcodes = new Int32Array(strings.map((str) => { return parseInt(str.trim()); }));

        this.loaded = opcodes;
        return opcodes;
    }

    loadArray(opcodes: Array<any>) {
        this.loaded = new Int32Array(opcodes);
        return opcodes;
    }

    getLoaded(noun?: number, verb?: number) {
        const opcodes = new Int32Array(this.loaded.slice());
        if (!isNullOrUndefined(noun)) {
            opcodes[1] = noun;
        }
        if (!isNullOrUndefined(verb)) {
            opcodes[2] = verb;
        }
        return opcodes;
    }

    bruteForceGetInputs(desiredOutput: Number) {
        let count = 0;
        for(let i = 0; i < 100; i++) {
            for(let j = 0; j < 100; j++) {
                const output = this.run(i, j)[0];
                if (output === desiredOutput) {
                    return { 1: i, 2: j };
                }
                count++;
            }
        }
        console.log(`${count} run without result`);
    }

    efficientGetInputs(desiredOutput: Number) {
        // is there an efficient algorithm for this?
    }

};
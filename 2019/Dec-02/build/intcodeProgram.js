"use strict";
exports.__esModule = true;
var fs = require("fs");
var util_1 = require("util");
var IntcodeProgram = /** @class */ (function () {
    function IntcodeProgram() {
        this.loaded = new Int32Array();
    }
    IntcodeProgram.prototype.run = function (noun, verb) {
        var opcodes = this.getLoaded(noun, verb);
        var receivedExitCode = false;
        for (var i = 0; i < opcodes.length; i += 4) {
            if (opcodes[i] === 99) {
                receivedExitCode = true; // not required per AoC problem, but seems like a good idea
                break;
            }
            var input1index = opcodes[i + 1];
            var input2index = opcodes[i + 2];
            var outputIndex = opcodes[i + 3];
            if (opcodes[i] === 1) {
                opcodes[outputIndex] = opcodes[input1index] + opcodes[input2index];
            }
            else if (opcodes[i] === 2) {
                opcodes[outputIndex] = opcodes[input1index] * opcodes[input2index];
            }
            else {
                throw new Error('Opcode must be 1, 2, or 99.');
            }
            // initially used Int16Array, which overflowed and caused negative numbers
            if (opcodes[outputIndex] < 0) {
                throw new Error('Overflow Int Array');
            }
        }
        // if not receivedExitCode should probably squawk...
        return opcodes;
    };
    IntcodeProgram.prototype.loadFile = function (filepath) {
        var data = fs.readFileSync(filepath);
        var strings = data.toString().trim().split(',');
        var opcodes = new Int32Array(strings.map(function (str) { return parseInt(str.trim()); }));
        this.loaded = opcodes;
        return opcodes;
    };
    IntcodeProgram.prototype.loadArray = function (opcodes) {
        this.loaded = new Int32Array(opcodes);
        return opcodes;
    };
    IntcodeProgram.prototype.getLoaded = function (noun, verb) {
        var opcodes = new Int32Array(this.loaded.slice());
        if (!util_1.isNullOrUndefined(noun)) {
            opcodes[1] = noun;
        }
        if (!util_1.isNullOrUndefined(verb)) {
            opcodes[2] = verb;
        }
        return opcodes;
    };
    IntcodeProgram.prototype.bruteForceGetInputs = function (desiredOutput) {
        var count = 0;
        for (var i = 0; i < 100; i++) {
            for (var j = 0; j < 100; j++) {
                var output = this.run(i, j)[0];
                if (output === desiredOutput) {
                    return { 1: i, 2: j };
                }
                count++;
            }
        }
        console.log(count + " run without result");
    };
    IntcodeProgram.prototype.efficientGetInputs = function (desiredOutput) {
        // is there an efficient algorithm for this?
    };
    return IntcodeProgram;
}());
exports.IntcodeProgram = IntcodeProgram;
;

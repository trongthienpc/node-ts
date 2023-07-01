"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const originalLog = console.log; // Save the original console.log function
// Mock console.log to capture its output
let consoleOutput = [];
const mockedLog = (output) => consoleOutput.push(output);
console.log = mockedLog;
// Import the code to be tested
const index_1 = require("../index");
describe("Testing TypeScript code", () => {
    test("Console log message", () => {
        expect(index_1.message).toBe("Hello world!"); // Ensure the message is correct
        expect(consoleOutput.length).toBe(1); // Ensure console.log was called once
        expect(consoleOutput[0]).toBe("Hello world!"); // Ensure console.log captured the expected output
    });
});
// Restore the original console.log function after all tests have finished
afterAll(() => {
    console.log = originalLog;
});

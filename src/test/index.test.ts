const originalLog = console.log; // Save the original console.log function

// Mock console.log to capture its output
let consoleOutput: string[] = [];
const mockedLog = (output: string) => consoleOutput.push(output);
console.log = mockedLog;

// Import the code to be tested
import { message } from "../index";

describe("Testing TypeScript code", () => {
  test("Console log message", () => {
    expect(message).toBe("Hello world!"); // Ensure the message is correct
    expect(consoleOutput.length).toBe(1); // Ensure console.log was called once
    expect(consoleOutput[0]).toBe("Hello world!"); // Ensure console.log captured the expected output
  });
});

// Restore the original console.log function after all tests have finished
afterAll(() => {
  console.log = originalLog;
});

// app.test.js - Your test unit for the Express application
import request from "supertest"; // Supertest is used to make HTTP requests to the Express app
import app from "../index"; // Import your Express application

describe("GET /", () => {
  it("should respond with 'Hi there!'", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hi there!");
  });
});

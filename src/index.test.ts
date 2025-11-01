import { ErrorFallback } from "./index";

describe("index (barrel export)", () => {
  it("should export ErrorFallback", () => {
    expect(ErrorFallback).toBeDefined();
    expect(typeof ErrorFallback).toBe("function");
  });
});

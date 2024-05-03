import { it, expect, describe } from "vitest";
import { factorial } from "../factorial";

describe("Factorial test cases", () => {
  it("should return 0 if input is 0", () => {
    expect(factorial(0)).toBe(0);
  });

  it("should return 1 if input is 1", () => {
    expect(factorial(1)).toBe(1);
  });

  it("should return 2 if input is 2", () => {
    expect(factorial(2)).toBe(2);
  });

  it("should return 6 if input is 3", () => {
    expect(factorial(3)).toBe(6);
  });

  it("should return 24 if input is 4", () => {
    expect(factorial(3)).toBe(6);
  });

  it("should return undefined if a negative number is passed", () => {
    expect(factorial(-1)).toBeUndefined();
  });
});

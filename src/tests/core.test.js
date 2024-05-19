import {
  it,
  expect,
  describe,
  beforeEach,
  beforeAll,
  afterAll,
  afterEach,
} from "vitest";

import {
  Stack,
  calculateDiscount,
  canDrive,
  fetchData,
  getCoupons,
  isPriceInRange,
  isValidUsername,
  validateUserInput,
} from "../core";

describe("Core test cases", () => {
  it("should return an array of coupons", () => {
    const coupons = getCoupons();

    expect(Array.isArray(coupons)).toBe(true);
    expect(coupons.length).toBeGreaterThan(0);
  });

  it("should return an array with valid coupon codes", () => {
    const coupons = getCoupons();

    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("code");
      expect(typeof coupon.code).toBe("string");
      expect(coupon.code).toBeTruthy();
    });
  });

  it("should return an array with valid discounts", () => {
    const coupons = getCoupons();

    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("discount");
      expect(typeof coupon.discount).toBe("number");
      expect(coupon.discount).toBeGreaterThan(0);
      expect(coupon.discount).lessThan(1);
    });
  });
});

describe("calculateDiscount test cases", () => {
  it("should return discounted if given valid code", () => {
    expect(calculateDiscount(10, "SAVE10")).toBe(9);
    expect(calculateDiscount(10, "SAVE20")).toBe(8);
  });

  it("should handle non-numeric price", () => {
    expect(calculateDiscount("10", "SAVE20")).toMatch(/nvalid/i);
  });

  it("should handle negative price", () => {
    expect(calculateDiscount(-10, "SAVE20")).toMatch(/invalid/i);
  });

  it("should handle non-string discount code", () => {
    expect(calculateDiscount(10, 10)).toMatch(/invalid/i);
  });

  it("should handle invalid discount code", () => {
    expect(calculateDiscount(10, "invalid discount")).toBe(10);
  });
});

describe("validateUserInput test cases", () => {
  it("should respond with a succesful validation", () => {
    expect(validateUserInput("diegocuehdz", 28)).toMatch(/succes/i);
  });

  it.each([
    {
      testCase: "with numberic values",
      value: 123,
    },
    {
      testCase: "with less than 3 chars",
      value: "dc",
    },
    {
      testCase: "with longer than 256 chars",
      value: "A".repeat(257),
    },
  ])(
    "should return an error if invalid username $testCase is given",
    ({ value }) => {
      expect(validateUserInput(value, 28)).toMatch(/invalid/i);
    }
  );

  it.each([
    {
      testCase: "with string value values",
      value: "28",
    },
    {
      testCase: "with less than 18 years",
      value: 17,
    },
    {
      testCase: "with more than 99 years",
      value: 100,
    },
  ])(
    "should return an error if an invalid age $testCase is given",
    ({ value }) => {
      expect(validateUserInput("diegocuehdz", value)).toMatch(/invalid/i);
    }
  );

  it("should return an error if both values are invalid", () => {
    expect(validateUserInput("", 100)).toMatch(/invalid username/i);
    expect(validateUserInput("", 100)).toMatch(/invalid age/i);
  });
});

describe("isPriceInRange test cases", () => {
  it("should return false when the price is outside the range", () => {
    expect(isPriceInRange(-10, 0, 100)).toBe(false);
    expect(isPriceInRange(101, 0, 100)).toBe(false);
  });

  it("should return true when the price in the boundary", () => {
    expect(isPriceInRange(0, 0, 100)).toBe(true);
    expect(isPriceInRange(100, 0, 100)).toBe(true);
  });

  it("should return true when the price is in the range", () => {
    expect(isPriceInRange(50, 0, 100)).toBe(true);
  });
});

describe("isValidUsername test cases", () => {
  it("should return true if the username is valid", () => {
    expect(isValidUsername("diegocuehdz")).toBe(true);
  });

  it("should return true if the username is in the bounds the requirenment values", () => {
    expect(isValidUsername("diego")).toBe(true);
    expect(isValidUsername("D".repeat(15))).toBe(true);
  });

  it("should return false if the username is of an invalid value", () => {
    expect(isValidUsername(null)).toBe(false);
    expect(isValidUsername(undefined)).toBe(false);
    expect(isValidUsername(undefined)).toBe(false);
    expect(isValidUsername(1)).toBe(false);
    expect(isValidUsername([])).toBe(false);
  });

  it("should return false if the username is outside the requirenment values", () => {
    expect(isValidUsername("dieg")).toBe(false);
    expect(isValidUsername("diego-cue-hernandez-")).toBe(false);
  });
});

describe("canDrive test cases", () => {
  it("should return true if the age is valid for the given country", () => {
    expect(canDrive(17, "UK")).toBe(true);
    expect(canDrive(16, "US")).toBe(true);
  });

  it("should return false if the age is invalid for the given country", () => {
    expect(canDrive(14, "UK")).toBe(false);
    expect(canDrive(15, "US")).toBe(false);
  });

  it("should return false if the country code is invalid", () => {
    expect(canDrive(17, "invalid")).toMatch(/invalid/i);
  });

  it("should return false if the age is invalid", () => {
    expect(canDrive(null, "UK")).toMatch(/invalid/i);
  });
});

describe("fetchData rest cases", () => {
  it("should return a promise that will resolve an array of number", async () => {
    const result = await fetchData(true);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("should return a promise that will reject ", async () => {
    try {
      const result = await fetchData(false);
    } catch (error) {
      expect(error).toHaveProperty("reason");
      expect(error.reason).toMatch(/failed/i);
    }
  });
});

describe("Stack test cases", () => {
  it("should add an item to the stack", () => {
    const stack = new Stack();

    stack.push(1);

    expect(stack.items).toEqual([1]);
  });

  it("should remove and return the top item from the stack", () => {
    const stack = new Stack();
    stack.push(1);
    stack.push(2);

    const poppedItem = stack.pop();

    expect(poppedItem).toBe(2);
    expect(stack.items).toEqual([1]);
  });

  it("should throw an error if the stack is empty", () => {
    const stack = new Stack();

    expect(() => {
      stack.pop();
    }).toThrow(/empty/i);
  });
});

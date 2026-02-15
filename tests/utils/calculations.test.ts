import { calculateAvailable, getAmountColor } from "../../src/utils/calculations";
import type { Expense, Income, Goal, Month } from "../../src/types";

const JAN_2025: Month = { year: 2025, month: 1 };

describe("calculateAvailable", () => {
  it("returns total income when no goals or expenses", () => {
    const incomes: Income[] = [
      { id: "1", emoji: "💰", amount: 3000, date: "2025-01-01T12:00:00" },
    ];
    expect(calculateAvailable(incomes, [], [], JAN_2025)).toBe(3000);
  });

  it("subtracts goals and expenses from income", () => {
    const incomes: Income[] = [
      { id: "1", emoji: "💰", amount: 3000, date: "2025-01-01T12:00:00" },
    ];
    const goals: Goal[] = [
      { id: "1", name: "Savings", amount: 500, color: "#000" },
    ];
    const expenses: Expense[] = [
      { id: "1", emoji: "🍔", amount: 100, date: "2025-01-15T12:00:00" },
    ];
    expect(calculateAvailable(incomes, goals, expenses, JAN_2025)).toBe(2400);
  });

  it("returns negative when overspent", () => {
    const incomes: Income[] = [
      { id: "1", emoji: "💰", amount: 100, date: "2025-01-01T12:00:00" },
    ];
    const expenses: Expense[] = [
      { id: "1", emoji: "🍔", amount: 200, date: "2025-01-10T12:00:00" },
    ];
    expect(calculateAvailable(incomes, [], expenses, JAN_2025)).toBe(-100);
  });

  it("returns zero with no data", () => {
    expect(calculateAvailable([], [], [], JAN_2025)).toBe(0);
  });

  it("only counts expenses from the specified month", () => {
    const incomes: Income[] = [
      { id: "1", emoji: "💰", amount: 1000, date: "2025-01-01T12:00:00" },
    ];
    const expenses: Expense[] = [
      { id: "1", emoji: "🍔", amount: 100, date: "2025-01-15T12:00:00" },
      { id: "2", emoji: "🚗", amount: 200, date: "2025-02-10T12:00:00" },
    ];
    expect(calculateAvailable(incomes, [], expenses, JAN_2025)).toBe(900);
  });
});

describe("getAmountColor", () => {
  it("returns green when ratio >= 0.5", () => {
    expect(getAmountColor(500, 1000)).toBe("#22C55E");
  });

  it("returns yellow when ratio >= 0.25", () => {
    expect(getAmountColor(250, 1000)).toBe("#EAB308");
  });

  it("returns red when ratio >= 0.1", () => {
    expect(getAmountColor(100, 1000)).toBe("#EF4444");
  });

  it("returns purple when ratio >= 0", () => {
    expect(getAmountColor(50, 1000)).toBe("#A855F7");
  });

  it("returns darkPurple when negative", () => {
    expect(getAmountColor(-100, 1000)).toBe("#7C3AED");
  });

  it("returns green when totalIncome is 0", () => {
    expect(getAmountColor(0, 0)).toBe("#22C55E");
  });
});

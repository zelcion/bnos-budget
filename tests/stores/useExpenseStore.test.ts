import { useExpenseStore } from "../../src/stores/useExpenseStore";

describe("useExpenseStore", () => {
  beforeEach(() => {
    useExpenseStore.setState({
      expenses: [],
      incomes: [],
      goals: [],
      cards: [],
      currentMonth: { year: 2025, month: 1 },
    });
  });

  it("has initial empty state after reset", () => {
    const state = useExpenseStore.getState();
    expect(state.expenses).toEqual([]);
    expect(state.incomes).toEqual([]);
  });

  it("adds an expense", () => {
    const expense = { id: "1", emoji: "🍔", amount: 10, date: "2025-01-01" };
    useExpenseStore.getState().addExpense(expense);
    expect(useExpenseStore.getState().expenses).toHaveLength(1);
    expect(useExpenseStore.getState().expenses[0]).toEqual(expense);
  });

  it("removes an expense", () => {
    const expense = { id: "1", emoji: "🍔", amount: 10, date: "2025-01-01" };
    useExpenseStore.getState().addExpense(expense);
    useExpenseStore.getState().removeExpense("1");
    expect(useExpenseStore.getState().expenses).toHaveLength(0);
  });

  it("updates an expense", () => {
    const expense = { id: "1", emoji: "🍔", amount: 10, date: "2025-01-01" };
    useExpenseStore.getState().addExpense(expense);
    useExpenseStore.getState().updateExpense("1", { amount: 20 });
    expect(useExpenseStore.getState().expenses[0].amount).toBe(20);
  });

  it("adds income", () => {
    const income = { id: "1", emoji: "💰", amount: 3000, date: "2025-01-01" };
    useExpenseStore.getState().addIncome(income);
    expect(useExpenseStore.getState().incomes).toHaveLength(1);
  });

  it("adds a goal", () => {
    const goal = { id: "1", name: "Savings", amount: 500, color: "#000" };
    useExpenseStore.getState().addGoal(goal);
    expect(useExpenseStore.getState().goals).toHaveLength(1);
  });

  it("sets current month", () => {
    useExpenseStore.getState().setCurrentMonth({ year: 2025, month: 6 });
    expect(useExpenseStore.getState().currentMonth).toEqual({
      year: 2025,
      month: 6,
    });
  });

  it("calculates available amount", () => {
    useExpenseStore.getState().addIncome({
      id: "1", emoji: "💰", amount: 3000, date: "2025-01-01",
    });
    useExpenseStore.getState().addGoal({
      id: "1", name: "Savings", amount: 500, color: "#000",
    });
    useExpenseStore.getState().addExpense({
      id: "1", emoji: "🍔", amount: 100, date: "2025-01-01",
    });
    expect(useExpenseStore.getState().getAvailableAmount()).toBe(2400);
  });
});

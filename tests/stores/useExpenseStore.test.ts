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
    const expense = { id: "1", emoji: "🍔", amount: 10, date: "2025-01-01T12:00:00" };
    useExpenseStore.getState().addExpense(expense);
    expect(useExpenseStore.getState().expenses).toHaveLength(1);
    expect(useExpenseStore.getState().expenses[0]).toEqual(expense);
  });

  it("removes an expense", () => {
    const expense = { id: "1", emoji: "🍔", amount: 10, date: "2025-01-01T12:00:00" };
    useExpenseStore.getState().addExpense(expense);
    useExpenseStore.getState().removeExpense("1");
    expect(useExpenseStore.getState().expenses).toHaveLength(0);
  });

  it("updates an expense", () => {
    const expense = { id: "1", emoji: "🍔", amount: 10, date: "2025-01-01T12:00:00" };
    useExpenseStore.getState().addExpense(expense);
    useExpenseStore.getState().updateExpense("1", { amount: 20 });
    expect(useExpenseStore.getState().expenses[0].amount).toBe(20);
  });

  it("adds income", () => {
    const income = { id: "1", emoji: "💰", amount: 3000, date: "2025-01-01T12:00:00" };
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

  it("adds a card", () => {
    const card = { id: "1", name: "Visa", color: "#1E40AF" };
    useExpenseStore.getState().addCard(card);
    expect(useExpenseStore.getState().cards).toHaveLength(1);
    expect(useExpenseStore.getState().cards[0]).toEqual(card);
  });

  it("removes a card", () => {
    const card = { id: "1", name: "Visa", color: "#1E40AF" };
    useExpenseStore.getState().addCard(card);
    useExpenseStore.getState().removeCard("1");
    expect(useExpenseStore.getState().cards).toHaveLength(0);
  });

  it("removes an income", () => {
    const income = { id: "1", emoji: "💰", amount: 3000, date: "2025-01-01T12:00:00" };
    useExpenseStore.getState().addIncome(income);
    useExpenseStore.getState().removeIncome("1");
    expect(useExpenseStore.getState().incomes).toHaveLength(0);
  });

  it("updates an income", () => {
    const income = { id: "1", emoji: "💰", amount: 3000, date: "2025-01-01T12:00:00" };
    useExpenseStore.getState().addIncome(income);
    useExpenseStore.getState().updateIncome("1", { amount: 4000 });
    expect(useExpenseStore.getState().incomes[0].amount).toBe(4000);
  });

  it("removes a goal", () => {
    const goal = { id: "1", name: "Savings", amount: 500, color: "#000" };
    useExpenseStore.getState().addGoal(goal);
    useExpenseStore.getState().removeGoal("1");
    expect(useExpenseStore.getState().goals).toHaveLength(0);
  });

  it("updates a goal", () => {
    const goal = { id: "1", name: "Savings", amount: 500, color: "#000" };
    useExpenseStore.getState().addGoal(goal);
    useExpenseStore.getState().updateGoal("1", { amount: 800, name: "Big Savings" });
    const updated = useExpenseStore.getState().goals[0];
    expect(updated.amount).toBe(800);
    expect(updated.name).toBe("Big Savings");
  });

  it("calculates available amount", () => {
    useExpenseStore.getState().addIncome({
      id: "1", emoji: "💰", amount: 3000, date: "2025-01-01T12:00:00",
    });
    useExpenseStore.getState().addGoal({
      id: "1", name: "Savings", amount: 500, color: "#000",
    });
    useExpenseStore.getState().addExpense({
      id: "1", emoji: "🍔", amount: 100, date: "2025-01-01T12:00:00",
    });
    expect(useExpenseStore.getState().getAvailableAmount()).toBe(2400);
  });
});

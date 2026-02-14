export interface Expense {
  id: string;
  emoji: string;
  amount: number;
  date: string;
  cardId?: string;
  isPlanned?: boolean;
}

export interface Income {
  id: string;
  emoji: string;
  amount: number;
  date: string;
  isRecurring?: boolean;
}

export interface Goal {
  id: string;
  name: string;
  amount: number;
  color: string;
}

export interface Card {
  id: string;
  name: string;
  color: string;
}

export interface Month {
  year: number;
  month: number;
}

import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const filteredIncome = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const filteredOutcome = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const income = filteredIncome.reduce((total, current) => {
      return total + current.value;
    }, 0);

    const outcome = filteredOutcome.reduce((total, current) => {
      return total + current.value;
    }, 0);

    const total = income - outcome;

    return {
      total,
      income,
      outcome,
    };
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = {
      id: uuid(),
      type,
      title,
      value,
    };

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

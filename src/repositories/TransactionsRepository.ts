import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
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
    const defaultBalance: Balance = { income: 0, outcome: 0, total: 0 };
    return this.transactions.reduce((total, current) => {
      if (current.type === 'income') {
        return {
          income: total.income + current.value,
          outcome: total.outcome,
          total: total.income + current.value,
        };
      }

      return {
        income: total.income,
        outcome: total.outcome + current.value,
        total: total.income - current.value,
      };
    }, defaultBalance);
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

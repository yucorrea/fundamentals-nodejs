import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type === 'outcome') {
      const { total } = this.transactionsRepository.getBalance();

      if (total < value) {
        throw new Error('Opss!! Insufficient balance ');
      }
    }
    const transction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transction;
  }
}

export default CreateTransactionService;

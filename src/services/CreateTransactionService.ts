import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface ReactTransDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: ReactTransDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();
    if (type !== 'income') {
      if (type !== 'outcome') {
        throw new Error('Ivalid type');
      }
    }
    if (type === 'outcome' && balance.total < value) {
      throw new Error('Insufficient funds');
    }
    const transection = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transection;
  }
}

export default CreateTransactionService;

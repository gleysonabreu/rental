import { v4 as uuid } from 'uuid';

class Rental {
  id: string;
  carId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  expectedReturnDate: Date;
  total: number;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Rental };

import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('cars_image')
class CarImage {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'car_id' })
  carId: string;

  @Column({ name: 'image_name' })
  imageName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { CarImage };

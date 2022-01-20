import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'homes' })
export class HomeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;
}

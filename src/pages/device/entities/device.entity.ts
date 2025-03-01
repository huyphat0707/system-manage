import { Location } from 'src/pages/location/entities/location.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @ManyToOne(() => Location, (location) => location.devices, {
    onDelete: 'CASCADE',
  })
  location: Location;
}

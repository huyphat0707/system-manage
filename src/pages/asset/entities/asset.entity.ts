import { Location } from 'src/pages/location/entities/location.entity';
import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';

@Entity('assets')
export class Asset {
  @PrimaryColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  serial: string;

  @Column()
  status: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Location, (location) => location.assets)
  location: Location;
}

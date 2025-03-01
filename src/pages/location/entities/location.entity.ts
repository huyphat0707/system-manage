import { Asset } from 'src/pages/asset/entities/asset.entity';
import { Device } from 'src/pages/device/entities/device.entity';
import { Organization } from 'src/pages/organization/entities/organization.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Organization, (organization) => organization.locations)
  organization: Organization;

  @OneToMany(() => Device, (device) => device.location)
  devices: Device[];

  @OneToMany(() => Asset, (asset) => asset.location)
  assets: Asset[];

  @Column({ default: 'active' })
  status: string;
}

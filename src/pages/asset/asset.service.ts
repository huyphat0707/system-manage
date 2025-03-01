import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Asset } from './entities/asset.entity';
import { Location } from '../location/entities/location.entity';
import { AssetDto } from './dto/get-asset.dto';

@Injectable()
export class AssetService {
  private readonly apiUrl =
    'https://669ce22d15704bb0e304842d.mockapi.io/assets';

  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Asset) private assetRepo: Repository<Asset>,
    @InjectRepository(Location) private locationRepo: Repository<Location>,
  ) {}

  async fetchAssets(): Promise<AssetDto[]> {
    try {
      const response = await axios.get<AssetDto[]>(this.apiUrl);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch assets: ${(error as Error).message}`);
    }
  }

  async saveAsset(asset: AssetDto): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const location = await this.locationRepo.findOne({
        where: { id: asset.location_id },
      });
      if (!location) {
        await queryRunner.rollbackTransaction();
        return;
      }

      const createdAt = new Date(asset.created_at * 1000);
      if (createdAt > new Date()) {
        await queryRunner.rollbackTransaction();
        return;
      }

      if (asset.status !== 'actived') {
        await queryRunner.rollbackTransaction();
        return;
      }

      let existingAsset = await this.assetRepo.findOne({
        where: { id: Number(asset.id) },
      });
      if (!existingAsset) {
        existingAsset = this.assetRepo.create({
          id: Number(asset.id),
          type: asset.type,
          serial: asset.serial,
          status: asset.status,
          description: asset.description,
          createdAt,
          updatedAt: new Date(asset.updated_at * 1000),
          location,
        });
        await this.assetRepo.save(existingAsset);
      } else {
        await this.assetRepo.update(existingAsset.id, {
          status: asset.status,
          updatedAt: new Date(asset.updated_at * 1000),
        });
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(`Error saving asset: ${(error as Error).message}`);
    } finally {
      await queryRunner.release();
    }
  }
}

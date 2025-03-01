import { Injectable } from '@nestjs/common';
import { AssetService } from '../asset/asset.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SyncAssetsCron {
  constructor(private readonly assetService: AssetService) {}

  @Cron('0 0 * * *')
  async syncAssets() {
    console.log('Starting asset synchronization...');
    const assets = await this.assetService.fetchAssets();
    try {
      for (const asset of assets) {
        await this.assetService.saveAsset(asset);
      }
      console.log('🚀 Đồng bộ tài sản thành công!');
    } catch (error) {
      console.error('❌ Lỗi khi đồng bộ tài sản:', error);
    }
  }
}

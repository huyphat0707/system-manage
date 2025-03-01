import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetService } from './pages/asset/asset.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { ConfigModule } from '@nestjs/config';
import { Asset } from './pages/asset/entities/asset.entity';
import { Location } from './pages/location/entities/location.entity';
import { SyncAssetsCron } from './pages/cron/sync-assets.cron';

@Module({
  controllers: [AppController],
  providers: [AppService, AssetService, SyncAssetsCron],
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([Asset, Location]),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
})
export class AppModule {}

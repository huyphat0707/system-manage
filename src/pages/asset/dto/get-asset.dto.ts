/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, IsString, IsNumber } from 'class-validator';

export class AssetDto {
  @IsString()
  id: string;

  @IsString()
  type: string;

  @IsString()
  serial: string;

  @IsString()
  status: string;

  @IsString()
  description: string;

  @IsNumber()
  created_at: number;

  @IsNumber()
  updated_at: number;

  @IsInt()
  location_id: number;
}

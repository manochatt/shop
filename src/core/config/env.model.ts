import { IsEnum } from 'class-validator';

export enum Environment {
  DEVELOPMENT = 'development',
  LOCAL = 'local',
}

export class AppEnv {
  @IsEnum(Environment)
  NODE_ENV: Environment;
}

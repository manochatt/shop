import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import * as Model from './env.model';

declare global {
  // eslint-disable-next-line no-var
  var Environment: typeof Model.Environment;
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv extends Model.AppEnv {}
  }
}

global.Environment = Model.Environment;

export const environmentConfiguration: ConfigModuleOptions = {
  envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
  expandVariables: true,
  isGlobal: true,
  validate: (plain) => {
    const config = plainToClass(Model.AppEnv, plain, { enableImplicitConversion: true });
    const errors = validateSync(config, { skipMissingProperties: false });
    if (errors.length > 0) throw new Error(errors.toString());

    return config;
  },
  validationOptions: { abortEarly: true },
};

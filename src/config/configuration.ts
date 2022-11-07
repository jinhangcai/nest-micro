import * as path from 'path';
import * as fs from 'fs';
import { parse } from 'yaml';

// 获取项目运行环境
export const getEnv = () => {
  return process.env.APP_ENV;
};
export const IS_DEV = getEnv() === 'sit';

export default () => {
  const APP_ENV = getEnv();
  console.log('APP_ENV', APP_ENV)
  let apiHost = 'xxx';

  if (APP_ENV === 'sit' || APP_ENV === 'atest') {
    apiHost = 'xxxx';
  }

  const yamlPath = path.join(process.cwd(), `./application.${getEnv()}.yml`);
  const file = fs.readFileSync(yamlPath, 'utf8');
  const config = parse(file);
  return {
    APP_ENV,
    apiHost,
    config
  };
};

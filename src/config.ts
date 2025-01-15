import { join } from 'path';

console.info('process.env.NODE_ENV: ', process.env.NODE_ENV);

export const FileUrlPrefix = '/static';

export const FileFolderPath = join(__dirname, '../.files');

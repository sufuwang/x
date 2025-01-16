import dayjs from 'dayjs';
import { readdir, chmod, rm } from 'fs/promises';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import archiver from 'archiver';

export const makeFolder = (path) => {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
};

export const copyFolder = async (source, destination) => {
  try {
    const output = createWriteStream(destination);
    const archive = archiver('zip', { zlib: { level: 9 } });
    output.on('close', function () {
      console.log(`${destination} 占用 ${archive.pointer()} bytes`);
    });
    archive.on('error', function (err) {
      throw err;
    });
    archive.pipe(output);
    archive.directory(source, false);
    archive.finalize();
  } catch (err) {
    console.error(err);
  }
};

export const deleteLastFileOfFolder = async (
  directoryPath: string,
  query = { maxLength: 20 },
) => {
  try {
    await chmod(directoryPath, 0o777);
    const fileNames = (await readdir(directoryPath)).sort((a, b) => {
      const [prev] = a.split('.');
      const [cur] = b.split('.');
      return dayjs(prev).unix() - dayjs(cur).unix();
    });
    if (fileNames.length > query.maxLength) {
      await Promise.all(
        fileNames
          .slice(0, fileNames.length - query.maxLength)
          .map((path) =>
            rm(`${directoryPath}/${path}`, { recursive: true, force: true }),
          ),
      );
    }
  } catch (err) {
    console.error(err);
  }
};

import fs from 'fs/promises';

export async function writeToFile(txtFilePath, jsonData) {
  await fs.writeFile(txtFilePath, jsonData, { flag: 'a' });
}

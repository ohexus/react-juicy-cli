import fs from 'fs';

export default function makeDir(dir: string): void {
  if (dir !== '.') {
    fs.mkdirSync(dir, { recursive: true });
  }
}

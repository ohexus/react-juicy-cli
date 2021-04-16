import fs from 'fs';

export default function makeDir(name: string): void {
  fs.mkdirSync(name, { recursive: true });
}

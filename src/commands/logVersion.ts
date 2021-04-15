/// <reference types="../../types/import-json" />
import { version } from '../../package.json';

function logVersion(): void {
  console.log(version);
}

export default logVersion;

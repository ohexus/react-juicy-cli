function clearTerminal(): void {
  process.stdout.write('\x1b[2J');
  process.stdout.write('\x1b[0f');
}

export default clearTerminal;

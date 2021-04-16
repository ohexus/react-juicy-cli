import CliTable from 'cli-table';

const colWidths = [40, 80];
const style = { 'padding-left': 2, 'padding-right': 2 };
const chars = {
  top: '',
  'top-mid': '',
  'top-left': '',
  'top-right': '',
  bottom: '',
  'bottom-mid': '',
  'bottom-left': '',
  'bottom-right': '',
  left: '',
  'left-mid': '',
  mid: '',
  'mid-mid': '',
  right: '',
  'right-mid': '',
  middle: ' │',
};

export const TableHeader = (): CliTable =>
  new CliTable({
    chars: { ...chars, bottom: '─', 'bottom-mid': '┼' },
    colWidths,
    style,
  });

export const TableBody = (): CliTable =>
  new CliTable({
    chars,
    colWidths,
    style,
  });

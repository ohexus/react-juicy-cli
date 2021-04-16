import { ALTERNATIVE_FLAGS, FLAG_INFO } from '../../constants';
import { blueStr, cyanStr, indigoStr, yellowStr, TableBody, TableHeader } from '../../utils';

const joinFlags = (flags: string[]) => flags.map((flag) => blueStr(flag)).join(cyanStr(', '));

const mainTableHeader = TableHeader();
mainTableHeader.push([cyanStr('flag'), cyanStr('description')]);

const mainTableBody = TableBody();
mainTableBody.push(...FLAG_INFO.map(({ flags, desc }) => [joinFlags(flags), desc]));

const altTableHeader = TableHeader();
altTableHeader.push([cyanStr('flag'), cyanStr('alternatives')]);

const altTableBody = TableBody();
altTableBody.push(...ALTERNATIVE_FLAGS.map(({ flag, alts }) => [blueStr(flag), joinFlags(alts)]));

function logHelp(): void {
  console.log(`
  Usage: ${indigoStr('react-juicy-cli')} [${blueStr('flags')} <${yellowStr('string?')}>]

  Available flags:
  `);

  console.log(mainTableHeader.toString());
  console.log(mainTableBody.toString());

  console.log(`
  Alternative flags:
  `);

  console.log(altTableHeader.toString());
  console.log(altTableBody.toString());

  console.log(); // empty line at the end
}

export default logHelp;

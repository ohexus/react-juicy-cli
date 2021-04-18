import capitalizeFirstLetter from '../capitalizeFirstLetter';

const addUseWord = (str: string): string => 'use' + capitalizeFirstLetter(str);

export default addUseWord;

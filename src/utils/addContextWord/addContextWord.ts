import capitalizeFirstLetter from '../capitalizeFirstLetter';

const addContextWord = (str: string): string => capitalizeFirstLetter(str) + 'Context';

export default addContextWord;

import parseFile from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  
  console.log('Data from file 1:', data1);
  console.log('Data from file 2:', data2);

  return '123'
};

export default genDiff;
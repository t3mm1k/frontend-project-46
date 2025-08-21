import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = _.sortBy(_.union(keys1, keys2));
  
  const diffLines = allKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    
    if (!_.has(data1, key)) {
      return `  + ${key}: ${value2}`;
    }
    
    if (!_.has(data2, key)) {
      return `  - ${key}: ${value1}`;
    }
    
    if (!_.isEqual(value1, value2)) {
      return `  - ${key}: ${value1}\n  + ${key}: ${value2}`;
    }
    
    return `    ${key}: ${value1}`;
  });
  return `{\n${diffLines.join('\n')}\n}`;
};

export default buildDiff;
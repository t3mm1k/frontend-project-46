import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

describe('genDiff', () => {
  test('should compare flat JSON files', () => {
    const filepath1 = getFixturePath('1.json');
    const filepath2 = getFixturePath('2.json');
    
    const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
    
    const result = genDiff(filepath1, filepath2);
    expect(result).toEqual(expected);
  });

  test('should compare flat YAML files', () => {
    const filepath1 = getFixturePath('1.yml');
    const filepath2 = getFixturePath('2.yml');
    
    const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
    
    const result = genDiff(filepath1, filepath2);
    expect(result).toEqual(expected);
  });

  test('should throw error for unsupported format', () => {
    const filepath1 = getFixturePath('1.txt');
    const filepath2 = getFixturePath('2.txt');
    
    expect(() => genDiff(filepath1, filepath2)).toThrow('Unsupported file format');
  });
});
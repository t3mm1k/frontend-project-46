import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import path from 'node:path'
import genDiff from '../index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => join(__dirname, '..', '__fixtures__', `${path.extname(filename).slice(1).toLowerCase()}`, filename)
const readFixture = filename => readFileSync(getFixturePath(filename), 'utf-8').trim()

describe('genDiff', () => {
  describe('stylish format', () => {
    test('should compare nested JSON files', () => {
      const filepath1 = getFixturePath('nested1.json')
      const filepath2 = getFixturePath('nested2.json')

      const expected = readFixture('expectedNested.txt')
      const result = genDiff(filepath1, filepath2, 'stylish')

      expect(result).toEqual(expected)
    })

    test('should compare nested YAML files', () => {
      const filepath1 = getFixturePath('nested1.yml')
      const filepath2 = getFixturePath('nested2.yml')

      const expected = readFixture('expectedNested.txt')
      const result = genDiff(filepath1, filepath2, 'stylish')

      expect(result).toEqual(expected)
    })
  })

  describe('plain format', () => {
    test('should compare nested JSON files in plain format', () => {
      const filepath1 = getFixturePath('nested1.json')
      const filepath2 = getFixturePath('nested2.json')

      const expected = readFixture('expectedPlain.txt')
      const result = genDiff(filepath1, filepath2, 'plain')

      expect(result).toEqual(expected)
    })

    test('should compare nested YAML files in plain format', () => {
      const filepath1 = getFixturePath('nested1.yml')
      const filepath2 = getFixturePath('nested2.yml')

      const expected = readFixture('expectedPlain.txt')
      const result = genDiff(filepath1, filepath2, 'plain')

      expect(result).toEqual(expected)
    })
  })

  test('should throw error for unknown format', () => {
    const filepath1 = getFixturePath('nested1.json')
    const filepath2 = getFixturePath('nested2.json')

    expect(() => genDiff(filepath1, filepath2, 'unknown')).toThrow('Unknown format: unknown')
  })
})

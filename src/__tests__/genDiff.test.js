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
  })

  describe('plain format', () => {
    test('should compare nested JSON files in plain format', () => {
      const filepath1 = getFixturePath('nested1.json')
      const filepath2 = getFixturePath('nested2.json')

      const expected = readFixture('expectedPlain.txt')
      const result = genDiff(filepath1, filepath2, 'plain')

      expect(result).toEqual(expected)
    })
  })

  describe('json format', () => {
    test('should compare nested JSON files in json format', () => {
      const filepath1 = getFixturePath('nested1.json')
      const filepath2 = getFixturePath('nested2.json')

      const result = genDiff(filepath1, filepath2, 'json')
      const parsedResult = JSON.parse(result)

      expect(parsedResult).toBeInstanceOf(Array)
      expect(parsedResult.length).toBeGreaterThan(0)

      parsedResult.forEach((node) => {
        expect(node).toHaveProperty('key')
        expect(node).toHaveProperty('type')
        expect(['added', 'removed', 'updated', 'unchanged', 'nested']).toContain(node.type)
      })
    })

    test('should produce valid JSON output', () => {
      const filepath1 = getFixturePath('nested1.json')
      const filepath2 = getFixturePath('nested2.json')

      const result = genDiff(filepath1, filepath2, 'json')

      expect(() => JSON.parse(result)).not.toThrow()

      const parsed = JSON.parse(result)
      expect(parsed).toBeInstanceOf(Array)
    })
  })

  test('should throw error for unknown format', () => {
    const filepath1 = getFixturePath('nested1.json')
    const filepath2 = getFixturePath('nested2.json')

    expect(() => genDiff(filepath1, filepath2, 'unknown')).toThrow('Unknown format: unknown')
  })
})

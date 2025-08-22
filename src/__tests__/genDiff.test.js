import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import genDiff from '../index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => join(__dirname, '..', '__fixtures__', filename)
const readFixture = filename => readFileSync(getFixturePath(filename), 'utf-8').trim()

describe('genDiff', () => {
  test('should compare nested JSON files', () => {
    const filepath1 = getFixturePath('nested1.json')
    const filepath2 = getFixturePath('nested2.json')

    const expected = readFixture('expectedNested.txt')
    const result = genDiff(filepath1, filepath2)

    expect(result).toEqual(expected)
  })

  test('should compare nested YAML files', () => {
    const filepath1 = getFixturePath('nested1.yml')
    const filepath2 = getFixturePath('nested2.yml')

    const expected = readFixture('expectedNested.txt')
    const result = genDiff(filepath1, filepath2)

    expect(result).toEqual(expected)
  })
})

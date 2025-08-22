import parseFile from './parsers.js'
import buildDiff from './diffBuilder.js'
import getFormatter from './formatters/index.js'

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)
  const diff = buildDiff(data1, data2)

  const formatter = getFormatter(formatName)
  return formatter(diff)
}

export default genDiff

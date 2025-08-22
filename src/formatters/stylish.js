const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value)
  }

  const indent = ' '.repeat(depth * 4)
  const bracketIndent = ' '.repeat((depth - 1) * 4)

  const lines = Object.entries(value).map(([key, val]) => {
    const formattedValue = stringify(val, depth + 1)
    return `${indent}${key}: ${formattedValue}`
  })

  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

const formatStylish = (diff, depth = 1) => {
  const indent = ' '.repeat(depth * 4 - 2)
  const bracketIndent = ' '.repeat((depth - 1) * 4)

  const lines = diff.map((node) => {
    const formatValue = value => stringify(value, depth + 1)

    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${formatValue(node.value)}`
      case 'removed':
        return `${indent}- ${node.key}: ${formatValue(node.value)}`
      case 'updated':
        return [
          `${indent}- ${node.key}: ${formatValue(node.value1)}`,
          `${indent}+ ${node.key}: ${formatValue(node.value2)}`,
        ].join('\n')
      case 'unchanged':
        return `${indent}  ${node.key}: ${formatValue(node.value)}`
      case 'nested':
        return `${indent}  ${node.key}: ${formatStylish(node.children, depth + 1)}`
      default:
        throw new Error(`Unknown node type: ${node.type}`)
    }
  })

  return `{\n${lines.join('\n')}\n${bracketIndent}}`
}

export default formatStylish

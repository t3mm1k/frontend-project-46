const stringify = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`
  }
  if (typeof value === 'object' && value !== null) {
    return '[complex value]'
  }
  return String(value)
}

const buildPath = (path, key) => (path ? `${path}.${key}` : key)

const formatPlain = (diff, path = '') => {
  const lines = diff
    .filter(node => node.type !== 'unchanged')
    .map((node) => {
      const currentPath = buildPath(path, node.key)

      switch (node.type) {
        case 'added':
          return `Property '${currentPath}' was added with value: ${stringify(node.value)}`
        case 'removed':
          return `Property '${currentPath}' was removed`
        case 'updated':
          return `Property '${currentPath}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`
        case 'nested':
          return formatPlain(node.children, currentPath)
        default:
          throw new Error(`Unknown node type: ${node.type}`)
      }
    })

  return lines.join('\n')
}

export default formatPlain

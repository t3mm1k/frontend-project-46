import _ from 'lodash'

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)))

  return keys.map((key) => {
    const value1 = data1[key]
    const value2 = data2[key]

    if (!_.has(data1, key)) {
      return { key, value: value2, type: 'added' }
    }

    if (!_.has(data2, key)) {
      return { key, value: value1, type: 'removed' }
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, children: buildDiff(value1, value2), type: 'nested' }
    }

    if (!_.isEqual(value1, value2)) {
      return { key, value1, value2, type: 'updated' }
    }

    return { key, value: value1, type: 'unchanged' }
  })
}

export default buildDiff

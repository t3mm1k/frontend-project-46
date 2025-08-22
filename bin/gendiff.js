#!/usr/bin/env node

import { createRequire } from 'node:module'
import { Command } from 'commander'
import genDiff from '../src/index.js'

const require = createRequire(import.meta.url)
const { version } = require('../package.json')

const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .version(version, '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .action((filepath1, filepath2, options) => {
    const diff = genDiff(filepath1, filepath2, options.format)
    console.log(diff)
  })

program.parse()

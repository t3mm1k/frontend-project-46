#!/usr/bin/env node

import { createRequire } from 'node:module'
import { Command } from 'commander'
import genDiff from '../src/index.js';

const require = createRequire(import.meta.url)
const { version } = require('../package.json')

const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .version(version, '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format')
  .helpOption('-h, --help', 'display help for command')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .action(genDiff);

program.parse()

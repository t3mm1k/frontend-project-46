#!/usr/bin/env node

import { createRequire } from 'node:module'
import { Command } from 'commander'

const require = createRequire(import.meta.url)
const { version } = require('../package.json')

const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .version(version, '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'display help for command')

program.parse()

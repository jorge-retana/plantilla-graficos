import commander from 'commander'
import inquirer from 'inquirer'

import { createComponent, getSubfolders } from './createComponent.js'

const VALID_DIRS = ['common', 'containers', 'pages', 'router']

const promptOptions = [
  {
    type: 'input',
    name: 'name',
    message: 'Name of the component:',
  },
  {
    type: 'list',
    name: 'folder',
    message: 'Choose a folder:',
    default: 0,
    loop: false,
    choices: VALID_DIRS,
  },
  {
    type: 'list',
    name: 'subfolders',
    message: 'Within another component?',
    default: '',
    loop: false,
    choices: ({ folder }) => ['', ...getSubfolders(folder)],
  },
  {
    type: 'confirm',
    name: 'children',
    message: 'Needs children?',
    default: true,
  },
  {
    type: 'confirm',
    name: 'useState',
    message: 'Needs useState?',
    default: true,
  },
  {
    type: 'confirm',
    name: 'hasProps',
    message: 'Needs props?',
    default: true,
  },
]

const receiver = () =>
  inquirer
    .prompt(promptOptions)
    .then(({ name, folder, subfolders, children, useState, hasProps }) =>
      createComponent(name, [folder, subfolders], { children, useState, hasProps }),
    )

commander.version('1.0.0').action(receiver).parse()

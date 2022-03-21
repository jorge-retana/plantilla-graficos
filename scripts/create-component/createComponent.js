import fs from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

import { index, component, styles, tests } from './templates.js'

const COMPONENT_DIR = fileURLToPath(
  new URL('../../src/presentation/components/', import.meta.url),
)

export const createComponent = (name, folders, options) => {
  if (!name) throw new Error('Component name is required')

  if (name[0] !== name[0].toUpperCase())
    throw Error('component name should be PascalCase')

  const dir = resolve(COMPONENT_DIR, ...folders, name)

  if (fs.existsSync(dir)) throw Error(`${name} folder already exists`)

  fs.mkdirSync(dir, { recursive: true })

  fs.writeFileSync(resolve(dir, 'index.ts'), index(name))
  fs.writeFileSync(resolve(dir, `${name}.tsx`), component(name, options))
  fs.writeFileSync(resolve(dir, `${name}.module.css`), styles())
  fs.writeFileSync(resolve(dir, `${name}.test.tsx`), tests(name))
}

export const getSubfolders = folder =>
  fs
    .readdirSync(resolve(COMPONENT_DIR, folder), {
      withFileTypes: true,
    })
    .filter(item => item.isDirectory())
    .map(directory => directory.name)

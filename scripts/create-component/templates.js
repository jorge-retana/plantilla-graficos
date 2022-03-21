export const index = name => `export { default } from './${name}'\n`

export const component = (name, { children, hasProps, useState }) => {
  const imports = (() => {
    if (!children && !useState) return ''
    const imports = []
    if (children) imports.push('ReactNode')
    if (useState) imports.push('useState')
    return `import { ${imports.join(', ')} } from 'react'\n\n`
  })()

  const props = (() => {
    if (!children && !hasProps) return ''
    return `type Props = {\n  ${children ? 'children: ReactNode\n' : ''}\n}\n\n`
  })()

  const args = (() => {
    if (!children && !hasProps) return ''
    const args = []
    if (children) args.push('children')
    if (hasProps) args.push('')
    return `{ ${args.join(', ')} }: Props`
  })()

  const jsx = (() => {
    if (!children && !hasProps && !useState)
      return `(\n  <div className={styles.container}>\n    \n  </div>\n)\n\n`
    return `{\n  return (\n    <div className={styles.container}>\n      ${
      children ? '{children}' : ''
    }\n    </div>\n  )\n}\n\n`
  })()

  const styles = `import styles from './${name}.module.css'\n\n`

  const fc = `const ${name} = (${args}) => ${jsx}export default ${name}\n`

  return `${imports}${styles}${props}${fc}`
}

export const styles = () => `.container {

}\n`

export const tests = name => `import { render, screen } from '@testing-library/react'

import ${name} from './${name}'

describe('${name}', () => {
  it('should render', () => {
    render(<${name}>This is a test</${name}>)
    screen.getByText(/this is a test/i)
  })
})\n`

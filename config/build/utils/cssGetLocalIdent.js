import path from 'path'

const cssGetLocalIdent = (context, _, localName) => {
  const file = path.parse(context.resourcePath)
  const name = file.name.replace('.module', '')
  const folder = file.dir
    .split(path.sep)
    .reverse()
    .find(folder => folder !== name)
  return `${folder}-${name}__${localName}`
}

export default cssGetLocalIdent

const fsp = require('node:fs/promises');
const path = require('node:path');
const toRemove = [
  "HOSTNAME",
  "YARN_VERSION",
  "PWD",
  "HOME",
  "LS_COLORSTERM",
  "SHLVL",
  "PATH",
  "NODE_VERSION",
  "TERM",
  "LS_COLORS",
  "_",
  "EDITOR",
  "INIT_CWD",
  "COLOR",
  "NODE"
]

const envEntries = Object.entries(process.env)

const filteredEnvs = envEntries.filter(env => !toRemove.includes(env[0]) && !env[0].startsWith('npm_'))
/**
 *
 * @param {[String,String][]} envEntries
 */
const createfileContent = async (envEntries) => {
  const top = 'export const environment = {\n'
  const bottom = '\n};'
  const environment = envEntries.map(el => `  ${el[0]}: "${el[1]}",`).join('\n')
  await fsp.writeFile(path.join(__dirname, 'src', 'environments', 'environment.ts'), top + environment + bottom)
}

createfileContent(filteredEnvs)

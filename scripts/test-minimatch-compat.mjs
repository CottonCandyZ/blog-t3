import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
import test from 'node:test'
import { FlatCompat } from '@eslint/eslintrc'
import { ESLint } from 'eslint'

const require = createRequire(import.meta.url)
const eslintRequire = createRequire(require.resolve('eslint'))
const minimatch = eslintRequire('minimatch')

test('legacy callable and modern named exports match file patterns', async () => {
  const esmPath = eslintRequire.resolve('minimatch').replace('/commonjs/', '/esm/')
  const esm = await import(pathToFileURL(esmPath).href)
  for (const match of [minimatch, minimatch.minimatch, esm.default, esm.minimatch]) {
    assert.equal(match('src/page.tsx', 'src/**/*.{ts,tsx}'), true)
    assert.equal(match('src/page.js', 'src/**/*.{ts,tsx}'), false)
    assert.equal(new match.Minimatch('**/*.tsx').match('src/page.tsx'), true)
  }
})

test('legacy ESLint overrides still select the intended files', async () => {
  const compat = new FlatCompat({ baseDirectory: process.cwd() })
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: compat.config({
      overrides: [{ files: ['**/*.js'], rules: { 'no-debugger': 'error' } }],
    }),
  })
  const [result] = await eslint.lintText('debugger;', { filePath: 'fixture.js' })
  assert.ok(result)
  assert.equal(result.errorCount, 1)
  assert.equal(result.messages[0]?.ruleId, 'no-debugger')
})

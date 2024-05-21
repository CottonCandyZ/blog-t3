import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import dayjs from 'dayjs'

// npm run new:post filename title [tag1] [tag2] ...
async function createPost() {
  const [, , filename, title, ...tags] = process.argv

  await fs.writeFile(
    path.join(process.cwd(), `./posts/${dayjs().format('YYYY-MM-DD')}-${filename}.mdx`),
    `---
title: '${title}'
date: '${new Date().toISOString()}'
tags:${tags.map(tag => `\n  - '${tag}'`).join('')}
---
`,
  )
}

await createPost()

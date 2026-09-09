import { readdir, mkdir, mkdtemp, cp, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
await mkdir(dist, { recursive: true });
const staging = await mkdtemp(path.join(dist, 'stage-'));
const archive = path.join(dist, '10x-creative-strategist-cursor-plugin.zip');
const components = ['.cursor-plugin', 'mcp.json', 'assets', 'rules', 'commands', 'skills', 'catalog.json', 'SOURCE-MAP.json', 'README.md', 'CURSOR-REVIEW.md', 'scripts', 'package.json', '.gitignore'];
try {
  for (const name of components) await cp(path.join(root, name), path.join(staging, name), { recursive: true, errorOnExist: true });
  const checked = spawnSync(process.execPath, [path.join(root, 'scripts/validate-plugin.mjs'), staging], { stdio: 'inherit' });
  if (checked.status !== 0) throw new Error('Staged plugin failed validation');
  await rm(archive, { force: true });
  const zipped = spawnSync('zip', ['-q', '-r', archive, ...await readdir(staging)], { cwd: staging, stdio: 'inherit' });
  if (zipped.status !== 0) throw new Error('Packaging failed; the zip utility is required');
  console.log(`Packaged ${archive}`);
} finally {
  await rm(staging, { recursive: true, force: true });
}

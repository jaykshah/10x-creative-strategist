import assert from 'node:assert/strict';
import { readFile, readdir, lstat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(process.argv[2] ?? repo);
const json = async name => JSON.parse(await readFile(path.join(root, name), 'utf8'));
const manifest = await json('.cursor-plugin/plugin.json');
assert.equal(manifest.name, '10x-creative-strategist');
assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
for (const key of ['displayName', 'description']) assert.ok(manifest[key]?.trim(), key);
assert.ok(manifest.author.name);
assert.equal(manifest.mcpServers, 'mcp.json');
const safe = value => typeof value === 'string' && !path.isAbsolute(value) && !value.split(/[\\/]/).includes('..');
assert.ok(safe(manifest.logo));
await lstat(path.join(root, manifest.logo));
assert.equal(manifest.repository, 'https://github.com/jaykshah/10x-creative-strategist');
const mcp = await json('mcp.json');
assert.deepEqual(mcp, { mcpServers: { 'creative-os': { url: 'https://skill.10xproductivity.co/mcp' } } });
const catalog = await json('catalog.json');
const names = [...catalog.tools.map(t => t.mcpToolName), ...catalog.supportingToolNames];
assert.equal(new Set(names).size, names.length, 'Duplicate tool inventory');
for (const name of names) assert.match(name, /^creative_os_[a-z0-9_]+$/);
assert.ok(catalog.skills.every(skill => skill.hostedActive === true), 'Disabled skill in plugin');
const knownSkills = new Set(catalog.skills.map(s => s.name));
let skillCount = 0;
let commandCount = 0;
let ruleCount = 0;
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (dir === root && ['.git', 'dist'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    assert.ok(!entry.isSymbolicLink(), `Nonportable symlink: ${full}`);
    assert.ok(!['.env', '.git', 'node_modules', '__pycache__', '.DS_Store'].includes(entry.name), `Unexpected bundle file: ${full}`);
    if (entry.isDirectory()) { await walk(full); continue; }
    assert.ok(!/\.(pyc|pem|key)$/.test(entry.name));
    if (!/\.(md|mdc)$/.test(entry.name)) continue;
    const text = await readFile(full, 'utf8');
    const relative = path.relative(root, full);
    const isSkill = entry.name === 'SKILL.md';
    const isCommand = relative.startsWith('commands/');
    const isRule = relative.startsWith('rules/');
    if (isSkill || isCommand || isRule) {
      const front = text.match(/^---\n([\s\S]+?)\n---(?:\n|$)/)?.[1];
      assert.ok(front, `Missing frontmatter: ${relative}`);
      assert.match(front, /^description: .+/m, relative);
      if (!isRule) {
        const name = front.match(/^name: ([a-z0-9-]+)$/m)?.[1];
        assert.ok(name, `Invalid name: ${relative}`);
        assert.equal(name, isSkill ? path.basename(path.dirname(full)) : path.basename(full, '.md'));
        if (isSkill) { assert.ok(name === manifest.name || knownSkills.has(name)); skillCount++; }
        else commandCount++;
      } else ruleCount++;
      assert.ok(!/\[TODO:|plugins@example\.com|Your Org/.test(text), relative);
    }
    assert.ok(!/\/Users\/|\/home\/[^\s]+|`\$[a-z][a-z-]+`/.test(text), `Host-specific path or invocation: ${relative}`);
    for (const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const target = match[1].split('#')[0];
      if (!target || /^[a-z]+:/.test(target)) continue;
      const resolved = path.resolve(path.dirname(full), target);
      assert.ok(resolved.startsWith(root + path.sep), `Link escapes plugin: ${relative} -> ${target}`);
      await lstat(resolved).catch(() => { throw new Error(`Broken link: ${relative} -> ${target}`); });
    }
  }
}
await walk(root);
assert.equal(skillCount, knownSkills.size + 1);
assert.equal(commandCount, 3);
assert.equal(ruleCount, 2);
console.log(`Cursor plugin valid: ${skillCount} skills, ${commandCount} commands, ${ruleCount} rules, ${names.length} tool entries.`);

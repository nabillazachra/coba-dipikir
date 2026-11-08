import {existsSync, mkdirSync, readFileSync, readdirSync} from 'node:fs';
import {basename, dirname, join} from 'node:path';
import {spawnSync} from 'node:child_process';

const projectsRoot = 'src/projects';
const requestedProject = process.argv.find((arg) => arg.startsWith('--project='))
  ?.split('=')[1];

const projectDirs = readdirSync(projectsRoot, {withFileTypes: true})
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => !requestedProject || name === requestedProject);

const readString = (source, key, fallback = '') => {
  const match = source.match(new RegExp(`${key}\\s*:\\s*'([^']*)'`));
  return match?.[1] ?? fallback;
};

const readScenes = (source) => {
  const scenesBlock = source.match(/scenes\s*:\s*\[([\s\S]*?)\]\s*,?\s*\}\s*as const/)?.[1] ?? '';
  const matches = [...scenesBlock.matchAll(/\{\s*id:\s*'([^']+)'\s*,\s*text:\s*'([^']+)'\s*,?\s*\}/g)];
  return matches.map((match) => ({id: match[1], text: match[2]}));
};

let generated = 0;

for (const projectDir of projectDirs) {
  const configPath = join(projectsRoot, projectDir, 'voiceover.config.ts');
  if (!existsSync(configPath)) continue;

  const source = readFileSync(configPath, 'utf8');
  const voice = readString(source, 'voice', 'id-ID-ArdiNeural');
  const rate = readString(source, 'rate', '+5%');
  const pitch = readString(source, 'pitch', '+0Hz');
  const volume = readString(source, 'volume', '+0%');
  const scenes = readScenes(source);

  if (!scenes.length) {
    throw new Error(`No voiceover scenes found in ${configPath}`);
  }

  const outputDir = join('public', 'audio', projectDir, 'voiceover');
  mkdirSync(outputDir, {recursive: true});

  console.log(`Generating ${projectDir}: ${scenes.length} scenes with ${voice}`);

  for (const scene of scenes) {
    const output = join(outputDir, `${scene.id}.mp3`);
    const result = spawnSync(
      'edge-tts',
      [
        '--voice', voice,
        `--rate=${rate}`,
        `--pitch=${pitch}`,
        `--volume=${volume}`,
        '--text', scene.text,
        '--write-media', output,
      ],
      {stdio: 'inherit'},
    );

    if (result.status !== 0) {
      throw new Error(`edge-tts failed for ${projectDir}/${scene.id}`);
    }

    generated += 1;
  }
}

if (generated === 0) {
  throw new Error('No voiceover files were generated.');
}

console.log(`Generated ${generated} voiceover file(s).`);

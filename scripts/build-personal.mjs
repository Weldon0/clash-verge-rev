import { spawnSync } from 'node:child_process'

const result = spawnSync(
  process.execPath,
  [
    'node_modules/@tauri-apps/cli/tauri.js',
    'build',
    '--config',
    'src-tauri/tauri.personal.conf.json',
    ...process.argv.slice(2),
  ],
  {
    stdio: 'inherit',
    env: {
      ...process.env,
      VITE_PERSONAL_BUILD: 'true',
      VERGE_PERSONAL_APP_ID: 'io.github.weldon0.clash-verge-personal',
      npm_config_manage_package_manager_versions: 'false',
    },
  },
)

if (result.error) throw result.error
process.exit(result.status ?? 1)

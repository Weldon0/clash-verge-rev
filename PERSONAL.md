# Clash Verge Personal

Personal UI fork for Weldon0, based on Clash Verge Rev 2.5.9.

The second interface uses neutral grey surfaces, a warm orange accent, custom
line navigation icons, a grouped settings page, and an overview with live traffic
metrics. The current node opens a searchable dropdown with measured latencies;
proxy group selection and latency sorting remain available. Light and dark
palettes, keyboard focus, and reduced-motion preferences are coordinated.

## Build on macOS

Use the Node.js and Rust versions required by upstream, and pnpm 12.11.2.

```sh
pnpm install --frozen-lockfile
pnpm prebuild
pnpm build:personal --bundles app
```

The app is written to `target/release/bundle/macos/Clash Verge Personal.app`.
The personal build uses `io.github.weldon0.clash-verge-personal` as its bundle
identifier and data directory, and does not download official app updates.
Import your subscription into the personal app on first use, or import a local
backup exported by your previous Clash Verge Rev installation using Settings →
Advanced settings → Backup settings → Local backup → Import backup, then select
Restore in backup history and restart the personal app. Backups may include old theme overrides; reset those
colors in Theme settings to use the new defaults. Backup compatibility with the
archived original Clash Verge has not been verified. Existing custom
color settings still take precedence over the new palette.

Quit other proxy clients before enabling the personal app's proxy or TUN mode;
they can compete for the same ports and OS proxy settings. The upstream system
service integration is retained.

This fork retains the upstream GPL-3.0-only license. Upstream source and credits
are in README.md. No upstream pull request is planned for this personal redesign.

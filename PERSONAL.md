# Clash Verge Personal

Personal UI fork for Weldon0, based on Clash Verge Rev 2.5.9.

The interface uses warm neutral backgrounds, a teal accent, quieter navigation,
consistent card borders and spacing, and coordinated light and dark palettes.
Node and subscription selection keeps card geometry stable. Keyboard focus is visible.

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
Import your subscription into the personal app on first use. Existing custom
color settings still take precedence over the new palette.

Quit other proxy clients before enabling the personal app's proxy or TUN mode;
they can compete for the same ports and OS proxy settings. The upstream system
service integration is retained.

This fork retains the upstream GPL-3.0-only license. Upstream source and credits
are in README.md. No upstream pull request is planned for this personal redesign.

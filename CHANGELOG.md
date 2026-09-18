# Changelog

All notable application changes are documented here. BananaBoard uses `0.01` increments for fixes and small improvements, and `0.1` increments for releases that add new functionality.

## [0.1] — 2026-09-18

### Added

- Reminder groups, including custom names, colours, icons, inline creation, and safe ungrouping when a group is deleted.
- Account setup preferences for language and grade system.
- Automatic device-language selection, with the option to choose a language manually in Settings.
- A once-per-version in-app “What’s new” dialog, stored per user after dismissal.

### Changed

- Replaced application, navigation, subject, and Settings emoji with crisp native SVG icons.
- Improved the phone experience with dashboard agenda cards, clear rectangular calendar markers, a vertical Banana health view, and roomier note controls.
- Refreshed app asset cache keys so a deployed update reliably loads the current interface.
- Updated the landing-page content alongside the application.

### Fixed

- Kept local development from upgrading static asset requests to HTTPS, while preserving production transport security.
- Preserved reminder groups, language preferences, and their defaults when importing or loading an existing workspace.

### Verification

- JavaScript syntax checks, TypeScript validation, and the automated test suite pass locally.
- The production container image is published from the `main` branch after this release is pushed.

# Changelog

All notable application changes are documented here. BananaBoard uses `0.01` increments for fixes and small improvements, and `0.1` increments for releases that add new functionality.

## [0.2] — 2026-09-21

### Added

- A switchable calendar week view with timed event placement and completion controls.
- School-day schedules that combine reusable subjects, lesson times, and selected weekdays.
- Expanded native subject-icon choices and clearer grade pickers for numeric, percentage, and letter systems.
- Dedicated fresh, speckled, bruised, and rotten Banana-health illustrations.

### Changed

- Added a language selector to the account screen; an explicit choice becomes a manual preference, otherwise BananaBoard follows the device language.
- Updated legacy workspaces so the default Mathematics subject is displayed as Math and older language settings adopt device-language mode.
- Improved notes for stylus input, homework-photo interactions, localized controls, and development asset cache behavior.
- Added a once-per-version in-app update notice for `0.2` and refreshed app bundle cache keys.

### Verification

- JavaScript syntax checks, TypeScript validation, the automated test suite, and the production build pass locally.

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

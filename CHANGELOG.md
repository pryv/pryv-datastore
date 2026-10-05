# Changelog

## 1.1.0

All changes are additive: a store written against 1.0.0 keeps working.

- `DataStore.supports()`: optional per-feature capability declaration (type `StoreSupports`),
  e.g. which `events.get` content / clientData query conditions the store implements. Stores
  that do not override it support no optional feature.
- `DataStore.getUserStorageInfos(userId)`: report the storage used by a user (type
  `UserStorageInfos`: `totalSizeKb`, `streams`, `events`, `files`).
- Backup / restore methods on `UserStreams` and `UserEvents`: `exportAll(userId)`,
  `importAll(userId, items)`, `clearAll(userId)`. The defaults throw `unsupported-operation`.
- Streams query: the documented parameter name is `excludedIds` (was misspelled `excludeIds`).
- TypeScript definitions (`src/*.d.ts`) regenerated so they include all of the above.
- `examples/rest`: dummy REST server for testing, streamed `events.get` mock.
- The published package now contains only `src`, `test`, `examples`, `docs` and the
  documentation files.

## 1.0.0

First public release.

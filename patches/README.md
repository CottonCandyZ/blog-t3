# minimatch compatibility

All minimatch consumers use the fixed 11.0.4 release. ESLint 9 and its legacy
plugins still expect a callable CommonJS export or an ESM default export.
The patch restores those export shapes without changing matching logic or
security fixes. Modern named exports remain available.

Keep the override pinned to the patched version. Remove the patch once the
ESLint dependency chain no longer needs the legacy exports.

Run `node --test scripts/test-minimatch-compat.mjs`, `pnpm lint`, `pnpm build`,
and `pnpm audit` when updating this dependency.

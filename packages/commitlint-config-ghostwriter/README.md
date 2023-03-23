<h1 align="center">commitlint-config-ghostwriter</h1>

<div align="center">

[![NPM Package Version](https://img.shields.io/npm/v/commitlint-config-ghostwriter)](https://www.npmjs.com/package/commitlint-config-ghostwriter)

</div>

<br />

You want to leverage commitlint to enforce a consistent commit messages that can be parsed to
generate a `CHANGELOG.md` but none of the available presets support your commit types or tools,
e.g., Bitbucket, JIRA, Trello. This preset supports configuration via a `.changelogrc.js` file.

<br />

**This package is best used alongside the other `ghostwriter` tools. Each tool can be configured
using the same `.changelogrc.js` file:**

- [conventional-changelog-ghostwriter](../conventional-changelog-ghostwriter)
- [cz-ghostwriter](../cz-ghostwriter)

<br />

## Installation

<details>
  <summary><strong>npm</strong></summary>
  <br />

```sh
npm install --save-dev commitlint-config-ghostwriter
```

</details>

<br />

<details open>
  <summary><strong>pnpm</strong></summary>
  <br />

```sh
pnpm install --save-dev commitlint-config-ghostwriter
```

</details>

<br />

<details>
  <summary><strong>yarn</strong></summary>
  <br />

```sh
yarn add --dev commitlint-config-ghostwriter
```

</details>

<br />

## Usage

1. Create and configure a `.changelogrc.js` file in the root of your repository
2. Update commitlint to leverage `commitlint-config-ghostwriter`

   ```js
   module.exports = {
     extends: ['ghostwriter'],
   };
   ```

3. Run commitlint

<br />

## Configuration

### `scopes` : _Scope[] | undefined_

---

The array of scopes that are available for selection when commiting. If left `undefined`, then any
scope may be entered when committing.

```ts
type Scope = { description: string; type: string };
```

<br >

### `types` : _Array<HiddenType | VisibleType>_

---

The array of type objects representing the explicitly supported commit message types, and whether
they should show up in generated CHANGELOGs.

```ts
type CommitType = { description: string; type: string };

type HiddenType = CommitType & { hidden: true; section: undefined };

type VisibleType = CommitType & { hidden: undefined; section: string };
```

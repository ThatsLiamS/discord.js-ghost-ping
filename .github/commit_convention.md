# Git Commit Message Convention

This convention is based on the Conventional Commits specification.

Messages must be matched by the following regex:

```js
/^(revert: )?(feat|fix|perf|refactor|test|style|chore|build)(\(.+\))?: .{1,72}/
```

---

## Full Message Format

A commit message consists of a **header**, **body**, and **footer**. The header must include a **type**, **subject** and an optional **scope**:

```text
<type>(<scope>): <subject>

<body>

<footer>
```

### Header

The **header** is mandatory.

#### Type (Mandatory)

The type defines the kind of change being made.

| Type | Description | Changelog Impact |
| --- | --- | --- |
| **feat** | A new feature for the application. | ✅ Yes |
| **fix** | A bug fix. | ✅ Yes |
| **perf** | A code change that improves performance. | ✅ Yes |
| **refactor** | A code change that neither fixes a bug nor adds a feature. | ❌ No |
| **test** | Adding missing tests or correcting existing tests. | ❌ No |
| **style** | Formatting only (whitespace, semi-colons, etc). | ❌ No |
| **chore** | Routine tasks (e.g., updating npm dependencies). | ❌ No |
| **build** | Changes to the build system (npm scripts, Dockerfile). | ❌ No |

#### Subject (Mandatory)

The subject contains a succinct, maximum **72-character** description of the change:

* Use the **imperative, present tense**: "change" not "changed."
* Do not capitalize the first letter.
* Do not add a dot (`.`) at the end.

### Body

The body is optional but strongly recommended for `feat` and `fix` commits.

* Use the **imperative, present tense**: "change" not "changed."
* It should include the motivation for the change and contrast it with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is used to reference GitHub issues that this commit **Closes**.

* **Breaking Changes** must start with the phrase `BREAKING CHANGE:` (with a space or two newlines). The rest of the message describes the breaking change, migration path, and rationale.

**Example:**

```text
BREAKING CHANGE: The /api/v1/generate endpoint no longer accepts the 'size' parameter. Use 'width' and 'height' instead.
```

* **Issue Closing** references should use standard GitHub keywords (e.g., `Closes #123`, `Fixes #456`).

### Revert

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit. In the body, it must say: `This reverts commit <hash>.`

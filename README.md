## jsonresume-theme-lajtha-compact

A compact, single-column [JSON Resume](https://jsonresume.org) theme with a clean, reader-friendly style.

### Usage

- **Install**:

```bash
npm install jsonresume-theme-lajtha-compact
```

- **Render a resume** (example with the CLI):

```bash
resume export out.html --theme jsonresume-theme-lajtha-compact
```

### Release process (published from GitHub Actions)

Releases are automated via the GitHub Actions workflow in `.github/workflows/publish.yml`.

- **One-time setup**
  - **Create an npm automation token** in your npm account.
  - In the GitHub repo, add it as a repository secret named `NPM_TOKEN` under **Settings → Secrets and variables → Actions**.

- **For each new release**
  - Make sure all changes are committed and pushed to `main`.
  - Decide on the new version number, e.g. `1.1.0`.
  - Create a version tag prefixed with `v` and push it:

```bash
git tag v1.1.0
git push origin v1.1.0
```

  - The **`publish`** workflow will:
    - Check out the code
    - Install dependencies
    - Extract `1.1.0` from the `v1.1.0` tag
    - Update `package.json` to that version
    - Run `npm publish` to publish `jsonresume-theme-lajtha-compact` to npm

- **Verifying the release**
  - Check the **Actions** tab on GitHub to ensure the `Publish to npm` workflow completed successfully.
  - Confirm the new version is visible on npm:

```bash
npm view jsonresume-theme-lajtha-compact version
```



# Chakra Error Fallback

![NPM Version](https://img.shields.io/npm/v/@rm-hull/chakra-error-fallback)
![Coveralls](https://img.shields.io/coverallsCoverage/github/rm-hull/chakra-error-fallback)
![NPM Downloads](https://img.shields.io/npm/dm/@rm-hull/chakra-error-fallback)

A type-safe React component for handling errors in Chakra UI applications, providing a fallback UI when something goes wrong.

### Why use this?

- **Graceful Error Handling** - Prevents your application from crashing and provides a user-friendly error message.
- **Customizable** - Easily customize the appearance of the error fallback to match your application's theme.
- **Developer Friendly** - Provides detailed error information in development mode to help with debugging.
- **SSR Compatible** - Works seamlessly with server-side rendering.
- **Expanded Stack Frames** - Stack frames are automatically expanded for better readability. This feature requires `build.sourcemap=true` in your Vite configuration to function correctly.
- **Colorized Stack Traces** - Stack traces are colorized to improve readability and quickly identify different parts of the trace.

## Quick Start

```bash
npm install @rm-hull/chakra-error-fallback
# or
yarn add @rm-hull/chakra-error-fallback
```

## Basic Usage

Wrap your application or a part of it with the `ErrorBoundary` component from `react-error-boundary` and provide the `ErrorFallback` component to the `fallbackRender` prop.

```tsx
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@rm-hull/chakra-error-fallback";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <YourAppComponent />
      </ErrorBoundary>
    </ChakraProvider>
  );
}
```

See the [**Storybook**](https://www.destructuring-bind.org/chakra-error-fallback) for further usage details.

## Contributor Guidelines

### Releasing a New Version

This project uses [**Changesets**](https://github.com/changesets/changesets) to manage versioning and automated npm publishing.

#### How the release process works

1.  **Create a changeset on your feature branch**

    When you’ve made changes you want to release, first create a new branch (not on `main`):

    ```bash
    git checkout -b feature/my-change
    ```

    Make your changes, then run:

    ```bash
    yarn changeset
    ```

    You’ll be prompted to:

    - Choose the type of version bump (patch, minor, or major)
    - Write a short summary of the change

    This command creates a markdown file in the `.changeset/` directory describing your upcoming release.

2.  **Commit and push your feature branch**

    ```bash
    git add .
    git commit -m "feat: A short description of the change"
    git push -u origin feature/my-change
    ```

3.  **Merge the feature branch into `main`**

    - Once your PR is reviewed, merge it into `main`. The `.changeset` file must be present in `main` for the next step.

4.  **Automatic version bump and publish**

    - When changes are pushed to `main`, GitHub Actions will automatically:

      - Build the package
      - Apply version bumps based on the `.changeset` file
      - Update the changelog
      - Publish the new version to npm as [`@rm-hull/chakra-error-fallback`](https://www.npmjs.com/package/@rm-hull/chakra-error-fallback)

5.  **That's it!**
    Your package is now live on npm with an updated version and changelog.

---

#### Notes

- The npm publish step is automated via GitHub Actions (`.github/workflows/ci.yml`).
- Ensure your `NPM_TOKEN` secret is configured in the repository settings under **Settings → Secrets → Actions**.
- Changesets should always be created on feature branches, not directly on `main`.
- No pull requests are created for version bumps; merging your feature branch into `main` triggers the release automatically.

---

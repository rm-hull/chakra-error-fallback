# GEMINI.md

## Project Overview

This is a React component library that provides a user-friendly and informative error fallback component for applications using the Chakra UI library. The primary component, `ErrorFallback`, is designed to be used with React's Error Boundaries to catch and display runtime errors in a clear and helpful way.

The key features include:

*   **Clear Error Display:** Renders a Chakra UI `Alert` component with a customizable title and the error message.
*   **Readable Stack Traces:** Automatically decodes minified/transpiled stack traces using source maps, making it easier to debug issues in production.
*   **Recursive Error Causes:** If an error has a `cause` property, it will be recursively displayed, providing deeper insight into the error chain.
*   **Collapsible Stack Trace:** The stack trace is displayed in a collapsible accordion, keeping the UI clean and focused.

The project is written in TypeScript and uses `vitest` for testing.

## Building and Running

### Key Dependencies

*   **React:** The core library for building the UI.
*   **Chakra UI:** The component library used for styling.
*   **`source-map-js`:** Used for decoding stack traces.
*   **`vitest`:** Used for running tests.
*   **`tsup`:** Used for bundling the library.
*   **`eslint`:** Used for linting.
*   **`changeset`:** Used for versioning and publishing.

### Commands

*   **`yarn dev`**: Starts the Vite development server.
*   **`yarn build`**: Builds the library for production.
*   **`yarn test`**: Runs the test suite.
*   **`yarn test:watch`**: Runs the test suite in watch mode.
*   **`yarn test:coverage`**: Runs the test suite and generates a coverage report.
*   **`yarn lint`**: Lints the codebase using ESLint.
*   **`yarn release`**: Builds the project and publishes it to npm.

## Development Conventions

*   **Styling:** The project uses Chakra UI for styling.
*   **Testing:** Tests are written with `vitest` and `@testing-library/react`. Test files are located alongside the source files. When writing tests for components that use Chakra UI, use the custom `render` function imported from `./test/render` to ensure proper ChakraProvider context.
*   **Linting:** The project uses ESLint with a custom configuration.
*   **Committing:** The project uses `changeset` to manage releases. When making changes, you should run `yarn changeset` to create a new changeset file.
*   **Typing:** The project is written in TypeScript and uses strict typing.

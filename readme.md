# drissnafii.me

> My personal website <3

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdrissnafii%2Fdrissnafii.me)

## Technology stack

- **Framework:** [Next.js 16.1.1](https://nextjs.org/) with [Turbopack](https://turbo.build/pack)
- **Runtime:** [Bun](https://bun.sh/) (replacing Node.js)
- **Styling:** [Stitches](https://stitches.dev/)
- **Content:** [Markdown](https://daringfireball.net/projects/markdown/)
- **Frontend:** [React](https://reactjs.org/)
- **Animation:** [Framer Motion](https://www.framer.com/docs/animation/)
- **Deployment:** [Vercel](https://vercel.com/)
- **Package Manager:** [Bun](https://bun.sh/)
- **Bundler:** Turbopack (default in Next.js 16+)

## Quick Start (using Makefile)

```sh
# Show available commands
make help

# Initial setup
make setup

# Start development server
make dev

# Build for production
make build
```

## Running locally

1. Clone this repo:

```sh
$ git clone https://github.com/drissnafii/drissnafii.me.git
```

2. Then go to the project's folder:

```sh
cd drissnafii.me
```

3. Install all dependencies:

```sh
make install
# or
bun install
```

4. Run the development server:

```sh
make dev
# or
bun run dev
```

## Available Make Commands

- `make install` - Install dependencies with Bun
- `make dev` - Start development server with Turbopack
- `make build` - Build the application for production
- `make start` - Start production server
- `make lint` - Run ESLint to check code quality
- `make analyze` - Analyze bundle with Next.js 16.1 Bundle Analyzer
- `make debug` - Start dev server with debugging enabled
- `make clean` - Clean build artifacts and node_modules
- `make deploy` - Deploy to production (Vercel)
- `make setup` - Initial setup (install + build)
- `make restart` - Clean install and restart dev server
- `make check` - Check project status and versions
- `make info` - Show project information

## Next.js 16.1 + Bun Runtime

This project uses **Next.js 16.1.1** with **Bun as the runtime** (replacing Node.js):

- **Bun Runtime** - Using `--bun` flag for all Next.js commands
- **Turbopack** as the default bundler (2-5x faster builds)
- **File system caching** for faster subsequent starts
- **Bundle Analyzer** for optimizing bundle sizes (`make analyze`)
- **Improved debugging** with `make debug`
- **Up to 10x faster Fast Refresh**
- **~400ms startup time** (vs ~1300ms+ with Node.js)

### Why Bun Runtime?

- **3-4x faster** than Node.js in many scenarios
- **Built-in bundler, transpiler, and package manager**
- **Native TypeScript support**
- **Faster cold starts** for serverless functions
- **Drop-in replacement** for Node.js

```sh
npm install
```

4. Run locally:

```sh
npm run dev
```

## File structure

The basic file structure for the project is organized in the following way:

```
.
|-- articles
|-- components
|-- data
|-- layouts
|-- lib
|-- pages
`-- public
```

### [articles](https://github.com/drissnafii/drissnafii.me/tree/master/articles)

Here you'll find a list of markdown files for each post.

### [components](https://github.com/drissnafii/drissnafii.me/tree/master/components)

Here you'll find reusable blocks of React components.

### [data](https://github.com/drissnafii/drissnafii.me/tree/master/data)

Here you'll find JSON files that populates each section.

### [layouts](https://github.com/drissnafii/drissnafii.me/tree/master/layouts)

Here you'll find default templates for different pages.

### [lib](https://github.com/drissnafii/drissnafii.me/tree/master/lib)

Here you'll find a set of utilities.

### [pages](https://github.com/drissnafii/drissnafii.me/tree/master/pages)

Here you'll find all the main pages of the site.

### [public](https://github.com/drissnafii/drissnafii.me/blob/master/public)

Here you'll find all the CSS, images, and font files.

## License

MIT License © Driss Nafii

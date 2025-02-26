# Next.js 15 Boilerplate

This boilerplate provides a solid foundation for building scalable and maintainable Next.js applications with best practices in code styling, linting, and commit standards.

## Features
- Next.js 15
- TypeScript support
- Pre-configured Prettier and ESLint
- Tailwind CSS integration
- Husky and Commit Lint for commit message enforcement
- Lint-staged for pre-commit checks

## Installation

Clone the repository and install dependencies:

```sh
npx create-next-app@latest .
npm install
```

## Prettier Setup

Install Prettier and plugins:

```sh
npm install -D prettier prettier-plugin-tailwindcss
npm install --save-dev @trivago/prettier-plugin-sort-imports
```

Create a `.prettierrc` file:

```json
{
  "bracketSpacing": true,
  "endOfLine": "lf",
  "semi": true,
  "jsxSingleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 4,
  "importOrder": [
    "^react$",
    "^next",
    "<THIRD_PARTY_MODULES>",
    "^@/(.*)$",
    "^components/(.*)$",
    "^utils/(.*)$",
    "^hooks/(.*)$",
    "^store/(.*)$",
    "^[./]"
  ],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true,
  "plugins": ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"]
}
```

Create a `.prettierignore` file:

```sh
.next
.cache
.husky
.prettierignore
.eslintignore
coverage
package-lock.json
public
stories
storybook-static
*.log
playwright-report
.nyc_output
test-results
junit.xml
docs
node_modules
next-env.d.ts
next.config.ts
yarn.lock
```

## Tailwind CSS Setup

Update `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "1.5rem",
        lg: "2rem"
      },
      screens: {
        "xs": "400px",
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        dark: "var(--dark)",
        gray: "var(--gray)"
      }
    }
  },
  plugins: []
};

export default config;
```

Update `globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #171717;
  --primary: #308A99;
  --secondary: #57B2B5;
  --gray: #666D80;
  --dark: #2A2F67;
}
```

## ESLint Setup

Install dependencies:

```sh
npm add --dev eslint lint-staged eslint-config-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-prettier prettier-plugin-tailwindcss eslint-config-next
```

Create a `.eslintignore` file:

```sh
.next
.cache
package-lock.json
public
node_modules
next-env.d.ts
next.config.ts
yarn.lock
```

## Commit Lint Setup

```sh
npm install --save-dev @commitlint/{cli,config-conventional} @commitlint/types conventional-changelog-atom
```

## Husky Setup

```sh
npm install -D husky
npx husky init
```

Update `.husky/pre-commit`:

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo '👷 Styling your project before committing👷. Please wait...‍🏗️'

# Check ESLint Standards
echo '👷 Running Linters fix. Please wait...‍♂️'
npx lint-staged || (
    echo '❌ You have a problem in your code. Fix linter errors ❌
          Run: npm run lint. Add changes and try committing again.';
    false;
)

# Run build
echo '👷 Running build: Please wait... 🚀'
npm run build

echo '👷 No errors found: Committing now... ✨'
```

Update `package.json`:

```json
"lint-staged": {
  "**/*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write --ignore-unknown"
  ],
  "**/*.{css,scss,md,html,json}": [
    "prettier --write --ignore-unknown"
  ]
}
```

## Usage

Start the development server:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```

Lint the code:

```sh
npm run lint
```

## Contributing
Feel free to fork this repository and submit pull requests.

## License
MIT License


# Contribution Guidelines

When contributing to `YouTube-Mate`, whether on GitHub or in other community spaces:

- Be respectful, civil, and open-minded.
- Before opening a new pull request, try searching through the [issue tracker](https://github.com/SedatUygur/YouTube-Mate/issues) for known issues or fixes.
- If you want to make code changes based on your personal opinion(s), make sure you open an issue first describing the changes you want to make, and open a pull request only when your suggestions get approved by maintainers.

## How to Contribute

### Prerequisites

In an effort to respect your time, if you wanted to implement a change that has already been declined, or is generally not needed, start by [opening an issue](https://github.com/SedatUygur/YouTube-Mate/issues/new) describing the problem you would like to solve.

### Setup your environment

Fork the [YouTube-Mate repository](https://github.com/SedatUygur/YouTube-Mate) to your own GitHub account and then clone it to your local device.

```bash
git clone git@github.com:YOUR_USER_NAME/YouTube-Mate.git
```

Then, install the project's dependencies:

```bash
npm install
```

### Database Setup

This project uses [PostgreSQL](https://www.postgresql.org/) as its database.

The project has a `docker-compose.dev.yml` file ready to use if you have [Docker](https://www.docker.com/) installed.

You can also install Postgres on your local machine [directly](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database) or use a cloud service.

copy `.env.example` to `.env`

```bash
cp .env.example .env
```

#### `.env` variables for PostgreSQL

```bash
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASS=your_database_password
DB_NAME=your_database_name
DATABASE_URL=postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}
```

If you are using Docker, you can use the following values:

```bash
DATABASE_URL=postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}
DB_HOST=localhost
DB_USER=youtubemate_user
DB_PASS=youtubemate_pass
DB_NAME=youtubemate
DB_PORT=5432
```

- DATABASE_URL: The full database connection URL. This is required and is used by prisma.

#### PostgreSQL Setup by Docker Compose

If you have [Docker](https://www.docker.com/) installed, you can use the following command to start a PostgreSQL container:

```bash
docker-compose -f docker-compose.dev.yml up -d --wait
```

#### Prisma Setup

Use the following command to generate the Prisma client:

```bash
npx prisma migrate dev
```

Use the following command to generate the Prisma markdown document:

```bash
npx prisma generate
```

View the database diagram here (./prisma/YouTubeMate-ERD.md).

#### Playwright Setup

Ensure you have the Playwright executables installed to run tests:

```bash
npx playwright install
```

### Getting Google OAuth API Credentials

1. Visit the [Google Cloud Console](https://console.developers.google.com/apis/credentials)
2. Go to the OAuth consent screen tab, fill first step leaving the rest blank and click Save. This will create a project for you
3. Now Publish your OAuth consent screen App.
4. Go to the [Credentials tab](https://console.cloud.google.com/apis/credentials) and click Create Credentials -> OAuth Client ID
   - Choose Web Application
   - Add `http://localhost:5173` to the Authorized JavaScript origins
   - Add `http://localhost:5173/auth/callback/google` to the Authorized redirect URIs.
   - Click Create.
5. Copy the Client ID and Client Secret and paste them into the `.env` file.

```bash
AUTH_SECRET=your_secret
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
```

### Run the project

To run the project in development mode, run the following command:

```bash
npm run dev
```

### Make changes

Before making any changes, make sure you create a new branch:

```bash
git checkout -b your-branch-name
```

When you're done making changes, commit them and push them to your fork:

```bash
git add .
git commit -m "your commit message"
git push
```

Then, [create a pull request](https://github.com/SedatUygur/YouTube-Mate/pulls)
from your fork to the `main` branch of the `YouTube-Mate` repository.

## Server Environment Variables

Server environment variables should only be accessed from [`'$lib/config.server.ts'`](./src/lib/config.server.ts) (do not import directly from `'$env/static/private'`).

If you need access to a new environment variable, add it to the schema in [`'$lib/config.server.ts'`](./src/lib/config.server.ts).

## Code Style Guidelines

In order to maintain consistent and readable code, this project adheres to certain code style guidelines. Please follow these guidelines when contributing to the project.

### Linter

This project uses `ESLint` as our linter tool. To configure your VSCode workspace to show lint warnings, you can find a suggested configuration file, named `default.settings.json`, in the `.vscode` directory. Copy and rename this file to `settings.json` to enable the linter warnings in VSCode. Please do not alter the original `default.settings.json`.
To further improve your development experience while working on `YoutubeMate`, this project also includes a list of suggested VSCode extensions in the file `.vscode/extensions.json`.

### ESLint Setup and Config

Prerequisites: Node.js (^18.18.0, ^20.9.0, or >=21.1.0) built with SSL support. (If you are using an official Node.js distribution, SSL is always built in.)

You can install and configure ESLint using this command:

```bash
npm init @eslint/config@latest
```

After that, you can run ESLint on any file or directory like this:

```bash
npx eslint yourfile.js
```

You can configure rules in your eslint.config.js files as in this example:

```bash
export default [
    {
        files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
        rules: {
            "prefer-const": "warn",
            "no-constant-binary-expression": "error"
        }
    }
];
```

### Formatter

This project uses [Prettier](https://prettier.io/) to format the code. You can run `npm run format:fix` to format the code before committing.

### Github Actions Setup

To get started with preconfigured workflows, browse through the list of templates in the actions/starter-workflows repository. For more information, see "Using workflow templates."

For an overview of GitHub Actions workflows, see "About workflows." If you want to learn about the various components that make up GitHub Actions, see "Understanding GitHub Actions."

#### Creating your first workflow

In your repository on GitHub, create a workflow file called github-actions-demo.yml in the .github/workflows directory. To do this:

If the .github/workflows directory already exists, navigate to that directory on GitHub, click Add file, then click Create new file, and name the file github-actions-demo.yml.

If your repository doesn't have a .github/workflows directory, go to the main page of the repository on GitHub, click Add file, then click Create new file, and name the file .github/workflows/github-actions-demo.yml. This creates the .github and workflows directories and the github-actions-demo.yml file in a single step.

Note

For GitHub to discover any GitHub Actions workflows in your repository, you must save the workflow files in a directory called .github/workflows.

You can give the workflow file any name you like, but you must use .yml or .yaml as the file name extension. YAML is a markup language that's commonly used for configuration files.

Add YAML contents into the github-actions-demo.yml file

Click Commit changes.

In the "Propose changes" dialog, select either the option to commit to the default branch or the option to create a new branch and start a pull request. Then click Commit changes or Propose changes.

### Husky Setup

Install

```bash
npm install --save-dev husky
```

husky init (recommended)

The init command simplifies setting up husky in a project. It creates a pre-commit script in .husky/ and updates the prepare script in package.json. Modifications can be made later to suit your workflow.

```bash
npx husky init
```

## License

By contributing, you agree that your contributions will be licensed under its MIT License.

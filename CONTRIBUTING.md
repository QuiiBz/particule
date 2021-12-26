# Contributing

Thanks for contributing!

## Issues contribution

You can open a [bug](https://github.com/QuiiBz/particule/issues/new?assignees=&labels=bug&template=bug_report.md&title=) issue, or request a new [feature](https://github.com/QuiiBz/particule/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=).

## Development contribution

You'll need the `pnpm` package manager.

- Fork this repository
- Create a new branch: `git checkout main && git branch -b <branch-name>`
- Install dependencies: `pnpm install`
  - If you want to work on the website, you should also run: `cd site && pnpm install`
- Make your changes and make sure `pnpm test` still passes
  - If you add a new feature, please write tests for it
- Commits your changes (please follow this [guide](https://dev.to/i5han3/git-commit-message-convention-that-you-can-follow-1709)) and open a PR!


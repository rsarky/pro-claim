# pro-claim

> A GitHub App built with [probot](https://github.com/probot/probot) that automatically assigns a contributor to an issue that he/she 'claims' for. Inspired by [zulipbot](https://github.com/zulip/zulipbot)

***Only works for repositories owned by organizations.***

## Usage

Install pro-claim on your repository. For any aspiring contributor to claim an issue he/she must comment :
>pro-claim claim

This will assign the user to the issue.

## Todo
- [ ] Add templates with appropriate messages.
  - [ ] First time contributor message. (Accept invite.)
  - [ ] Issue Assigned message.
  - [ ] Issue Unassigned message.
  - [ ] Issue already assigned message.
  - [ ] Unassign after inactivity message.
- [ ] Add tests.
- [ ] Unassign assignee after a period of inactivity.
- [ ] Only assign to issues with certain labels ( good-first-issue/first-timers-only)

## Setup

```
# Install dependencies
npm install

# Run the bot
npm start
```

See [docs/deploy.md](docs/deploy.md) if you would like to run your own instance of this app.

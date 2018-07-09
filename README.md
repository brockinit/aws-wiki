# aws-wiki

A living, breathing wiki providing human friendly AWS documention

## Notes for Development

For local development:

- Run `sls offline start` in the terminal, which will spin up a local server at `localhost:3000` for local development
- Routes are handled in `index.js`. Any edits will be reflected in real-time at `localhost:3000`

Deployment for Serverless:

- Use `npm run deploy:dev` to deploy to the Serverless development environment
- Use `npm run deploy prod` to deploy to the Serverless development environment

## Chrome Extension

- To try out the extension, go to: `chrome://extensions/`
- Make sure developer mode is switched to `on`
- Click on `Load Unpacked` and select the `awsWiki` file from this codebase
- Navigate to any page at `https://docs.aws.amazon.com/*` to see the extension work

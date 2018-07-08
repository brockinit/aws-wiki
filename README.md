# aws-wiki

A living, breathing wiki providing human friendly AWS documention

## Notes for Development

For local development:

- Run `sls offline start` in the terminal, which will spin up a local server at `localhost:3000` for local development
- Routes are handled in `index.js`. Any edits will be reflected in real-time at `localhost:3000`

Deployment to Serverless development environment:

- Use `sls deploy` to deploy to the Serverless development environment

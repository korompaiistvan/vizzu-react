# Interactive Config of Vizzu in React

This is a very dirty repo with my first stab at a GUI-configurable Vizzu chart.

## Run it locally

1. Clone the repo
2. Open the directory in a terminal shell with npm installed
3. Run `npm install`
4. You'll have to copy the [type definitions from Vizzu's github](https://github.com/vizzuhq/vizzu-lib/blob/main/src/apps/weblib/js-api/vizzu.d.ts) into the npm package (`./node_modules/vizzu/dist/vizzu.d.ts`), because the npm package is outdated compared to the repo (as of the publishing of this readme). Otherwise the project will fail typechecks by TypeScript.
5. Run `npm start`. This should open a new browser tab in your default browser showing the chart.

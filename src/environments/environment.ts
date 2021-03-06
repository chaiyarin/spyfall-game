// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // api_url: 'https://spyfall-server.herokuapp.com',
  // api_url: 'http://172.20.10.13:3000',
  // api_url: 'https://api.alab.in',
  // apiUrl: 'http://api.alab.com',
  // baseUrl: 'http://spyfall.alab.com',
  apiUrl: 'http://localhost:3000',
  baseUrl: 'http://localhost:4200',
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  //travel go webservice
  base_api: 'http://web-travelgo.test/api',
  midtrans: 'https://cors-anywhere.herokuapp.com/https://app.sandbox.midtrans.com/snap/v1/transactions',
  // midtrans: 'https://app.midtrans.com/snap/v1/transactions'
  midtrans_server_key: 'SB-Mid-server-uRz8JBs6tWG-qoaf0sYEIaJD',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

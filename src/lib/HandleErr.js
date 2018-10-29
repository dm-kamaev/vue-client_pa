// MODULE WORK WITH ERROR

import Vue from 'vue';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue'
import config from '@/lib/config.js'

function getCookie(name) {
  const matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ))

  return matches ? decodeURIComponent(matches[1]) : undefined
}

export default class HandleErr {
  // obj –– {
  //   path: __filename + 'function_name', // required key
  //   error: Object || Error || customError extends Error
  // }
  // send
  // variant 1 –– {
  //   "path": "src/lib/Err.js:loadSettings",
  //   "error": {
  //     "error": {
  //       "ErrorCode": -12,
  //       "ErrorText": {
  //         "a": 1,
  //         "b": 2
  //       }
  //     },
  //     "name": "ApiError"
  //   },
  //   "NODE_ENV": "development",
  //   "stack": "ApiError\n    at unitTest (webpack-internal:///663:109:12)\n    at Object.eval (webpack-internal:///663:97:1)\n    at eval (webpack-internal:///663:145:30)\n    at Object.<anonymous> (http://localhost:8080/app.js:4860:1)\n    at __webpack_require__ (http://localhost:8080/app.js:679:30)\n    at fn (http://localhost:8080/app.js:89:20)\n    at eval (webpack-internal:///653:9:70)\n    at Object.<anonymous> (http://localhost:8080/app.js:4799:1)\n    at __webpack_require__ (http://localhost:8080/app.js:679:30)\n    at fn (http://localhost:8080/app.js:89:20)"
  // }
  // variant 2 –– {
  //   "path": "src/lib/Err.js:try_catch_3",
  //   "error": {},
  //   "NODE_ENV": "development",
  //   "message": "Cannot read property '1' of null",
  //   "stack": "TypeError: Cannot read property '1' of null\n    at unitTest (webpack-internal:///663:137:9)\n    at Object.eval (webpack-internal:///663:97:1)\n    at eval (webpack-internal:///663:145:30)\n    at Object.<anonymous> (http://localhost:8080/app.js:4860:1)\n    at __webpack_require__ (http://localhost:8080/app.js:679:30)\n    at fn (http://localhost:8080/app.js:89:20)\n    at eval (webpack-internal:///653:9:70)\n    at Object.<anonymous> (http://localhost:8080/app.js:4799:1)\n    at __webpack_require__ (http://localhost:8080/app.js:679:30)\n    at fn (http://localhost:8080/app.js:89:20)"
  // }
  static send(obj, clientId) {
    // if (!obj.path) {
    //   console.error(`Not found path: example '/src/main.js:loadSettings'`);
    // }

    obj.NODE_ENV = config.NODE_ENV;
    const error = obj.error;

    if (error instanceof Error) {
      if (error.message) {
        obj.message = error.message;
      }
      if (error.stack) {
        obj.stack = error.stack;
      }
    }

    const data = JSON.stringify(obj, null, 2);

    if (config.isProd) {
      fetch('/aj/log_error_client_pa', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        credentials: 'same-origin',
        body: data
      }).then(res => {
        // console.log('res=', res)
      }).catch(error => {
        console.error('error=', error);
      });

      Raven.captureException(data);
    }
  }

  static setUserId(id) {
    Raven.setUserContext({
      id: id,
      userId: getCookie('u_uuid')
    })
  }

  static installRaven() {
    if (config.isProd) {
      Raven
        .config('https://be12015c939f46bfa30f02b5b5abe4f4@sentry.domovenok.su/2',
          {
            allowSecretKey: true
          })
        .addPlugin(RavenVue, Vue)
        .install()
    }
  }
}


// unitTest();
// function unitTest() {
//   config.isProd = true;
//   HandleErr.installRaven();
  // HandleErr.send({
  //   filename: __filename,
  //   error: {
  //     TEST: 'TEST FOR DEV',
  //     dev2: [ 1, 2, 3]
  //   }
  // });
  // HandleErr.send({
  //   path: __filename+':loadSettings',
  //   error: new ApiError({
  //     ErrorCode: -12,
  //     ErrorText: {
  //       a: 1,
  //       b: 2
  //     }
  //   })
  // });

  // try {
  //   throw new Error('Hello world');
  // } catch (err) {
  //   HandleErr.send({
  //     path: __filename+':try_catch_1',
  //     error: err
  //   });
  // }

  // try {
  //   throw { test: true };
  // } catch (err) {
  //   HandleErr.send({
  //     path: __filename+':try_catch_2',
  //     error: err
  //   });
  // }


  // try {
  //   null[1];
  // } catch (err) {
  //   HandleErr.send({
  //     path: __filename+':try_catch_3',
  //     error: err
  //   });
  // }


  // try {
  //   throw 1;
  // } catch (err) {
  //   HandleErr.send({
  //     path: __filename+':try_catch_4',
  //     error: err
  //   });
  // }


  // try {
  //   throw true;
  // } catch (err) {
  //   HandleErr.send({
  //     path: __filename+':try_catch_5',
  //     error: err
  //   });
  // }


  // try {
  //   throw 'Test123';
  // } catch (err) {
  //   HandleErr.send({
  //     path: __filename+':try_catch_6',
  //     error: err
  //   });
  // }
// }



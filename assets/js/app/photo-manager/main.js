// Filename: main.js
//
// We use require.js to do AMD style loading of our applications.
// First configure any aliases along with where they live.
//

// var requirejs = undefined;

console.log('app/photo-manager/main: Adding app-ready event listener...');

addEventListener('app-ready', function(e){

  console.log('Got app-ready event!');

  if (processedAppReady) {
    console.log('app/photo-manager/main: App ready already processed...');
    return;
  }

  processedAppReady = true;

  console.log('App is now ready...');

  // requirejs = require('requirejs');

  requirejs.config({
    nodeRequire: require,
    text: { env: 'xhr' },
    //
    // By default, load anything from js/libs
    //
    baseUrl: 'js/libs',
    //
    // However, anything where module ID begins w/
    // "app", load it from js/app/photo-manager.
    //
    paths: {
      text: 'require/text',
      jquery: 'jquery/jquery.min',
      underscore: 'underscore/underscore',
      backbone: 'backbone/backbone',
      foundationClearing: 'foundation/jquery.foundation.clearing',
      app: '../app/photo-manager'
    },
    //
    // Non-AMD modules like underscore / backbone.
    //
    shim: {
      underscore: {
        exports: "_"
      },
      backbone: {
        deps: ["underscore", "jquery"],
        exports: "Backbone"
      },
      foundationClearing: {
        deps: ["jquery"]
      }
    }
  });

  console.log('Testing require - ' + require('node-uuid').v4());

  // Load our app and pass it into our definition function.
  requirejs(['app/app'],
            function(App) {
              console.log('Invoking app, typeof is - ' + typeof(App));
              App.initialize();
            });
});

//
//  There is a possible race condition where the app-ready event may be dispatched before
//  requireJS loads this. Hence, ensure triggering it ourself. The handler
//  will ONLY process things once.
//
if (window.hasOwnProperty('appReady') && window.hasOwnProperty('processedAppReady') && (processedAppReady === false)) {
  dispatchEvent(new Event('app-ready'));
}

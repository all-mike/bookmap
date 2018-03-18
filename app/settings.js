angular.module('myapp')

  .factory('settings', function(){
    var settings = {};

    settings.init = (cb) => {
      chrome.storage.sync.get(['key'], result => {
        console.log('Value currently is ' + result);
        console.log('Current keys are: ', Object.entries(result))
        cb(Object.entries(result));
      });
    }

    settings.set = (key, value) => {
      chrome.storage.sync.set({key: value}, () => {
        console.log('The ', key, ' key is set to ' + value);
      });
    }

    settings.refresh = (key) => {
      chrome.storage.sync.get(['key'], result => {
        console.log('Value currently is ' + result.key);
        // console.log('current keys are ', Object.entries(result))
      });
    }

    return settings;

  })
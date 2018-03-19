angular.module('hotmap')

  .factory('userSettings', () => {
    
    const settings = {};

    settings.save = (obj) => {
      console.log('the folder obj is ', obj)
      chrome.storage.sync.set({store: obj}, () => {
        console.log('The storage obj is set to ' + obj);
      });
    }

    settings.get = (cb) => {
      chrome.storage.sync.get(null, result => {
        console.log('The key is currently: ', result)
        cb(result.store)
      });
    }

    settings.singlesave = (key, value) => {
      chrome.storage.sync.set({[key]: value}, () => {
        console.log('The ', key, ' is set to: ', value);
      });
    }

    settings.singleget = (key, cb) => {
      chrome.storage.sync.get([key], result => {
        console.log('The singleget key is: ', result)
        cb(result)
      });
    }

    return settings;

  })
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
        console.log('My guess at the key is: ', result)
        cb(result.store)
      });
    }

    return settings;

  })
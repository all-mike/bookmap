const store = {};

chrome.storage.sync.get(null, result => {
  console.log('My guess at the key is: ', result)
  store = result.store
});
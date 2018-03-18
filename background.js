chrome.commands.onCommand.addListener( command => {
  let preset = command[6];
  let store = {};

  chrome.storage.sync.get(null, result => {
    console.log('The current keys are: ', result)
    store = result.store
  });

  chrome.tabs.getSelected(null, tab => {
    // console.log('the current tab is: ', tab);
    chrome.bookmarks.create({
      parentId: store[preset].id,
      title: tab.title,
      url: tab.url
    });
  })
});

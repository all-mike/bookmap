chrome.commands.onCommand.addListener( command => {
  let store = {};
  let preset = command[6];
  console.log('the preset is: ', preset)

  chrome.storage.sync.get(null, result => {
    console.log('The current keys are: ', result)
    store = result.store
    chrome.tabs.getSelected(null, tab => {
      if (store[preset] == undefined){
        console.log('undefined preset!')
        return;
      }
      chrome.bookmarks.create({
        parentId: store[preset].id,
        title: tab.title,
        url: tab.url
      }, function( BookmarkTreeNode ){
        console.log('the treendoe doe: ', BookmarkTreeNode);
      });
    })
  });


});

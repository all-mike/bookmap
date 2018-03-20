angular.module('hotmap')

  .factory('bookMarks', () => {
    
    const bmstore = {};

    bmstore.get = cb => {
      let results = [];

      chrome.bookmarks.getTree( bmNodes => {
          bmNodes.forEach(function(node){
            if (node.children) {
              getFolders(node);
            }
          })
        }
      );
      const getFolders = node => {
        if (node.children){
          results.push({
            title: node.title,
            id: node.id
          })
          node.children.forEach( node => {
            getFolders(node);
          })
        }
      }
      cb(results);
    }

    bmstore.save = (parentId, title, url, cb) => {
      console.log('trying to create bm with: ', parentId, title, url)
      chrome.bookmarks.create({
        parentId,
        title,
        url
      }, success => {
        cb(success)
      });
    }

    bmstore.newfolder = (title, cb) => {
      console.log('trying to create folder with: ', title)
      chrome.bookmarks.create({
        'parentId': '2',
        'title': title
      }, successobj => {
        cb(successobj)
      });
    }

    return bmstore;

  })
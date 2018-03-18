angular.module('myapp')

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

    bmstore.save = (parentId, title, url) => {
      console.log('trying to create: ', parentId, title, url)
      chrome.bookmarks.create({
        parentId,
        title,
        url
      });
    }

    return bmstore;

  })
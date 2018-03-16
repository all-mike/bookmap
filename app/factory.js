angular.module('myapp')

  .factory('bookMarks', function(){
    var bmstore = {};



    bmstore.get = function(callback) {
      let results = [];

      chrome.bookmarks.getTree(function(bmNodes){
          bmNodes.forEach(function(node){
            if (node.children) {
              getFolders(node);
            }
          })
        }
      );

      const getFolders = function(node){
        if (node.children){
          results.push({
            title: node.title,
            id: node.id
          })
          node.children.forEach(function(node){
            getFolders(node);
          })
        }
      }

      callback(results);
    }


    return bmstore;

  })
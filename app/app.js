angular.module('myapp', ['ui.bootstrap'])

  .component('main', {

    controller(bookMarks, $timeout, $scope) {
      // Variables to track
      const ctrl = this;
      this.folders = [];
      this.fview = 1;
      this.currentTab = '';

      // Variables for new input
      this.searchKey = '';

      // Autocomplete logic
      this.autocomp = function(){}

      // Bookmark saving logic
      this.savebm = () => {
        ctrl.getTab()
        chrome.bookmarks.create({
          parentId: $scope.selected.id,
          title: $scope.currentTitle,
          url: $scope.currentTab});
        window.close();
      }

      this.getTab = () => {
        return chrome.tabs.getSelected(null, function(tab){
          console.log(tab);
          $scope.currentTab = tab.url;
          $scope.currentTitle = tab.title;
        })
      }

      this.testMod = (event) => {
        console.log('test-inspection: ', event)
        console.log('test-inspection: value', event.value)
      }

      // === Initialize ===
      this.$onInit = () => {

        bookMarks.get((results)=>{
          $scope.folders = results;
          console.log($scope.folders)
        });
        
        $scope.selected = undefined;

        $scope.keydown = function() {
          ctrl.savebm();
        }

        ctrl.getTab()

        $timeout()

      };
    },

    template: 
    `
      <div class="papa">
        <!-- Header -->
        <h4> Folders: </h4>

        <!-- Folder Repeater 
        <div class="container">
          <div ng-repeat="bm in $ctrl.folders">
            {{bm.title}}
          </div>
        </div>
        -->

        <div class="container-fluid">
        <pre>Model: {{selected | json}}</pre>
          <div class="form-group">
            <input name="folders" id="folders" type="text" placeholder="enter a folder" ng-model="selected" uib-typeahead="bm as bm.title for bm in folders | filter:$viewValue | limitTo:8" class="form-control" typeahead-on-select="$ctrl.savebm()" autofocus>
          </div>
          <button class="btn btn-success" type="submit" ng-click="$ctrl.savebm()">Submit</button>
        </div>

      </div>
    `
  });



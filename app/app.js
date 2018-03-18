angular.module('hotmap', ['ui.bootstrap'])

  .component('popup', {

    controller(bookMarks, userSettings, $timeout, $scope) {
      // Variables to track
      const ctrl = this;
      this.folders = [];
      this.fview = 1;
      this.currentTab = '';

      // Variables for new input
      this.searchKey = '';

      // Bookmark saving logic
      this.savebm = () => {
        ctrl.getTab()
        bookMarks.save(
          $scope.selected.id,
          $scope.currentTitle,
          $scope.currentTab
        );
        // autoclose, disabled for easier testing
        // window.close();
      }

      // Title & Url grabbing logic
      this.getTab = () => {
        return chrome.tabs.getSelected(null, tab => {
          $scope.currentTab = tab.url;
          $scope.currentTitle = tab.title;
        })
      } 

      // Temporary test features
      // this.testMod = event => {
      //   console.log('test-inspection: ', event)
        // console.log('test-inspection: value', event.value)
      // }

      // === Initialize ===
      this.$onInit = () => {

        $scope.openpanel = true;

        // Build folders for autocomplete
        bookMarks.get( results => {
          $scope.folders = results;
        });
        
        // Scope wide listener for enter presses
        $scope.keydown = () => {
          ctrl.savebm();
        }

        //to consider: possible future issue regarding tab grabbing while minified
        ctrl.getTab()

        //important for lifehook cycle
        $timeout()

      };
    },

    template: 
    `
      <div class="papa">
        <h4>Folders: </h4>

        <div class="container-fluid">
        <pre>Model: {{selected | json}}</pre>
          <div class="form-group">
            <input name="folders" id="folders" type="text" placeholder="enter a folder" ng-model="selected" uib-typeahead="bm as bm.title for bm in folders | filter:$viewValue | limitTo:8" class="form-control" typeahead-on-select="$ctrl.savebm()" autofocus>
          </div>
          <button class="btn btn-success" type="submit" ng-click="$ctrl.savebm()">Submit</button>
          <button class="btn btn-success" type="viewchange" ng-click="openpanel = !openpanel">Settings</button>

          <div class="settings-panel" ng-if="openpanel">
            <settings-panel></settings-panel>
          </div>
        </div>

      </div>
    `
  });



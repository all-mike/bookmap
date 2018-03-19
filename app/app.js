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

      this.getBookmarks = () => {
        bookMarks.get( results => {
          $scope.folders = results;
        });
      }

      // === Initialize ===
      this.$onInit = () => {

        ctrl.getBookmarks();
        ctrl.getTab()
        
        $scope.openpanel = true;

        $scope.keydown = () => {
          ctrl.savebm();
        }

        //important for lifehook cycle
        $timeout()

      };
    },

    template: 
    `
      <div class="motherdom">

        <div class="row">

          <div class="col-xs-8">
            <h4>Choose destination...</h4>
          </div>

          <div class="col-xs-4" id="rightlean">
            <button class="btn btn-primary" type="viewchange" id="cogbutt" ng-click="openpanel = !openpanel">
              <span class="glyphicon glyphicon-cog" id="cog" aria-hidden="true"></span>
            </button>
          </div>

        </div>

        <div class="container-fluid">

          <pre>Model: {{selected | json}}</pre>

          <div class="input-group">
            <input name="folders" id="folders" type="text" placeholder="enter a folder" ng-model="selected" uib-typeahead="bm as bm.title for bm in folders | filter:$viewValue | limitTo:8" class="form-control" typeahead-on-select="$ctrl.savebm()" autofocus>
            <span class="input-group-addon"><span class="glyphicon glyphicon-saved" aria-hidden="true"></span></span>
          </div>

          <div class="settings-panel" ng-if="openpanel">
            <settings-panel></settings-panel>
          </div>

        </div>

      </div>
    `
  });



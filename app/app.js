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

      <div class="row">
          <div class="col-xs-6">
            <h4>Destination:</h4>
          </div>
          <div class="col-xs-6" id="rightlean">
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

          <!--<div class="btn-group" role="group">
            <button class="btn btn-primary" type="submit" ng-click="$ctrl.savebm()">Submit</button>
          </div>-->
          <div class="btn-group" role="group">

          </div>

          <div class="settings-panel" ng-if="openpanel">
            <settings-panel></settings-panel>
          </div>
        </div>

      </div>
    `
  });



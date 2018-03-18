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
      this.getTab = cb => {
        return chrome.tabs.getSelected(null, tab => {
          // console.log('the current tab is: ', tab);
          $scope.currentTab = tab.url;
          $scope.currentTitle = tab.title;
        })
      }

      // Temporary test features
      this.testMod = event => {
        console.log('test-inspection: ', event)
        // console.log('test-inspection: value', event.value)
      }

      // === Initialize ===
      this.$onInit = () => {

        // Build folders for autocomplete
        bookMarks.get( results => {
          $scope.folders = results;
          // console.log('the current folders are: ', $scope.folders)
        });
        
        // Check store for user settings
        // userSettings.init( results => {
        //   $scope.settings = results;
        //   $scope.selected = undefined;
        //   $scope.openpanel = false;
        //   console.log('the current settings are: ', $scope.settings)
        // });
        
        // Scope wide listener for enter presses
        $scope.keydown = () => {
          ctrl.savebm();
        }

        //settings factory usage example
        //settings.set('init', 'yes')

        //to consider: possible future issue regarding tab grabbing while minified
        ctrl.getTab()

        //important for lifehook cycle
        $timeout()

      };
    },

    template: 
    `
      <div class="papa">
        <!-- Header -->
        <h4>Folders: </h4>

        <!-- Folder Repeater -->
        <!-- <div ng-repeat="bm in $ctrl.folders">
          {{bm.title}}
        </div>-->

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



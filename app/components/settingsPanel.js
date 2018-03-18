angular.module('hotmap')

  .component('settingsPanel', {

    controller(bookMarks, userSettings, $scope, $timeout) {

      const panel = this;
      
      this.register = () => {
        console.log('the registered folder would be: ', panel.registerkey)
        userSettings.save($scope.settings)
      };

      this.openShortcuts = () => {
        chrome.tabs.create({
          url: 'chrome://extensions/configureCommands'
        });
      };

      this.$onInit = () => {

        bookMarks.get( results => {
          $scope.folders = results;
        });

        userSettings.get( results => {
          $scope.settings = results;
        })

        //important for lifehook cycle
        $timeout()

      }

    },

    template: `
    <div>
      <div class="panel-heading">Quick-save folders:</div>
    </div>
    <div>
      <div class="form-group">
        <input name="folders" id="folders" type="text" placeholder="hotkey 1" ng-model="settings[1]" uib-typeahead="bm as bm.title for bm in folders | filter:$viewValue | limitTo:8" class="form-control" typeahead-on-select="$ctrl.register()">
        <input name="folders" id="folders" type="text" placeholder="hotkey 2" ng-model="settings[2]" uib-typeahead="bm as bm.title for bm in folders | filter:$viewValue | limitTo:8" class="form-control" typeahead-on-select="$ctrl.register()" ng-if="settings[1]">
        <input name="folders" id="folders" type="text" placeholder="hotkey 3" ng-model="settings[3]" uib-typeahead="bm as bm.title for bm in folders | filter:$viewValue | limitTo:8" class="form-control" typeahead-on-select="$ctrl.register()" ng-if="settings[2]">
        <button class="btn btn-primary" id="widebutt" ng-click="$ctrl.openShortcuts()" width="100%">Key-bindings</button>
      </div>
    </div>
    `

  });
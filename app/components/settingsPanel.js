angular.module('hotmap')

  .component('settingsPanel', {

    controller(bookMarks, userSettings, $scope) {

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

      }

    },

    template: `
    <div>
      <b>Quick-save folders:</b>
    <div>
      <div class="form-group">
        <input name="folders" id="folders" type="text" placeholder="hotkey 1" ng-model="settings[1]" uib-typeahead="bm as bm.title for bm in folders | filter:$viewValue | limitTo:8" class="form-control" typeahead-on-select="$ctrl.register()">
        <input name="folders" id="folders" type="text" placeholder="hotkey 2" ng-model="settings[2]" uib-typeahead="bm as bm.title for bm in folders | filter:$viewValue | limitTo:8" class="form-control" typeahead-on-select="$ctrl.register()">
        <input name="folders" id="folders" type="text" placeholder="hotkey 3" ng-model="settings[3]" uib-typeahead="bm as bm.title for bm in folders | filter:$viewValue | limitTo:8" class="form-control" typeahead-on-select="$ctrl.register()">
        <button class="btn btn-settings" ng-click="$ctrl.openShortcuts()">Shortcuts</button>
      </div>
    </div>
    `

  });
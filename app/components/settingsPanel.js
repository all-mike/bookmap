angular.module('hotmap')
  .component('settingsPanel', {

    controller: function (bookMarks, userSettings, $scope) {

      const panel = this;
      
      this.register = () => {
        console.log('the registered folder would be: ', panel.registerkey)
        userSettings.save($scope.settings)
      }

      this.$onInit = () => {

        bookMarks.get( results => {
          $scope.folders = results;
          // console.log('current folders are: ', $scope.folders);
        });

        userSettings.get( results => {
          $scope.settings = results;
          // console.log('current scope is: ', $scope.settings);
        })

      }

    },

    template: `
    <div>
      <h4>Register quick folders:</h4>
    <div>
      <div class="form-group">
        <input name="folders" id="folders" type="text" placeholder="hotkey 1" ng-model="settings[1]" uib-typeahead="bm as bm.title for bm in folders | filter:$viewValue | limitTo:8" class="form-control" typeahead-on-select="$ctrl.register()">
        <input name="folders" id="folders" type="text" placeholder="hotkey 2" ng-model="settings[2]" uib-typeahead="bm as bm.title for bm in folders | filter:$viewValue | limitTo:8" class="form-control" typeahead-on-select="$ctrl.register()">
        <input name="folders" id="folders" type="text" placeholder="hotkey 3" ng-model="settings[3]" uib-typeahead="bm as bm.title for bm in folders | filter:$viewValue | limitTo:8" class="form-control" typeahead-on-select="$ctrl.register()">
      </div>
    </div>
    `

  });
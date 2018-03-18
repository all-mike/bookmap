angular.module('hotmap')
  .component('settingsPanel', {

    controller: function (bookMarks, userSettings, $scope) {

      this.register = () => {
        console.log('the registered folder would be: ', $scope.key1)
        userSettings.set('key1-title', $scope.key1.title);
        userSettings.set('key1-id', $scope.key1.id);
      }

      this.selected = undefined;

      this.$onInit = () => {

        bookMarks.get( results => {
          $scope.folders = results;
          // console.log('the current folders are: ', $scope.folders)
        });

        userSettings.init( results => {
          $scope.settings = results;
          $scope.selected = undefined;
          console.log('the current settings are: ', $scope.settings)
          $scope.key1.title = results.key1-title
          $scope.key1.id = results.key1-id
        });



      }

    },

    template: `
    <div>
      Hotkey count: 1
    <div>
      <div class="form-group">
        <input name="folders" id="folders" type="text" placeholder="hotkey 1" ng-model="settings.key1.title" uib-typeahead="bm as bm.title for bm in folders | filter:$viewValue | limitTo:8" class="form-control" typeahead-on-select="$ctrl.register()">
      </div>
    </div>
    `

  });
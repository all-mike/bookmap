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

      this.getSettings = () => {
        userSettings.get( results => {
          $scope.settings = results;
        })
      }

      this.getBookmarks = () => {
        bookMarks.get( results => {
          $scope.folders = results;
        });
      }

      this.removeKey = index => {
        let tempkeys = Object.entries($scope.settings);
        let temparr = [];
        for (let i = 0 ; i < tempkeys.length ; i++){
          if (tempkeys[i][0] !== index){
            temparr.push([tempkeys[i][0], tempkeys[i][1]])
          }
        }
        for (let i = 0 ; i < temparr.length; i++){
          $scope.settings[i] = temparr[i][1]
        }
        let removedindex = temparr.length++
        $scope.settings[removedindex] = undefined;
        userSettings.save($scope.settings)
        userSettings.get( results => {
          $scope.settings = results;
        })
        $timeout()
      }

      this.$onInit = () => {

        panel.getBookmarks();
        panel.getSettings();
        //important for lifehook cycle
        $timeout()

      }

    },

    template: `
    <div>
      <div class="form-group">

        <div>
          <small> Hotkey 1 quick-folder </small>
          <div class="input-group">
          <input name="folders" id="folders" type="text" placeholder="hotkey 1" ng-model="settings[1]" uib-typeahead="bm as bm.title for bm in folders | filter:$viewValue | limitTo:8" class="form-control" typeahead-on-select="$ctrl.register()">
            <span class="input-group-btn">
              <button class="btn btn-default" type="button" ng-click="$ctrl.removeKey('1')">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
              </button>
            </span>
          </div>
        <div>

        <div ng-if="settings[1]">
          <small> Hotkey 2 quick-folder </small>
          <div class="input-group">
          <input name="folders" id="folders" type="text" placeholder="hotkey 2" ng-model="settings[2]" uib-typeahead="bm as bm.title for bm in folders | filter:$viewValue | limitTo:8" class="form-control" typeahead-on-select="$ctrl.register()">
            <span class="input-group-btn">
              <button class="btn btn-default" type="button" ng-click="$ctrl.removeKey('2')">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
              </button>
            </span>
          </div>
        </div>

        <div ng-if="settings[2]">
          <small> Hotkey 3 quick-folder </small>
          <div class="input-group">
          <input name="folders" id="folders" type="text" placeholder="hotkey 3" ng-model="settings[3]" uib-typeahead="bm as bm.title for bm in folders | filter:$viewValue | limitTo:8" class="form-control" typeahead-on-select="$ctrl.register()">
            <span class="input-group-btn">
              <button class="btn btn-default" type="button" ng-click="$ctrl.removeKey('3')">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
              </button>
            </span>
          </div>
        </div>

        <small>&nbsp</small>
        <button class="btn btn-primary" id="widebutt" ng-click="$ctrl.openShortcuts()" width="100%">Hotkey-bindings</button>
      </div>
    </div>
    `

  });
angular.module('hotmap')

  .component('settingsPanel', {

    bindings: {
      toggleTheme: '&',
    },

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
        let removedindex = temparr.length;
        console.log('the removed index will be: ', removedindex)
        $scope.settings[removedindex] = undefined;
        console.log('The settings before a save are: ', $scope.settings)
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
    <div class="papapanel">

      <div class="form-group">

        <div>
          <small>mapped folder 1</small>
          <div class="input-group">
          <input name="folders" id="folders" type="text" placeholder="hotkey 1" ng-model="settings[1]" uib-typeahead="bm as bm.title for bm in folders | filter:$viewValue | limitTo:8" class="form-control" typeahead-on-select="$ctrl.register()" autofocus>
            <span class="input-group-btn">
              <button class="btn btn-default" type="button" ng-click="$ctrl.removeKey('1')">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
              </button>
            </span>
          </div>
        <div>

        <div ng-if="settings[1]">
          <small>mapped folder 2</small>
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
          <small>mapped folder 3</small>
          <div class="input-group">
          <input name="folders" id="folders" type="text" placeholder="hotkey 3" ng-model="settings[3]" uib-typeahead="bm as bm.title for bm in folders | filter:$viewValue | limitTo:8" class="form-control" typeahead-on-select="$ctrl.register()">
            <span class="input-group-btn">
              <button class="btn btn-default" type="button" ng-click="$ctrl.removeKey('3')">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
              </button>
            </span>
          </div>
        </div>

        <div ng-if="settings[3]">
          <small>mapped folder 4</small>
          <div class="input-group">
          <input name="folders" id="folders" type="text" placeholder="hotkey 4" ng-model="settings[4]" uib-typeahead="bm as bm.title for bm in folders | filter:$viewValue | limitTo:8" class="form-control" typeahead-on-select="$ctrl.register()">
          <span class="input-group-btn">
            <button class="btn btn-default" type="button" ng-click="$ctrl.removeKey('4')">
              <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </button>
          </span>
        </div>
      </div>

        <small>&nbsp</small>
        
        <button class="btn btn-primary" id="widebutt" ng-click="$ctrl.openShortcuts()" width="100%">Hotkey-bindings</button>
        <button class="btn btn-primary" id="widebutt" ng-click="$ctrl.toggleTheme()">Theme toggle</button>
      </div>
    </div>
    `

  });
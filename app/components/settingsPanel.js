angular.module('hotmap')

  .component('settingsPanel', {

    controller(bookMarks, userSettings, $scope, $timeout) {

      const panel = this;

      this.getOptions = () => {
        userSettings.multiget( result => {
          $scope.theme = result.theme || 'light-mode'
          $scope.newfolderOption = result.option || true
          panel.updateTheme(result.theme);
        })
      }

      this.getMapkeys = () => {
        userSettings.get( results => {
          $scope.settings = results;
        })
      }

      this.getBookmarks = () => {
        bookMarks.get( results => {
          $scope.folders = results;
        });
      }

      this.toggleOption = () => {
        if ($scope.newfolderOption == true){
          $scope.newfolderOption = false;
          userSettings.singlesave('option', false)
        } else if ($scope.newfolderOption == false){
          $scope.newfolderOption = true;
          userSettings.singlesave('option', false)
        }
      }

      this.toggleTheme = () => {
        if ($scope.theme == 'light-mode'){
          panel.updateTheme('dark-mode');
          userSettings.singlesave('theme', 'dark-mode');
        } else {
          panel.updateTheme('light-mode');
          userSettings.singlesave('theme', 'light-mode');
        }
      }

      this.updateTheme = classname => {
        $scope.theme = classname;
        let body = angular.element(document).find('body');
        body.removeClass();
        body.addClass(classname);
        $timeout();
      }

      this.register = () => {
        userSettings.save($scope.settings)
      };

      this.openShortcuts = () => {
        chrome.tabs.create({
          url: 'chrome://extensions/configureCommands'
        });
      };

      // this.generateOptions = () => {
      //   console.log($scope.settings);
      //   console.log($scope.folders);
      //   let savedfolders = Object.entries($scope.settings);
      //   let selected = []
      //   let options = []
        
      //   savedfolders.forEach(folder => {
      //     selected.push(folder[1].id)
      //   })

      //   $scope.folders.forEach(folder => {
      //     if (!selected.includes(folder.id)){
      //       options.push(folder.id);
      //     }
      //   })
      //   console.log('options is: ', options)
      //   console.log('selected is: ', selected)
      // }

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
        $scope.settings[removedindex] = undefined;
        userSettings.save($scope.settings)
        userSettings.get( results => {
          $scope.settings = results;
        })
        $timeout()
      }

      this.$onInit = () => {

        panel.getOptions();
        panel.getMapkeys();
        panel.getBookmarks();

        //important for lifehook cycle
        $timeout()

      }

    },

    template: `
    <div class="papapanel">

      <div id="miniheader">mapped folders</div>

      <div class="form-group">

        <div>
          <div class="input-group">
          <input name="folders" id="folders" type="text" placeholder="enter a folder to map" ng-model="settings[1]" uib-typeahead="bm as bm.title for bm in folders | filter:$viewValue | limitTo:8" class="form-control" typeahead-on-select="$ctrl.register()" autofocus>
            <span class="input-group-btn">
              <button class="btn btn-default" type="button" ng-click="$ctrl.removeKey('1')">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
              </button>
            </span>
          </div>
          <div class="micro">hotkey 0</div>
        <div>

        <div ng-if="settings[1]">
          <div class="input-group">
          <input name="folders" id="folders" type="text" placeholder="enter a folder to map" ng-model="settings[2]" uib-typeahead="bm as bm.title for bm in folders | filter:$viewValue | limitTo:8" class="form-control" typeahead-on-select="$ctrl.register()">
            <span class="input-group-btn">
              <button class="btn btn-default" type="button" ng-click="$ctrl.removeKey('2')">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
              </button>
            </span>
          </div>
          <div class="micro">hotkey 1</div>
        </div>

        <div ng-if="settings[2]">
          <div class="input-group">
          <input name="folders" id="folders" type="text" placeholder="enter a folder to map" ng-model="settings[3]" uib-typeahead="bm as bm.title for bm in folders | filter:$viewValue | limitTo:8" class="form-control" typeahead-on-select="$ctrl.register()">
            <span class="input-group-btn">
              <button class="btn btn-default" type="button" ng-click="$ctrl.removeKey('3')">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
              </button>
            </span>
          </div>
          <div class="micro">hotkey 2</div>
        </div>

        <div ng-if="settings[3]">
          <div class="input-group">
          <input name="folders" id="folders" type="text" placeholder="enter a folder to map" ng-model="settings[4]" uib-typeahead="bm as bm.title for bm in folders | filter:$viewValue | limitTo:8" class="form-control" typeahead-on-select="$ctrl.register()">
          <span class="input-group-btn">
            <button class="btn btn-default" type="button" ng-click="$ctrl.removeKey('4')">
              <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </button>
          </span>
        </div>
        <div class="micro">hotkey 3</div>
      </div>
        
      <div>

        <div id="miniheader">options</div>

        <div class="row">
          <div class="col-lg-10">
            <div class="input-group">
            <button class="btn btn-default" id="widebutt" ng-click="$ctrl.toggleTheme()" width="100%">high contrast mode</button>
              <span class="input-group-btn">
                <button class="btn btn-primary" type="button">
                  <div ng-if="theme =='dark-mode'" id="settingtoggle"> ON </div>
                  <div ng-if="theme =='light-mode'" id="settingtoggle"> OFF </div>
                </button>
              </span>
            </div>
          </div>
        </div>
        <div class="micro">theme settings for dark-reading</div>

        <div class="row">
          <div class="col-lg-10">
            <div class="input-group">
            <button class="btn btn-default" id="widebutt" ng-click="$ctrl.toggleOption()" width="100%">create new folders</button>
              <span class="input-group-btn">
                <button class="btn btn-primary" type="button">
                  <div ng-if="newfolderOption" id="settingtoggle"> ON </div>
                  <div ng-if="!newfolderOption" id="settingtoggle"> OFF </div>
                </button>
              </span>
            </div>
          </div>
        </div>
        <div class="micro">hitting "enter" on a new title will create a new folder</div>

        <button class="btn btn-default" id="widebutt" ng-click="$ctrl.openShortcuts()" width="100%">hotkey-bindings</button>
        <div class="micro">launch chrome extension panel</div>
      </div>
    </div>
    `

  });
angular.module('hotmap', ['ui.bootstrap'])

  .component('popup', {

    controller(bookMarks, userSettings, $timeout, $scope) {

      const ctrl = this;
      this.folders = [];

      this.getBookmarks = () => {
        bookMarks.get( results => {
          $scope.folders = results;
        });
      }

      this.getTheme = () => {
        userSettings.singleget('theme', (result) => {
          $scope.theme = result.theme || 'light-mode'
          ctrl.updateTheme(result.theme);
        })
      }

      this.getTab = () => {
        chrome.tabs.getSelected(null, tab => {
          $scope.currentTab = tab.url;
          $scope.currentTitle = tab.title;
        })
      } 

      this.toggleTheme = () => {
        if ($scope.theme == 'light-mode'){
          ctrl.updateTheme('dark-mode');
          userSettings.singlesave('theme', 'dark-mode');
        } else {
          ctrl.updateTheme('light-mode');
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

      this.savebm = (item) => {
        ctrl.getTab()
        if (item) {
          bookMarks.save(
            $scope.selected.id,
            $scope.currentTitle,
            $scope.currentTab
          );
          // autoclose, disable for easier testing
          // window.close();
        } else {
          let folders = angular.element(document).find('folders');
          let newtitle = folders.context.activeElement.value;
          console.log('the newtitle would be: ', newtitle)
        }
      }


      this.checkSubmit = ($event) => {
        let keyCode = $event.keyCode;
        if (keyCode === 13){
          console.log('enter was hit!')
          ctrl.savebm();
        }
      }

      this.$onInit = () => {

        ctrl.getBookmarks();
        ctrl.getTheme();
        ctrl.getTab();

        $scope.openpanel = false;

        //important for lifehook cycle
        $timeout()

      };
    },

    template: 
    `
      <div class="motherdom">

        <div class="row" >

          <div class="col-xs-8">
            <h4 ng-if="!openpanel">Choose destination...</h4>
            <h4 ng-if="openpanel">Settings</h4>
          </div>
      
          <div class="col-xs-4" id="rightlean">
            <button class="btn btn-primary" type="viewchange" id="cogbutt" ng-click="openpanel = !openpanel">
              <span class="glyphicon glyphicon-cog" id="cog" aria-hidden="true"></span>
            </button>
          </div>

        </div>

        <div class="container-fluid">

          <div class="input-group"  ng-if="!openpanel">
              <input name="folders" id="folders" type="text" placeholder="enter a folder" ng-model="$parent.selected" uib-typeahead="bm as bm.title for bm in folders | filter:$viewValue | limitTo:8" class="form-control" typeahead-on-select="$ctrl.savebm($item)" ng-keypress="$ctrl.checkSubmit($event)" autofocus>
              <span class="input-group-addon"><span class="glyphicon glyphicon-saved" aria-hidden="true"></span></span>
          </div>

          <div class="settings-panel" ng-if="openpanel">
            <settings-panel toggle-theme="$ctrl.toggleTheme()"></settings-panel>
          </div>

        </div>

      </div>
    `
  });



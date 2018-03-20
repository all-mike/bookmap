angular.module('hotmap', ['ui.bootstrap'])

  .component('popup', {

    controller(bookMarks, userSettings, $timeout, $scope) {

      const ctrl = this;
      this.folders = [];

      this.savebm = () => {
        ctrl.getTab()
        console.log($scope.selected)
        bookMarks.save(
          $scope.selected.id,
          $scope.currentTitle,
          $scope.currentTab
        );
        // autoclose, disable for easier testing
        window.close();
      }

      this.getTab = () => {
        return chrome.tabs.getSelected(null, tab => {
          $scope.currentTab = tab.url;
          $scope.currentTitle = tab.title;
        })
      } 

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
          </div>

          <div class="col-xs-4" id="rightlean">
            <button class="btn btn-primary" type="viewchange" id="cogbutt" ng-click="openpanel = !openpanel">
              <span class="glyphicon glyphicon-cog" id="cog" aria-hidden="true"></span>
            </button>
          </div>

        </div>

        <div class="container-fluid">

          <!--<pre>Model: {{selected | json}}</pre>-->
          <div class="input-group"  ng-if="!openpanel">
            <input name="folders" id="folders" type="text" placeholder="enter a folder" ng-model="$parent.selected" uib-typeahead="bm as bm.title for bm in folders | filter:$viewValue | limitTo:8" class="form-control" typeahead-on-select="$ctrl.savebm()" autofocus>
            <span class="input-group-addon"><span class="glyphicon glyphicon-saved" aria-hidden="true"></span></span>
          </div>

          <div class="settings-panel" ng-if="openpanel">
            <settings-panel toggle-theme="$ctrl.toggleTheme()"></settings-panel>
          </div>

        </div>

      </div>
    `
  });



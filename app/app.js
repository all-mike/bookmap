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

      this.getTab = () => {
        chrome.tabs.getSelected(null, tab => {
          $scope.currentTab = tab.url;
          $scope.currentTitle = tab.title;
        })
      } 

      this.getOptions = () => {
        userSettings.multiget( result => {
          $scope.theme = result.theme || 'light-mode'
          $scope.newfolderOption = result.option || true
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

      // this.toggleOption = () => {
      //   if ($scope.newfolderOption){
      //     $scope.newfolderOption = false;
      //     userSettings.singlesave('option', false);
      //   } else {
      //     $scope.newfolderOption = true;
      //     userSettings.singlesave('option', true)
      //   }
      // }

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
          bookMarks.save($scope.selected.id, $scope.currentTitle, $scope.currentTab, success => {
            window.close();
          });
        } else {
          let folders = angular.element(document).find('folders');
          let newtitle = folders.context.activeElement.value;
          if ($scope.newfolderOption){
            bookMarks.newfolder(newtitle, successobj=> {
              bookMarks.save(successobj.id, $scope.currentTitle, $scope.currentTab, success => {
                console.log('made a new folder!!')
                window.close();
              });
            })
          } else {
            console.log('your option is switched off.')
            window.close();
          }
        }
      }

      this.checkSubmit = $event => {
        let keyCode = $event.keyCode;
        if (keyCode === 13){
          ctrl.savebm();
        }
      }

      this.$onInit = () => {

        ctrl.getOptions();
        ctrl.getBookmarks();
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
            <!--<h4 ng-if="openpanel">Settings</h4>-->
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
            <settings-panel></settings-panel>
          </div>

        </div>

      </div>
    `
  });



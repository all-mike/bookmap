angular.module('myapp')

  .component('main', {
    template: `

    <!-- === Header/Nav === -->
      <div> Folders: </div>
      SUP ALEX
      <div>
        <div ng-repeat="bm in $ctrl.folders">
          {{bm.title}}
        </div>
        <input ng-model="$ctrl.fview"></input>
        <button ng-click="$ctrl.say()">work</button>
      </div> 
    `,
    
    controller(bookMarks, $timeout) {
      // Variables to track
      const ctrl = this;
      this.folders = [];
      this.fview = 1;
      this.currentTab = '';
      this.say = () => {
        console.log('autoclick on', $scope.folders)
      }

      // Variables for new input
      this.inputTitle = '';

      // === Initialize ===
      this.$onInit = () => {

        //Get selected tab
        // chrome.tabs.getSelected(null, function(tab){
        //   currentTab = tab;
        //   inputTitle = currentTab.title
        // })

        bookMarks.get((results)=>{
          ctrl.folders = results;
        });        

        $timeout()

      };
    }
  });



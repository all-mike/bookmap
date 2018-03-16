angular.module('myapp', [])

  .component('main', {
    template: `

    <!-- === Header/Nav === -->
      <div> Folders: </div>
      SUP ALEX
      <div>
        <div ng-repeat="bm in $ctrl.folders">
          {{bm.title}}
        </div>
        <button ng-click="$ctrl.say()">work</button>
      </div> 
    `,
    
    controller(bookMarks) {
      // Variables to track
      const ctrl = this;
      this.folders = [];
      this.fview = 1;
      this.currentTab = '';
      this.say = () => {
        console.log(ctrl.folders)
      }

      // Variables for new input
      this.inputTitle = '';

      // === Initialize ===
      this.$onInit = function() {

        //Get selected tab
        chrome.tabs.getSelected(null, function(tab){
          currentTab = tab;
          inputTitle = currentTab.title
        })

        ctrl.folders = bookMarks.get();
        ctrl.say();

      };
    }
  });



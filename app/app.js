angular.module('myapp', [])

  .component('main', {

    controller(bookMarks, $timeout) {
      // Variables to track
      const ctrl = this;
      this.folders = [];
      this.fview = 1;
      this.currentTab = '';

      // Variables for new input
      this.searchKey = '';

      // Autocomplete logic
      this.autocomp = function(){}

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
    },

    template: 
    `
      <div>
        <!-- Header -->
        <h4> Folders: </h4>

        <!-- Folder Reaper -->
        <div class="container">
          <div ng-repeat="bm in $ctrl.folders">
            {{bm.title}}
          </div>
          <div custom-select="bm as bm.title for bm in $ctrl.folders" ng-model="$ctrl.searchKey"></div>
          <button ng-click="">Save</button>
        </div>



      </div>
    `
  });



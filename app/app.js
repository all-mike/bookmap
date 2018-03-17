angular.module('myapp', ['ui.bootstrap'])

  .component('main', {

    controller(bookMarks, $timeout, $scope) {
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


        // POSSIBLE NECESSARY TYPEAHEAD

        // $('#the-basics .typeahead').typeahead({
        //   hint: true,
        //   highlight: true,
        //   minLength: 1
        // },
        // {
        //   name: 'states',
        //   source: substringMatcher(states)
        // });

        
      // END POSSIBLE NECESSARY TYPEAHEAD

        bookMarks.get((results)=>{
          $scope.folders = results;
          console.log($scope.folders)
        });
        
        $scope.selected = undefined;

        $timeout()

      };
    },

    template: 
    `
      <div class="papa">
        <!-- Header -->
        <h4> Folders: </h4>

        <!-- Folder Reapeater 
        <div class="container">
          <div ng-repeat="bm in $ctrl.folders">
            {{bm.title}}
          </div>
        </div>
        -->

        <div class="container-fluid">
        <pre>Model: {{selected | json}}</pre>
          <div class="form-group">
            <input name="folders" id="folders" type="text" placeholder="enter a folder" ng-model="selected" uib-typeahead="bm for bm in folders | filter:$viewValue | limitTo:8" class="form-control">
          </div>
          <button class="btn btn-success" type="submit">Submit</button>
        </div>

        
        

      </div>
    `
  });



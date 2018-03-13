// your angular code here

angular.module('myapp', [])

  .component('main', {
    template: `

    <!-- === Header/Nav === -->
      <div> does this even work?</div>
    `,
    controller: function($http) {

      // === Initialize ===
      this.$onInit = function() {
        console.log('working')
      };
    }
  });



(function() {
  angular.module('angular-todo').controller('NewItemController', function(Items, $state) {
    this.newItemContent = '';

    this.addNewItem = function() {
      Items.create(this.newItemContent);
      this.newItemContent = '';
      $state.reload();
    }
  });
})();

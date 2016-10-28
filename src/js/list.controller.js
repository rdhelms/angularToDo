(function() {
  angular.module('angular-todo').controller('ListItemsController', function(Items, $state) {
    this.items = Items.fetch() || [{content: 'No past items'}];
    this.numItems = this.items.length;
    this.numIncomplete = getIncompleteCount(this.items);
    this.sortType = 'all';
    this.sortBy = {
      key: '$',
      exact: false,
      value: ''
    };

    $('.new-todo').focus();

    function getIncompleteCount(items) {
      var count = 0;
      items.forEach(function(item) {
        if (!item.completed) {
          count++;
        }
      });
      return count;
    }

    this.deleteCompleted = function() {
      Items.deleteCompleted();
      $state.reload();
    }

    this.updateItems = function(item) {
      Items.updateItems(this.items);
      $state.reload();
    };

    this.delete = function(item) {
      Items.delete(item);
      $state.reload();
    };

    this.toggleComplete = function(item) {
      item.completed = !item.completed;
      this.numIncomplete = getIncompleteCount(this.items);
      Items.updateItems(this.items);
      $state.reload();
    };
  });
})();

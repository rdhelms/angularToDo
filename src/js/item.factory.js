(function() {
  angular.module('angular-todo').factory('Item', function() {
    return function Item(content) {
      this.id = Date.now();
      this.content = content || 'No content';
      this.timeUpdated = Date.now();
      this.completed = false;
    };
  });
})();

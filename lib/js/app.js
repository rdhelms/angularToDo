(function() {
  "use strict";

  angular.module('angular-todo', ['ui.router', 'LocalStorageModule'])
        .config(function($stateProvider, $urlRouterProvider) {
          $urlRouterProvider.otherwise('/');

          $stateProvider.state('todo', {
            url: '/',
            templateUrl: 'index.html',
            views: {
              'new-item': {
                templateUrl: 'src/views/new-item.tpl.html',
                controller: 'NewItemController as newCtrl'
              },
              'list-items': {
                templateUrl: 'src/views/list-items.tpl.html',
                controller: 'ListItemsController as listCtrl'
              }
            }
          })


        });
})();
;(function() {
  angular.module('angular-todo').factory('Item', function() {
    return function Item(content) {
      this.id = Date.now();
      this.content = content || 'No content';
      this.timeUpdated = Date.now();
      this.completed = false;
    };
  });
})();
;(function() {
  angular.module('angular-todo').service('Items', function(Item, localStorageService) {
    function getItems() {
      return localStorageService.get('toDoItems') || [];
    }

    function setItems(items) {
      localStorageService.set('toDoItems', items);
    }

    function findItemById(itemsOld, idToFind) {
      var itemFound;
      itemsOld.forEach(function(itemOld) {
        if (itemOld.id === idToFind) {
          itemFound = itemOld;
        }
      });
      return itemFound;
    }

    this.deleteCompleted = function() {
      var items = getItems();
      var newItems = [];
      items.forEach(function(oldItem) {
        if (oldItem.completed === false) {
          newItems.push(oldItem);
        }
      });
      setItems(newItems);
    }
    this.updateItems = function(items) {
      setItems(items);
    };
    this.fetch = function() {
      return getItems();
    };
    this.create = function(itemContent) {
      var items = getItems();
      var newItem = new Item(itemContent);
      items.push(newItem);
      setItems(items);
    };
    this.reset = function() {
      var items = [];
      setItems(items);
    };
    this.delete = function(item) {
      var items = getItems();
      var newItems = [];
      items.forEach(function(oldItem) {
        if (oldItem.id !== item.id) {
          newItems.push(oldItem);
        }
      });
      setItems(newItems);
    }

  });
})();
;(function() {
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
;(function() {
  angular.module('angular-todo').controller('NewItemController', function(Items, $state) {
    this.newItemContent = '';

    this.addNewItem = function() {
      Items.create(this.newItemContent);
      this.newItemContent = '';
      $state.reload();
    }
  });
})();

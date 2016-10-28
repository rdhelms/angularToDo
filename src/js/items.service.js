(function() {
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

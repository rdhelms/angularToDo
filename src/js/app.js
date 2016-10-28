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

angular.module('eCommerceApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('products', {
      url: '/products',
      templateUrl: './prodTmpl.html',
      controller: 'mainCtrl'
    })
    .state('admin', {
      url: '/admin',
      templateUrl: './adminTmpl.html',
      controller: 'adminCtrl'
    });
    $urlRouterProvider.otherwise('/products');
});

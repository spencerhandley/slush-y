;(function(){
  'use strict';
  //Setting up route
  angular
    .module('administration')
    .config( Configuration );

  /* @inject */
  function Configuration($stateProvider) {
    // administration state routing
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/modules/administration/views/admin.view.html',
        abstract:true,
      })
      .state('admin.profile', {
        url: '/profile',
        templateUrl: 'app/modules/administration/views/profile/profile.view.html',
        controller: 'ProfileController as vm',
        authenticate:true,
        resolve: {
          Resolved: Resolved
        }
      })
      .state('admin.profile-edit', {
        url: '/profile-edit',
        templateUrl: 'app/modules/administration/views/profile/edit-profile.view.html',
        controller: 'ProfileController as vm',
        authenticate:true,
        resolve: {
          Resolved: Resolved
        }
      })
      .state('admin.settings', {
        url: '/settings',
        templateUrl: 'app/modules/administration/views/settings/change-password.view.html',
        controller: 'SettingsController as vm',
        authenticate:true,
        resolve: {
          Resolved: Resolved
        }
      })
      .state('admin.accounts-list', {
        url: '/accounts',
        templateUrl: 'app/modules/administration/views/accounts/accounts.list.view.html',
        controller: 'AccountsController as vm',
        authenticate:true,
        resolve: {
          resolvedAccounts: resolvedUsers
        }
      })
      .state('admin.account-detail', {
        url: '/accounts/:id',
        templateUrl: 'app/modules/administration/views/accounts/account.detail.view.html',
        controller: 'AccountDetailController as vm',
        authenticate:true,
        resolve: {
          ResolvedAccount: ResolvedAccount
        }
      })
      .state('admin.account-edit', {
        url: '/accounts/:id/edit',
        templateUrl: 'app/modules/administration/views/accounts/account.edit.view.html',
        controller: 'AccountDetailController as vm',
        authenticate:true,
        resolve: {
          ResolvedAccount: ResolvedAccount
        }
      })


    ////////////////////


    /* @inject */
    function resolvedUsers(User){<% if(restangular){ %>
      return User.getList()<% } %><% if(http){ %>
      return User.all()<% } %>
        .then( function ( response ){<% if(restangular){ %>
          return response;<% } %><% if(http){ %>
          return response.data;<% } %>
        });
    }

    /* @inject */
    function Resolved(User, $storage){<% if(restangular){ %>
      var user = $storage.getObject('user');
      return User.one(user._id).get()<% } %><% if(http){ %>
      return User.getMe()<% } %>
        .then(function ( response ){<% if(restangular){ %>
          return response;<% } %><% if(http){ %>
          return response.data;<% } %>
        });
    }

    /* @inject */
    function ResolvedAccount(User, $stateParams){<% if(restangular){ %>
      return User.one($stateParams.id).get()<% } %><% if(http){ %>
      return User.one($stateParams.id)<% } %>
        .then(function ( response ){<% if(restangular){ %>
          return response;<% } %><% if(http){ %>
          return response.data;<% } %>
        });
    }

  }

}).call(this);
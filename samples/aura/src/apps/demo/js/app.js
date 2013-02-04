if (typeof Object.create !== 'function') {
  Object.create = function(o) {
    function F() {}
    F.prototype = o;

    return new F();
  };
}

// Starts main modules
// Publishing from core because that's the way that Nicholas did it...
define(['aura_core', 'perms', 'backboneSandbox'], function(core, permissions, backboneSandbox) {
  'use strict';

  core.getSandbox = function(sandbox) {
    return backboneSandbox.extend(sandbox);
  };

  core.start({
    'test': {
      channel: 'paginatedProjectList',
      options: {
        element: '#controlsapp'
      }
    },
    'search': {
      channel: 'paginatedProjectList',
      options: {
        element: '#search-box'
      }
    },
    'filters-bar': {
      channel: 'paginatedProjectList',
      options: {
        element: '#filters-bar'
      }
    },
    'product-panel': {
      channel: 'paginatedProjectList',
      options: {
        element: '#product-panel'
      }
    },
  });


});

define(['sandbox', './views/app'], function(sandbox, AppView) {
  'use strict';

  return function(options) {
    new AppView({
      el: sandbox.dom.find(options.element)
    });

    sandbox.on('initialized', function (caller, id) {
        alert(111);
    });

  };

});

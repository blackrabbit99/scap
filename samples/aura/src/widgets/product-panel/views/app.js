define(['sandbox', 
    "text!../templates/product-panel.tpl"], function(sandbox, template, Mediator){


  var AppView = sandbox.mvc.View({
    
    template: template,

    initialize:function(){
      this.render();
      sandbox.on('task', function (caller, id) {
        alert(111);
      });
    },
    
    render: function(){
      this.$el.html(this.template);
    }
  });
  return AppView;
  
  
});

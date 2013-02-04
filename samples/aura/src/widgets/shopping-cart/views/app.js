define(['sandbox', "text!../templates/shopping-cart.tpl"], function(sandbox, template){


  var AppView = sandbox.mvc.View({
    
    template: template,

    initialize:function(){
      this.render();
    },
    
    render: function(){
      this.$el.html(this.template);
    }
  });
  return AppView;
  
  
});
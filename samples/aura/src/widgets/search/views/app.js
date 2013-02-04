define(['sandbox', "text!../templates/search.tpl"], function(sandbox, template){


  var AppView = sandbox.mvc.View({
    
    template: template,
    controls:{
      input : sandbox.dom.find("#search_input"),
      button : sandbox.dom.find("#search_button"),
      reset : sandbox.dom.find("#quit_search")
    },
    events: {
      'click #search_button': 'handleSearch',
      'click #quit_search': 'quitSearch'
    },

    initialize:function(){
      this.render();
      this.controls.input = sandbox.dom.find("#search_input");
      this.controls.button = sandbox.dom.find("#search_button");
      this.controls.reset = sandbox.dom.find("#quit_search");
    },
    
    render: function(){
      this.$el.html(this.template);
    },

    handleSearch : function () {
            var query = this.controls.input.value;
            console.log(sandbox);
            sandbox.emit('task', {data: 132});
            /*if (query) {
                sb.notify({
                    type : 'perform-search',
                    data : query
                });
            }*/
        },

        quitSearch : function () {
            this.controls.input.value = "";
            sb.notify({
                type : 'quit-search',
                data : null
            });
        }
  });
  return AppView;
  
  
});
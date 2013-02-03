Kernel.module.define('search-box', {
    container: 'search-box',
    controls: {
        input : null,
        button : null,
        reset  : null
    },
    init : function () {
        var module = this;

        module.controls.input = module.hub.find(this.container, "#search_input")[0];
        module.controls.button = module.hub.find(this.container, "#search_button")[0],
        module.controls.reset  = module.hub.find(this.container, "#quit_search")[0]

        module.hub.addEvent(module.controls.button, "click", this.handleSearch);
        module.hub.addEvent(module.controls.reset, "click", this.quitSearch);

    },
    destroy : function () {
        module.hub.removeEvent(button, "click", this.handleSearch);
        module.hub.removeEvent(button, "click", this.quitSearch);
        input = button = reset = null;
    },
    handleSearch : function () {
        var module = this,
            query = module.controls.input.value;

        if (query) {
            module.hub.broadcast('perform-search', query);
        }
    },
    quitSearch : function () {
        var module = this;
        module.controls.input.value = "";
        module.hub.broadcast('quit-search', {data: null});

    }
});


Kernel.module.define('filters-bar', {
    options: {
        filter: null
    },
    init : function () {
        var module = this;
        module.options.filter = module.hub.find('filters-bar', 'a');
        module.hub.addEvent(module.options.filter, "click", this.filterProducts);
    }, 
    destroy : function () {
        var module = this;
        module.hub.removeEvent(module.options.filter, "click", this.filterProducts);
    },
    filterProducts : function (e) {
        var module = this;
        module.hub.broadcast('change-filter',e.currentTarget.innerHTML);
    }
});

Kernel.module.define('product-panel', {
    options: {
        products: null
    },
    init : function () {
        var module = this;
        module.options.products = module.hub.find('product-panel', 'li');
        module.hub.listen('change-filter', this.change_filter);
        module.hub.listen('reset-filter', this.reset);
        module.hub.listen('perform-search', this.search);
        module.hub.listen('quit-search', this.reset);
        
        module.eachProduct(function (product) {
                module.hub.addEvent(product, 'click', module.addToCart);        
            });
    }, 
    destroy : function () {
         
    },
    
    eachProduct: function(fn) {
        var i = 0, product;
        for ( ; product = this.options.products[i++]; ) {
            fn(product);
        }
    },

    reset: function(){
        this.eachProduct(function (product) {
            product.style.opacity = '1';        
        });
    },
    change_filter : function (filter) {
        this.reset();
        this.eachProduct(function (product) {
            if (product.getAttribute("data-8088-keyword").toLowerCase().indexOf(filter.toLowerCase()) < 0) {
                product.style.opacity = '0.2';
            }
        });
    },
    search : function (query) {
        this.reset();
        query = query.toLowerCase();
        this.eachProduct(function (product) {
            if (product.getElementsByTagName('p')[0].innerHTML.toLowerCase().indexOf(query) < 0) {
                product.style.opacity = '0.2';
            }
        });
    },
    addToCart : function (e) {
        var li = e.currentTarget,
            module = this;
        
        module.hub.broadcast('add-item', {  id : li.id, 
                                            name : li.getElementsByTagName('p')[0].innerHTML, 
                                            price : parseInt(li.id, 10) 
                                        }
        );
    }

});

Kernel.module.define('shopping-cart', {
    options: {
        cart : null,
        cartItems : {}
    },
    init: function(){
        var module = this;
        module.options.cart = module.hub.find('shopping-cart',"ul")[0];

        module.hub.listen('add-item', function(data){
            module.addItem(data);
        });
    },
    destroy: function(){

    },
    addItem: function(product){
        var module = this;
        var entry; 
        entry = module.hub.find('shopping-cart','#cart-' + product.id + ' .quantity')[0];
        if (entry) {
            entry.innerHTML = parseInt(entry.innerHTML, 10) + 1;
            module.options.cartItems[product.id]++;
        } else {
            entry = module.hub.create_element("li", { id : "cart-" + product.id, children : [
                        module.hub.create_element("span", { 'class' : 'product_name', text : product.name }),
                        module.hub.create_element("span", { 'class' : 'quantity', text : '1' }),
                        module.hub.create_element("span", { 'class' : 'price', text : '$' + product.price.toFixed(2) })
                    ],
                    'class' : 'cart_entry' });
            module.options.cart.appendChild(entry);
            module.options.cartItems[product.id] = 1;
        }
    }
});


Kernel.register([
        {id: 'search-box', type: 'search-box'},
        {id: 'filters-bar', type: 'filters-bar'},
        {id: 'product-panel', type: 'product-panel'},
        {id: 'shopping-cart', type: 'shopping-cart'}
    ]);
Kernel.start([
           {id: 'search-box'},
           {id: 'filters-bar'},
           {id: 'product-panel'},
           {id: 'shopping-cart'}
        ]);
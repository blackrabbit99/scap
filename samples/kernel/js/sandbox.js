Kernel.hub.define('main', {
            find : function (container,selector) {
                return $('#' + container).find(selector);
            },
            addEvent : function (element, type, fn) {
                Kernel.dom.bind(element, type, fn);           
            },
            removeEvent : function (element, type, fn) {
                Kernel.dom.unbind(element, type, fn);              
            },
            ignore : function (evts) {
                if (Kernel.is_arr) {
                    Kernel.removeEvents(evts, module_selector);
                }   
            },
            create_element : function (el, config) {
                var i, child, text;
                el = Kernel.dom.create(el);
                
                if (config) {
                    if (config.children && Kernel.is_arr(config.children)) {
                        i = 0;
                        while(child = config.children[i]) {
                            el.appendChild(child);
                            i++;
                        }
                        delete config.children;
                    }
                    if (config.text) {
                        el.appendChild(document.createTextNode(config.text));
                        delete config.text;
                    }
                    Kernel.dom.apply_attrs(el, config);
                }
                return el;
            }
})
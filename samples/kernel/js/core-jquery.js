Kernel.extend(Kernel, {
  dom: {
	query : function (selector, context) {
				var ret = {}, that = this, jqEls, i = 0;

				if (context && context.find) {
					jqEls = context.find(selector);
				} else {
					jqEls = jQuery(selector);
				}
				
				ret = jqEls.get();
				ret.length = jqEls.length;
				ret.query = function (sel) {
					return that.query(sel, jqEls);
				}
				return ret;
			},
			bind : function (element, evt, fn) {
				if (element && evt) {
					if (typeof evt === 'function') {
						fn = evt;
						evt = 'click';
					}
					jQuery(element).bind(evt, fn);
				} else {
					// log wrong arguments
				}
			},
			unbind : function (element, evt, fn) {
				if (element && evt) {
					if (typeof evt === 'function') {
						fn = evt;
						evt = 'click';
					}
					jQuery(element).unbind(evt, fn);
				} else {
					// log wrong arguments
				}
			},
			create: function (el) {
				return document.createElement(el);        
			},
			apply_attrs: function (el, attrs) {
				jQuery(el).attr(attrs);             
			}
		},
		is_arr : function (arr) {
			return jQuery.isArray(arr);         
		},
		is_obj : function (obj) {
			return jQuery.isPlainObject(obj);         
		}
});
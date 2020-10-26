/*!
 * HSG script v0.5.11
 * created by yariv arbiv
 * silione@gmail.com
 * 
 */

;
;(function(core) {

	if (!window.jQuery) {
		throw new Error("HSG requires jQuery");
	}

	if (window && window.jQuery) {
		core(window, window.jQuery, window.document);
	}

})(function(global, $, doc) {

  "use strict";

  var HSG = $.HSG || {},
    $html = $("html"),
    $win = $(window),
    htmlClass = [];

  if (HSG.fn) {
    return HSG;
  }


  // build HSG main function
  HSG.fn = function(command, options) {
    var cmd, component, method,
    	args = arguments;

	cmd = command.match(/^([a-z\-]+)(?:\.([a-z]+))?/i);

    if (!cmd) {
    	throw new Error("HSG command is not valid");
    }

	component = cmd[1];	
	method = cmd[2];

    if (!component) {
    	throw new Error("HSG component name is missing");
    }

    if (!HSG[component]) {
      $.error("HSG component '" + component + "' does not exists");
      return this;
    }

    return this.each(function() {
      var $this = $(this),
        data = $this.data(component);

        if (!data) {
          	$this.data(component, (data = HSG[component](this, method ? undefined : options)));
        }

        if (method) {
        	if (!data[method]) {
        		throw new Error("HSG component '" + component + "' dont have '" + method + "' method");
        	}

          	return data[method].apply(data, Array.prototype.slice.call(args, 1));
        }
    });
  };


  // build supports
  HSG.support = {};


  // check for browser svg support
  HSG.support.svg = (function() {
    return !!('createElementNS' in document && document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect);
  })();


  // check for browser transition support
  HSG.support.transition = (function() {
    var transitionEnd = (function() {
      var element = doc.body || doc.documentElement,
        transEndEventNames = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'oTransitionEnd otransitionend',
        transition: 'transitionend'
        }, name;

      for (name in transEndEventNames) {
        if (element.style[name] !== undefined) return transEndEventNames[name];
      }
    }());

    return transitionEnd && { end: transitionEnd };
  })();


  /**
   * check for browser animation support
   * @return {[type]}       [description]
   */
  HSG.support.animation = (function() {

    var animationEnd = (function() {

      var element = doc.body || doc.documentElement,
        animEndEventNames = {
        WebkitAnimation: 'webkitAnimationEnd',
        MozAnimation: 'animationend',
        OAnimation: 'oAnimationEnd oanimationend',
        animation: 'animationend'
        }, name;

        for (name in animEndEventNames) {
          if (element.style[name] !== undefined) return animEndEventNames[name];
        }
    }());

    return animationEnd && { end: animationEnd };
  })();


  // check for browser touch support
  HSG.support.touch = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
  
  
  /**
   * check for browser input type by type name
   * @param  {string} prop) [property name]
   * @return {boolean}
   */
  HSG.support.inputType = (function(prop) {
            var inputElem  = document.createElement('input'), 
                smile = ':)',
                inputs = {},
                docElement = document.documentElement,
                bool, inputElemType, defaultView;

            inputElem.setAttribute('type', inputElemType = prop);
            bool = inputElem.type !== 'text';

            if ( bool ) {

                inputElem.value         = smile;
                inputElem.style.cssText = 'position:absolute;visibility:hidden;';

                if ( /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ) {

                  docElement.appendChild(inputElem);
                  defaultView = document.defaultView;

                  bool =  defaultView.getComputedStyle &&
                          defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
                          (inputElem.offsetHeight !== 0);

                  docElement.removeChild(inputElem);

                } else if ( /^(search|tel)$/.test(inputElemType) ){
                  // Spec doesn't define any special parsing or detectable UI behaviors so we pass these through as true
                } else if ( /^(url|email)$/.test(inputElemType) ) {
                  bool = inputElem.checkValidity && inputElem.checkValidity() === false;
                } else {
                  // If the upgraded input compontent rejects the :) text, we got a winner
                  bool = inputElem.value != smile;
                }
            }
            
            return !!bool;
        });


  // build utils
  HSG.utils = {};


  /**
   * debounce ability
   * @param  {function} func      [description]
   * @param  {number} wait      [milliseconds]
   * @param  {[type]} immediate [trigger the function on the leading edge, instead of the trailing]
   * @return {function}           [description]
   */
  HSG.utils.debounce = function(func, wait, immediate) {
      var timeout;
      return function() {
          var context = this, args = arguments;
          var later = function() {
              timeout = null;
              if (!immediate) func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
      };
  };


  /**
   * remove css rules from styles
   * @param  {regular expression} selectorRegEx
   */
  HSG.utils.removeCssRules = function(selectorRegEx) {
      var idx, idxs, stylesheet, _i, _j, _k, _len, _len1, _len2, _ref;

      if(!selectorRegEx) return;

      setTimeout(function(){
          try {
            _ref = document.styleSheets;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              stylesheet = _ref[_i];
              idxs = [];
              stylesheet.cssRules = stylesheet.cssRules;
              for (idx = _j = 0, _len1 = stylesheet.cssRules.length; _j < _len1; idx = ++_j) {
                if (stylesheet.cssRules[idx].type === CSSRule.STYLE_RULE && selectorRegEx.test(stylesheet.cssRules[idx].selectorText)) {
                  idxs.unshift(idx);
                }
              }
              for (_k = 0, _len2 = idxs.length; _k < _len2; _k++) {
                stylesheet.deleteRule(idxs[_k]);
              }
            }
          } catch (_error) {}
      }, 0);
  };


  /**
   * check device using useragent
   * @param  {string}  device
   * @return {Boolean}
   */
  HSG.utils.isDevice = function(device) {
    switch (device) {
      case "ios":
       return /iPhone|iPad|iPod/i.test(navigator.userAgent);

      case "android":
       return /Android|android/i.test(navigator.userAgent);

      default:
       return /Android|android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

  };


  /**
   * check if element is in view
   * @param  {string}  element [selector]
   * @param  {object}  options
   * @return {Boolean}
   */
  HSG.utils.isInView = function(element, options) {

    var $element = $(element);

    if (!$element.is(":visible")) {
      return false;
    }

    var windowLeft = $win.scrollLeft(),
      windowTop = $win.scrollTop(),
      offset = $element.offset(),
      left = offset.left,
      top = offset.top;

    options = $.extend({
      topoffset: 0,
      leftoffset: 0
    }, options);

    if (top + $element.height() >= windowTop && top - options.topoffset <= windowTop + $win.height() &&
        left + $element.width() >= windowLeft && left - options.leftoffset <= windowLeft + $win.width()) {
        return true;
      } else {
        return false;
      }
  };


  /**
   * scroll screen to specific point
   * @param  {string} element [selector]
   * @param  {object} options
   */
  HSG.utils.scrollTo = function(element, options) {
    var $element = $(element);

    if (!$element.is(":visible")) {
      return false;
    }

    options = $.extend({
      duration: 400
    }, options);

    $('html, body').animate({
        scrollTop: $element.offset().top
    }, options.duration);
  };


  /**
   * create options object from string
   * @param  {string} string [options written as string]
   * @return {object}        [object options]
   */
  HSG.utils.options = function(string) {
  	var start, options = {};

    if ($.isPlainObject(string)) {
      return string;
    }

    start = (string ? string.indexOf("{") : -1 );

    if (start != -1) {
      try {
        options = (new Function("", "var json = " + string.substr(start) + "; return JSON.parse(JSON.stringify(json));"))();
      } catch(e) {}
    }

    return options;
  };


  /**
   * get script source.
   * needed for dynamic script loading. example: datepicker
   * @return {string}   [script source]
   */
   HSG.utils.scriptSource = (function() {
        var scripts = document.getElementsByTagName('script'),
            script = scripts[scripts.length - 1],
            src;

        src = (script.getAttribute.length !== undefined) ? script.getAttribute('src') : script.getAttribute('src', 2);

        return src.substring(0, src.lastIndexOf("/"));
    }());


  /**
   * object containing files loaded and loading
   */
  HSG.utils.files = { loading:{}, loaded:{} };
  

  /**
   * load file
   * @param  {string} filename
   * @param  {[type]} cbk      [callback function]
   */
  HSG.utils.loadfile = function(filename, cbk) {
	$.ajaxSetup({ cache: true });

	if (HSG.utils.files.loaded[filename]) {
	  cbk(HSG.utils.files.loaded[filename].data,
			HSG.utils.files.loaded[filename].textStatus,
			HSG.utils.files.loaded[filename].jqxhr);
	} else if (HSG.utils.files.loading[filename]) {
	    $win.on( "hsg.fileloaded", function( event, loaded_file_name ) {
	       if (loaded_file_name === filename){
	       		cbk(HSG.utils.files.loaded[filename].data, 
	       			HSG.utils.files.loaded[filename].textStatus, 
	       			HSG.utils.files.loaded[filename].jqxhr);
	       }
	    });
	  
	}else{
	   HSG.utils.files.loading[filename] = true;

	   // load script using jquery ajax call
	   $.getScript(HSG.utils.scriptSource + filename, function(data, textStatus, jqxhr) {
	       HSG.utils.files.loaded[filename]= {data:data, textStatus:textStatus, jqxhr:jqxhr};
	       delete HSG.utils.files.loading[filename];
	       cbk(data, textStatus, jqxhr);
	       $win.trigger("hsg.fileloaded", filename);
	   });
	}
  };
  
  
  /**
   * load scripts
   * @param  {array}   arr  [array of script filenames]
   * @param  {Function} done [run after all files loaded]
   */
  	HSG.utils.loadscripts = function (arr, done){
		var current = 0;

		function loopFn(nextTask, value) {
			HSG.utils.loadfile(value, nextTask);
		}

		loopFn(function iterate() {
			if (++current < arr.length) {
				loopFn(iterate, arr[current]);
			} else {
				done();
			}
		}, arr[current]);
	};


  // declare HSG
  $.HSG = HSG;
  $.fn.hsg = HSG.fn;


  $(function(){
    $(document).trigger("hsg-domready");

    // remove css hover rules for touch devices
    if (HSG.support.touch) {
        HSG.utils.removeCssRules(/\.hsg-(?!navbar).*:hover/);
    }
  });


  if (!HSG.support.touch) htmlClass.push("hsg-no-touch");
  if (!HSG.support.animation) htmlClass.push("hsg-no-animation");
  if (!HSG.support.svg) htmlClass.push("hsg-no-svg");

  if (htmlClass.length) $html.addClass(htmlClass.join(" "));

  return HSG;
});
;(function($, HSG) {

  "use strict";

  HSG.components = {};

  HSG.component = function(name, def) {

    var fn = function(element, options) {
      var $this = this;

      this.element = element ? $(element) : null;
      this.options = $.extend(true, {}, this.defaults, options);

      // attach fn to element
      if (this.element) {
        this.element.data(name, this);
      }

      if (!this.element.data(name)) return;

      this.element.trigger("hsg." + name + ".initiating", this);
      this.init();
      this.element.trigger("hsg." + name + ".init", this);
    };


    $.extend(true, fn.prototype, {

      defaults: {},
      cls: {},

      init: function() {},

      set: function(params) {
      	var data, fnc, option, value;

      	if (!params || $.isEmptyObject(params)) {
      		throw new Error("HSG cant call set option function without parameters");
      	}

		// get component object
      	data = this.element.data(name);

      	// get first key+value from object
      	for (option in params) break;
      	value = params[option];

      	// build function name (capitalize the option name)
      	fnc = "set" + option.charAt(0).toUpperCase() + option.slice(1);
      	
      	if (!data) {
      		throw new Error("HSG cant find component '" + name + "' on element to set option");
      	}

      	if (!data[fnc]) {
      		throw new Error("HSG cant find function '" + fnc + "' on component '" + name + "' ");
      	}

      	// run the option function
      	data[fnc](value);
      },

      trigger: function(evt, params) {
        return $(this.element || this).trigger(evt, params);
      },

      on: function() {
        return $(this.element || this).on.apply(this.element || this, arguments);
      },

      one: function() {
        return $(this.element || this).one.apply(this.element || this, arguments);
      },

      off: function(evt) {
        return $(this.element || this).off(evt);
      },

      find: function(selector) {
        return this.element ? this.element.find(selector) : $([]);
      }
    }, def);

    this.components[name] = fn;

    // set element and options
    this[name] = function() {
      var element, options;

      if (arguments.length) {
        switch(arguments.length) {
          case 1:
            if (typeof arguments[0] === "string" || arguments[0].nodeType || arguments[0] instanceof jQuery) {
            element = $(arguments[0]);
            } else {
            options = arguments[0];
            }
            break;

          case 2:
            element = $(arguments[0]);
            options = arguments[1];
            break;
        }
      }

      // return element fn if already attached to his data
      if (element && element.data(name)) {
        return element.data(name);
      }

      return (new HSG.components[name](element, options));
    };

    return fn;
  };

})(jQuery, jQuery.HSG);
;(function($, HSG) {

	"use strict";

	var $win = $(window), event = "resize orientationchange";

	HSG.component("gridMatch", {

		columns: null,
		elements: null,

		defaults: {
			target: null,
			row: false
		},

		init: function() {
			var $this = this;

			this.columns = this.element.children();
			this.elements = this.options.target ? this.element.find(this.options.target) : this.columns;

			if (!this.columns.length) return;

			$win.on(event, (function() {
				var fn = function() {
					$this.match();
				};

				$(function() {
					fn();
				});

				return HSG.utils.debounce(fn, 100);
			})());

			$(document).on("hsg-domready", function() {
				$this.columns = $this.element.children();
				$this.elements = $this.options.target ? $this.element.find($this.options.target) : $this.columns;
				$this.match();
			});

			return this;
		},

		match: function() {
			this.element.trigger("hsg.gridmatch.matching");

			this.revert();

			var firstVisible = this.columns.filter(":first:visible");

			if (!firstVisible.length) return;

			var stacked = Math.ceil(100 * parseFloat(firstVisible.css('width')) / parseFloat(firstVisible.parent().css('width'))) >= 100 ? true : false,
			max = 0,
			$this = this;

			if (stacked) return;

			if (this.options.row) {

				// force redraw
				this.element.width();

				// setTimeout is to let the rendering threads catch up.
				// http://stackoverflow.com/a/779785
				setTimeout(function(){
					var lastoffset = false,
					group = [];

					$this.elements.each(function(i) {
						var ele = $(this),
						offset = ele.offset().top;

						if(offset != lastoffset && group.length) {

							$this._matchHeights($(group));
							group  = [];
							offset = ele.offset().top;
						}

						group.push(ele);
						lastoffset = offset;
					});

					if(group.length) {
						$this._matchHeights($(group));
					}

				}, 0);
			} else {
				this._matchHeights(this.elements);
			}

			this.element.trigger("hsg.gridmatch.match");
			return this;
		},

		_matchHeights: function(elements) {
			var max = 0;

			if (elements.length < 2) return;

			elements.each(function() {
				max = Math.max(max, $(this).outerHeight());
			}).each(function() {
				var element = $(this),
				height  = max;

				element.css('min-height', height + 'px');
			});

		},

		revert: function() {
			this.elements.css("min-height", "");
			return this;
		}
	});


	// attach events
	$(document).on("hsg-domready", function(e) {
		$("[data-hsg-grid-match]").each(function() {
			var obj, ele = $(this);

			if (!ele.data("gridMatch")) {
				obj = HSG.gridMatch(ele, HSG.utils.options(ele.attr("data-hsg-grid-match")));
			}
		});
	});

})(jQuery, jQuery.HSG);
;(function($, HSG) {

	"use strict";

	HSG.component("stripCollapse", {
		cls: {
			strip: "hsg-strip",
			close: "hsg-strip-close",
			opening: "hsg-opening",
			title: "hsg-strip-title"
		},

		defaults: {
			head: ".hsg-strip-head",
			side: ".hsg-strip-side",
			body: ".hsg-strip-body",
			row: ".hsg-strip-row",
			content: ".hsg-strip-content",
			duration: 400,
			titleOpen: "לחץ לפתיחה של המקטע",
			titleClose: "לחץ לסגירה של המקטע"
		},

		init: function() {
			var $this = this,
        mq,
				$head = this.element.find(this.options.head),
				$side = this.element.find(this.options.side);

			if (!this.element.hasClass(this.cls.strip)) {
				throw new Error("HSG strip collapse must be used on hsg-strip");
			}


			// handle strip head
			$head
				.on("click.strip.hsg", function(e) {
					// dont trigger the strip collapse if we press on a link
					if ( e.target.nodeName !== "A") {
						e.preventDefault();
						$this.toggle();
					}
				})
				.on("keypress.strip.hsg", function(e) {
					// enter or space
					if(e.which === 13 || e.which === 32) {
						e.preventDefault();
						$(this).trigger("click.strip.hsg");
					}
				})


			// handle strip side
			$side
				.on("click.strip.hsg", function(e) {
					// by finding the display of the title we know if we are in collapse mode
					if ($this._isInCollpaseMode()) {
						e.preventDefault();
						$this.toggle();
					}
				})
				.on("keypress.strip.hsg", function(e) {
					// enter or space
					if(e.which === 13 || e.which === 32) {
						e.preventDefault();
						$(this).trigger("click.strip.hsg");
					}
				})


      function mediaQueryListener(mq) {
        if (mq.matches) {
          $side.prop("tabindex", "0");
          $head.removeAttr("tabindex");
        } else {
          $side.removeAttr("tabindex");
          $head.prop("tabindex", "0");
        }
      }

      mq = window.matchMedia( "(max-width: 1013px)" );
      mq.addListener(mediaQueryListener);
      mediaQueryListener(mq);


			this._attachAttributes();

			return this;
		},

		/**
		 * check if the strip is in collapse mode
		 * @return {Boolean}
		 */
		_isInCollpaseMode: function() {
			return this.element.find(this.options.side).css("display").toLowerCase() === "block";
		},

		/**
		 * attach the needed attributes (title and role)
		 */
		_attachAttributes: function() {
			var message = (this._isClose()) ? this.options.titleOpen : this.options.titleClose, 
				$side = this.element.find(this.options.side),
				$head = this.element.find(this.options.head);

			if (this._isInCollpaseMode()) {
				$side.attr("title", message).attr("role", "button");
				$head.removeAttr("title").removeAttr("role");
			} else {
				$head.attr("title", message).attr("role", "button");
				$side.removeAttr("title").removeAttr("role");
			}
		},

		toggle: function() {
			if (this._isClose()) {
				this.open();
			} else {
				this.close();
			}
		},

		/**
		 * check if strip is close
		 * @return {Boolean}
		 */
		_isClose: function() {
			return this.element.hasClass(this.cls.close);
		},

		_getBody: function() {
			// return all rows (first row is strip head) if exists
			if (this.element.find(this.options.row).length) {
				return this.element.find(this.options.row + ":not(:first)");
			} else {
				return (this.element.find(this.options.body).length) ? this.element.find(this.options.body) : this.element.find(this.options.content);
			}
		},

		close: function() {
			var $this = this;

			this.element.trigger("hsg.stripcollapse.closing");

			this._getBody().slideUp(this.options.duration, function() {
				$this.element.addClass($this.cls.close);
				$this._attachAttributes();
				$this.element.trigger("hsg.stripcollapse.close");
			});

		},

		open: function() {
			var $this = this,
			$body = this._getBody();

			this.element.trigger("hsg.stripcollapse.opening");

			this.element.addClass(this.cls.opening);

			$body.slideDown(this.options.duration, function() {
				$this.element.removeClass($this.cls.close).removeClass($this.cls.opening);
				$this._attachAttributes();

				if ( !HSG.utils.isInView($body, {topoffset: 0-$body.outerHeight()}) ) {
					HSG.utils.scrollTo($this.element);
				}

				$this.element.trigger("hsg.stripcollapse.open");
			});
		}
	});


	// attach
	$(document).on("hsg-domready", function(e) {
		$("[data-hsg-strip-collapse]").each(function() {
			var obj, ele = $(this);

			if (!ele.data("stripCollapse")) {
				obj = HSG.stripCollapse(ele, HSG.utils.options(ele.attr("data-hsg-strip-collapse")));
			}
		});
	});

})(jQuery, jQuery.HSG);
;(function($, HSG) {

	"use strict";

	HSG.component("tab", {
		cls: {
			active: "hsg-tab-active",
			header: "hsg-tab-header",
			content: "hsg-tab-content",
			disabled: "hsg-tab-disabled"
		},

		init: function() {
			var $this = this;

			this.element.find("." + this.cls.header).on("click.tab.hsg", function(e) {
				e.preventDefault();
				$this.open(this);
			});
			
			return this;
		},

		open: function(tab) {
			tab = isNaN(tab) ? $(tab) : this.element.find("." + this.cls.header).eq(tab - 1);
			var activeLi = tab.parent();

			if (!tab.length) {
				throw new Error("HSG tab you requested to open not exists");
			}

			this.element.trigger("hsg.tab.opening", [activeLi]);
			if (activeLi.hasClass(this.cls.disabled)) return;
			this.element.children().filter("." + this.cls.active).removeClass(this.cls.active);
			activeLi.addClass(this.cls.active);
			this.element.trigger("hsg.tab.open", [activeLi]);
		}
	});


	// attach
	$(document).on("hsg-domready", function(e) {
		$(".hsg-tab").each(function() {
			var obj, ele = $(this);

			if (!ele.data("tab")) {
				obj = HSG.tab(ele, HSG.utils.options(ele.attr("data-hsg-tab")));
			}
		});
	});

})(jQuery, jQuery.HSG);
;(function($, HSG) {

  "use strict";

  HSG.component("tableSide", {

	init: function() {
		var $table = this.element.find("> table");

		// scroll the table to the left (for RTL start)
		if ($table.length) {
			this.element.scrollLeft( $table.width() );
		}

		return this;
    }
  });


  // attach event
  $(document).on("hsg-domready", function(e) {
    $(".hsg-table-responsive").each(function() {
      var obj, ele = $(this);

      if (!ele.data("tableSide")) {
        obj = HSG.tableSide(ele, {});
      }
    });
  });

})(jQuery, jQuery.HSG);
;(function($, HSG) {

	"use strict";

	HSG.component("cube", {

		cls: {
			content: "hsg-cube-content",
			item: "hsg-cube-item",
			disabled: "hsg-cube-disabled",
			close: "hsg-cube-close",
			active: "hsg-cube-active",
			opening: "hsg-cube-opening"
		},

		defaults: {
			duration: 400
		},

		init: function() {
			var $this = this;

			this.element.find("." + this.cls.item).on("click.cubes.hsg", function(e) {
				e.preventDefault();
				$this.toggle(this);
			});

			this.element.find("." + this.cls.close).on("click.cubes.hsg", function(e) {
				e.preventDefault();
				$this.close(this);
			});

			return this;

		},

		toggle: function(item) {
			var activeItem = this._getCube(item);

			if (activeItem.hasClass(this.cls.active)) {
				this.close(item);
			} else {
				this.open(item);
			}
		},

		_getCube: function(item) {
			var elem;

			if (!isNaN(item)) this.element.find("." + this.cls.item).eq(item - 1);
			elem = $(item).closest("li");

			if (!elem.length) {
				throw new Error("HSG cube you requested to open not exists");
			}

			return elem;
		},

		open: function(item) {
			var $this = this, activeItem = this._getCube(item);

			this.element.trigger("hsg.cube.opening", [activeItem]);

			if (activeItem.hasClass(this.cls.disabled)) return;

			// hide all content
			this.element
			.addClass(this.cls.opening)
			.children().removeClass(this.cls.active)
			.find("." + this.cls.content).hide();

			// show active item
			activeItem
			.addClass($this.cls.active)
			.find("." + this.cls.content).slideDown(this.options.duration, function() {
				$this.element.removeClass($this.cls.opening);
				$this.element.trigger("hsg.cube.open", [activeItem]);
			});
		},

		close: function(item) {
			var $this = this, activeItem = this._getCube(item);;

			this.element.trigger("hsg.cube.closing", [activeItem]);

			if (activeItem.hasClass(this.cls.disabled)) return;

			activeItem.find("." + this.cls.content).slideUp(this.options.duration, function() {
				activeItem.removeClass($this.cls.active);
				$this.element.trigger("hsg.cube.close", [activeItem]);
			});
		}
	});


	// attach
	$(document).on("hsg-domready", function(e) {
		$("[data-hsg-cube]").each(function() {
			var obj, ele = $(this);

			if (!ele.data("cube")) {
				obj = HSG.cube(ele, HSG.utils.options(ele.attr("data-hsg-cubes")));
			}
		});
	});

})(jQuery, jQuery.HSG);
;(function($, HSG, $win) {

  "use strict";

  var active = false, 
  	$html = $("html"),
  	$pageElements = $(".hsg-container, .hsg-top"),
  	focusableElements = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex]";


  HSG.component("modal", {

    cls: {
      open: "hsg-open",
      openStatic: "hsg-open-static", // class for static modal - no animation
      closeBtn: "hsg-modal-close",
      dialog: "hsg-modal-dialog",
      header: "hsg-modal-header",
      content: "hsg-modal-content"
    },

    defaults: {
      keyboard: true,
      bgclose: true,
      width: null,
      closeIcon: true,
      elementOpen: true,
      closeTitle: 'סגור',
      openAnimation: true,
      closeAnimation: true
    },

    init: function() {
      // set target selector
      if (!this.options.target) {
        this.options.target = this.element.is("a") ? this.element.attr("href") : this.element;
      }

      this._buildModal();
      this._handleElement();
      this._accessibilityHide();

      return this;
    },

    /**
     * handle the element that connected to the modal
     */
    _handleElement: function() {
    	var $this = this;

    	this.element.off("click.modal.hsg");

		if (this.options.elementOpen) {
			this.element.on("click.modal.hsg", function(e) {
				e.preventDefault();
				$this.open();
			});
		}
    },

    /**
     * build modal according to options
     */
    _buildModal: function() {
    	var $e = $(this.options.target);

    	this.modal = $e;

		if (this.modal.is(this.element)) {
			throw new Error("HSG modal cant be the same as the element calling it");
		}

		this._modalWidth();
		this._buildCloseIcon();
    },

    /**
     * build the close icon
     */
    _buildCloseIcon: function() {
    	var $header = this.modal.find("." + this.cls.header);

    	if (this.options.closeIcon) {
	    	if (!$header.find("." + this.cls.closeBtn).length) {
	    		$header.append('<a title="' + this.options.closeTitle + '" href="javascript:;" class="' + this.cls.closeBtn + '"></a>');	
	    	}
	    } else {
	    	$header.find("." + this.cls.closeBtn).remove();
	    }
    },

    /**
     * set modal width
     */
    _modalWidth: function(width) {
    	if (this.options.width) {
	      	this.modal
	      		.find("." + this.cls.dialog)
	      		.css("width", isNaN(this.options.width) ? this.options.width : this.options.width + "px");
	    }
    },

    /**
     * add focus to first focusable element on modal
     */
    _addFocus: function() {
    	var elements = this.modal.find(focusableElements).filter(":visible");

    	if (elements.length) {
    		$(elements[0]).trigger("focus");
    	}
    },

    /**
     * remove focus from modal and back to element
     */
    _removeFocus: function() {
    	this.element.trigger("focus");
    },

    /**
     * show the modal and hide the rest of the page
     */
    _accessibilityShow: function() {
      this.modal.attr("aria-hidden", false);
      $pageElements.attr("aria-hidden", true);
    },

    /**
     * hide the modal and show the rest of the page
     */
    _accessibilityHide: function() {
    	this.modal.attr("aria-hidden", true);
		  $pageElements.attr("aria-hidden", false);
    },

    /**
     * open modal
     * @return {this}
     */
    open: function() {
      var $this = this;

      if (this._isActive()) return;

      this.element.trigger("hsg.modal.opening");

      this.modal.removeClass(this.cls.open + " " + this.cls.openStatic); //.show();

      active = true;

      this._accessibilityShow();
      
      // open modal using animation or not
      if (this.options.openAnimation && HSG.support.transition) {      
        this.modal.find("." + this.cls.dialog).one(HSG.support.transition.end, function(e) {
          e.stopPropagation();
          $this.element.trigger("hsg.modal.open");
        }).end().addClass(this.cls.open);
      } else {
        this.modal.addClass(this.cls.openStatic);
        $this.element.trigger("hsg.modal.open");
      }

	    this.modal.css("z-index", "1030");

      // attach keydown event if keyboard (esc) option is turned on
      if (this.options.keyboard) {
	      $html.on("keydown.modal.hsg", function(e) {
	        if ($this._isActive() && e.keyCode === 27) {
	          e.preventDefault();
	          $this.close();
	        }
	      });
      }

      // attach keydown event on modal
      this.modal.on("keydown.modal.hsg.traptab", function(e) {
      	 if (e.which === 9) {
      	 	var elements = $this.modal.find(focusableElements).filter(":visible"),
      	 		focusedItem = $(':focus'),
      	 		focusedItemIndex = elements.index(focusedItem);

      	 	if (e.shiftKey) { // back tab
      	 		if(focusedItemIndex === 0){
      	 			elements.get(elements.length-1).focus();
        			e.preventDefault();
      	 		}
      	 	} else { // forward tab
      	 		if(focusedItemIndex === elements.length-1){
      	 			elements.get(0).focus();
        			e.preventDefault();
      	 		}
      	 	}
      	 }
      });

      this._addFocus();

      // attach close event to modal on click
      this.modal.on("click.modal.hsg", function(e) {
        var target = $(e.target);

        // close the modal if click on element (or element parent) with close button class or click on background 
        if (($this.options.bgclose && (target[0] == $this.modal[0] || target.hasClass($this.cls.dialog)))
			|| (target.hasClass($this.cls.closeBtn))
			|| (target.parent().hasClass($this.cls.closeBtn))) {
	            $this.modal.off("click.modal.hsg");
	            $this.close();
	            return false;
        }
      });

      return this;
    },

    /**
     * close modal
     * @param  {boolean} force modal close (without transition)
     * @return {this}
     */
    close: function() {
      var $this = this;

      if (!this._isActive()) return;

      this.element.trigger("hsg.modal.closing");

      // remove keydown event from html
      if (this.options.keyboard) {
	      $html.off("keydown.modal.hsg");
	  }

	  // remove keydown tab trap event on modal
	  this.modal.off("keydown.modal.hsg.traptab");

      // close with transition or without
      if (this.options.closeAnimation && HSG.support.transition) {
        this.modal.find("." + this.cls.dialog).one(HSG.support.transition.end, function() {
          $this._hide();
        });
      } else {
        this._hide();
      }

      this.modal.removeClass(this.cls.open + " " + this.cls.openStatic);
      this._removeFocus();

      return this;
    },

    /**
     * actual modal hiding
     */
    _hide: function() {
      this.modal.css("z-index", "-1");

      if (active) {
      	active = false;
      }

      this._accessibilityHide();
      this.element.trigger("hsg.modal.close");
      $html.off("keydown.modal.hsg");
    },

    /**
     * check if modal is active (open) or not
     * @return {Boolean}
     */
    _isActive: function() {
      return (active);
    },

    /**
     * set width option
     * @param {mixed} val
     */
    setWidth: function(val) {
    	this.options.width = val;
    	this._modalWidth();
    },

    /**
     * set modal target
     * @param {string} val
     */
    setTarget: function(val) {
    	this.close(true);
    	this.options.target = val;
    	this._buildModal();
    },

    /**
     * set modal close icon
     * @param {boolean} val
     */
    setCloseIcon: function(val) {
    	this.options.closeIcon = (val) ? true : false;
    	this._buildCloseIcon();
    },

    /**
     * set modal background close
     * @param {boolean} val
     */
    setBgclose: function(val) {
    	this.options.bgclose = (val) ? true : false;
    },

    /**
     * set modal keyboard close
     * @param {boolean} val
     */
    setKeyboard: function(val) {
    	this.options.keyboard = (val) ? true : false;
    },

    /**
     * set modal element open
     * @param {boolean} val
     */
    setElementOpen: function(val) {
    	this.options.elementOpen = (val) ? true : false;
    	this._handleElement();
    },

    /**
     * set modal open animation
     * @param {boolean} val
     */
    setOpenAnimation: function(val) {
    	this.options.openAnimation = (val) ? true : false;
    },

    /**
     * set modal close animation
     * @param {boolean} val
     */
    setCloseAnimation: function(val) {
    	this.options.closeAnimation = (val) ? true : false;
    }
  });


  // attach events
	$(document).on("hsg-domready", function(e) {
		$("[data-hsg-modal]").each(function() {
			var obj, ele = $(this);

		    if (ele.is("a")) {
		      e.preventDefault();
		    }

		    if (!ele.data("modal")) {
		      obj = HSG.modal(ele, HSG.utils.options(ele.attr("data-hsg-modal")));
		    }
		});
	});

})(jQuery, jQuery.HSG, jQuery(window));
;(function($, HSG) {

  "use strict";

  HSG.component("nav", {

    cls: {
      open: "hsg-open",
      close: "hsg-close",
      opening: "hsg-opening"
    },

    defaults: {
      duration: 400,
      target: ".hsg-nav"
    },

    item: null,

    init: function() {
      var $this = this;

      this.item = $(this.defaults.target).first();

      this.element.on("click.nav.hsg", function(e) {
        e.preventDefault();
        $this.toggle();
      });

      return this;
    },

    toggle: function() {
      if (this.isVisible()) {
        this.hide();
      } else {
        this.show();
      }
    },

    isVisible: function() {
      return (this.item) ? !this.item.hasClass(this.cls.close) : false;
    },

    show: function() {
      var $this = this;

      if (this.isVisible()) return false;

      this.element.trigger("hsg.nav.showing");

      this.item.animate({
        height: 400
      }, this.options.duration, function(){
        $(this)
          .removeClass($this.cls.close)
          .removeClass($this.cls.opening);

        if ( !HSG.utils.isInView($this.item, {topoffset: 0-$this.item.outerHeight()}) ) {
          HSG.utils.scrollTo($this.item);
        }
      });

      this.element.trigger("hsg.nav.show");
    },

    hide: function() {
      var $this = this;

      if (!this.isVisible()) return false;

      this.item.trigger("hsg.nav.hiding");

      this.item.animate({
        height: 1
      }, this.options.duration, function(){
        $(this).addClass($this.cls.close);
      });

      this.item.trigger("hsg.nav.hide");
    }
  });


  // attach events
  $(document).on("hsg-domready", function(e) {
    $("[data-hsg-nav-toggle]").each(function() {
      var obj, ele = $(this);

      if (!ele.data("nav")) {
        obj = HSG.nav(ele, HSG.utils.options(ele.attr("data-hsg-nav-toggle")));
      }
    });
  });

})(jQuery, jQuery.HSG);
;(function($, HSG) {

	"use strict";

	HSG.component("iconform", {

		iconInput: null,

		init: function() {
			this.iconInput = this.element.next();
			this.registerClickEvent();
		},

		registerClickEvent: function() {
			var $this = this;

			this.element.on("click.iconform.hsg", function(e) {
				if($this.element.css("pointer-events") == "none" || !$this.element.css("pointer-events")) {
					$this.iconInput.trigger(e);
					return false;
				}

				return true;
			});
		}
	});


	// attch events
	$(document).on("click.iconform.hsg", ".hsg-form-icon > i", function(e) {
		var obj, ele = $(this);

		e.preventDefault();

		if (!ele.data("iconform")) {
			obj = HSG.iconform(ele, null);
			ele.trigger("click.iconform.hsg");
		}
	});


})(jQuery, jQuery.HSG);
;(function($, HSG) {
    "use strict";

	var scripts = [
		"/vendors/picker.js",
		"/vendors/picker.date.js",
		"/vendors/picker.legacy.js"
	];

  var pp = null;

    HSG.component("datepicker", {

        cls: {
            datePickerOverlayInput: "dateinput_"
        },

        picker: null,

        defaults: {
            format: 'dd/mm/yyyy',
            selectYears: true,
            selectMonths: true,
            min: null,
            max: null,
            disable: null,
            view: null
        },

        init: function() {
            var $this = this;

            if (!this._isDesktop() || !HSG.support.touch || !HSG.support.inputType("date")) {
            	HSG.utils.loadscripts(scripts, function() {
                    var pickerParams = {
                        format: $this.options.format,
                        selectYears: $this.options.selectYears,
                        selectMonths: $this.options.selectMonths,
                        min: ($this.options.min) ? $this.options.min : "",
                        max: ($this.options.max) ? $this.options.max : "",

                        onSet: function(context) {
                            $this.element.trigger("hsg.datepicker.set", [context]);

                            if (context.select) {
                              var d = $this._dateFormat(new Date( context.select.pick ? context.select.pick : context.select ), $this.options.format);
                              $this.element.val(d);
                            }
                        },
                        onOpen: function() {
                        	$this.element.trigger("hsg.datepicker.open");
                        },
                        onClose: function() {
                          $this.element.parent().find(".hsg-icon-calendar").focus();
                        	$this.element.trigger("hsg.datepicker.close");
                        }
                    };

                    $this.element.parent().find(".hsg-icon-calendar").attr("tabindex", 0);
                    var d = $this.element.parent().find(".hsg-icon-calendar").pickadate(pickerParams);
                    $this.picker = d.pickadate('picker');

                    if ($this.options.disable) {
                        if (Object.prototype.toString.call($this.options.disable) === '[object Array]') {
                            pickerParams.disable = $this.options.disable;
                        } else {
                            $this.element.attr("disabled", "true");
                        }
                    }

                    console.log('$this.options', $this.options);
                    console.log('$this.options.view', $this.options.view);

                    if ($this.options.view) {
                      $this.picker.set("view", $this.options.view, {format: $this.options.format});
                    }

                    
                }, function(){ console.log('done')});
            } else {
                this._createDateOverlay();
            }

            this._attachEvents();
            return this;
        },

        /**
         * helper function to detect if we are on desktop.
         * i know its not optimal relaying on user agent but there is no better option
         * to display the native datepicker on mobile and plugin on desktop
         * @return {Boolean}
         */
        _isDesktop: function() {
		   return (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ); 
		},

        /**
         * attach events to input
         */
        _attachEvents: function() {
        	//events needed to remove translate3D 
        	//because it breaks z-index on datepicker
        
        	this.element.on("hsg.datepicker.open", function() {
				    $(".hsg-strip").addClass("hsg-strip-no-3d");        		
        	});

        	this.element.on("hsg.datepicker.close", function() {
				    $(".hsg-strip").removeClass("hsg-strip-no-3d");        		
        	});
        },

        /**
         * set datepicker date
         * @param {date object} date
         */
        setDate: function(date) {
            if (this.picker) {
                this.picker.set('select', date);
            } else {
                var day = ("0" + date.getDate()).slice(-2);
                var month = ("0" + (date.getMonth() + 1)).slice(-2);
                var year = date.getFullYear();
                this.element.val(year + "-" + (month) + "-" + (day));
            }
        },

        /**
         * clear any date from datepicker input
         */
        clearDate: function() {
            if (this.picker) {
                this.picker.set('clear');
            } else {
                 this.element.val("");
            }
        },

        /**
         * disable datepicker functionally by disabling input
         */
        disable: function() {
            this.element.prop('disabled', true);
        },

        /**
         * enable datepicker functionally by enabling input
         */
        enable: function() {
            this.element.prop('disabled', false);
        },

        /**
         * update input
         */
        _updateInput: function() {
            var d = "",
                datePickerInput = $("#" + this.cls.datePickerOverlayInput + this.element.prop("id"));

            if (!datePickerInput.length) {
            	return;
            }

            if (datePickerInput.val()) {
            	d = this._dateFormat(new Date(datePickerInput.val()), this.options.format);
            }

            this.element.val(d);
            this.element.trigger("hsg.datepicker.update");
        },

        /**
         * create date overlay above input
         */
        _createDateOverlay: function() {
            var $this = this,
            	prefix = (this.element.attr("id")) ? this.element.attr("id") : "d" + Math.floor(Math.random() * 26) + Date.now(),
                id = this.cls.datePickerOverlayInput + prefix;

            //add datepicker input only if not exists already
            if (!$("#" + id).length) {
                var attr = {
                    "id": id,
                    "type": "date",
                    "class": "hsg-picker-input-overlay"
                };

                if ($this.options.min) {
                    attr.min = $this.options.min.year + "-" + $this.options.min.month + "-" + $this.options.min.day;
                }

                if ($this.options.max) {
                    attr.max = $this.options.max.year + "-" + $this.options.max.month + "-" + $this.options.max.day;
                }

                if ($this.options.disable) {
                    attr.disabled = true;
                }

                $("<input>", attr).on("change focus", function() {
                    $this._updateInput();
                }).on("change", function() {
                	$this.element.trigger("input");
                }).insertAfter(this.element);
            }
        },

        /**
         * helper function to display date in date format
         * @param  {date object} date
         * @param  {string} mask - date format
         * @param  {[type]} utc
         * @return {string} formatted date
         */
        _dateFormat: function(date, mask, utc) {
            var i18n = {
                    dayNames: [
                        'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש',
                        'יום ראשון', 'יום שני', 'יום שלישי', 'יום רביעי', 'יום חמישי', 'יום ששי', 'יום שבת'
                    ],
                    monthNames: [
                        'ינו', 'פבר', 'מרץ', 'אפר', 'מאי', 'יונ', 'יול', 'אוג', 'ספט', 'אוק', 'נוב', 'דצמ',
                        'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
                    ]
                },
                token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
                timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
                timezoneClip = /[^-+\dA-Z]/g,
                pad = function(val, len) {
                    val = String(val);
                    len = len || 2;
                    while (val.length < len) val = "0" + val;
                    return val;
                };
            // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
            if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
                mask = date;
                date = undefined;
            }
            // Passing date through Date applies Date.parse, if necessary
            date = date ? new Date(date) : new Date();
            if (isNaN(date)) throw new SyntaxError("invalid date");
            // Allow setting the utc argument via the mask
            if (mask.slice(0, 4) == "UTC:") {
                mask = mask.slice(4);
                utc = true;
            }
            var _ = utc ? "getUTC" : "get",
                d = date[_ + "Date"](),
                D = date[_ + "Day"](),
                m = date[_ + "Month"](),
                y = date[_ + "FullYear"](),
                H = date[_ + "Hours"](),
                M = date[_ + "Minutes"](),
                s = date[_ + "Seconds"](),
                L = date[_ + "Milliseconds"](),
                o = utc ? 0 : date.getTimezoneOffset(),
                flags = {
                    d: d,
                    dd: pad(d),
                    ddd: i18n.dayNames[D],
                    dddd: i18n.dayNames[D + 7],
                    m: m + 1,
                    mm: pad(m + 1),
                    mmm: i18n.monthNames[m],
                    mmmm: i18n.monthNames[m + 12],
                    yy: String(y).slice(2),
                    yyyy: y,
                    h: H % 12 || 12,
                    hh: pad(H % 12 || 12),
                    H: H,
                    HH: pad(H),
                    M: M,
                    MM: pad(M),
                    s: s,
                    ss: pad(s),
                    l: pad(L, 3),
                    L: pad(L > 99 ? Math.round(L / 10) : L),
                    t: H < 12 ? "a" : "p",
                    tt: H < 12 ? "am" : "pm",
                    T: H < 12 ? "A" : "P",
                    TT: H < 12 ? "AM" : "PM",
                    Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                    o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                };
            return mask.replace(token, function($0) {
                return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
            });
        },

        /**
         * set datepicker min date
         * @param {date object} date
         */
        setMin: function(date) {
            if (this.picker) {
                this.picker.set('min', date);
            } else {
                var day = ("0" + date.getDate()).slice(-2);
                var month = ("0" + (date.getMonth() + 1)).slice(-2);
                var year = date.getFullYear();
                this.element.attr("min", year + "-" + (month) + "-" + (day));
            }
        },

        /**
         * set datepicker max date
         * @param {date object} date
         */
        setMax: function(date) {
            if (this.picker) {
                this.picker.set('max', date);
            } else {
                var day = ("0" + date.getDate()).slice(-2);
                var month = ("0" + (date.getMonth() + 1)).slice(-2);
                var year = date.getFullYear();
                this.element.attr("max", year + "-" + (month) + "-" + (day));
            }
        },

        setSelectYears: function(val) {
        	// TODO
        },

        /**
         * set initial view that will be visible when date picker opens.
         * @param {str} date
         */
        setView: function(date) {
            this.picker.set("view", date, {format: this.options.format ? this.options.format : this.defaults.format});
        }
    });


	// attch events
	$(document).on("hsg-domready", function(e) {
		$("[data-hsg-datepicker]").each(function() {
			var obj, ele = $(this);
			if (!ele.data("datepicker")) {
				obj = HSG.datepicker(ele, HSG.utils.options(ele.attr("data-hsg-datepicker")));
			}
		});
	});

})(jQuery, jQuery.HSG);
;(function($, HSG) {

	"use strict";

	HSG.component("check", {

		cls: {
			item: "input"
		},

		defaults: {
			maximum: 1
		},

		checks: 0,

		init: function() {
			var $this = this;

			this._validateDefaults();
			this._countChecks();
			this._attachEvents();

			return this;
		},

		/**
		 * validate defaults values
		 */
		_validateDefaults: function() {
			var max = (!isNaN(parseFloat(this.options.maximum)) && isFinite(this.options.maximum)) ? parseInt(this.options.maximum) : 0;

			if (max < 1) {
				throw new Error("HSG checks component maximum value is not valid");
			}
		},

		/**
		 * count number of items checked
		 */
		_countChecks: function() {
			this.checks = this.element.find(this.cls.item + ":checked").length;
		},

		/**
		 * attach events to inputs
		 */
		_attachEvents: function() {
			var $this = this;

			this.element.find(this.cls.item).on("change.check.hsg", function(e) {
				$this._countChecks();
				$this._checkMaximumItems(e.target);
			});
		},

		/**
		 * check if maximum of items has been checked
		 * if so then remove the last checked item
		 *
		 * @param  {element} input changed
		 */
		_checkMaximumItems: function(input) {
			var items;

			if (this.checks > this.options.maximum) {
				items = this.element.find(this.cls.item + ":checked").not(input);

				// angular not detect checkbox change when changing checked value
				// so we fake a click on input
				//items[items.length - 1].checked = false;
				items.trigger("click");

				this._countChecks();
			}

			this.element.trigger("hsg.check.maximum");
		},

		setMaximum: function(val) {
			this.options.maximum = val;
			_validateDefaults();
		}
	});


	// attach
	$(document).on("hsg-domready", function(e) {
		$("[data-hsg-checks]").each(function() {
			var obj, ele = $(this);

			if (!ele.data("check")) {
				obj = HSG.check(ele, HSG.utils.options(ele.attr("data-hsg-checks")));
			}
		});
	});

})(jQuery, jQuery.HSG);
;(function($, HSG, $win) {

  "use strict";

  // add closest support
  if (!Element.prototype.matches)
      Element.prototype.matches = Element.prototype.msMatchesSelector ||  Element.prototype.webkitMatchesSelector;

  if (!Element.prototype.closest)
      Element.prototype.closest = function(s) {
          var el = this;
          if (!document.documentElement.contains(el)) return null;
          do {
              if (el.matches(s)) return el;
              el = el.parentElement || el.parentNode;
          } while (el !== null && el.nodeType === 1);
          return null;
      };

  // add is integer support
  Number.isInteger = Number.isInteger || function(value) {
    return typeof value === 'number' && 
      isFinite(value) && 
      Math.floor(value) === value;
  };


  HSG.component("multi", {

    cls: {
      multi: 'hsg-multi',
      open: 'is-open',
      selected: 'is-selected',
      disabled: 'is-disabled',
      active: 'is-active',
      list: 'hsg-multi__list',
      listItem: 'hsg-multi__listitem',
      select: 'select[multiple]',
      options: 'hsg-multi__options',
      item: 'hsg-multi__item',
      items: 'hsg-multi__items',
      empty: 'hsg-multi__item--empty'
    },

    defaults: {
      height: 240,
      placeholder: 'לחצ/י לבחירת אפשרויות',
      disableNative: false
    },

    keys: {
      esc: 27,
      tab: 9,
      up: 38,
      down: 40,
      space: 32,
      enter: 13
    },

    direction: {
      up: -1,
      down: 1
    },

    itemsData: [],

    init: function() {
      // this is needed so we can add and remove event attached on body
      this._closeOnClickOutsideFunction = this._closeOnClickOutside.bind(this);

      this.empty = '<span class="' + this.cls.empty + '">' + this.options.placeholder + '</span>';

      this.itemsData = this._getOptionsObject();
      this._getParts();
      this._buildOptionsList();
      this._buildItemsList();
      this._attachEvents();
    },

    /**
     * Get multi needed parts to work
     */
    _getParts: function() {
      var el;
      var element = this.element[0];

      this.parts = {
        element: element,
        select: element.querySelector(this.cls.select),
        items: element.querySelector('.' + this.cls.items),
        options: element.querySelector('.' + this.cls.options),
      }

      if (!this.parts.select) {
        throw new Error('Missing select multiple element');
      }

      if (!this.parts.select.id.length) {
        throw new Error('Select multiple element must contain id');
      }

      this.parts.element.setAttribute('role', 'application');
      this.parts.select.setAttribute('tabindex', '-1');

      // add items list element if needed
      if (!this.parts.items) {
        el = document.createElement('div');
        el.className = this.cls.items;
        el.setAttribute('tabindex', '0');
        this.parts.element.appendChild(el);
        this.parts.items = el;
      }

      // add options list element if needed
      if (!this.parts.options) {
        el = document.createElement('div');
        el.className = this.cls.options;
        this.parts.element.appendChild(el);
        this.parts.options = el;
      }
    },

    /**
    * Build options list
    **/
    _buildOptionsList: function() {
        var i;
        var id;
        var klass;
        var text = '<ul class="' + this.cls.list + '" role="listbox" aria-multiselectable="true" style="max-height:' + (Number.isInteger(this.options.height) ? this.options.height+'px' : this.options.height) + '">';

        for (i = 0; i < this.itemsData.length; ++i) {
          klass = [];

          if (this.itemsData[i].selected) {
            klass.push(this.cls.selected);
          }

          if (this.itemsData[i].disabled) {
            klass.push(this.cls.disabled);
          }

          id = this.parts.select.id + '-' + (i+1);
          text += '<li data-value="' + this.itemsData[i].value + '" class="' + this.cls.listItem + ' ' + klass.join(' ') + '" role="option" id=" ' + id + '" aria-selected="' + this.itemsData[i].selected + '" aria-disabled="' + this.itemsData[i].disabled + '">' + this.itemsData[i].name + '</li>';
        }

        text += '</ul>';

        this.parts.options.innerHTML = text;
    },

    /**
    * Build items list
    **/
    _buildItemsList: function() {
      var i;
      var itemsHtml = '';

      for (i = 0; i < this.itemsData.length; ++i) {
        if (this.itemsData[i].selected) {
          itemsHtml += '<button class="' + this.cls.item + '" data-value="' + this.itemsData[i].value + '">' + this.itemsData[i].name + '</button>';
        }
      }

      this.parts.items.innerHTML = (itemsHtml.length) ? itemsHtml : this.empty;
    },

    /**
     * Update options list
     */
    _updateOptionsList: function() {
      var i;
      var listItems = this.parts.options.querySelectorAll('.' + this.cls.listItem);
      var classList;

      for (i = 0; i < this.itemsData.length; ++i) {
        classList = listItems[i].classList;
        
        if (this.itemsData[i].selected) {
          classList.add(this.cls.selected);
        } else {
          classList.remove(this.cls.selected);
        }

        if (this.itemsData[i].disabled) {
          classList.add(this.cls.disabled);
        } else {
          classList.remove(this.cls.disabled);
        }

        listItems[i].setAttribute('aria-selected', this.itemsData[i].selected);
        listItems[i].setAttribute('aria-disabled', this.itemsData[i].disabled);
      }
    },

    /**
     * Update items list. add or remove item
     * @property {object} o - option
     * @property {boolean} val - add if true, remove if false
    **/
    _updateItemsList: function(o, val) {
      var element;
      var item = this.parts.items.querySelector('.' + this.cls.item + '[data-value="' + o.value + '"]');

      if (val) {
        if (!item) {
          // add button
          element = document.createElement('button');
          element.classList.add(this.cls.item);
          element.setAttribute('data-value', o.value);
          element.innerText = o.name;

          // Clean items element when no buttons exists in it
          if (!this.parts.items.querySelectorAll('.' + this.cls.item).length) {
            while (this.parts.items.firstChild) this.parts.items.removeChild(this.parts.items.firstChild);
          }

          this.parts.items.appendChild(element);
        }
      } else {
        // Remove button if exists
        if (item) {
          item.parentNode.removeChild(item);

          // Add empty if no button exists
          if (!this.parts.items.querySelectorAll('.' + this.cls.item).length) {
            this.parts.items.innerHTML = this.empty;
          }
        }
      }
    },

    /**
    * Create options object (data)
    **/
    _getOptionsObject: function() {
      var elements = this.element[0].querySelectorAll('option');
      var i;
      var obj = [];

      for (i = 0; i < elements.length; ++i) {
        obj.push({
          name: (elements[i].text) ? elements[i].text : elements[i].innerText,
          value: elements[i].value ? elements[i].value.toString() : '',
          selected: elements[i].selected,
          disabled: elements[i].disabled
        })
      }

      return obj;
    },

    /**
    * Close options list
    **/
    _closeOptionsList: function() {
      var active = this.parts.options.querySelector('.' + this.cls.active);

      document.documentElement.removeEventListener("keydown", this._closeOnKeydown.bind(this));
      document.body.removeEventListener("click", this._closeOnClickOutsideFunction);
      this.parts.element.classList.remove(this.cls.open);
      
      if (active) {
        active.classList.remove(this.cls.active);
      }

      this.element.trigger("hsg.multi.close", [this.itemsData]);
    },

    /**
    * Open options list
    **/
    _openOptionsList: function() {
      var item;
      var active = this.parts.options.querySelector('.' + this.cls.active);

      this.parts.element.classList.add(this.cls.open);
      document.documentElement.addEventListener('keydown', this._closeOnKeydown.bind(this));
      document.body.addEventListener('click', this._closeOnClickOutsideFunction);

      // // add active state on first available list item
      if (!active) {
        item = this.parts.options.querySelector('.' + this.cls.listItem + ':not(.' + this.cls.disabled + ')');
        if (item) {
          item.classList.add(this.cls.active);
        }
      }
    },

    /**
    * Select/Unselect data option
    * @property {object} o - option
    * @property {boolean} val - set as selected or not
    **/
    _setDataOptionSelected: function(o, val) {
      var i;
      var element;

      for (i = 0; i < this.itemsData.length; i++) {
        if (this.itemsData[i].name === o.name && this.itemsData[i].value === o.value) {
          this.itemsData[i].selected = val;
          break;
        }
      }
    },

    /**
    * Select/Unselect select option
    * @property {object} o - option
    * @property {boolean} val - set as selected or not
    **/
    _setSelectOptionSelected: function(o, val) {
      var option = this.parts.select.querySelector('option[value="' + o.value + '"]')

      if (option) {
        option.selected = val;
      }

      this.itemsData = this._getOptionsObject();
    },

    /**
    * Close options list with ESC
    * @property {object} e - event
    **/
    _closeOnKeydown: function(e) {
      if ((e.keyCode === this.keys.esc || e.keyCode === this.keys.tab) && this.parts.element.classList.contains(this.cls.open)) {
        e.preventDefault();
        this._closeOptionsList();
      }
    },

    /**
     * Check if multi is open
     */
    _isOpen: function() {
      return this.parts.element.classList.contains(this.cls.open);
    },

    /**
    * Close options list when clicking outside options
    * @property {object} e - event
    **/
    _closeOnClickOutside: function(e) {
      var inside = ((e.srcElement.closest('.' + this.cls.multi) === this.parts.element) || (e.srcElement.classList && e.srcElement.classList.contains(this.cls.listItem)));

      if (!inside) {
        this._closeOptionsList();
      }
    },

    /**
     * Attach events to multi component
     */
    _attachEvents: function() {
      this._attachEventClickOnItems();
      this._attachEventClickOnOptions();
      this._attachEventChangeSelect();
      this._attachEventKeydownOnItems();
    },

    /**
     * Attach keydown event on items
     * needed for accessibility support
     */
    _attachEventKeydownOnItems: function() {
      var that = this;
      var active;

      if (!HSG.utils.isDevice() || this.options.disableNative) {
        this.parts.items.addEventListener('keydown', function(e) {
          if (e.keyCode === that.keys.space) {
            e.preventDefault();
            if (that._isOpen()) {
              active = that.parts.options.querySelector('.' + that.cls.active);
              if (active) {
                that._clickOnOption(active);
              } else {
                that._closeOptionsList();
              }
            } else {
              that._openOptionsList();
            }
          }

          if (e.keyCode === that.keys.up) {
            e.preventDefault();
            if (that._isOpen()) {
              that._moveActive(that.direction.up);
            } else {
              that._openOptionsList();
            }
          }

          if (e.keyCode === that.keys.down) {
            e.preventDefault();
            if (that._isOpen()) {
              that._moveActive(that.direction.down);
            } else {
              that._openOptionsList();
            }
          }

          if (e.keyCode === that.keys.enter) {
            if (that._isOpen()) {
              active = that.parts.options.querySelector('.' + that.cls.active);
              if (active) {
                that._clickOnOption(active);
              } else {
                that._closeOptionsList();
              }
            }
          }
        });
      }
    },

    /**
     * Calculate new index for active element
     * @property {array} items - items list
     * @property {element} item - html element inside list
     * @property {value} direction - up or down
     * @returns {number} new element index
     */
    _getNewIndex: function(items, item, direction) {
      var element;
      var list = Array.prototype.slice.call(items);
      var i = 0;

      if (direction === this.direction.up) { // up
        if (item) {
          if (list.indexOf(item)) { // not first element. go one up
            element = item.previousElementSibling;
            while(element && element.classList.contains(this.cls.disabled)) {
              element = element.previousElementSibling;
            }
          } else { // first element. so we stay at first
            element = items[0];
          }
        } else {
          // get first element that is not disabled
          element = items[0];
          while(element && element.classList.contains(this.cls.disabled)) {
            element = element.nextElementSibling;
          }
        }

      } else { // down
        if (item) { // not last element. go one down
          if (list.indexOf(item) !== (items.length - 1)) {
            element = item.nextElementSibling;
            while(element && element.classList.contains(this.cls.disabled)) {
              element = element.nextElementSibling;
            }
          } else { // last element. so we stay at last
            element = items[items.length - 1];
          }
        } else {
          // get last element that is not disabled
          element = items[items.length-1];
          while(element && element.classList.contains(this.cls.disabled)) {
            element = element.previousElementSibling;
          }
        }
      }

      return list.indexOf(element);
    },

    /**
     * Move active element up ro down
     * @property {value} direction - up or down
     */
    _moveActive: function(direction) {
      var active = this.parts.options.querySelector('.' + this.cls.active);
      var items = this.parts.options.querySelectorAll('.' + this.cls.listItem);
      var newIndex;

      newIndex = this._getNewIndex(items, active, direction);

      if (active) {
        active.classList.remove(this.cls.active);
      }

      items[newIndex].classList.add(this.cls.active);
    },

    /**
     * Attach click event on items
     */
    _attachEventClickOnItems: function() {
      var that = this;

      if (HSG.utils.isDevice('android') && !this.options.disableNative) {
        // Android browser disabled the ability to focus on input via javascript
        // so we make the SELECT element above the multi html. any click on it will open the SELECT
        this.parts.select.style.zIndex = 1;

      } else {

        this.parts.items.addEventListener('click', function(e) {
          // Click on button
          if (e.srcElement.nodeName == 'BUTTON' && e.srcElement.classList.contains(that.cls.item)) {
            e.preventDefault();
            that._clickOnOption(e.srcElement, false);
          } else {
            // Click on items row in empty place
            if (HSG.utils.isDevice('ios') && !that.options.disableNative) {
              that.parts.select.focus();
            } else {
              if (that._isOpen()) {
                that._closeOptionsList();
              } else {
                that._openOptionsList();
              }
            }
          }
        });
      }

    },

    /**
     * Attach click event on options
     */
    _attachEventClickOnOptions: function() {
      var that = this;

      this.parts.options.addEventListener('click', function(e) { 
        if (e.srcElement.nodeName == 'LI') {
          e.preventDefault();
          that._clickOnOption(e.srcElement);
        }
      });
    },

    /**
     * Add list option to items selected
     * @property {element} element - html element to get data from
     * @property {boolean} selected - whether the element will be added or removed
     */
    _clickOnOption: function(element, selected) {
      var o;

      if (element && !element.classList.contains(this.cls.disabled)) {
        o = {
          name: element.innerText,
          value: element.getAttribute('data-value')
        };

        selected = (selected == null) ? !(element.classList.contains(this.cls.selected)) : selected;

        this._setDataOptionSelected(o, selected);
        this._setSelectOptionSelected(o, selected);
        this._updateOptionsList();
        this._updateItemsList(o, selected);

        this.element.trigger("hsg.multi.update", [this.itemsData]);
      }
    },

    /**
     * Attach change event on select
     */
    _attachEventChangeSelect: function() {
      var that = this;

      if (HSG.utils.isDevice() && !this.options.disableNative) {
        this.parts.select.addEventListener('change', function(e) {
          var o;
          var i;
          var multiSelectOptions = that.parts.select.querySelectorAll('option');
          
          for (i = 0; i < multiSelectOptions.length; ++i) {
            o = {
              name: multiSelectOptions[i].innerText,
              value: multiSelectOptions[i].value
            };

            that._setDataOptionSelected(o, multiSelectOptions[i].selected);
            that._buildItemsList();
          }
        });
      }
    },

    update: function() {
      this.itemsData = this._getOptionsObject();
      this._buildOptionsList();
      this._buildItemsList();
      this.element.trigger("hsg.multi.update", [this.itemsData]);
    },

    /**
     * Get multi selected options
     * @param {object} obj - must be object to assign data by reference
     */
    getValues: function(obj) {
      obj.selected = [];
      
      // cant use this.parts.select.selectedOptions because of ie lack of support
      Array.prototype.slice.call(this.parts.select.querySelectorAll(':checked')).forEach(function(option){
        obj.selected.push({
          title: option.innerText,
          value: option.value
        })
      })
    }
  });



  // attach events
	$(document).on("hsg-domready", function(e) {
		$("[data-hsg-multi]").each(function() {
			var obj, ele = $(this);

      if (!ele.data("modal")) {
        obj = HSG.multi(ele, HSG.utils.options(ele.attr("data-hsg-multi")));
      }
		});
	});

})(jQuery, jQuery.HSG, jQuery(window));














//
;

/*!
 * HSG script v0.5.0
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

	var z = 10;

	HSG.component("modal", {
		cls: {
			open: "hsg-open",
			closeBtn: "hsg-modal-close"
		},

		defaults: {},

		init: function() {
			var $this = this;

			if (!this.element.data("modal")) return;
			this.element.trigger("hsg.modal.initiating");

			if (!this.options.target) {
				this.options.target = $this.element.is("a") ? $this.element.attr("href") : this.element;
			}

			this.modal = $(this.options.target);

			if (this.element.is("a, button")) {
				this.element.on("click", function(e) {
					e.preventDefault();
					$this.show();
				});
			}

			this.element.trigger("hsg.modal.init");
		},

		show: function() {
			var $this = this;

			if (this.isActive()) return;

			this.element.trigger("hsg.modal.showing");

			this.modal
				.css({ zIndex: z })
				.addClass(this.cls.open)
				.on("click.modal.hsg", function(e) {
				if ($(e.target).hasClass($this.cls.closeBtn)) {
					$this.modal.off("click.modal.hsg");
					$this.hide();
				}
			});

			z++;
			this.element.trigger("hsg.modal.show");
			return this;
		},

		hide: function() {
			if (!this.isActive() || (this.isActive() && !this.isTop())) return;

			this.element.trigger("hsg.modal.hiding");
			this.modal.removeClass(this.cls.open);
			z--;
			this.element.trigger("hsg.modal.hide");
			return this;
		},

		isActive: function() {
			return this.modal.hasClass(this.cls.open);
		},

		isTop: function() {
			var zIndex = parseInt(this.modal.css("z-index"));

			return (!isNaN(zIndex) && (zIndex === (z - 1)));
		}
	});


	// attach events
	$("[data-hsg-modal]").on("click.modal.hsg", function(e) {
		var obj, ele = $(this);

		if (ele.is("a")) {
			e.preventDefault();
		}

		if (!ele.data("modal")) {
			obj = HSG.modal(ele, HSG.utils.options(ele.attr("data-hsg-modal")));
			obj.show();
		}

	});


})(jQuery, jQuery.HSG);
;(function($, HSG) {

	"use strict";

	var modalHTML = '<div class="hsg-modal">' +
							'<div class="hsg-modal-header"><h1></h1></div>' +
							'<div class="hsg-modal-content-wrap"><div class="hsg-modal-content"></div></div>' +
							'<div class="hsg-actions"><div class="hsg-actions-group"><a href="#" class="hsg-action dropdown-clear"></a></div></div>' +
						'</div>';

	var specialKeyCodeMap = {
		9: 'tab',
		27: 'esc',
		13: 'enter',
		38: 'up',
		40: 'down'
	};

	HSG.component("dropdown", {
		cls: {
			clearBtn: "dropdown-clear",
			optionPlaceholder: "placeholder",
			modalContent: "hsg-modal-content",
			overlay: "hsg-dropdown-overlay",
			itemHover: "hsg-hover",
			modalOpen: "hsg-open"
		},

		defaults: {
			title: "בחר אפשרות מהרשימה",
			clear: "נקה בחירה",
			placeholderAsTitle: false
		},

		modal: false,

		init: function() {
			var $this = this;

			if (!this.element.data("dropdown")) return;
			this.element.trigger("hsg.dropdown.initiating");

			if (!HSG.utils.isDevice()) {
				this._buildModal();
				this._buildOverlay();

				this.element
					.on("click", function() {
						if (!$this.element.find("select:disabled").length) {
							$this._openList();
						}
					})
					.on("keyup", function(e) {
						if (!$this.element.find("select:disabled").length) {
							$this._keypressOnDropdown(e);
						}
					});
			}

			this.element.trigger("hsg.dropdown.init");
		},

		/**
		 * open select list
		 */
		_openList: function() {
			this.element.blur();

			// add tabindex so we could focus to it
			this.modal.attr("tabindex", -1).focus();

			this._buildList();
			this.modal.hsg("modal.show");
		},

		/**
		 * close select list
		 */
		_closeList: function() {
			this.modal.hsg("modal.hide");
			this.element.find("> select").focus();
		},

		/**
		 * keypressdown event handler
		 * @param  {object} e 
		 */
		_keypressOnDropdown: function(e) {
			var $this = this,
				special = specialKeyCodeMap[e.which || e.keyCode];

			if (special) {
				switch(special) {
					case "enter":
					case "up":
					case "down":
						$this._openList();
					break;
				};
			};
		},

		/**
		 * get placeholder option 
		 * or first option if placeholder not exists
		 */
		_getPlaceholderOrFirst: function() {
			return (this.element.find("." + this.cls.optionPlaceholder).length) ? this.element.find("." + this.cls.optionPlaceholder) : this.element.find("option:first");
		},

		/**
		 * build modal and init all
		 */
		_buildModal: function() {
			var $this = this, 
				$placeholder = this._getPlaceholderOrFirst();

			this.modal = $(modalHTML);

			this.modal.find("." + this.cls.clearBtn).on("click", function() {
				$this._selectOption( $placeholder.val() );
			});

			this.setTitle( this.options.placeholderAsTitle ? $placeholder.text() : this.options.title );
			this.setClear(this.options.clear);

			$("body").append(this.modal);

			this.modal.on("keyup.hsg.dropdown", function(e) {
				var special = specialKeyCodeMap[e.which || e.keyCode],
					$list = $this.modal.find("." + $this.cls.modalContent + " > ul");

				if (special && $this.modal && $this.modal.hasClass($this.cls.modalOpen)) {
					switch(special) {
						case "esc":
							$this._closeList();
						break;

						case "up":
							$this._go($list, -1);
						break;

						case "down":
							$this._go($list, +1);
						break;

						case "enter":
							$this._enterList($list);
						break;
					};
				};
			});
		},

		/**
		 * build overlay element on select
		 */
		_buildOverlay: function() {
			this.element.prepend("<div class='hsg-dropdown-overlay'></div>");
		},

		/**
		 * build select list
		 */
		_buildList: function() {
			var $this = this,
				options = "";

			this.element.find("option:not(." + this.cls.optionPlaceholder + ")").each(function() {
				var $this = $(this),
					selected = ($this.is(":selected")) ? "class='selected'" : "";

				options += "<li " + selected +" data-value='" + $this.val() + "'>" + $this.text() + "</li>";
			});

			var $list = $("<ul/>", {
				"class": "hsg-list-dropdown",
				html: options
			}).on("click", function(e) {
				if (e.target.nodeName === "LI") {
					$this._selectOption($(e.target).data("value"));
				}
			})

			this.modal.find("." + this.cls.modalContent).html($list);
		},

		/**
		 * keyboard support to travel the list
		 * @param  {jquery object} $el list to travest
		 * @param  {number} val -1 or +1
		 */
		_go: function($el, val) {
			var index = $el.find("." + this.cls.itemHover).index() + val,
				itemsLength = $el.find("li").length;

			if (index < 0 && val < 0) {
				index = 0;
			} else if (val > 0 && index > (itemsLength - 1)) {
				index = itemsLength - 1;
			}

			$el.find("li").removeClass(this.cls.itemHover)
				.filter(":eq(" + index + ")").addClass(this.cls.itemHover);
		},

		/**
		 * handle enter press on list item
		 * @param  {jquery object} $el list
		 */
		_enterList: function($el) {
			var $item = $el.find("." + this.cls.itemHover);

			if ($item.length) {
				this._selectOption($item.data("value"));
			} else {
				this._selectOption( this._getPlaceholderOrFirst.val() );
			}
		},

		/**
		 * select option according to value
		 * @param  {string} val value
		 */
		_selectOption: function(val) {
			var option;
			this.element.trigger("hsg.dropdown.selecting", [val]);

			option = this.element.find("option[value='" + val + "']");

			// select needed option or unselect all
			if (option) {
				option.prop("selected", "selected");
			} else {
				this.element.find("option").prop("selected", false);
			}

			// we need to trigger SELECT element change
			this.element.find("select").trigger("change");

			this.element.trigger("hsg.dropdown.select", [val]);

			$("body").off("keyup.hsg.dropdown");
			this._closeList();
		},

		/**
		 * set text on dropdown title
		 * @param {string} t text
		 */
		setTitle: function(t) {
			this.modal.find("h1").text(t);
		},

		/**
		 * set text on clear list link
		 * @param {string} t text
		 */
		setClear: function(t) {
			this.modal.find("." + this.cls.clearBtn).text(t);
		}
	});


	// attach events
	$(document).on("hsg-domready", function(e) {
		$("[data-hsg-dropdown]").each(function() {
			var obj, ele = $(this);

			if (!ele.data("dropdown")) {
				obj = HSG.dropdown(ele, HSG.utils.options(ele.attr("data-hsg-dropdown")));
			}
		});
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







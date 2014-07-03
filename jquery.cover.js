/*! Cover v1.2.0 | MIT License | github.com/antontrollback/cover */
/* 
  minor chanegs by kater louis  
*/

;(function($) {

  var pluginName = "cover";

  function Cover (element, options) {
    this.element = $(element);
	 var t = this;

    $.extend(this, {
		 // Defaults
      container: this.element.parent(),
      ratio: this.element.height() / this.element.width(),
		  resize: false
    }, options);
	 
	 // reset on resize
	 if (options.resize) {
		 $(window).resize(function() {
			 t.set();
		 })
	 }

    this.set();
  }

  Cover.prototype = {
    set: function() {
      var height = this.container.height();
      var width = this.container.width();
      var fillWidth = this.ratio >= (height / width);

      if (fillWidth && !this.fillingWidth) {
        this.fillingWidth = true;
        this.element.css('width', '100%').css('height', 'auto');
      }

      if (!fillWidth) {
        this.fillingWidth = false;
        this.element.css('width', 'auto').css('height', '100%');
      }
    }
  };

  // Wrapper preventing multiple instantiations
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Cover(this, options));
      }

      // Allow access to 'set' method
      if (options === 'set') {
        cover = $.data(this, 'plugin_' + pluginName).set();
      }
		
    });
  };

})(jQuery);

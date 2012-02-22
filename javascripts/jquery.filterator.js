(function($) {
  $.fn.filterator = function(opts) {

    return this.each(function() {
      

      // Error handling
      if (!opts.target) {
        throw new Error("No target. I don't know what to filter");
      }
      if (!opts.container) {
        throw new Error("No container. I don't know where to apply the filter");
      }

      // Initialize variables
      var el        = $(this),
          container = $(opts.container),
          target    = opts.target;
      
      
      if (!container.data('has-filters')) {
        /**
         * We need to apply multiple filters.
         * To do that, instead of filter in the click/select events of the filters we'll teach the container to filter itself
         */

        container.bind('filter', function() {
          console.log($(this).data());

        });
        container.data('has-filters', true);
      }
      

      if (el.get(0).tagName == 'SELECT') {
        // Select
        el.change(function() {
          var filter = $(this).val();
          if (filter) {
            container.data('filter-' + target, filter);
          } else {
            container.removeData('filter-' + target);
          }
          container.trigger('filter');

        });

      } else {

        // Links
        // TODO mark link as active
        el.delegate('a', 'click', function(e) {
          e.preventDefault();
          var filter = $(this).data('filter');
          if (filter) {
            container.data('filter-' + target, filter);
          } else {
            container.removeData('filter-' + target);
          }
          container.trigger('filter');
        });

      }
      






    });

  };
})(jQuery);

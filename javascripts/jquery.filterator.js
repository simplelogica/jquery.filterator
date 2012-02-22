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
          var $t       = $(this);
              elements = $t.children(); // Don't cache this. Maybe the collection has changed with ajax
                                        // TODO control if the collection has changed so we can cache it
          
          var data = $t.data(),
              filters = {};
          
          for (key in data) {
            var filter = key.match(/^filter(.*?)$/);
            if (filter) {
              filters[filter[1].toLowerCase()] = data[key];
            }
          }

          // Hide all
          elements.hide();
          
          // Filter and show filtered
          elements.filter(function() {
            for (filter in filters) {
              if ($(this).data(filter) != filters[filter]) {
                return false;
              }
            }

            return true;
          }).show();


        });
        container.data('has-filters', true);
      }


      /*
       * Handle filter controls
       */
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

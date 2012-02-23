jQuery.filterator
=================

jQuery.filterator allows yo to filter collections of elements using javascript and HTML5 data-attributes.

You can filter the collection using a list of links or a `<select>` tag. You can also apply various filters on the same collection.
Take a look at the `index.html` file for a full example.


Usage:
------

Given a set of links to use for filtering

    <div id="color-filters">
      <a href="#">All</a>
      <a href="#" data-filter="red">Red</a>
      <a href="#" data-filter="green">Green</a>
      <a href="#" data-filter="blue">Blue</a>
    </div>

And a collection of elements

    <ul id="collection">
      <li data-color="red">Red element</a>
      <li data-color="green">Green element</a>
      <li data-color="red">Red element</a>
      <li data-color="blue">Blue element</a>
      <li data-color="blue">Blue element</a>
      <li data-color="red">Red element</a>
    </ul>

One element can have more than one value to the same attribute, but it must be in the same data-attribute. That's solved by using the '#' character as a delimiter between values

    <ul id="collection">
      ...
      <li data-color="#green#red#">Yellow element</a>
      ...
    </ul>



You could enable the filtering using:

    $('#color-filters').filterator({ target: 'color', container: '#collection' });


* `target` is the data attribute of the collection which we should filter on.
* `container` is the jQuery selector where the collection is.




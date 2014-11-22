$(document).ready(function() {
  //!!mixpanel.track("Visited toppings page");

  function elementTopping(elt) {
    var classes = elt.className.split(' ');
    return _.first(_.difference(classes, ['topping', 'active']));
  }

  function getSelectedToppings() {
    return _.map($('.toppings .topping.active'), elementTopping);
  }

  ////////////////////////////////////////////////////////////////////
  // TODO - this exact code is duplicated in lib/web.js. Factor out.
  ////////////////////////////////////////////////////////////////////
  var AND = '&';
  function englishList(arr) {
    if (_.isEmpty(arr)) return '';
    if (arr.length === 1) return arr[0];
    if (arr.length === 2) return arr[0] + ' ' + AND + ' ' + arr[1];

    return (_.take(arr, arr.length - 1).concat([AND + ' ' + _.last(arr)])).join(', ');
  }

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  function pizzaText(toppings) {
    var ts = _.isEmpty(toppings)
          ? 'Cheese'
          : englishList(_.map(toppings, function(t) {
            return toTitleCase(t.replace('_', ' '));
          }));
    return '16" Large ' + ts + ' Pizza';
  }
  ////////////////////////////////////////////////////////////////////

//!!  var initialToppingsStr = getQuery().toppings;
  var initialToppingsStr = '';
  var initialToppings = initialToppingsStr ? initialToppingsStr.split(',') : [];

  function toggleTopping(topping) {
    $('.topping.' + topping).toggleClass('active');
    $('.toppings-render.' + topping).toggleClass('active');
  }

  _.each(initialToppings, toggleTopping);

  $(".topping").click(function(evt) {
    toggleTopping(elementTopping(this));

    // update price and description.
    var toppings = getSelectedToppings();
    var num_toppings = toppings.length;

    $('.description').text(pizzaText(toppings));
  });
});

$(document).ready(() => {
  const amenities = [];
  $('.amenities INPUT').change(function () {
    if (this.checked) {
      amenities.push($(this).attr('data-name'));
    } else {
      amenities.pop($(this).attr('data-name'));
    }
    $('.amenities H4').html(Object.values(amenities).join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status', function(data) {
    if (data.status == 'OK') {
      console.log(data);
      $('div#api_status').addClass('available');
    } else if ($('div#api_status').hasClass('available')) {
      $('div#api_status').removeClass('available');
    }
  });
});

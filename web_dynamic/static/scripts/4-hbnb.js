$(document).ready(() => {
  const amenities = [];
  const amenitiesId = []
  $('.amenities INPUT').change(function () {
    if (this.checked) {
      amenities.push($(this).attr('data-name'));
      amenitiesId.push($(this).attr('data-id'));
    } else {
      amenities.pop($(this).attr('data-name'));
      amenitiesId.pop($(this).attr('data-id'));
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

  $('.filters button').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: "POST",
      data: JSON.stringify({amenities: amenitiesId}),
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      success: function(data) {
        let places = '';
        $.each(data, function (index, value) {
          const guest = (value.max_guest > 1) ? ' guests' : ' guest';
          const rooms = (value.max_rooms > 1) ? ' rooms' : ' room';
          const bathrooms = (value.number_bathrooms > 1) ? ' bathrooms' : ' bathroom';
          places = places + '<article>' +
            '<div class="title_box">' +
            '<h2>' + value.name + '</h2>' +
            '<div class="price_by_night">' + '&dollar;' + value.price_by_night + '</div>' +
            '</div>' +
            '<div class="information">' +
            '<div class="max_guest">' + value.max_guest + guest + '</div>' +
            '<div class="number_rooms">' + value.number_rooms + rooms + '</div>' +
            '<div class ="number_bathrooms">' + value.number_bathrooms + bathrooms + '</div>' +
            '</div>' +
            '<div class="description">' + value.description + '</div>' +
            '</article>'
        });
        $('.places').html(places);
      }
    });
  });
});

$(document).ready(function () {


    var myLatLng = new google.maps.LatLng(28.521381, -81.466026);
    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        scrollwheel: false,
        zoom: 12
    });

    //marker
    function createMarker(latlng,icn,name) {
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: icn,
            title: name
        });
    }

    var request = {
        location: myLatLng,
        radius: '10000',
        type: ['gym']
    };


    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                latlng = place.geometry.location;
                icn = place.icon;
                name = place.name;
                createMarker(latlng,icn,name);
            }
        }
    }


});
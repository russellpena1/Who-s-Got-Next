var map;
var myLatLng;

$(document).ready(function () {

    geoLocationInit();

    function geoLocationInit(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(success,fail);
        }else{
            alert("Browser not supported");
        }
    }

    function success(position){
        var latval = position.coords.latitude;
        var lngval = position.coords.longitude;

        console.log([latval, lngval]);

        myLatLng = new google.maps.LatLng(latval,lngval);
        createMap(myLatLng);
        //nearbySearch(myLatLng,"gym");
        searchGyms(latval,lngval);

    }

    function fail() {
        alert("Couldn't retrieve position");
    }



    function createMap(myLatLng) {
        map = new google.maps.Map(document.getElementById('map'), {
            center: myLatLng,
            scrollwheel: false,
            zoom: 9
        });

        var marker= new google.maps.Marker({
            position: myLatLng,
            map: map
        })
    }

    //marker
    function createMarker(latlng,icn,name) {
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: icn,
            title: name
        });
    }

    /*function nearbySearch(myLatLng, type){
        var request = {
            location: myLatLng,
            radius: '10000',
            type: [type]
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
    }*/
    function searchGyms(lat,lng){
        $.post('http://localhost:8000/api/searchGyms',{lat:lat,lng:lng},function(match){
            console.log(match);

            $.each(match,function(i,val){
                var glatval = val.lat;
                var glngval = val.lng;
                var gname = val.name;
                var GLatLng = new google.maps.LatLng(glatval,glngval);
                var gicn = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
                createMarker(GLatLng,gicn,gname);
            });
        });
    }



});
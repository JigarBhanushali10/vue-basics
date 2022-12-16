var LocationsForMap = [
    ['Delhi', 28.704060, 77.102493],
    ['Jaipur', 26.9124, 75.7873],
    ['London', 51.507351, -0.127758],
    ['Washington', 47.751076, -120.740135]
];

var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: new google.maps.LatLng(28.704, 77.25),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

var infowindow = new google.maps.InfoWindow();

var marker, i;

for (i = 0; i < LocationsForMap.length; i++) {
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(LocationsForMap[i][1], LocationsForMap[i][2]),
        map: map
    });

    // google.maps.event.addListener(marker, 'click', (function (marker, i) {
    //     return function () {
    //         infowindow.setContent(LocationsForMap[i][0]);
    //         infowindow.open(map, marker);
    //     }
    // })(marker, i));
}
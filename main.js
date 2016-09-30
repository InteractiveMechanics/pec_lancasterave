var map = L.map('map', {zoomControl:false }).setView([39.979268, -75.230733], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/interactivemech/cith8vx1k000l2imon11lv5iq/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaW50ZXJhY3RpdmVtZWNoIiwiYSI6InJlcUtqSk0ifQ.RUwHuEkBbXoJ6SgOnXmYFg', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


L.control.zoom({position:'bottomright'}).addTo(map);

var dataSuccess = function(jsonData) {
    console.log(jsonData);
    var layerOptions = {
        pointToLayer: function(featureData, latlng) {

        	var category = (featureData.properties.category);

        	var artsIcon = L.icon({
		    iconUrl: 'imgs/markers/mapmarker-arts@2x.png',

		    iconSize:     [60, 60], // size of the icon
		    iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
		    //shadowAnchor: [12, 12],  // the same for the shadow
		    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
			});

			var civilrightsIcon = L.icon({
		    iconUrl: 'imgs/markers/mapmarker-civilrights@2x.png',

		    iconSize:     [60, 60], // size of the icon
		    iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
		    //shadowAnchor: [12, 12],  // the same for the shadow
		    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
			});

			var developmentIcon = L.icon({
		    iconUrl: 'imgs/markers/mapmarker-development@2x.png',

		    iconSize:     [60, 60], // size of the icon
		    iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
		    //shadowAnchor: [12, 12],  // the same for the shadow
		    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
			});

			var infrastructureIcon = L.icon({
		    iconUrl: 'imgs/markers/mapmarker-infrastructure@2x.png',

		    iconSize:     [60, 60], // size of the icon
		    iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
		    //shadowAnchor: [12, 12],  // the same for the shadow
		    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
			});

			var getIcon = function(x) {
            var icon = artsIcon;

			if (x == 'civil rights') {
			icon = civilrightsIcon;
			} else if (x == 'arts') {
			  icon = artsIcon;
			} else if (x == 'development') {
			  icon = developmentIcon;
			} else if (x == 'infrastructure') {
			  icon = infrastructureIcon;
			}

			return icon;
			},

			markerOptions = {
				icon: getIcon(category)
			}

			// var popupOptions = {
			// 	maxWidth: 220,
			// };


			return L.marker(latlng, markerOptions);

		}
	};

	var inventoryLayer = L.geoJson(jsonData, layerOptions);
	map.addLayer(inventoryLayer);

}; 

$.getJSON('data.json', dataSuccess);
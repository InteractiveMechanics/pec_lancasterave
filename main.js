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

		    iconSize:     [67.5, 60], // size of the icon
		    iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
		    //shadowAnchor: [12, 12],  // the same for the shadow
		    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
			});

			var civilrightsIcon = L.icon({
		    iconUrl: 'imgs/markers/mapmarker-civilrights@2x.png',

		    iconSize:     [67.5, 60], // size of the icon
		    iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
		    //shadowAnchor: [12, 12],  // the same for the shadow
		    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
			});

			var developmentIcon = L.icon({
		    iconUrl: 'imgs/markers/mapmarker-development@2x.png',

		    iconSize:     [67.5, 60], // size of the icon
		    iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
		    //shadowAnchor: [12, 12],  // the same for the shadow
		    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
			});

			var infrastructureIcon = L.icon({
		    iconUrl: 'imgs/markers/mapmarker-infrastructure@2x.png',

		    iconSize:     [67.5, 60], // size of the icon
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
				icon: getIcon(category),
				riseOnHover: true
			}

			return L.marker(latlng, markerOptions);

		},

		onEachFeature: function (featureData, layer) {
        //layer.bindPopup(feature.properties.GPSUserName);
        	var clearPopup = function() {
        		$('#popup').html('');
        	}

        	layer.on('click', function (e) {
            	//clearPopup();
            	var $popup = $('#popup');
            	var $category = featureData.properties.category;
            	if ($popup.hasClass('hidden')) {
            		$popup.removeClass('hidden').addClass('visible');
            		$('#popup-template').appendTo($popup);
            		$('#title').html(featureData.properties.title);
            		$('#img').attr('src', featureData.properties.img);
            		$('#address').html(featureData.properties.presentAddress);
            		$('#caption').html(featureData.properties.caption);
            		$('#attr').html(featureData.properties.attr);
            		$('#attrUrl').attr('href', 'featureData.properties.attrUrl');
            		$('#description').html(featureData.properties.description);
            		$('#sourceUrl').attr('href', 'featuredata.properties.sourceUrl');
            		$('#sourceTitle').html(featureData.properties.sourceTitle);
            		$('#resourceTitle').html(featureData.properties.resourceTitle);
            		$('#resourceUrl').attr('href', 'featureData.properties.resourceUrl');
            		if ($category == 'civil rights') {
            			$('#icon').attr('src', 'imgs/icons/icon-civilrights.svg')
            			$('#address').css({'color': '#594a41'});
            		} else if ($category == 'arts') {
            			$('#icon').attr('src', 'imgs/icons/icon-arts.svg');
            			$('#address').css({'color': '#1b75bb'});
            		} else if ($category == 'development') {
            			$('#icon').attr('src', 'imgs/icons/icon-development.svg');
            			$('#address').css({'color': '#d91b5b'});
            		} else if ($category == 'infrastructure') {
            			$('#icon').attr('src', 'imgs/icons/icon-infrastructure.svg');
            			$('#address').css({'color': '#fbaf3f'})
            		}

           		}

        	});

	            console.log(featureData.properties.category);

	        $( ".close" ).click(function() {
			  $('#popup').addClass('hidden').removeClass('visible');
			});

			 
 
    	}

	};


	var inventoryLayer = L.geoJson(jsonData, layerOptions);
	map.addLayer(inventoryLayer);

};

$.getJSON('data.json', dataSuccess);






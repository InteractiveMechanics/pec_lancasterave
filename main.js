var map = L.map('map', {zoomControl:false }).setView([39.967764, -75.229737], 13.5);

L.tileLayer('https://api.mapbox.com/styles/v1/interactivemech/cith8vx1k000l2imon11lv5iq/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaW50ZXJhY3RpdmVtZWNoIiwiYSI6InJlcUtqSk0ifQ.RUwHuEkBbXoJ6SgOnXmYFg', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);




// Category Layers

var infrastructureGroup = new L.layerGroup([]);
var developmentGroup = new L.layerGroup([]);
var civilrightsGroup = new L.layerGroup([]);
var artsGroup = new L.layerGroup([]);
var allCategoriesGroup = new L.layerGroup([infrastructureGroup, developmentGroup, artsGroup, civilrightsGroup]);

map.addLayer(infrastructureGroup).addLayer(developmentGroup).addLayer(civilrightsGroup).addLayer(artsGroup).addLayer(allCategoriesGroup);


// Timeline Layers

var era1Group = new L.layerGroup([]);
var era2Group = new L.layerGroup([]);
var era3Group = new L.layerGroup([]);
var era4Group = new L.layerGroup([]);
var era5Group = new L.layerGroup([]);
var era6Group = new L.layerGroup([]);
var era7Group = new L.layerGroup([]);
var era8Group = new L.layerGroup([]);
var era9Group = new L.layerGroup([]);
var era10Group = new L.layerGroup([]);
var era11Group = new L.layerGroup([]);
var eraNoneGroup = new L.LayerGroup([]);
var allerasGroup = new L.layerGroup([era1Group, era2Group, era3Group, era4Group, era5Group, era6Group, era7Group, era8Group, era9Group, era10Group, era11Group, eraNoneGroup]);

map.addLayer(era1Group).addLayer(era2Group).addLayer(era3Group).addLayer(era4Group).addLayer(era5Group).addLayer(era6Group).addLayer(era7Group).addLayer(era8Group).addLayer(era9Group).addLayer(era10Group).addLayer(era11Group).addLayer(allerasGroup).addLayer(eraNoneGroup);

// Custom Controls

var customControlTimeline = L.Control.extend({options: {position: 'bottomright'},
    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'timeline-wrapper');
        container.innerHTML = '<button id="era-all">View All</button><button id="era-1">1600-1699</button><button id="era-2">1700-1749</button><button id="era-3">1750-1799</button><button id="era-4">1800-1849</button><button id="era-5">1850-1899</button><button id="era-6">1900-1919</button><button id="era-7">1920-1939</button><button id="era-8">1940-1959</button><button id="era-9">1960-1979</button><button id="era-10">1980-1999</button><button id="era-11">2000+</button>';
        return container;
    }

});

map.addControl(new customControlTimeline);


L.control.zoom({position:'bottomright'}).addTo(map);

var customControlCategories = L.Control.extend({options: {position: 'bottomright'}, 
    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'categories-wrapper');
        container.innerHTML = '<button class="category-filter filter-infrastructure active"><span class="btn-content">Infrastructure</span></button><button class="category-filter filter-development active"><span class="btn-content">Development</span></button><button class="category-filter filter-civilrights active"><span class="btn-content">Social Movements &amp; Civil Rights</span></button><button class="category-filter filter-arts active"><span class="btn-content">Arts &amp; Culture</span></button><div class="titles-wrapper"><ul><li>infrastructure</li><li>Development</li><li>Civil Rights</li><li>Arts</li></ul></div>';
        return container
    }

});

map.addControl(new customControlCategories);


var customControlLogo = L.Control.extend({options: {position: 'topright'},
    
    onAdd: function (map) {
        var container = L.DomUtil.create('button', 'logo-btn');
        container.innerHTML = '<img src="imgs/logo-inverse.svg" alt="logo" id="map-logo">';
        return container;
    }
});

map.addControl(new customControlLogo());

// Add Data to Map

var jsonData = { "type": "FeatureCollection", "features": [] };
var dataSuccess = function(data) {

    $.each(data, function(index, value){
        if (value.latitude && value.longitude && value.image){

            $.getJSON("http://dev.interactivemechanics.com/lancasterave/data/wp-json/wp/v2/media/" + value.image, function(d) {
                if (d.guid) {
                    //console.log(data.guid.rendered);
                    var imageURL = d.guid.rendered;
                    var rawEra = value.time_period;
                    var removeCurlyBraces = rawEra.replace(/[{}]/g, "");
                    
                    function extractText( str ){
                        var ret = "";
        
                        if ( /"/.test( str ) ){
                            ret = str.match( /"(.*?)"/g );
                        } else {
                            ret = str;
                        }
        
                        return ret;
                    }
        
                    var obj = extractText(removeCurlyBraces);
                    var array = Object.keys(obj).map(function (key) { return obj[key]; });
                    console.log(array);
                
        
                    var dataToAdd = {};
                    dataToAdd["type"] = "Feature";
                    dataToAdd["geometry"] = {};
                    dataToAdd["geometry"]["type"] = "Point";
                    dataToAdd["geometry"]["coordinates"] = [value.longitude, value.latitude]
        
                    dataToAdd["properties"] = {};
                    dataToAdd["properties"]["title"] = value.post_title;
                    dataToAdd["properties"]["description"] = value.post_content;
                    dataToAdd["properties"]["sourceTitle"] = value.source_title;
                    dataToAdd["properties"]["sourceUrl"] = value.source_link;
                    dataToAdd["properties"]["img"] = imageURL;
                    dataToAdd["properties"]["caption"] = value.image_caption;
                    dataToAdd["properties"]["attr"] = value.image_attribution;
                    dataToAdd["properties"]["attrUrl"] = value.image_attribution_url;
                    dataToAdd["properties"]["presentAddress"] = value.street_address;
                    dataToAdd["properties"]["resourceTitle"] = value.resource_title;
                    dataToAdd["properties"]["resourceUrl"] = value.resource_link;
                    dataToAdd["properties"]["era"] = array;
                    dataToAdd["properties"]["category"] = value.category;
            
                    jsonData["features"].push(dataToAdd);

                } else {
                    console.log('Point not added.');
                }
            });
       
        }
    });

    var layerOptions = {
        pointToLayer: function(featureData, latlng) {

        	var category = (featureData.properties.category);

        	var artsIcon = L.icon({
		    iconUrl: 'imgs/markers/mapmarker-arts@2x.png',

		    iconSize:     [67.5, 60], // size of the icon
		    iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
		    //shadowAnchor: [12, 12],  // the same for the shadow
		    //popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
			});

			var civilrightsIcon = L.icon({
		    iconUrl: 'imgs/markers/mapmarker-civilrights@2x.png',

		    iconSize:     [67.5, 60], // size of the icon
		    iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
		    //shadowAnchor: [12, 12],  // the same for the shadow
		    //popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
			});

			var developmentIcon = L.icon({
		    iconUrl: 'imgs/markers/mapmarker-development@2x.png',

		    iconSize:     [67.5, 60], // size of the icon
		    iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
		    //shadowAnchor: [12, 12],  // the same for the shadow
		    //popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
			});

			var infrastructureIcon = L.icon({
		    iconUrl: 'imgs/markers/mapmarker-infrastructure@2x.png',

		    iconSize:     [67.5, 60], // size of the icon
		    iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
		    //shadowAnchor: [12, 12],  // the same for the shadow
		    //popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
			});

			var getIcon = function(x) {
            var icon = artsIcon;

			if (x == 'civilrights') {
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

            $era = (featureData.properties.era);
        	
        	if (featureData.properties.category == 'arts') {
        		artsGroup.addLayer(layer);
        	} else if (featureData.properties.category == 'civilrights') {
        		civilrightsGroup.addLayer(layer);
        	} else if (featureData.properties.category == 'development') {
        		developmentGroup.addLayer(layer);
        	} else if (featureData.properties.category == 'infrastructure') {
        		infrastructureGroup.addLayer(layer);
        	}

            for (var i = 0; i < $era.length; i++) {
                if ($era[i] === '"era-1"') {
                    era1Group.addLayer(layer);
                }
                if ($era[i] === '"era-2"') {
                    era2Group.addLayer(layer)
                }
                if ($era[i] === '"era-3"') {
                    era3Group.addLayer(layer)
                }
                if ($era[i] == '"era-4"') {
                    era4Group.addLayer(layer)
                }
                if ($era[i] == '"era-5"') {
                    era5Group.addLayer(layer) 
                }
                if ($era[i] == '"era-6"') {
                    era6Group.addLayer(layer)
                }
                if ($era[i] == '"era-7"') {
                    era7Group.addLayer(layer)
                }
                if ($era[i] == '"era-8"') {
                    era8Group.addLayer(layer)
                }
                if ($era[i] == '"era-9"') {
                    era9Group.addLayer(layer)
                }
                if ($era[i] == '"era-10"') {
                    era10Group.addLayer(layer)
                }
                if ($era[i] == '"era-11"') {
                    era11Group.addLayer(layer)
                }
                if ($era[i] == '" "') {
                    eraNoneGroup.addLayer(layer);
                }

            }



        	var clearPopup = function() {
        		$('#popup').html('');
        	}

            
        	layer.on('click', function (e) {
            	//clearPopup();
            	var $popup = $('#popup');
            	var $category = featureData.properties.category;
                $('.leaflet-marker-icon').css('opacity', '0.7');
                layer.setOpacity(1.0);
            	if ($popup.hasClass('hidden')) {


                   
            		$popup.removeClass('hidden').addClass('visible');
            		$('#popup-template').appendTo($popup);
            		$('#title').html(featureData.properties.title);
            		$('#img').attr('src', 'http://dev.interactivemechanics.com//lancasterave//data//wp-content//uploads//2016//10//kingontheave.jpg');
            		$('#address').html(featureData.properties.presentAddress);
            		$('#caption').html(featureData.properties.caption);
            		$('#attr').html(featureData.properties.attr);
            		$('#attrUrl').attr('href', featureData.properties.attrUrl);
            		$('#description').html(featureData.properties.description);
            		$('#sourceUrl').attr('href', featureData.properties.sourceUrl);
            		$('#sourceTitle').html(featureData.properties.sourceTitle);
            		$('#resourceTitle').html(featureData.properties.resourceTitle);
            		$('#resourceUrl').attr('href', featureData.properties.resourceUrl);
                    $('#era').html(featureData.properties.era);
            		if ($category == 'civilrights') {
            			$('#icon').attr('src', 'imgs/icons/icon-civilrights.svg')
            			$('#address').css({'color': '#594a41'});
            		} else if ($category == 'arts') {
            			$('#icon').attr('src', 'imgs/icons/icon-arts.svg');
            			$('#address').css({'color': '#1b75bb'});
            		} else if ($category == 'development') {
            			$('#icon').attr('src', 'imgs/icons/icon-development.svg');
            			$('#address').css({'color': '#fbaf3f'});
            		} else if ($category == 'infrastructure') {
            			$('#icon').attr('src', 'imgs/icons/icon-infrastructure.svg');
            			$('#address').css({'color': '#d91b5b'})
            		}
                   

           		}

        	});

	        $( ".close" ).click(function() {
			  $('#popup').addClass('hidden').removeClass('visible');
              $('.leaflet-marker-icon').css('opacity', '1.0');
			});		 
 
    	}

	};


	var inventoryLayer = L.geoJson(jsonData, layerOptions);
	map.addLayer(inventoryLayer);

};

$.getJSON('http://dev.interactivemechanics.com/lancasterave/data/wp-json/rest-routes/v2/locations', dataSuccess);

// Image Function



// var getImageUrl = function(id) {
//     $.getJSON('http://dev.interactivemechanics.com/lancasterave/data/wp-json/wp/v2/media/'+ id, function(data) {
//         //console.log(data.guid.rendered);
//         if (data.guid) {
//         return data.guid.rendered;
//         } else {
//         return 'https://images3.alphacoders.com/274/274725.jpg';
//         }
//     }); 
// } 


// Map Btn Functions - Except Timeline

var categoryFilterTasks = function(LayerGroup, button) {
    if(map.hasLayer(LayerGroup)) {
        $(button).removeClass('active');
        map.removeLayer(LayerGroup);
    } else {
        map.addLayer(LayerGroup);        
        $(button).addClass('active');
    }
}

$('.logo-btn').click(function() {
    showWelcome();
    $('#welcome').addClass('visible');
});

$('.filter-arts').click(function() {
   categoryFilterTasks(artsGroup, '.filter-arts');
});

$('.filter-civilrights').click(function() {
   categoryFilterTasks(civilrightsGroup, '.filter-civilrights');
});

$('.filter-development').click(function() {
    categoryFilterTasks(developmentGroup, '.filter-development');
});

$('.filter-infrastructure').click(function() {
    categoryFilterTasks(infrastructureGroup, '.filter-infrastructure');
});

// Timeline functions

var eraFilterTasks = function(LayerGroup, button) {
    if ($('.timeline-wrapper button').hasClass('active')) {
        $('.timeline-wrapper button').removeClass('active');  
    } 
    $(button).addClass('active');
    map.addLayer(allerasGroup);
    map.removeLayer(allerasGroup);
    map.addLayer(LayerGroup);
}

$('#era-all').click(function() {
    if ($('.timeline-wrapper button').hasClass('active')) {
        $('.timeline-wrapper button').removeClass('active');  
    } 
    $(this).addClass('active');
    map.addLayer(allerasGroup);
    map.addLayer(allCategoriesGroup);
});

$('#era-1').click(function() {
    eraFilterTasks(era1Group, '#era-1');
});

$('#era-2').click(function() {
    eraFilterTasks(era2Group, '#era-2');
});

$('#era-3').click(function() {
    eraFilterTasks(era3Group, '#era-3');
});

$('#era-4').click(function() {
    eraFilterTasks(era4Group, '#era-4');
});

$('#era-5').click(function() {
    eraFilterTasks(era5Group, '#era-5');
});

$('#era-6').click(function() {
    eraFilterTasks(era6Group, '#era-6');
});

$('#era-7').click(function() {
    eraFilterTasks(era7Group, '#era-7');
});

$('#era-8').click(function() {
    eraFilterTasks(era8Group, '#era-8');
});

$('#era-9').click(function() {
    eraFilterTasks(era9Group, '#era-9');
});

$('#era-10').click(function() {
    eraFilterTasks(era10Group, '#era-10');
});

$('#era-11').click(function() {
    eraFilterTasks(era11Group, '#era-11');
});

// Functions related to Welcome Screen


var showWelcome = function() {
    var $welcome = $('#welcome');
    if ($welcome.hasClass('hidden')) {
        $welcome.removeClass('hidden');
    }
}

var hideWelcome = function() {
    var $welcome = $('#welcome');
    $welcome.addClass('hidden').removeClass('visible');
}

$(document).ready(showWelcome);

$('#explore-btn').click(function() {
    hideWelcome();
});


$('#arts-btn').click(function() {
    hideWelcome();
    if (map.hasLayer(civilrightsGroup)) {
        map.removeLayer(civilrightsGroup);
    }
    if (map.hasLayer(infrastructureGroup)) {
        map.removeLayer(infrastructureGroup);
    }
    if (map.hasLayer(developmentGroup)) {
        map.removeLayer(developmentGroup);
    }
    map.addLayer(artsGroup);
})


$('#civilrights-btn').click(function() {
    hideWelcome();
    if (map.hasLayer(artsGroup)) {
        map.removeLayer(artsGroup);
    }
    if (map.hasLayer(infrastructureGroup)) {
        map.removeLayer(infrastructureGroup);
    }
    if (map.hasLayer(developmentGroup)) {
        map.removeLayer(developmentGroup);
    }
    map.addLayer(civilrightsGroup);
})

$('#infrastructure-btn').click(function() {
    hideWelcome();
    if (map.hasLayer(civilrightsGroup)) {
        map.removeLayer(civilrightsGroup);
    }
    if (map.hasLayer(artsGroup)) {
        map.removeLayer(artsGroup);
    }
    if (map.hasLayer(developmentGroup)) {
        map.removeLayer(developmentGroup);
    }
    map.addLayer(infrastructureGroup);
})

$('#development-btn').click(function() {
    hideWelcome();
    if (map.hasLayer(civilrightsGroup)) {
        map.removeLayer(civilrightsGroup);
    }
    if (map.hasLayer(infrastructureGroup)) {
        map.removeLayer(infrastructureGroup);
    }
    if (map.hasLayer(artsGroup)) {
        map.removeLayer(artsGroup);
    }
    map.addLayer(developmentGroup);
})








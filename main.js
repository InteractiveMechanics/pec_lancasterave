var map = L.map('map', {zoomControl:false }).setView([39.967764, -75.229737], 13.5);

L.tileLayer('https://api.mapbox.com/styles/v1/interactivemech/cith8vx1k000l2imon11lv5iq/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaW50ZXJhY3RpdmVtZWNoIiwiYSI6InJlcUtqSk0ifQ.RUwHuEkBbXoJ6SgOnXmYFg', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
}).addTo(map);




// Category Layers

var infrastructureGroup = new L.layerGroup([]);
var developmentGroup = new L.layerGroup([]);
var civilrightsGroup = new L.layerGroup([]);
var artsGroup = new L.layerGroup([]);
var allCategoriesGroup = new L.layerGroup([infrastructureGroup, developmentGroup, artsGroup, civilrightsGroup]);

map.addLayer(infrastructureGroup).addLayer(developmentGroup).addLayer(civilrightsGroup).addLayer(artsGroup).addLayer(allCategoriesGroup);


// Bounds FeatureGroup (not layerGroup)
var boundingGroup = new L.featureGroup([]);

map.addLayer(boundingGroup);


// Tour FeatureGroup 
var tourGroup = new L.featureGroup([]);

map.addLayer(tourGroup);


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
        var container = L.DomUtil.create('div', 'timeline-container');
        container.innerHTML = '<div class="timeline-wrapper"><button data-era="0">View All</button><button data-era="1" data-era-width="1" >1600-1699</button><button data-era="2" data-era-width="2">1700-1749</button><button data-era="3" data-era-width="2">1750-1799</button><button data-era="4" data-era-width="2">1800-1849</button><button data-era="5" data-era-width="2">1850-1899</button><button data-era="6" data-era-width="3">1900-1919</button><button data-era="7" data-era-width="3">1920-1939</button><button data-era="8" data-era-width="3">1940-1959</button><button data-era="9" data-era-width="3">1960-1979</button><button data-era="10" data-era-width="3">1980-1999</button><button data-era="11" data-era-width="3">2000+</button></div>';
        return container;
    }

});

map.addControl(new customControlTimeline);



var customControlTimelineMobile = L.Control.extend({options: {position: 'bottomright'},
    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'timeline-container-mobile');
        container.innerHTML = '<select id="timeline-wrapper" class="selectpicker"><option id="era-all" data-era="0">View All Time Periods</option><option id="era-1" data-era-width="1" data-era="1">1600-1699</option><option id="era-2" data-era-width="2" data-era="2">1700-1749</option><option id="era-3" data-era-width="2" data-era="3">1750-1799</option><option id="era-4" data-era-width="2" data-era="4">1800-1849</option><option id="era-5" data-era-width="2" data-era="5">1850-1899</option><option id="era-6" data-era-width="3" data-era="6">1900-1919</option><option id="era-7" data-era-width="3" data-era="7">1920-1939</option><option id="era-8" data-era-width="3" data-era="8">1940-1959</option><option id="era-9" data-era-width="3" data-era="9">1960-1979</option><option id="era-10" data-era-width="3" data-era="10">1980-1999</option><option><button id="era-11" data-era-width="3" data-era="11">2000+</option></select>';
        return container;
    }

});

map.addControl(new customControlTimelineMobile);




L.control.zoom({position:'bottomright'}).addTo(map);




var customControlCategories = L.Control.extend({options: {position: 'bottomright'}, 
    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'categories-wrapper');
        container.innerHTML = '<button class="category-filter filter-infrastructure active"><span class="btn-content">Infrastructure</span></button><button class="category-filter filter-development active"><span class="btn-content">Development</span></button><button class="category-filter filter-civilrights active"><span class="btn-content">Social Movements &amp; Civil Rights</span></button><button class="category-filter filter-arts active"><span class="btn-content">Arts &amp; Culture</span></button><div class="titles-wrapper"><ul><li>infrastructure</li><li>Development</li><li>Civil Rights</li><li>Arts</li></ul></div>';
        return container
    }

});

map.addControl(new customControlCategories);



var customControlCategoriesMobile = L.Control.extend({options: {position: 'bottomright'}, 
    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'categories-wrapper-mobile');
        container.innerHTML = '<select class="selectpicker" id="categories-wrapper-mobile"><option data-category="all">View All Categories</option><option class="category-filter filter-infrastructure-mobile" data-category="infrastructure">Infrastructure</option><option class="category-filter filter-development-mobile active" data-category="development">Development</option><option class="category-filter filter-civilrights-mobile active" data-category="civilrights">Social Movements &amp; Civil Rights</option><option class="category-filter filter-arts-mobile active" data-category="arts">Arts &amp; Culture</option></select>';
        return container
    }

});

map.addControl(new customControlCategoriesMobile);





var customControlLogo = L.Control.extend({options: {position: 'topright'},
    
    onAdd: function (map) {
        var container = L.DomUtil.create('button', 'logo-btn');
        container.innerHTML = '<img src="imgs/logo.svg" alt="logo" id="map-logo">';
        return container;
    }
});

map.addControl(new customControlLogo());








// global variables

var tourStopsArray = [];
var tourIntro = "";
var tourConclusion = "";
var showPopup = function(featureData) {
	
	clearPopup();
    var $popup = $('#popup');
    var $category = featureData.properties.category;
    if ($popup.hasClass('hidden')) {


            		$popup.removeClass('hidden').addClass('visible');
            		$('#popup-template').appendTo($popup);
            		$('#title').html(featureData.properties.title);
            		$('#img').attr('src', featureData.properties.img);
            		$('#img').attr('alt', featureData.properties.caption);
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
                    if (featureData.properties.tourstop) {
                        $('#icon-wrapper').prepend('<img src="imgs/icons/icon-tour.svg" id="icon-tour">');
                    }
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
            		
					emptyIf('#attr', '#image-from');
					emptyIf('#sourceTitle', '#info-from');
					emptyIf('#resourceTitle', '#more-details');
					


           		} 

	
}


// Add Data to Map

$.getJSON('http://dev.interactivemechanics.com/lancasterave/data/wp-json/rest-routes/v2/test', function(data) {
	$.each(data, function(index, value){
		 
		var rawTourStops = value.tour_stops;
		//console.log("Tour Stops is a " + typeof rawTourStops);
		//console.log(rawTourStops);
		
		var removeCurlyBraces = rawTourStops.replace(/[{}]/g, "");
            
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
        tourStopsArray = Object.keys(obj).map(function (key) { return parseInt(obj[key].replace(/['"]+/g, ''));});
        //console.log(tourStopsArray);
        //console.log("each item in tourStopaArray is a " + typeof tourStopsArray[0]);
        
        
        tourIntro = value.introduction;
        tourConclusion = value.conclusion;
               
	});	
});



// Helper functions

var emptyIf = function(emptyEl, hideThis) {
	if( !$.trim( $(emptyEl).html() ).length ) {
		$(hideThis).addClass('hidden');
	} else {
		$(hideThis).removeClass('hidden');
	}
}


var clearPopup = function() {
    $('#icon-tour').remove();
    if ($('#popup').hasClass('visible')) {
	    $('#popup').addClass('hidden').removeClass('visible');
    }
}

var resetPopup = function() {
	$('#title').html("");
    $('#img').attr('src', "");
    $('#img').attr('alt', "");
    $('#address').html("");
    $('#caption').html("");
    $('#attr').html("");
    $('#attrUrl').attr('href', "");
    $('#description').html("");
    $('#sourceUrl').attr('href', "");
    $('#sourceTitle').html("");
    $('#resourceTitle').html("");
    $('#resourceUrl').attr('href', "");
    $('#icon').attr('src', '');
    $('#icon-tour').remove();
}




// End helper functions, begin heavy lifting data stuff

var jsonData = { "type": "FeatureCollection", "features": [] };
var dataSuccess = function(data) {
    console.log(data);
    $.each(data, function(index, value){
        if (value.latitude && value.longitude){
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
            //console.log(array);
        

            var dataToAdd = {};
            dataToAdd["type"] = "Feature";
            dataToAdd["geometry"] = {};
            dataToAdd["geometry"]["type"] = "Point";
            dataToAdd["geometry"]["coordinates"] = [value.longitude, value.latitude]

            dataToAdd["properties"] = {};
            dataToAdd["properties"]["ID"] = value.ID;
            dataToAdd["properties"]["title"] = value.post_title;
            dataToAdd["properties"]["description"] = value.post_content;
            dataToAdd["properties"]["sourceTitle"] = value.source_title;
            dataToAdd["properties"]["sourceUrl"] = value.source_link;
            dataToAdd["properties"]["caption"] = value.image_caption;
            dataToAdd["properties"]["img"] = '';
            dataToAdd["properties"]["attr"] = value.image_attribution;
            dataToAdd["properties"]["attrUrl"] = value.image_attribution_url;
            dataToAdd["properties"]["presentAddress"] = value.street_address;
            dataToAdd["properties"]["resourceTitle"] = value.resource_title;
            dataToAdd["properties"]["resourceUrl"] = value.resource_link;
            dataToAdd["properties"]["era"] = array;
            dataToAdd["properties"]["category"] = value.category;
    
            jsonData["features"].push(dataToAdd);

            if (value.image){
                $.getJSON("http://dev.interactivemechanics.com/lancasterave/data/wp-json/wp/v2/media/" + value.image, function(d) {
                    if (d.source_url) {
                        // console.log(index, d.source_url, value.post_title);
                        jsonData["features"][index]["properties"]["img"] = d.source_url;
                    }
                });
            }
                      
            
        }
    });

    var layerOptions = {
        pointToLayer: function(featureData, latlng) {

        	var category = (featureData.properties.category);

        	
        	var categoryIcon = L.Icon.extend({
			    options: {
			        iconSize:     [67, 60],
			        shadowSize:   [30, 30],
			        iconAnchor:   [33, 52],
			        shadowAnchor: [4, 62]
			    }
			});
        	
			var artsIcon = new categoryIcon({iconUrl: 'imgs/markers/mapmarker-arts@2x.png'}),
				civilrightsIcon = new categoryIcon({iconUrl: 'imgs/markers/mapmarker-civilrights@2x.png'}),
				developmentIcon = new categoryIcon({iconUrl: 'imgs/markers/mapmarker-development@2x.png'}),
				infrastructureIcon = new categoryIcon({iconUrl: 'imgs/markers/mapmarker-infrastructure@2x.png'});
        

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
 
            
            boundingGroup.addLayer(layer);
        	
        	if (featureData.properties.category == 'arts') {
        		artsGroup.addLayer(layer);
        	} else if (featureData.properties.category == 'civilrights') {
        		civilrightsGroup.addLayer(layer);
        	} else if (featureData.properties.category == 'development') {
        		developmentGroup.addLayer(layer);
        	} else if (featureData.properties.category == 'infrastructure') {
        		infrastructureGroup.addLayer(layer);
        	} else {
	        	artsGroup.addLayer(layer);
        	}
        	
        	
        	for (var i = 0; i < tourStopsArray.length; i++) {
	        	if (featureData.properties.ID == tourStopsArray[i]) {
		        	tourGroup.addLayer(layer);
                    featureData["properties"]["tourstop"] = true;
		        	//console.log('ID ' + featureData.properties.ID + ", " + featureData.properties.title + ", was added to the tourGroup");
	        	}
        	}
        	
        	
        
    
        	

            for (var i = 0; i < $era.length; i++) {
	            // double quotes inside single quotes are intentional - do not remove
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
            
           

				


           
        	layer.on('click', function(e) {
	        	  $('.leaflet-marker-icon').css('opacity', '0.7');
				  layer.setOpacity(1.0);
				  //console.log(featureData);
				  showPopup(featureData);

                  sendGAEvent(featureData.properties.title);
	        });

	        $( ".close" ).click(function() {
			  $('#popup').addClass('hidden').removeClass('visible');
              $('.leaflet-marker-icon').css('opacity', '1.0');
			});		 
 
    	}

	};

	var inventoryLayer = L.geoJson(jsonData, layerOptions);
	map.addLayer(inventoryLayer);
	map.fitBounds(boundingGroup.getBounds());
	map.doubleClickZoom.disable();
	
	
	
};



$.getJSON('http://dev.interactivemechanics.com/lancasterave/data/wp-json/rest-routes/v2/locations', dataSuccess).done(function() {
    $('#preloader').removeClass('in');
    setTimeout(function(){
        $('#preloader').hide();
    }, 500);
});





// Map Btn Functions - Except Timeline

var categoryFilterTasks = function(LayerGroup, button) {
	if ($('.timeline-wrapper button').hasClass('active')) {
	   // $('.timeline-wrapper button').removeClass('active');
	    $(button).addClass('active');
	    map.removeLayer(era1Group);
	    map.removeLayer(era2Group);
	    map.removeLayer(era3Group);
	    map.removeLayer(era4Group);
	    map.removeLayer(era5Group);
	    map.removeLayer(era6Group);
	    map.removeLayer(era7Group);
	    map.removeLayer(era8Group);
	    map.removeLayer(era9Group);
	    map.removeLayer(era10Group);
	    map.removeLayer(era11Group);
	    map.addLayer(LayerGroup);
	    $('.timeline-wrapper button').removeClass('active');
	    
    } else {
    	if(map.hasLayer(LayerGroup)) {
        	$(button).removeClass('active');
			map.removeLayer(LayerGroup);
   		} else {
        	map.addLayer(LayerGroup);        
			$(button).addClass('active');
    	}
   }
  
}

$('.logo-btn').click(function() {
    showWelcome();
    alterHistory('/lancasterave/');
    $('#welcome').addClass('visible');
});

$('#categories-wrapper-mobile').on('changed.bs.select', function(e) {
	var selected = $(this).find("option:selected").attr("data-category");
	 map.addLayer(allCategoriesGroup);
	 map.removeLayer(allCategoriesGroup);
	if (selected == 'arts') {
		map.addLayer(artsGroup);
	} else if (selected == 'civilrights') {
		map.addLayer(civilrightsGroup);
	} else if (selected == 'infrastructure') {
		map.addLayer(infrastructureGroup);
	} else if (selected == 'development') {
		map.addLayer(developmentGroup);
	} else {
		map.addLayer(allCategoriesGroup);
	}
	
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



// Timeline functions - mobile

$('.selectpicker').selectpicker();

$('#timeline-wrapper').on('changed.bs.select', function(e) {
	var selected = $(this).find("option:selected").attr("data-era");
	 map.addLayer(allerasGroup);
	 map.removeLayer(allerasGroup);
	if (selected == 1) {
		map.addLayer(era1Group);
	} else if (selected == 2) {
		map.addLayer(era2Group);
	} else if (selected == 3) {
		map.addLayer(era3Group);
	} else if (selected == 4) {
		map.addLayer(era4Group);
	} else if (selected == 5) {
		map.addLayer(era5Group);
	} else if (selected == 6) {
		map.addLayer(era6Group);
	} else if (selected == 7) {
		map.addLayer(era7Group);
	} else if (selected == 8) {
		map.addLayer(era8Group);
	} else if (selected == 9) {
		map.addLayer(era10Group);
	} else if (selected == 10) {
		map.addLayer(era11Group);
	} else {
		map.addLayer(allerasGroup);
	}
	
});



var eraFilterTasks = function(LayerGroup, button) {
    if ($('.timeline-wrapper button').hasClass('active')) {
        $('.timeline-wrapper button').removeClass('active');  
    } 
    $(button).addClass('active'); 
    $('.filter-arts').removeClass('active');
    $('.filter-civilrights').removeClass('active');
    $('.filter-development').removeClass('active');
    $('.filter-infrastructure').removeClass('active');
    map.addLayer(allerasGroup);
    map.removeLayer(allerasGroup);
    
    map.removeLayer(artsGroup);
    map.removeLayer(civilrightsGroup);
    map.removeLayer(infrastructureGroup);
    map.removeLayer(developmentGroup);
    
    map.addLayer(LayerGroup);
}

$('button[data-era="0"]').click(function() {
    if ($('.timeline-wrapper button').hasClass('active')) {
        $('.timeline-wrapper button').removeClass('active');  
    } 
    $(this).addClass('active');
    map.addLayer(allerasGroup);
    map.addLayer(allCategoriesGroup);
});

$('button[data-era="1"]').click(function() {
    eraFilterTasks(era1Group, 'button[data-era="1"]');
    
});

$('button[data-era="2"]').click(function() {
    eraFilterTasks(era2Group, 'button[data-era="2"]');
});

$('button[data-era="3"]').click(function() {
    eraFilterTasks(era3Group, 'button[data-era="3"]');
});

$('button[data-era="4"]').click(function() {
    eraFilterTasks(era4Group, 'button[data-era="4"]');
});

$('button[data-era="5"]').click(function() {
    eraFilterTasks(era5Group, 'button[data-era="5"]');
});

$('button[data-era="6"]').click(function() {
    eraFilterTasks(era6Group, 'button[data-era="6"]');
});

$('button[data-era="7"]').click(function() {
    eraFilterTasks(era7Group, 'button[data-era="7"]');
});

$('button[data-era="8"]').click(function() {
    eraFilterTasks(era8Group, 'button[data-era="8"]');
});

$('button[data-era="9"]').click(function() {
    eraFilterTasks(era9Group, 'button[data-era="9"]');
});

$('button[data-era="10"]').click(function() {
    eraFilterTasks(era10Group, 'button[data-era="10"]');
});

$('button[data-era="11"]').click(function() {
    eraFilterTasks(era11Group, 'button[data-era="11"]');
});

// Functions related to Welcome Screen


var showWelcome = function() {
    sendGAEvent('Welcome Screen');

    var $welcome = $('#welcome');
    if ($welcome.hasClass('hidden')) {
        $welcome.removeClass('hidden');
    }
    map.removeLayer(allerasGroup);
	map.addLayer(allCategoriesGroup);
	map.addLayer(allerasGroup);
	map.fitBounds(boundingGroup.getBounds());
	clearPopup();
}

var hideWelcome = function() {
    var $welcome = $('#welcome');
    $welcome.addClass('hidden').removeClass('visible');
    $("html, body").animate({ scrollTop: 0 });
}

$(document).ready(showWelcome);


var showFullMap = function() {
	hideWelcome();
    map.removeLayer(allerasGroup);
	map.addLayer(allCategoriesGroup);
	map.addLayer(allerasGroup);
	map.fitBounds(boundingGroup.getBounds());
	clearPopup();
	restorePopupStyles();
	if ($('.timeline-wrapper button').hasClass('active')) {
        $('.timeline-wrapper button').removeClass('active');  
    } 
	$('.categories-wrapper').removeClass('hidden');
	$('.timeline-container').removeClass('hidden');
	$('.leaflet-control-zoom').removeClass('hidden');
	$('.close').removeClass('hidden');
	$('.categories-wrapper-mobile').removeClass('hidden');
	$('.timeline-container-mobile').removeClass('hidden');
	$('#tour-pagination').addClass('hidden');
	$('.filter-civilrights').addClass('active');
	$('.filter-infrastructure').addClass('active');
	$('.filter-development').addClass('active');
	$('.filter-arts').addClass('active');
	
}

var showMapLite = function() {
	hideWelcome();
	restorePopupStyles();
	if ($('.timeline-wrapper button').hasClass('active')) {
        $('.timeline-wrapper button').removeClass('active');  
    } 
    $('#tour-pagination').addClass('hidden');
	$('.categories-wrapper').removeClass('hidden');
	$('.timeline-container').removeClass('hidden');
	$('.leaflet-control-zoom').removeClass('hidden');
	$('.close').removeClass('hidden');
}


$('#explore-btn').click(function() {
    sendGAEvent('Explore the Map');

   showFullMap();
   alterHistory('/lancasterave/map');
});


var removeCivilRights = function() {
	if (map.hasLayer(civilrightsGroup)) {
    	map.removeLayer(civilrightsGroup);
		$('.filter-civilrights').removeClass('active');
    }
}

var removeInfrastructure = function() {
    if (map.hasLayer(infrastructureGroup)) {
        map.removeLayer(infrastructureGroup);
        $('.filter-infrastructure').removeClass('active');

    }
}


var removeDevelopment = function() {
    if (map.hasLayer(developmentGroup)) {
        map.removeLayer(developmentGroup);
        $('.filter-development').removeClass('active');
    }
}

var removeArts = function() {
    if (map.hasLayer(artsGroup)) {
        map.removeLayer(artsGroup);
        $('.filter-arts').removeClass('active');
    }
}


$('#arts-btn').click(function() {
    //hideWelcome();
	showMapLite();
	map.removeLayer(allCategoriesGroup);
    map.removeLayer(allerasGroup);
    $('.filter-civilrights').removeClass('active');
    $('.filter-development').removeClass('active');
    $('.filter-infrastructure').removeClass('active');
/*
    removeCivilRights();      
    removeInfrastructure();
    removeDevelopment();
*/
    map.addLayer(artsGroup);
    $('.filter-arts').addClass('active');
})


$('#civilrights-btn').click(function() {
    //hideWelcome();
    showMapLite();
    map.removeLayer(allCategoriesGroup);
    map.removeLayer(allerasGroup);
    $('.filter-arts').removeClass('active');
    $('.filter-development').removeClass('active');
    $('.filter-infrastructure').removeClass('active');
/*
	removeArts();
    removeInfrastructure();
    removeDevelopment();
*/
    map.addLayer(civilrightsGroup);
    $('.filter-civilrights').addClass('active');
    
})

$('#infrastructure-btn').click(function() {
    //hideWelcome();
    showMapLite();
    map.removeLayer(allCategoriesGroup);
    map.removeLayer(allerasGroup);
    $('.filter-arts').removeClass('active');
    $('.filter-civilrights').removeClass('active');
    $('.filter-development').removeClass('active');
/*
    removeCivilRights();
    removeArts();
    removeDevelopment();
*/

	   map.addLayer(infrastructureGroup);
    $('.filter-infrastructure').addClass('active');
})

$('#development-btn').click(function() {
    //hideWelcome();
    showMapLite();
    map.removeLayer(allCategoriesGroup);
    map.removeLayer(allerasGroup);
    $('.filter-arts').removeClass('active');
    $('.filter-civilrights').removeClass('active');
    $('.filter-infrastructure').removeClass('active');
    
/*
    removeCivilRights();
	removeInfrastructure();
    removeArts();
*/
    map.addLayer(developmentGroup);
    $('.filter-development').addClass('active');
})



// Tour functions

var setupTourIntroExit = function(text) {
	clearPopup();
	var $popup = $('#popup');
	$($popup).removeClass('hidden').addClass('visible');
	$('#popup-template').appendTo($popup);
	$('#title').html('New Freedom Tour');
    $('#description').html(text);
    $('hr').addClass('hidden');
    emptyIf('#attr', '#image-from');
	emptyIf('#sourceTitle', '#info-from');
	emptyIf('#resourceTitle', '#more-details');	
	$('#tour-pagination').removeClass('hidden');
	$('.caption-wrapper').css('display', 'none');
	$('#img').css('display', 'none');
	$('#icon').attr('src', 'imgs/icons/icon-tour.svg');
	$('#address').html('New Freedom Tour').css('color', '#8DC63F');
}



var restorePopupStyles = function() {
	$('hr').removeClass('hidden');
	$('.caption-wrapper').css('display', 'initial');
	$('#img').css('display', 'initial');
}



$('#tour-btn').click(function() {
    sendGAEvent('New Freedom Tour');

    alterHistory('/lancasterave/map');
	hideWelcome();
	resetPopup();
	if(map.hasLayer(tourGroup)) {
		//console.log(tourGroup.getLayers().length);
		map.removeLayer(tourGroup);
		map.removeLayer(allerasGroup);
		map.addLayer(tourGroup);
		$('.categories-wrapper').addClass('hidden');
		$('.timeline-container').addClass('hidden');
		$('.leaflet-control-zoom').addClass('hidden');
		$('.categories-wrapper-mobile').addClass('hidden');
		$('.timeline-container-mobile').addClass('hidden');
		$('.close').addClass('hidden');
		setupTourIntroExit(tourIntro);
		map.fitBounds(tourGroup.getBounds());
		$('#prev-stop').html('Exit Tour');
		$('#next-stop').html('Next Stop');
		tourStopId = -1;
		

		
		
	}
	
});

var tourStopId = -1;

$('#next-stop').click(function() {
	
	tourStopId = tourStopId + 1;	
	var tourId = tourStopsArray[tourStopId];
		
	if (tourStopId == tourStopsArray.length) {
		resetPopup();
		setupTourIntroExit(tourConclusion);
		$('#next-stop').html('');
		$('#next-stop').html('Exit Tour');
	} else if (tourStopId > tourStopsArray.length) {
		showFullMap();
	} else {
		$('#next-stop').html('Next Stop');
		$('#prev-stop').html('Last Stop');
		for (i=0; i < jsonData.features.length; i++){
			if (jsonData.features[i].properties.ID == tourId) {
				resetPopup();
				restorePopupStyles();
				showPopup(jsonData.features[i]);
				//console.log(tourStopId);
				//console.log(tourStopsArray.length);	

                var lat = jsonData.features[tourId].geometry.coordinates[1];
                var lon = jsonData.features[tourId].geometry.coordinates[0];
        
                map.setView([lat, lon], 16);
			}
			 
		}
		
	}	
});


$('#prev-stop').click(function() {
	
	tourStopId = tourStopId - 1;	
	var tourId = tourStopsArray[tourStopId];
	
	if (tourStopId == -1) {
		resetPopup();
		setupTourIntroExit(tourIntro);
		$('#prev-stop').html('Exit Tour'); 
	} else if (tourStopId == -2) {
		showFullMap();
	} else if (tourStopId >= 0){
		$('#next-stop').html('Next Stop');
		for (i=0; i < jsonData.features.length; i++){
			if (jsonData.features[i].properties.ID == tourId) {
				resetPopup();
				restorePopupStyles()
				showPopup(jsonData.features[i]);	

                var lat = jsonData.features[tourId].geometry.coordinates[1];
                var lon = jsonData.features[tourId].geometry.coordinates[0];
        
                map.setView([lat, lon], 16);
			}
			 
		}

	} else {
		showFullMap();
	}		
});

var alterHistory = function(link) {
    history.pushState(null, null, link);
}

$(window).on("popstate", function(e) {
    console.log(e);
    if (e.originalEvent.state !== null) {
        hideWelcome();
    } else {
        alterHistory('/lancasterave/');
        showWelcome();
    }
});


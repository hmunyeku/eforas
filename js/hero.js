var wid;
var timer;
var contextMap;
var packageAll5G;

var heroIndices = {
    hosting: [0, 1, 2, 3, 4, 5],
    homeinternet: [1, 0, 2, 3, 4, 5],
    fibre: [2, 0, 1, 3, 4, 5],
    mobiledata: [3, 0, 1, 2, 4, 5],
    voice: [4, 0, 1, 2, 3, 5],
    shop: [5, 0, 1, 2, 3, 4]
};

var heroSpeed = 600;

function goSlide(name) {
	$(".hero").removeClass('hide');
	slide(name);
}

// hero slide transition only on desktop
function slide(name) {
	
	var heroIndex = heroIndices[name];
	if (heroIndex === undefined) {
		return;
	}
	
	$(".product-action").addClass('hide');
	$(".hero:eq("+heroIndex[0]+") .hero-subcat").addClass('hide');

	$(".hero:eq("+heroIndex[0]+") .dark-overlay").addClass('hide');
	
	

	// mobile
	if ($(window).width() <= 991) {

		$(".hero:eq("+heroIndex[0]+")").toggleClass("col-md-2 col-md-12");
		$(".hero").not(".hero:eq("+heroIndex[0]+")").toggleClass("col-md-2 col-md-0");

		if ($(".hero").hasClass('col-md-2')) {
			//initial
			$(".hero:eq("+heroIndex[0]+")").removeClass('active');
			$(".product-action").removeClass('hide');

			setState('initial');

		} else {
			//active
			$(".hero:eq("+heroIndex[0]+")").addClass('active');
			$(".hero:eq("+heroIndex[0]+") .hero-subcat").removeClass('hide');
			
			$(".hero:eq("+heroIndex[0]+")").removeClass('active-motion');

			setState('active');
			loadCategoryBanner(heroIndex[0]);
			//$(".fibreswitch").removeClass("desktop").addClass("mobile");
			
			if (name == "homeinternet") {
				loadGoogleLibrary();
			}		
			
		}

		$(".hero:eq("+heroIndex[0]+") .dark-overlay").removeClass('hide');

		productLayout();
		flipSubCatIcon();

		// desktop
	} else {

		if ($(".hero:eq("+heroIndex[0]+")").hasClass('col-md-2')) {
			/*
			if (name == "mobile") {
				$("#mobile svg image").attr("transform",""); 
			}
			*/		
		
			$(".ax-content").removeClass("main").addClass("detail");
			
			//$(".hero:eq("+heroIndex[0]+")").addClass('active-motion');
			
			$(".hero:eq("+heroIndex[0]+")").addClass('activate');

			// size up
			$(".hero:eq("+heroIndex[0]+")").velocity("stop").velocity({ width: [ '100%', '16.66666667%' ] }, heroSpeed,'ease');
			$(".hero:eq("+heroIndex[1]+")").velocity("stop").velocity({ width: [ '0', '16.66666667%' ] }, heroSpeed,'ease');
			$(".hero:eq("+heroIndex[2]+")").velocity("stop").velocity({ width: [ '0', '16.66666667%' ] }, heroSpeed,'ease');
			$(".hero:eq("+heroIndex[3]+")").velocity("stop").velocity({ width: [ '0', '16.66666667%' ] }, heroSpeed,'ease');
			$(".hero:eq("+heroIndex[4]+")").velocity("stop").velocity({ width: [ '0', '16.66666667%' ] }, heroSpeed,'ease');
			$(".hero:eq("+heroIndex[5]+")").velocity("stop").velocity({ width: [ '0', '16.66666667%' ] }, heroSpeed,'ease', function() {

				$(".hero:eq("+heroIndex[0]+")").removeClass("col-md-2").addClass("col-md-12");
				$(".hero").not(".hero:eq("+heroIndex[0]+")").removeClass("col-md-2").addClass("col-md-0");
				$(".hero").css("width","");

				//active
				$(".hero:eq("+heroIndex[0]+")").addClass('active');
				$(".hero:eq("+heroIndex[0]+") .hero-subcat").removeClass('hide');
				$(".hero:eq("+heroIndex[0]+") .dark-overlay").removeClass('hide');
				
				//$(".hero:eq("+heroIndex[0]+")").removeClass('active-motion');

				setState('active');
				loadCategoryBanner(heroIndex[0]);
				productLayout();
				//$(".fibreswitch").removeClass("mobile").addClass("desktop");
				
				if (name == "homeinternet") {
					loadGoogleLibrary();
				}

			});

		} else if ($(".hero:eq("+heroIndex[0]+")").hasClass('col-md-12')) {
			/*
			if (name == "mobile") {
				$("#mobile svg image").attr("transform","translate(50, 0)"); 
			}
			*/

			$(".hero:eq("+heroIndex[0]+")").removeClass('activate');

			// size down
			$(".hero:eq("+heroIndex[0]+")").velocity("stop").velocity({ width: [ '16.66666667%', '100%' ] }, heroSpeed,'ease');
			$(".hero:eq("+heroIndex[1]+")").velocity("stop").velocity({ width: [ '16.66666667%', '0' ] }, heroSpeed,'ease');
			$(".hero:eq("+heroIndex[2]+")").velocity("stop").velocity({ width: [ '16.66666667%', '0' ] }, heroSpeed,'ease');
			$(".hero:eq("+heroIndex[3]+")").velocity("stop").velocity({ width: [ '16.66666667%', '0' ] }, heroSpeed,'ease');
			$(".hero:eq("+heroIndex[4]+")").velocity("stop").velocity({ width: [ '16.66666667%', '0' ] }, heroSpeed,'ease');
			$(".hero:eq("+heroIndex[5]+")").velocity("stop").velocity({ width: [ '16.66666667%', '0' ] }, heroSpeed,'ease', function() {

				$(".hero:eq("+heroIndex[0]+")").removeClass("col-md-12").addClass("col-md-2");
				$(".hero").not(".hero:eq("+heroIndex[0]+")").removeClass("col-md-0").addClass("col-md-2");
				$(".hero").css("width","");


				//initial
				$(".hero:eq("+heroIndex[0]+")").removeClass('active');
				$(".product-action").removeClass('hide');

				setState('initial');
				productLayout();
			});

		}

	}

}



function productLayout() {

	// control layout of products if shown
	if ($(window).width() <= 991 && $(".hero-subcat").is(":visible")) { // mobile
		//$(".hero").css("overflow-y","scroll");
		$("body").css("overflow-y","hidden");
	} else { // desktop
		
		//$(".hero").css("overflow-y","");
		$("body").css("overflow-y","auto");
	}

	if ($(window).width() <= 991) { // mobile
		$(".product-description").addClass("col-xs-offset-2");
		zebraStripe('mobile',$(".hero.col-md-12").attr("id"));
	} else { // desktop
		$(".product-description").removeClass("col-xs-offset-2");
		zebraStripe('desktop',$(".hero.col-md-12").attr("id"));
	}



	// control layout of products if shown
	//if (Modernizr.mq('screen and (max-width:991px)') && $(".hero-subcat").is(":visible")) { // mobile
	//if ($(window).width() <= 991 && $(".hero-subcat").is(":visible")) { // mobile
	if ($(window).width() <= 991) { // mobile

		zebraStripe('mobile',$(".hero.col-md-12").attr("id"));

	} else { // desktop


	}

}


function zebraStripe(type,containerId) {
	
	var classOdd = "o-"+containerId+"-odd";
	var classEven = "o-"+containerId+"-even";

	if (type == "mobile") {

		$("#"+containerId+" .productdiv a:odd").removeClass(classEven).addClass(classOdd);
		$("#"+containerId+" .productdiv a:even").removeClass(classOdd).addClass(classEven);

	} else if (type == "desktop"){
		var classCounter = 0;
		var classArr = new Array(classOdd,classEven);

		$("#"+containerId+" .productdiv a").each(function(index) {

			if (containerId == "homeinternet" || containerId == "hosting"  ||  containerId == "fibre" || containerId == "mobiledata" || containerId == "voice" || containerId == "shop") {

				if (classCounter == 2) {
					classCounter = 0;
					classArr.reverse();
				}

			} 
			/*else if ( containerId == "voice" ) {

				if (classCounter == 1) {
					classCounter = 0;
					classArr.reverse();
				}

			}
			*/

			$(this).removeClass(classOdd+" "+classEven).addClass(classArr[classCounter]);
			classCounter++;
		});


	}

}

function flipSubCatIcon() {

	if ($(window).width() > 1 && $(window).width() <= 991) {

		// mobile
		//if ($(".hero-subcat").is(":visible")) {
			// product flip
			$('.productdiv a .row div.product-icon').each(function () {
				//if (!$(this).text().match(/^\s*$/)) {
				$(this).insertBefore($(this).prev('.productdiv a .row div.product-headline'));
				//}
			});
		//}

	} else {

		// product flip
		$('.productdiv a .row div.product-headline').each(function () {
			$(this).insertBefore($(this).prev('.productdiv a .row div.product-icon'));
		});

	}

}


function windowResize() {
	productLayout();
	flipSubCatIcon();
}





function loadCategoryBanner(index) {
	$(".hero:eq("+index+")").find(".hero-botdiv").addClass("active");
}

function setState(state) {

	if (state == "initial") {

		$(".ax-content").removeClass("detail").addClass("main");

		$("#hosting .hero-container").on("click", function(e){
			replaceLocation("/hosting");
			goSlide('hosting');
		});
		$("#homeinternet .hero-container").on("click", function(e){
			replaceLocation("/home-internet");
			goSlide('homeinternet');
		});		
		$("#fibre .hero-container").on("click", function(e){
			replaceLocation("/fibre");
			goSlide('fibre');
		});

		$("#voice .hero-container").on("click", function(e){
			replaceLocation("/voip");
			goSlide('voice');
		});		
		$("#mobiledata .hero-container").on("click", function(e){
			replaceLocation("/mobiledata");
			goSlide('mobiledata');
		});
		$("#shop .hero-container").on("click", function(e){
			replaceLocation("/shop");
			goSlide('shop');
		});

		//$("#notice-walkin").removeClass("hide");
		
		var initDelay = 0;
		if (arguments[1] != undefined) { // first load only
			initDelay = 200;
		}
			
		
	} else if (state == "active") {

		$(".ax-content").removeClass("main").addClass("detail");

		
		$("#fibre .hero-container").off("click");
		$("#mobiledata .hero-container").off("click");
		$("#hosting .hero-container").off("click");
		$("#voice .hero-container").off("click");
		$("#homeinternet .hero-container").off("click");
		$("#shop .hero-container").off("click");
		
		//$("#notice-walkin").addClass("hide");

	}

}



function heroLink(ev,link,slide) {
	ev.stopPropagation();
	replaceLocation(link);
	goSlide(slide);
}



/*
function altSearch(address,wrapperId,place) {
	var thisID = "";
	var thisURL = "";
	var thisInput = "";
	
	if (wrapperId == "contextsearch-homeinternet-wrapper") {
		thisID = "homeinternet";
		thisURL = "/home-internet";
		thisInput = "contextsearch-homeinternet-autocomplete";
	}
	
	// set page
	$(".hero").removeClass("active col-md-0 col-md-12").addClass("col-md-2");
	$(".hero-subcat").addClass("hide");
	goSlide(thisID);
	replaceLocation(thisURL);

	// do check
	var placeObj = safeJSONParse(atob(place));
	if (placeObj) {
		var latLngObj = new google.maps.LatLng(placeObj.geometry.location.lat, placeObj.geometry.location.lng);
		$("#"+thisInput).val(address);
		contextMap.setCenter(latLngObj);
		checkContext(latLngObj,address,contextMap,wrapperId,place);
	}
	
}
*/


function checkContext(latlon,address,map,wrapperId,place) {

	// only run function when map idle - otherwise map bounds dont exist	
	google.maps.event.addListenerOnce(map, 'idle', function(){
	
		$(document.activeElement).blur();

		/* mtn bbox */
		var mapBounds = map.getBounds();
		var mapSW = mapBounds.getSouthWest();
		var mapNE = mapBounds.getNorthEast();

		var xyBounds = {
			min: degrees2meters(mapSW.lng(), mapSW.lat()),
			max: degrees2meters(mapNE.lng(), mapNE.lat())
		};

		var bbox = xyBounds.min.x + "," + xyBounds.min.y + "," + xyBounds.max.x + "," + xyBounds.max.y;
		/* mtn bbox */

		var eventPoint = getPixelLocation(map, latlon);
		var mapI = eventPoint.x.toFixed(0);
		var mapJ = eventPoint.y.toFixed(0);
		var dimensions = "&WIDTH="+$("#addresssearch-dummymap").width()+"&HEIGHT="+$("#addresssearch-dummymap").height()+"&I="+mapI+"&J="+mapJ;	
		
		if (latlon == undefined || latlon == "") {
			return;
		}

		var coords = latlon.toString().replace(/\(/g,"").replace(/\)/g,"").split(",");
		
		if ( typeof(contextCheckAjax) == "object" ) { // prevent multiple calls
			contextCheckAjax.abort();
		}	

		var url = "";
		var displayName = "";

		var altWrapperId = "";
		var altSearch = "";

    if (wrapperId == "contextsearch-homeinternet-wrapper") {
      url = "/fixed-wireless/home-internet-availability-component";
      displayName = "Home Internet";
      altWrapperId = "contextsearch-lte-wrapper";
      altSearch = '<button class="btn-search" onclick="altSearch(\''+address+'\',\''+altWrapperId+'\',\''+place+'\');">CLICK FOR HOME INTERNET PACKAGES</button>';
    }
		
		$("#"+wrapperId+" .contextsearch-content").html("");
		$(".search-loader").remove();
		$("#"+wrapperId+" .contextsearch-content").prepend('<div class="search-loader"><i class="fa fa-refresh fa-spin"></i><div class="loader-text">Checking for '+displayName+' packages...</div></div>');

		contextCheckAjax = $.ajax({
			method: "POST",
			url: url,
			timeout: 150000,
			cache: false,
			data: "LAT="+coords[0].trim()+"&LON="+coords[1].trim()+"&ADDRESS="+encodeURIComponent(address)+"&BBOX="+bbox+dimensions+"&PLACE="+place,
			dataType: "json"
		})
		.done(function(data) {

			$(".search-loader").remove();
	
			if (data.success == 1) { //success
				$("#"+wrapperId+" .contextsearch-content").html(data.preferredPackages);

        if (wrapperId == "contextsearch-homeinternet-wrapper") {
          if (data.allPackages === "") {
            $("#btn-allpackages-homeinternet").addClass("hide");
          } else {
            $("#btn-allpackages-homeinternet").removeClass("hide");
          }
          packageAllHomeInternet = data.allPackages;
        }
			} else {
				$("#"+wrapperId+" .contextsearch-content").html('<div class="package-error">&#9888; '+displayName+' packages are not yet available in your area </div>');
			}
		
		})
		.fail(function(jqXHR, textStatus) {
			console.log("error on internet availability");
			$(".search-loader").remove();
			$("#"+wrapperId+" .contextsearch-content").html("");
		})


		
	});
		

}


function initContextMap() {
	if (contextMap == undefined) {

		var mapElement = document.getElementById("addresssearch-dummymap");
		var sa = new google.maps.LatLng(-30.559482, 22.937505999999985);
		var mapOptions = {
			center: sa,
			zoom:5
		};		
		contextMap = new google.maps.Map(mapElement, mapOptions);
	}
}


function initContextAutocomplete(suggestion,wrapperId) {
	
	$("#"+wrapperId+" .contextsearch-content").html("");			
	
	initContextMap();

	if (suggestion.place_id != undefined) {	

		// google suggestion
		var geocoderNew = new google.maps.Geocoder();
		geocoderNew.geocode({placeId: suggestion.place_id}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				var geoIndex = precisionIndex(results);
				if (results[geoIndex]) {
					contextMap.setCenter(results[geoIndex].geometry.location);
					contextMap.setZoom(17);
					var place = placeToStr(results[geoIndex]);
					checkContext(results[geoIndex].geometry.location,results[geoIndex].formatted_address,contextMap,wrapperId,place);
				}
			}
		});			
		

	} else {
		
		// latlng exists
		if (suggestion.latlng != undefined) {
			
			var latLng = suggestion.latlng.split(",");					
			var latLngObj = new google.maps.LatLng(parseFloat(latLng[0]), parseFloat(latLng[1]));

			var geocoderNew = new google.maps.Geocoder();
			geocoderNew.geocode({'location': latLngObj}, function(results, status) {
				if (status === google.maps.GeocoderStatus.OK) {						
					var geoIndex = precisionIndex(results);
					if (results[geoIndex]) {
						contextMap.setCenter(results[geoIndex].geometry.location);
						contextMap.setZoom(17);
						var place = placeToStr(results[geoIndex]);
						checkContext(results[geoIndex].geometry.location,results[geoIndex].formatted_address,contextMap,wrapperId,place);
					}
				}
			});	
			
		} else {
		
			// openserve suggestion
			if ( typeof(openserveLatLonAjax) == "object" ) { // prevent multiple calls
				openserveLatLonAjax.abort();
			}	
			
			openserveLatLonAjax = $.ajax({
				method: "GET",
				url: "/openserve-calls/get-openserve-address-lat-lon-ajax?address="+suggestion.name,
				timeout: 25000,
				cache: false,
				dataType: "json"
			})
			.done(function(data) {	
						
				if (data.success == 1) {
					
					var latLng = data.LatLng.split(",");					
					var latLngObj = new google.maps.LatLng(parseFloat(latLng[0]), parseFloat(latLng[1]));

					var geocoderNew = new google.maps.Geocoder();
					geocoderNew.geocode({'location': latLngObj}, function(results, status) {
						if (status === google.maps.GeocoderStatus.OK) {						
							var geoIndex = precisionIndex(results);
							if (results[geoIndex]) {
								contextMap.setCenter(results[geoIndex].geometry.location);
								contextMap.setZoom(17);
								var place = placeToStr(results[geoIndex]);
								checkContext(results[geoIndex].geometry.location,results[geoIndex].formatted_address,contextMap,wrapperId,place);
							}
						}
					});				
		
				} else if (data.success == 0) {	
					$(".openserve-result-alert").addClass("in").afterTime(4500, function () {
						$(".openserve-result-alert").removeClass("in");
					});
					$(".loader").remove();
				}		
				
			})
			.fail(function() {
				console.log("error on getting openserve lat lon");
				$(".openserve-result-alert").addClass("in").afterTime(4500, function () {
					$(".openserve-result-alert").removeClass("in");
				});
				$(".loader").remove();
			})		

		
		}
		
		
	}	
	
}


function getUrlVars() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}



function loadGoogleLibraryWrapper() {
    return new Promise((resolve, reject) => {
        try {
            loadGoogleLibrary(); // Load the library

            const timeout = setTimeout(() => reject(new Error("Google Maps failed to load.")), 10000);
            const checkGoogleMaps = setInterval(() => {
                if (google?.maps?.LatLng) {
                    clearInterval(checkGoogleMaps);
                    clearTimeout(timeout);
                    resolve();
                }
            }, 100);
        } catch (error) {
            reject(error);
        }
    });
}


function instantSearch() {
    const { address, place, search } = getUrlVars();
    if (address || place || search) {
        loadGoogleLibraryWrapper()
            .then(() => {
                initContextMap();
                altSearch(decodeURI(address), `contextsearch-${search}-wrapper`, place);
            })
            .catch(err => console.error("Failed to load Google Maps:", err));
    }
}





$(window).resize(function() {
	clearTimeout(wid);
	wid = setTimeout(windowResize, 250);
});

$(document).ready(function() {

	// category nav
	setState('initial','load');

	//---
	$("#hosting .hero-subcat .home").on("click", function(e){
		e.preventDefault();
		heroLink(e,"/","hosting");
	});
	$("#homeinternet .hero-subcat .home").on("click", function(e){
		e.preventDefault();
		heroLink(e,"/","homeinternet");
	});	
	$("#fibre .hero-subcat .home").on("click", function(e){
		e.preventDefault();
		heroLink(e,"/","fibre");
	});

	$("#voice .hero-subcat .home").on("click", function(e){
		e.preventDefault();
		heroLink(e,"/","voice");
	});
	$("#mobiledata .hero-subcat .home").on("click", function(e){
		e.preventDefault();
		heroLink(e,"/","mobiledata");
	});
	$("#shop .hero-subcat .home").on("click", function(e){
		e.preventDefault();
		heroLink(e,"/","shop");
	});	

	
	if ($(window).width() >= 1200) {
		causeRepaintsOn = $(".product-headline,.product-icon .icon-stack,.product-description,.btn-hero .hero-label");
		$(window).resize(function() {
			causeRepaintsOn.css("z-index", 1);
		});
	}
	

	$(document).on("click", "#label-package-uncapped", function() {
		$('.tab-pane').removeClass('in active');
		$('#package-uncapped').addClass('in active');
	});

	$(document).on("click", "#label-package-capped", function() {
		$('.tab-pane').removeClass('in active');
		$('#package-capped').addClass('in active');
	});
	
	$(document).on("click", ".swal2-container a.package.link", function(e) {
		swal.close();
	});

  $('#contextsearch-homeinternet-autocomplete').bind('typeahead:selected', function (ev, suggestion) {
    initContextAutocomplete(suggestion,"contextsearch-homeinternet-wrapper","contextsearch-homeinternet-dummymap");
  });

  $("#contextsearch-homeinternet-wrapper .contextsearch-content").on(clickEventType, "#btn-allpackages-homeinternet", function(e) {
    Swal.fire({
      title: "<div class='packages-all-available'>Available Packages | <span>Home Internet</span></div><div class='packages-all-sub'>There are multiple packages at your selected address</div>",
      html: packageAllHomeInternet,
      customClass: 'swal-popup',
      showCloseButton: true,
      showConfirmButton: false,
      showCancelButton: false,
      showClass: {
        popup: `
			  animate__animated
			  animate__fadeInUp
			  animate__faster
			`
      },
      hideClass: {
        popup: `
			  animate__animated
			  animate__fadeOutDown
			  animate__faster
			`
      }
    });
  });
	
});

$(window).on('load', function() {
	$("#hosting .hero-container").addClass("active");
	$("#homeinternet .hero-container").addClass("active");
	$("#fibre .hero-container").addClass("active");
	$("#voice .hero-container").addClass("active");
	$("#mobiledata .hero-container").addClass("active");
	$("#shop .hero-container").addClass("active");
	
	instantSearch();
});

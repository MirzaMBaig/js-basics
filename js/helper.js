//  Code template used by resumeBuilder.js to render the page.
var HTMLheaderName = "<h1 id='name'>%data%</h1>";
var HTMLheaderRole = "<span class='white-text'>%data%</span><hr/>";

var HTMLcontactGeneric = "<li class='flex-item'><span class='orange-text'>%contact%</span><span class='white-text'>%data%</span></li>";
var HTMLmobile = "<li class='flex-item'><span class='orange-text'>mobile</span><span class='white-text'>%data%</span></li>";
var HTMLemail = "<li class='flex-item'><span class='orange-text'>email</span><span class='white-text'>%data%</span></li>";
var HTMLtwitter = "<li class='flex-item'><span class='orange-text'>twitter</span><span class='white-text'>%data%</span></li>";
var HTMLgithub = "<li class='flex-item'><span class='orange-text'>github</span><span class='white-text'>%data%</span></li>";
var HTMLblog = "<li class='flex-item'><span class='orange-text'>facebook</span><span class='white-text'>%data%</span></li>";
var HTMLlocation = "<li class='flex-item'><span class='orange-text'>location</span><span class='white-text'>%data%</span></li>";

var HTMLbioPic = "<img src='%data%' class='biopic'>";
var HTMLWelcomeMsg = "<span class='welcome-message'>%data%</span>";

var HTMLskillsStart = "<h3 id='skillsH3'>Skills at a Glance:</h3><ul id='skills' class='flex-box'></ul>";
var HTMLskills = "<li class='flex-item'><span class='white-text'>%data%</span></li>";

var HTMLchartStart = "<div class='skills-entry'></div>";
var HTMLchartSkill = "<div class='chart'><div class='chart'>%data%</div></div>";


var HTMLworkStart = "<div class='work-entry'></div>";
var HTMLworkEmployer = "<a href='#'>%data%";
var HTMLworkTitle = " - %data%</a>";
var HTMLworkDates = "<div class='date-text'>%data%</div>";
var HTMLworkLocation = "<br><div class='location-text'>%data%</div>";
var HTMLworkDescription = "<p><br>%data%</p>";

var HTMLprojectStart = "<div class='project-entry'></div>";
var HTMLprojectTitle = "<a href='#'>%data%</a>";
var HTMLprojectDates = "<div class='date-text'>%data%</div>";
var HTMLprojectDescription = "<p class='purple-text'><br>%data%</p>";
var HTMLprojectImage = "<img src='%data%'>";

var HTMLschoolStart = "<div class='education-entry'></div>";
var HTMLschoolName = "<a href='#'>%data%";
var HTMLschoolDegree = " -- %data%</a>";
var HTMLschoolDates = "<div class='date-text'>%data%</div>";
var HTMLschoolLocation = "<br><div class='location-text'>%data%</div>";
var HTMLschoolMajor = "<em><br>Major: %data%</em>"

var HTMLonlineClasses = "<h3>Online Classes</h3>";
var HTMLonlineTitle = "<a href='#'>%data%";
var HTMLonlineSchool = " - %data%</a>";
var HTMLonlineDates = "<div class='date-text'>%data%</div>";
var HTMLonlineURL = "<br><a class='purple-text' href='%data%'>Link to this course</a>";

var internationalizeButton = "<button>Internationalize</button>";
var googleMap = "<div id='map'></div>";

/*
International Name button.
*/
$(document).ready(function() {
  $('button').click(function() {
    var iName = inName() || function(){};
    $('#name').html(iName);  
  });
})

/*
Collecting Click Locations.
*/
clickLocations = [];

function logClicks(x,y) {
  clickLocations.push(
    {
      "x": x,
      "y": y
    }
  );
  console.log("x location: " + x + "; y location: " + y);
}

/*
Generate the custom Google Map for the website.
*/
var map; // declares a global map variable

/*
Start here! initializeMap() is called when the page is loaded.
*/
function initializeMap() {

  var locations;        

  var mapOptions = {
    disableDefaultUI: true,
    // Removed scroll wheel zoom to make navigation easier :)
    scrollwheel: false
  };

  // This line makes `map` a new Google Map JavaScript Object and attaches it to <div id="map">.
  map = new google.maps.Map(document.querySelector('#map'), mapOptions);

  /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.
  */
  function locationFinder() {
    
    // Initializes an empty array
    var locations = [];

    // Adds the single location property from the bio to the locations array.
    locations.push(bio.contacts.location);
    
    // Iterates through school locations and appends each location to the locations array.
    for (var school in education.schools) {
      locations.push(education.schools[school].location);
    }

    // Iterates through work locations and appends each location to the locations array
    for (var job in work.jobs) {
      locations.push(work.jobs[job].location);
    }
    return locations;
  }

  /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
  function createMapMarker(placeData) {

    // Saves location data from the search result object to local variables.
    var lat = placeData.geometry.location.k;  // Latitude from the place service.
    var lon = placeData.geometry.location.B;  // Longitude from the place service.
    var name = placeData.formatted_address;   // Name of the place from the place service.
    var bounds = window.mapBounds;            // Current boundaries of the map window.

    // marker is an object with additional data about the pin for a single location.
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });
    
    // infoWindows are helper windows that open when you click or hover over a pin on a map.
    // They contain more information about a location.
    var infoWindow = new google.maps.InfoWindow({
      content: name
    });

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.open(map, marker);
    });

    // This is where the pin gets added to the map.
    // bounds.extend() takes in a map location object.
    bounds.extend(new google.maps.LatLng(lat, lon));
    // Fit the map to the new marker.
    map.fitBounds(bounds);
    // Center the map.
    map.setCenter(bounds.getCenter());
  }

  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0])
    }
  }

  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location.
  */
  function pinPoster(locations) {

    // Creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);
    
    // Iterates through the array of locations and creates a search object for each location.
    for (place in locations) {

      // The search request object.
      var request = {
        query: locations[place]
      }

      // Searches the Google Maps API for location data and runs the callback 
      // function with the search results after each search.
      service.textSearch(request, callback);
    }
  }

  // Sets the boundaries of the map based on pin locations.
  window.mapBounds = new google.maps.LatLngBounds();

  // Locations is an array of location strings returned from locationFinder().
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in the locations array.
  pinPoster(locations);
  
};

// Calls the initializeMap() function when the page loads.
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window and adjust map bounds.
window.addEventListener('resize', function(e) {
  // Makes sure the map bounds get updated on page resize.
  map.fitBounds(mapBounds);
});
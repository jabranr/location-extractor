# Location Extractor

Extract location(s) from a string&mdash;primarily a Tweet. The library intakes a string or array and simplifies it by removing the most common or stop words, panctuation, special characters and Twitter mentions. It then returns the simiplified data in string format that can be used to pass through a Geo service such as Google Maps API Geocoding service. The Google Maps API Geocoding service is also built-in and can be used from the API this library exposes. See below for complete reference.

# Install

```shell
bower install location-extractor
```

# Use

Include the required files.
```html
<script src="path/to/location-extractor.js" type="text/javascript"></script>
```

If you need to use the built-in Geocoding service of Google Maps API, you need to include files for those before the library. You may need to get an API Key.
```html
<script src="//maps.googleapis.com/maps/api/js?v=3&key={API_KEY}" type="text/javascript"></script>
<script src="path/to/location-extractor.js" type="text/javascript"></script>
```

# Examples

Simple use:
```javascript
var tweet = 'Did you know there are many hotels near Victoria, London?';
var extractor = new LocationExtractor(tweet);
var data = extractor.clean();
console.log(data);

// returns: hotels Victoria London
```

Now extract location data:
```javascript
extractor.extract(function(response) {
	if ( response && !response.error ) {
		// handle response
	}
	else {
		// handle error return from Google Maps API Geocoding service
	}
});
```

Typical response to above example would be:

```javascript
Object {data: Array[3]}
 data: Array[3]
  0: Object
   _data: Object
   accuracy: "partial"
   address: "Victoria Hotel, 51 Belgrave Road, Pimlico, London SW1V 2BB, UK"
   lat: 51.4903929
   lng: -0.13777159999995092
   __proto__: Object
```

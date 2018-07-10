function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 15, lng: 0},
        zoom: 2,
        streetViewControl: false,
        mapTypeControlOptions: {
            mapTypeIds: ['dc']
        }
    });

    var dcMapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
            var normalizedCoord = getNormalizedCoord(coord, zoom);
            if (!normalizedCoord) {
                return null;
            }
            var bound = Math.pow(2, zoom);
            return 'tiles/tile_' + zoom + '-' + normalizedCoord.x + '-' + normalizedCoord.y + '.jpg';
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 5,
        minZoom: 0
    });

    map.mapTypes.set('dc', dcMapType);
    map.setMapTypeId('dc');

}

// Normalizes the coords that tiles repeat across the x axis (horizontally)
// like the standard Google map tiles.
function getNormalizedCoord(coord, zoom) {
    var y = coord.y;
    var x = coord.x;

    // tile range in one direction range is dependent on zoom level
    // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
    var tileRange = 1 << zoom;

    // don't repeat across y-axis (vertically)
    if (y < 0 || y >= tileRange) {
        return null;
    }

    // don't    repeat across x-axis
    if (x < 0 || x >= tileRange) {
        return null;
    }

    return {x: x, y: y};
}
 
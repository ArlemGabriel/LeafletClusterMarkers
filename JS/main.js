function main(){
    // Icons configuration
    var LeafIcon = L.Icon.extend({
        options: {
            iconSize:     [50, 50],
            iconAnchor:   [22, 44],
            popupAnchor:  [-3, -50] 
        }
    });
    //Icons creation with images .png from RES folder
    var clusterone = new LeafIcon({
        iconUrl: 'RES/cluster1.png'
    })
    var clustertwo = new LeafIcon({
        iconUrl: 'RES/cluster2.png'
    })
    var clusterthree = new LeafIcon({
        iconUrl: 'RES/cluster3.png'
    })
    var clusterfour = new LeafIcon({
        iconUrl: 'RES/cluster4.png'
    })
    var clusterfive = new LeafIcon({
        iconUrl: 'RES/cluster5.png'
    })
    var ic = new LeafIcon({
        iconUrl: 'RES/ic.png'
    })
    // Map creation
    var map = L.map('map').setView([9.957874253375486, -83.9920281382569], 13);
    // Custom tile for the map
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    // Array with some points
    var addressPoints = [
        [9.957874253375486, -83.9920281382569,"Terminal El Carmen","1"],
        [9.961505627231706, -83.99489229532189,"Parada #1: El Carmen - San José","2"],
        [9.960185117901263, -83.99782107514865,"Parada #3: El Carmen - San José","3"],
        [ 9.95386874707771, -84.00803064394347,"Parada #4: El Carmen - San José","4"],
        [9.95388038814716, -84.01200031328551,"Parada #5: El Carmen - San José","5"]
    ]
    // Configuration of cluster maskers
    var markers = L.markerClusterGroup({
        
        maxClusterRadius: 120,
        iconCreateFunction: function (cluster) {
        
        var childCount = cluster.getChildCount();
        var c = ' marker-color-';

        if (childCount == 1) {
            c += 'onechild';
        } else if (childCount == 2) {
            c += 'twochilds';
        } else {
            c += 'threechilds';
        }
        return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-color' + c, iconSize: new L.Point(40, 40) });
        },
        spiderfyOnMaxZoom: false, showCoverageOnHover: false, zoomToBoundsOnClick: false
    });

    // Creation of markers with the icons created previously
    for (var i = 0; i < addressPoints.length; i++) {
        var a = addressPoints[i];
        var title = a[2];
        var id = a[3];
        var myIcon;
        switch(id) {
            case "1":
                myIcon = clusterone;
            break;
            case "2":
                myIcon = clustertwo;
            break;
            case "3":
                myIcon = clusterthree;
            break;
            case "4":
                myIcon = clusterfour;
            break;
            case "5":
                myIcon = clusterfive;
            break;
            default:
                myIcon = ic;
            }
        var marker = L.marker(new L.LatLng(a[0], a[1]), {
        title: title,
        icon: myIcon
        });
        marker.bindPopup(title+"<br>"+"<b>Lat: </b>"+a[0]+"<br><b>Lng: </b>"+a[1]+"<br>");
        markers.addLayer(marker);
    }
    // Adding the markers to the map
    map.addLayer(markers);
    
    
}
  
  
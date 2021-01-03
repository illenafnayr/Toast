//  API KEY

// // let lat;
// // let lng;

// navigator.geolocation.getCurrentPosition((position)=>{
//     lat = position.coords.latitude
//     lng = position.coords.longitude
// });

// console.log(lat, lng);
let destinations = []
$(()=>{
    const initMap = ()=>{
        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 45, lng: -75 },
            zoom: 12
        })

        const geocoder = new google.maps.Geocoder()
    
        //listen for click on map
        google.maps.event.addListener(map, 'click', (event)=>{
            console.log(event.latLng);
            addMarker(event.latLng)
            geocoder.geocode({
                'latLng': event.latLng
              },
              (results, status)=>{
                if (status == google.maps.GeocoderStatus.OK) {
                  if (results[0]) {
                    console.log(results[0])
                    console.log(results[0].formatted_address);
                    destinations.push(results[0].formatted_address)
                    console.log(destinations)
                  }
                }
            })
        })
        

        let yourLocation = new google.maps.InfoWindow
    
        const addMarker = (coords)=>{
            let marker = new google.maps.Marker({
                position:coords,
                map: map
            })
    
            marker.addListener("click", () => {

                let infoWindow = new google.maps.InfoWindow({
                    content:
                    '<br/><form action = "/index" method="POST">'+
                    '<label for="address">Address: </label>' +
                    '<input id="destinations" name="destinations" type="text" value="'+destinations[destinations.length-1]+'"><br>' +
                    '<input id="form" type="submit" value="Add Destination">' +
                    '</form>'
                })
                infoWindow.open(map, marker);
              });
        }



        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };
                yourLocation.setPosition(pos);
                yourLocation.setContent("Your Location");
                yourLocation.open(map);
                map.setCenter(pos);
              },
              () => {
                handleLocationError(true, infoWindow, map.getCenter());
              }
            );
          } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
          }
        setTimeout(function(){yourLocation.close();}, '10000');  
          
    }
    google.maps.event.addDomListener(window, 'load', initMap);
})
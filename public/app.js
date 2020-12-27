//  API KEY

// // let lat;
// // let lng;

// navigator.geolocation.getCurrentPosition((position)=>{
//     lat = position.coords.latitude
//     lng = position.coords.longitude
// });

// console.log(lat, lng);






$(()=>{
    const initMap = ()=>{
        let map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 45, lng: -75 },
            zoom: 12
        })
    
        //listen for click on map
        
        google.maps.event.addListener(map, 'click', (event)=>{
            // console.log(event.latLng);
            addMarker(event.latLng)
        })
        
        // let marker = new google.maps.Marker({
        //     position: { lat: 45, lng: -75 },
        //     map: map
        // })
        
        let form =  
        
        '<fieldset>' +
        '<legend>Create New Product</legend>' +
        '<form action = "/store/allProducts" method="POST">' +
            '<label for="name">Name:</label>' +
            '<input id="name" name="name" type="text"><br>' +
            
            '<label for="description">Description:</label>' +
            '<input id="description" name="description" type="text"><br>' +

            '<label for="category">Category:</label>' +
            '<input id="category" name="category" type="text" placeholder="\'hardgoods\' or \'softgoods\'"><br>' +

            '<label for="img">Image Source:</label>' +
            '<input id="img" name="img" type="text"><br>' +

            '<label for="price">Price:</label>' +
            '<input id="price" name="price" type="number" placeholder="e.g., 59.99"><br>' +

            '<label for="qty">Quantity:</label>' +
            '<input id="qty" name="qty" type="number"><br>' +

            '<input id="form" type="submit" value="Create Product">' +
        '</form>' +
    '</fieldset>'

        let infoWindow = new google.maps.InfoWindow({
            content: form
        })
    
        // marker.addListener('click', ()=>{
        //     infoWindow.open(map, marker)
        // })
    
        //Add Marker Function
    
        // let infoWindow = new google.maps.InfoWindow({
        //     content: '<h1>Hello World!</h1>'
        // })
    
        const addMarker = (coords)=>{
            let marker = new google.maps.Marker({
                position:coords,
                map: map
            })
    
            marker.addListener("click", () => {
                infoWindow.open(map, marker);
              });
        }
    }
    
    google.maps.event.addDomListener(window, 'load', initMap);
})
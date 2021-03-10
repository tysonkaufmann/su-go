import React, {Component, useState} from 'react';

import {MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet'
//
// function LocationMarker() {
//     const [position, setPosition] = useState(null)
//     const map = useMapEvents({
//         click() {
//             map.locate()
//         },
//         locationfound(e) {
//             setPosition(e.latlng)
//             map.flyTo(e.latlng, map.getZoom())
//         },
//     })

//     return position === null ? null : (
//         <Marker position={position}>
//             <Popup>You are here</Popup>
//         </Marker>
//     )
// }

class MapContainerComponent extends Component {
    constructor() {
        super();
        this.state = {
            lat: 0,
            long: 0
        }
    }
    componentDidMount() {
        // Persists the data temporarily
        let position = navigator.geolocation.getCurrentPosition((position)=>this.setState({lat:position.coords.latitude,long:position.coords.longitude}));

    }




    render() {
        return (
                <MapContainer style={{width:"100%",height:"100%"}} center={[this.state.lat, this.state.long]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[this.state.lat, this.state.long]}>
                    <Popup>
                        TYSON OUR LEAFLET IS UP
                    </Popup>
                </Marker>
                <LocationMarker />

                </MapContainer>
        );
    }
}
function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    )
}
export default MapContainerComponent;
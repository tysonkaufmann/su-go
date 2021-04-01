import {Marker, Popup} from "react-leaflet";
import React, {useState} from "react";
import startMarkerIcon from "../assets/images/logoMarker.png"
import endMarkerIcon from "../assets/images/logoMarker2.png"
import L from 'leaflet'

function MarkerComponent(props) {

    return  props.start ? (
                <Marker
                    icon={L.icon({
                        iconUrl: startMarkerIcon,
                        iconSize: [30, 45],
                        iconAnchor: [15, 41]
                    })}
                    position={[props.lat,props.long]}
                />
            ) : (
                <Marker
                    icon={L.icon({
                        iconUrl: endMarkerIcon,
                        iconSize: [18, 38],
                        iconAnchor: [10, 36]
                    })}
                    position={[props.lat,props.long]}
                />
            )
}
export default MarkerComponent;
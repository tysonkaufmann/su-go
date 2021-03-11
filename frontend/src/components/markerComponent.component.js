import {Marker, Popup, useMapEvents} from "react-leaflet";
import React, {useState} from "react";

function MarkerComponent(props) {

    return (
        <Marker position={[props.lat,props.long]}>
            <Popup>{props.popupTitle}</Popup>
        </Marker>
    )
}
export default MarkerComponent;
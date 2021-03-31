import React, {Component, useEffect, useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMapEvents, MapConsumer, Polyline} from 'react-leaflet'
import MarkerComponent from "./markerComponent.component";

function MapContainerComponent(props) {
    let [lat, setLat] = useState(50)
    let [long, setLong] = useState(-97)

    return (
        <MapContainer
            style={{width: "100%", height: "100%"}} center={[lat, long]} zoom={13} scrollWheelZoom={false}>
            <MapConsumer>
                {(map) => {
                    props.locate ? props.route.length > 0 ? map.panTo([props.route[0].lat, props.route[0].lng]) : map.locate() : map.panTo([props.route[0].lat, props.route[0].lng])
                    return null
                }}
            </MapConsumer>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {props.locate && <LocationMarker popupTitle={"You are here"}/>}
            {props.route && props.route.length > 0 && 
            <> 
                <MarkerComponent start={true} lat={props.route[0].lat} long={props.route[0].lng}/> 
                <MarkerComponent start={false} lat={props.route[props.route.length - 1].lat} long={props.route[props.route.length - 1].lng}/>
            </>}
            <Polyline pathOptions={{color: '#2678c8', dashArray: '8 5'}} positions={props.route}/>
        </MapContainer>
    );
}

function LocationMarker(props) {
    const [position, setPosition] = useState(null)
    const [mount, setMount] = useState(true)

    const map = useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e) {
            setPosition(e.latlng)
            if(mount){
                map.flyTo(e.latlng, map.getZoom())
            }
        },
    })

    useEffect(()=>{
        setTimeout(()=>setMount(false), 3000)
    },[])

    return position === null ? null : (
        <Marker position={position}>
            <Popup>{props.popupTitle}</Popup>
        </Marker>
    )
}

export default MapContainerComponent;
import React, {Component, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMapEvents, MapConsumer, Polyline} from 'react-leaflet'
import _ from "lodash";

function DraggableMarker(props) {
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(props.center)
    const markerRef = useRef(null)

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
                }
            },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)

    }, [])
    useEffect(()=>props.setLatLng(position) ,[draggable])
    return (
        <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}>
            <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
              ? 'Marker is draggable'
              : 'Click here to make marker draggable'}
        </span>
            </Popup>
        </Marker>
    )
}


function CreateRouteMapComponent(props) {
    let [lat, setLat] = useState(0)
    let [long, setLong] = useState(0)

    return (
        <MapContainer
            style={{width: "100%", height: "100%"}} center={[lat, long]} zoom={13} scrollWheelZoom={false}>
            <MapConsumer>
                {(map) => {
                    props.locate ? map.locate() : <></>
                    return null
                }}
            </MapConsumer>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {props.locate && <LocationMarker popupTitle={"You are here"}/>}
        </MapContainer>
    );
}
const fillBlueOptions = { fillColor: 'blue' }


function LocationMarker(props) {
    const [position, setPosition] = useState(null)
    const [markerArray, setMarkerArray] = useState([])

    const map_c = useMapEvents({
        click(e) {
            // map_c.locate();
            let latLong = map_c.mouseEventToLatLng(e.originalEvent)
            let temp  = _.cloneDeep(markerArray)
            temp.push(latLong)
            setMarkerArray(temp)

        },
        locationfound(e) {
            setPosition(e.latlng)
            console.log(e.latlng)
            map_c.flyTo(e.latlng, map_c.getZoom())
        },
    })

    const updateMarkerLatLng = (LatLong, index) => {
        if(index > -1 && LatLong) {
            let temp = _.cloneDeep(markerArray)
            temp[index] = LatLong
            console.log(temp, markerArray)
            setMarkerArray(temp)
        }
    }

    return position === null ? null : (
        markerArray.length < 1 ?
            <DraggableMarker setLatLng={()=>updateMarkerLatLng(this,0,)} popupTitle={"CURRENT LOCATION"} center={position} >
            </DraggableMarker> :
            <>{
                markerArray.map((pos, index) => {
                    return <DraggableMarker key={index} popupTitle={"hello"} setLatLng={(e)=>updateMarkerLatLng(e,index)} center={pos}>
                    </DraggableMarker>
                })
            }
            <Polyline positions={markerArray} pathOptions={fillBlueOptions} />
            </>
    )

}

export default CreateRouteMapComponent
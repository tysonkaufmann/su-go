import React, { Component, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, MapConsumer, Polyline, LayerGroup, LayersControl } from 'react-leaflet'
import MarkerComponent from "./markerComponent.component";
import HeatmapOverlay from "leaflet-heatmap"
import {useLeafletContext} from '@react-leaflet/core'
import L from 'leaflet';
import logo from "../assets/images/logoMarker.png";


function MapContainerComponent(props) {
    let [lat, setLat] = useState(0)
    let [long, setLong] = useState(0)
    let [selectedRoute, setSelectedRoute] = useState(null)

    useEffect(() => {
        setSelectedRoute(props.route)
    }, [props.route])

    if (props.allRoutes) {
        const data = props.allRoutes.map(r => {
            return {
                lat: r.route[0].lat,
                lng: r.route[0].lng,
                count: Math.floor(Math.random() * 10) // TODO: replace with API call to get traffic
            }
        })
    
        const trafficData = {
            max: 10,
            data: data
        }
    
        // configuration for heatmap
        const cfg = {
            "radius": 0.028,
            "maxOpacity": .8,
            "scaleRadius": true,
            "useLocalExtrema": false,
            latField: 'lat',
            lngField: 'lng',
            valueField: 'count',
            gradient: {
                '0.1': '#5eff6b',
                '0.2': '#47ff56',
                '0.3': '#30ff41',
                '0.4': '#00ff15',
                '0.5': '#dcff5e',
                '0.6': '#ffd500',
                '0.7': '#ffa200',
                '0.8': '#ff6a00',
                '0.9': '#ff0000',
                '1.0': '#ff0000',
                }
        };
    
        var heatmapLayer = new HeatmapOverlay(cfg)
        heatmapLayer.setData(trafficData)
    }

    return (
        <MapContainer
            style={{ width: "100%", height: "100%" }} center={[lat, long]} zoom={13} scrollWheelZoom={false}>
            <MapConsumer>
                {(map) => {
                    props.locate ? selectedRoute && selectedRoute.length > 0 ? map.panTo([selectedRoute[0].lat, selectedRoute[0].lng]) : map.locate() : map.panTo([selectedRoute[0].lat, selectedRoute[0].lng])
                    return null
                }}
            </MapConsumer>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {props.allRoutes && 
                <LayersControl position="topright">
                    <LayersControl.Overlay name="Show Routes">
                        <LayerGroup>
                            {props.allRoutes.map((r, i) => {
                                return <Marker icon = {L.icon({
                                        iconUrl: logo,
                                        iconSize: [38, 56],
                                        iconAnchor: [18, 50]
                                    })}
                                    position={[r.route[0].lat, r.route[0].lng]} 
                                    key={i}
                                    eventHandlers={{
                                        click: (e) => {
                                            setSelectedRoute(r.route)
                                        }
                                    }}></Marker>
                            })}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name="Show Traffic">
                        <LayerGroup>
                            <HeatmapLayer heatmap={heatmapLayer}/>
                        </LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>
            }
            {props.locate && <LocationMarker popupTitle={"You are here"} />}
            {selectedRoute && selectedRoute.length > 0 && <> <MarkerComponent popupTitle={"Start"} lat={selectedRoute[0].lat}
                long={selectedRoute[0].lng} /> <MarkerComponent
                    popupTitle={"End"}
                    lat={selectedRoute[selectedRoute.length - 1].lat}
                    long={selectedRoute[selectedRoute.length - 1].lng} /></>}
            <Polyline pathOptions={{ color: 'black' }} positions={selectedRoute} />
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

function HeatmapLayer(props) {

    const context = useLeafletContext()

    useEffect(() => {
        const layer = props.heatmap
        const container = context.layerContainer || context.map

        container.addLayer(layer)

        return () => {
            container.removeLayer(layer)
        }
    })

    return null
}

export default MapContainerComponent;
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, MapConsumer, Polyline, LayerGroup, LayersControl } from 'react-leaflet'
import HeatmapOverlay from "leaflet-heatmap"
import {useLeafletContext} from '@react-leaflet/core'
import L from 'leaflet';
import logo from "../assets/images/logoMarker.png";
import {updateTraffic} from "../actions/routes";
import {connect} from "react-redux";



function MapContainerComponent(props) {
    let [lat, ] = useState(0)
    let [long, ] = useState(0)
    let [selectedRoute, setSelectedRoute] = useState(null)

    const prevRoute = usePrevious(props.route)
    const prevSelected = usePrevious(selectedRoute)
    const prevCurrentRoute = usePrevious(props.currentRoute)

    useEffect(() => {
        if (prevRoute !== props.route || (props.route !== selectedRoute && selectedRoute === prevSelected)) {
            setSelectedRoute(props.route)
        }
    })

    if (props.allRoutes) {
        let maxTraffic = -1
        let data = []
        props.allRoutes.forEach(r => {
            let trafficFound = props.traffic.find(t => t.routeid === r.routeid)
            let count = trafficFound.count
            if (maxTraffic < count) {
                maxTraffic = count
            }
            data.push({
                lat: r.route[0].lat,
                lng: r.route[0].lng,
                count: count
            })
        })
    
        const trafficData = {
            max: maxTraffic < 5 ? 5 : maxTraffic,
            data: data
        }
    
        // configuration for heatmap
        const cfg = {
            "radius": 0.028,
            "maxOpacity": 0.8,
            "scaleRadius": true,
            "useLocalExtrema": false,
            latField: 'lat',
            lngField: 'lng',
            valueField: 'count',
            gradient: {
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
            style={{ width: "100%", height: "100%" }} center={[lat, long]} zoom={13} minZoom={5} scrollWheelZoom={false}>
            <MapConsumer>
                {(map) => {
                    props.locate ? 
                        selectedRoute && selectedRoute.length > 0 ? 
                            map.panTo([selectedRoute[0].lat, selectedRoute[0].lng]) : map.locate() 
                        : selectedRoute && selectedRoute.length > 0 && map.panTo([selectedRoute[0].lat, selectedRoute[0].lng])
                    return null
                }}
            </MapConsumer>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {props.allRoutes&& props.locate && 
                <LayersControl position="topright">
                    <LayersControl.Overlay name="Show Routes">
                        <LayerGroup>
                            {props.allRoutes.map((r, i) => {
                                return <Marker icon = {L.icon({
                                        iconUrl: logo,
                                        iconSize: [30, 45],
                                        iconAnchor: [15, 41]
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
            {selectedRoute && selectedRoute.length > 0 && <> 
                <Marker icon = {L.icon({
                                        iconUrl: logo,
                                        iconSize: [30, 45],
                                        iconAnchor: [15, 41]
                                    })}
                                    position={[selectedRoute[0].lat, selectedRoute[0].lng]} ></Marker></>}
            {selectedRoute ? <Polyline pathOptions={{ color: '#2678c8', dashArray: '8 5'}} positions={selectedRoute} /> : null}
            {props.currentRoute ? <Polyline pathOptions={{ color: '#ed6622', dashArray: '8 5'}} positions={props.currentRoute} /> : null}
        </MapContainer>
    );
}

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
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

function mapDispatchToProps(dispatch) {
    return {
        updateTraffic: (item) => {
            dispatch(updateTraffic(item))
        },
    }
}

function mapStateToProps(state) {
    return {
        traffic: state.routesReducer.traffic
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainerComponent);
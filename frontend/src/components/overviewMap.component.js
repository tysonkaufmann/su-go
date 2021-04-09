import React, { useState, useEffect, useRef, Component } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, MapConsumer, Polyline, LayerGroup, LayersControl } from 'react-leaflet'
import HeatmapOverlay from 'leaflet-heatmap'
import { useLeafletContext } from '@react-leaflet/core'
import L from 'leaflet'
import { updateTraffic, updateSelectedRoute } from '../actions/routes'
import { connect } from 'react-redux'

import MarkerComponent from './markerComponent.component'
import startMarkerIcon from '../assets/images/logoMarker.png'

function OverviewMap (props) {
  const [lat, setLat] = useState(50)
  const [lng, setLng] = useState(-97)

  if (props.allRoutes) {
    let maxTraffic = -1
    const data = []
    props.allRoutes.forEach(r => {
      const trafficFound = props.traffic.find(t => t.routeid === r.routeid)
      if (trafficFound) {
        const count = trafficFound.count || 0
        if (maxTraffic < count) {
          maxTraffic = count
        }
        data.push({
          lat: r.route[0].lat,
          lng: r.route[0].lng,
          count: count
        })
      }
    })

    const cfg = {
      radius: 0.028,
      maxOpacity: 0.8,
      scaleRadius: true,
      useLocalExtrema: false,
      latField: 'lat',
      lngField: 'lng',
      valueField: 'count',
      gradient: {
        '0.0': '#47fc55',
        0.1: '#47fc55',
        0.2: '#40ff4f',
        0.3: '#2bff3c',
        0.4: '#1fff31',
        0.5: '#00ff15',
        0.6: '#dcff5e',
        0.7: '#ffd500',
        0.8: '#ffa200',
        0.9: '#ff6a00',
        '1.0': '#ff0000'
      }
    }

    var heatmapLayer = new HeatmapOverlay(cfg)
    heatmapLayer.setData({
      max: maxTraffic < 10 ? 10 : maxTraffic,
      data: data
    })
  }

  return (
    <MapContainer
      style={{ width: '100%', height: '100%' }}
      center={[lat, lng]}
      zoom={13}
      minZoom={5}
      scrollWheelZoom={false}
    >
      <MapConsumer>
        {(map) => {
          Object.keys(props.selectedRoute).length === 0
            ? map.locate()
            : map.panTo([props.selectedRoute.route[0].lat, props.selectedRoute.route[0].lng])
          return null
        }}
      </MapConsumer>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {props.allRoutes && props.locate &&
        <LayersControl position="topright">
          <LayersControl.Overlay name="Show Routes">
            <LayerGroup>
              {props.allRoutes.map((r, i) => {
                return (
                  <Marker icon = {L.icon({
                    iconUrl: startMarkerIcon,
                    iconSize: [30, 45],
                    iconAnchor: [15, 41]
                  })}
                    position={[r.route[0].lat, r.route[0].lng]}
                    key={i}
                    eventHandlers={{
                      click: (e) => {
                        props.updateSelectedRoute(r)
                      }
                    }}
                  />
                )
              })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Show Traffic">
            <LayerGroup>
              <HeatmapLayer heatmap={heatmapLayer} />
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      }
      {props.locate && <LocationMarker popupTitle={'You are here'} />}
      {
        Object.keys(props.selectedRoute).length !== 0 &&
        <>
          <MarkerComponent
            start={true}
            lat={props.selectedRoute.route[0].lat}
            long={props.selectedRoute.route[0].lng}
          />
          <MarkerComponent
            start={false}
            lat={props.selectedRoute.route[props.selectedRoute.route.length - 1].lat}
            long={props.selectedRoute.route[props.selectedRoute.route.length - 1].lng}
          />
          <Polyline
            pathOptions={props.currentRoute.routeid === props.selectedRoute.routeid
              ? { color: '#ed6622', dashArray: '8 5' }
              : { color: '#2678c8', dashArray: '8 5' }}
            positions={props.selectedRoute.route}
          />
        </>
      }
      {
        Object.keys(props.currentRoute).length !== 0 &&
        <>
          <Marker icon = {L.icon({
            iconUrl: startMarkerIcon,
            iconSize: [30, 45],
            iconAnchor: [15, 41]
          })}
            position={[props.currentRoute.route[0].lat, props.currentRoute.route[0].lng]}
            eventHandlers={{
              click: (e) => {
                props.updateSelectedRoute(props.currentRoute)
              }
            }}
          />
          <MarkerComponent
            start={false}
            lat={props.currentRoute.route[props.currentRoute.route.length - 1].lat}
            long={props.currentRoute.route[props.currentRoute.route.length - 1].lng}
          />
          <Polyline
            pathOptions={{ color: '#ed6622', dashArray: '8 5' }}
            positions={props.currentRoute.route}
          />
        </>
      }
    </MapContainer>
  )
}

function mapDispatchToProps (dispatch) {
  return {
    updateTraffic: (item) => {
      dispatch(updateTraffic(item))
    },
    updateSelectedRoute: (item) => {
      dispatch(updateSelectedRoute(item))
    }
  }
}

function mapStateToProps (state) {
  return {
    traffic: state.routesReducer.traffic,
    selectedRoute: state.routesReducer.selectedRoute,
    currentRoute: state.routesReducer.currentRoute
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewMap)

function HeatmapLayer (props) {
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

function LocationMarker (props) {
  const [position, setPosition] = useState(null)
  const [mount, setMount] = useState(true)

  const map = useMapEvents({
    click () {
      map.locate()
    },
    locationfound (e) {
      setPosition(e.latlng)
      if (mount) {
        map.flyTo(e.latlng, map.getZoom())
      }
    }
  })

  useEffect(() => {
    setTimeout(() => setMount(false), 3000)
  }, [])
  return position === null
    ? null
    : (
        <Marker position={position}>
            <Popup>{props.popupTitle}</Popup>
        </Marker>
      )
}

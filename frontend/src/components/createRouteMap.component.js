import React, { Component, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, MapConsumer, Polyline } from 'react-leaflet'
import _ from 'lodash'
import styled from 'styled-components'
import { updateEmail, updateFullname, updateUsername } from '../actions/userProfile'
import { updateCreateRouteDetails } from '../actions/routes'
import { connect } from 'react-redux'
import userProfileReducer from '../reducers/userProfileReducer'
// CREATE ROUTE USER INTERFACE.
// This is the draggable marker that the user can use to modify the created route.
function DraggableMarker (props) {
  const [position, setPosition] = useState(props.center)
  const markerRef = useRef(null)

  const eventHandlers = useMemo(
    () => ({
      dragend () {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      }
    }),
    []
  )
  useEffect(() => props.setLatLng(position), [position]) // Updates the poly line when the position of a marker is updated
  return (
        <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}>
        </Marker>
  )
}
// Styling for componenets
const Button = styled.button`
      text-align:center;
      font-size: 1em;
      padding: 0.25em 1em;
      border-radius: 10px;
      border: white;
      color: white;
      margin: 5px;
      background: #00cddb;
      &:hover {
        background: #89b6b9;
      }
`
const ButtonDiv = styled.div`
    display: flex;
    width: 100%;
    margin: 10px;
    justify-content: space=between;
    
`
// This is the map the user uses to create the route.
function CreateRouteMapComponent (props) {
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)
  const [route, setRoute] = useState([])
  const [distance, setDistance] = useState(0)

  const handleNextClick = () => {
    props.updateCreateRouteDetails(
      { ...props.createRouteDetails, route: route, routedistance: distance / 1000 }
    )
    props.handleNext()
  }

  const handleBackClick = () => {
    props.updateCreateRouteDetails(
      { ...props.createRouteDetails, route: route, routedistance: distance / 1000 }
    )
    props.handleBack()
  }
  const handleClear = () => {
    setRoute([])
    setDistance(0)
  }
  const setLatLngs = (polylineRef) => {
    if (polylineRef.current) {
      console.log(polylineRef.current.getLatLngs())
      let tempDistance = 0
      let previousPoint
      // http://leafletjs.com/reference.html#polyline-getlatlngs
      polylineRef.current.getLatLngs().forEach((latLng) => {
        console.log(latLng)
        if (previousPoint) {
          tempDistance += parseInt(previousPoint.distanceTo(latLng).toFixed(2))
        }
        previousPoint = latLng
      })
      setDistance(tempDistance)
    }
  }
  // Persists the route data once created
  useEffect(
    () => {
      if (props.createRouteDetails.route.length > 1) { setRoute(props.createRouteDetails.route) }
    }, []
  )

  return (
        <><MapContainer
            style={{ width: '100%', height: '100%' }} center={[lat, long]} zoom={13} scrollWheelZoom={false}>
            <MapConsumer>
                {(map) => {
                  map.locate()
                  return null
                }}
            </MapConsumer>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {<PolyLineRoute setLatLngs={(polylineRef) => setLatLngs(polylineRef)} route={route} clear={route.length === 0} setRoute={(route) => setRoute(route)} popupTitle={'You are here'}/>}
        </MapContainer>
            {'Distance: '}{distance / 1000}{' KM(s)'}
            <ButtonDiv>
                <Button onClick={() => handleBackClick()}>Back</Button>
                <Button style={{ background: route.length < 2 ? '#89b6b9' : '#00cddb' }} disabled={route.length < 2} onClick={() => handleNextClick()}>Next</Button>
                <Button style={{ background: route.length < 2 ? '#89b6b9' : '#00cddb' }} disabled={route.length < 2} onClick={() => handleClear()}>Clear</Button>
            </ButtonDiv>
        </>

  )
}

function mapDispatchToProps (dispatch) {
  return {
    updateUsername: (item) => {
      dispatch(updateUsername(item))
    },
    updateFullname: (item) => {
      dispatch(updateFullname(item))
    },
    updateEmail: (item) => {
      dispatch(updateEmail(item))
    },
    updateCreateRouteDetails: (item) => {
      dispatch(updateCreateRouteDetails(item))
    }
  }
}

function mapStateToProps (state) {
  return {
    favouriteRoutes: state.routesReducer.favouriteRoutes,
    createdRoutes: state.routesReducer.createdRoutes,
    createRouteDetails: state.routesReducer.createRouteDetails
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRouteMapComponent)

const fillBlueOptions = { fillColor: 'blue' } // Polyline color

// Polyline that is displayed on the map
function PolyLineRoute (props) {
  const [position, setPosition] = useState(null)
  const [mount, setMount] = useState(true)
  const [markerArray, setMarkerArray] = useState([])
  // Map events used for the functionality
  const polylineRef = useRef()

  const map_c = useMapEvents({
    click (e) {
      const latLong = map_c.mouseEventToLatLng(e.originalEvent)
      const temp = _.cloneDeep(markerArray)
      temp.push(latLong)
      setMarkerArray(temp)
      props.setRoute(temp)
      props.setLatLngs(polylineRef)
    },
    locationfound (e) {
      setPosition(e.latlng)
      if (mount) {
        map_c.flyTo(e.latlng, map_c.getZoom())
      }
    }
  })
  // Hooks used to update the map when mounted
  useEffect(() => {
    setTimeout(() => setMount(false), 3000)
  }, [])

  useEffect(() => {
    setMarkerArray([])
  }, [props.clear])

  useEffect(() => {
    if (props.route.length > 0) {
      setMarkerArray(props.route)
      setTimeout(() => map_c.flyTo(props.route[0], map_c.getZoom()), 1000)
    }
  }, [])

  // Update the polyline once the user drags.
  const updateMarkerLatLng = (LatLong, index) => {
    if (index > -1 && LatLong) {
      const temp = _.cloneDeep(markerArray)
      temp[index] = LatLong
      setMarkerArray(temp)
      props.setRoute(temp)
      props.setLatLngs(polylineRef)
    }
  }

  return position === null
    ? null
    : (
        markerArray.length < 1
          ? <DraggableMarker setLatLng={() => updateMarkerLatLng(this, 0)} popupTitle={'CURRENT LOCATION'} center={position} >
            </DraggableMarker>
          : <>{
                markerArray.map((pos, index) => {
                  return <DraggableMarker key={index} popupTitle={'hello'} setLatLng={(e) => updateMarkerLatLng(e, index)} center={pos}>
                    </DraggableMarker>
                })
            }
            <Polyline ref={polylineRef} positions={markerArray} pathOptions={fillBlueOptions} />
            </>
      )
}

'use client'

import React from 'react';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { CENTER_COORDINATES, TILE_LAYER_ATTRIBUTION, TILE_LAYER_URL } from '@/constants/const';


//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

type MapTypes = {
    center?: number[];
}


const Map: React.FC<MapTypes> = ({ center }) => {

    return (
        <MapContainer
            center={center as L.LatLngExpression || CENTER_COORDINATES}
            zoom={center ? 4 : 2}
            scrollWheelZoom={false} // TODO: try making it true
            className="h-[35vh] rounded-lg z-101"
        >
            <TileLayer
                url={TILE_LAYER_URL}
                attribution={TILE_LAYER_ATTRIBUTION}
            />
            {center && <Marker
                position={center as L.LatLngExpression}
            />}
        </MapContainer>
    )
}

export default Map
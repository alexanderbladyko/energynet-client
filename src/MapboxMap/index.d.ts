/// <reference types="mapbox-gl" />

declare namespace map_component {
    export function setAccessToken(): void;
}

declare module 'MapboxMap' {
	export = map_component;
}

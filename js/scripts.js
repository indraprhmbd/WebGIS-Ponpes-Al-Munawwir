/*!
* Start Bootstrap - Blog Home v5.0.9 (https://startbootstrap.com/template/blog-home)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-blog-home/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
        
document.addEventListener('DOMContentLoaded', function() {
        
    mapboxgl.accessToken = 'pk.eyJ1IjoibXV0aGlhZGlhbmEiLCJhIjoiY205b2V6dDhwMHJ5azJpcHFkdTA0cDdxciJ9.ahkniIAPBxWXl-h1Zplh8Q'; // Token kamu
  
  const start = {
      center: [110.38353248498208, -7.805284666182359],
      zoom: 13,
      pitch: 0,
      bearing: 0
  };
  const end = {
      center: [110.3609600733273, -7.825577818701965],
      zoom: 17,
      pitch: 0,
      bearing: 0
  };
  const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [110.361049, -7.82565],
      zoom: 20,
      ...start
  });
  
  map.on('load', () => {
      // ASRAMA PUTRA
  map.addSource('asrama_putra', {
          type: 'geojson',
          data: 'assets/geojson/Asrama-Putra.geojson'
  });
  map.addLayer({
      id: 'asrama_putra',
      type: 'fill',
      source: 'asrama_putra',
      paint: {
          'fill-color': '#00008b',
          'fill-opacity': 1
      }
  });
  map.addLayer({
      id: 'outline_asramaputra',
      type: 'line',
      source: 'asrama_putra',
      paint: {
      'line-color': 'black',
      'line-width': 1
      }
  });

  // ASRAMA PUTRI
  map.addSource('asrama_putri', {
      type: 'geojson',
      data: 'assets/geojson/Asrama-Putri.geojson'
  });
  map.addLayer({
      id: 'asrama_putri',
      type: 'fill',
      source: 'asrama_putri',
      paint: {
          'fill-color': '#b974b5',
          'fill-opacity': 1
      }
  });
  map.addLayer({
      id: 'outline_asramaputri',
      type: 'line',
      source: 'asrama_putri',
      paint: {
      'line-color': 'black',
      'line-width': 1
      }
  });

  // BANGUNAN UMUM
  map.addSource('bangunan_umum', {
      type: 'geojson',
      data: 'assets/geojson/Bangunan-Umum.geojson'
  });
  map.addLayer({
      id: 'bangunan_umum',
      type: 'fill',
      source: 'bangunan_umum',
      paint: {
          'fill-color': '#339f43', 
          'fill-opacity': 1
      }
  });
  map.addLayer({
      id: 'outline_bangunanumum',
      type: 'line',
      source: 'bangunan_umum',
      paint: {
      'line-color': 'black',
      'line-width': 1
      }
  });

  // PESANTREN
  map.addSource('pesantren', {
      type: 'geojson',
      data: 'assets/geojson/Pesantren.geojson'
  });
  map.addLayer({
      id: 'pesantren',
      type: 'circle',
      source: 'pesantren',
      paint: {
      'circle-radius': 8,
      'circle-color': '#e63946',
      'circle-stroke-color': 'white',
      'circle-stroke-width': 2
      }
  });
  });

  // Load Popup
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: true
  });

  // Asrama Putra - Hover
  map.on('mouseenter', 'asrama_putra', (e) => {
    map.getCanvas().style.cursor = 'pointer';
    const feature = e.features[0];
    popup.setLngLat(e.lngLat)
        .setText(feature.properties.Nama)
        .addTo(map);
  });

  map.on('mouseleave', 'asrama_putra', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

  // Asrama Putri - Hover
  map.on('mouseenter', 'asrama_putri', (e) => {
    map.getCanvas().style.cursor = 'pointer';
    const feature = e.features[0];
    popup.setLngLat(e.lngLat)
        .setText(feature.properties.Nama)
        .addTo(map);
  });

  map.on('mouseleave', 'asrama_putri', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

  // Bangunan Umum - Hover
  map.on('mouseenter', 'bangunan_umum', (e) => {
    map.getCanvas().style.cursor = 'pointer';
    const feature = e.features[0];
    popup.setLngLat(e.lngLat)
        .setText(feature.properties.Nama)
        .addTo(map);
  });

  map.on('mouseleave', 'bangunan_umum', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

  map.addControl(new mapboxgl.NavigationControl(), 'top-left');

  var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric', // Gunakan sistem metrik untuk menampilkan jarak
    profile: 'mapbox/driving', // Gunakan profil mengemudi
    language: 'id',
  });

  map.on('load', function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        directions.setOrigin([position.coords.longitude, position.coords.latitude]);
      });
    }
  });

  map.addControl(directions, 'top-right');

  // Tambahkan tombol fly ke lokasi pesantren
  let isAtStart = true;

  document.getElementById('fly').addEventListener('click', () => {
    // Tentukan apakah kita sedang di titik A atau B
    const target = isAtStart ? end : start;
    isAtStart = !isAtStart;

    map.flyTo({
      ...target,             // Terbang ke koordinat yang dipilih
      duration: 2000,        // Animasikan selama 2 detik
      essential: true        // Animasi ini dianggap penting untuk aksesibilitas
    });
  });
});
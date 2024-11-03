const socket = io();

// Request user's geolocation and send it to the server
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      socket.emit("send-location", { latitude, longitude });
    },
    (error) => {
      console.error("Geolocation error:", error);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 2500,
    }
  );
}

// Initialize map centered on [0, 0] with a zoom level of 16
const map = L.map("map").setView([0, 0], 16);
L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// Create an object to store markers for each user
const markers = {};

// Listen for location updates from the server
socket.on("receive-location", (data) => {
  const { id, latitude, longitude } = data;

  // Center the map on the first received user's location for initial setup
  if (!markers[id]) {
    map.setView([latitude, longitude], 16);
  }

  // Check if the marker already exists; update if it does, create if it doesn't
  if (markers[id]) {
    markers[id].setLatLng([latitude, longitude]); // Update existing marker position
  } else {
    markers[id] = L.marker([latitude, longitude]).addTo(map); // Add new marker to the map
  }
});

// Remove marker when a user disconnects
socket.on("user-disconnected", (id) => {
  if (markers[id]) {
    map.removeLayer(markers[id]); // Remove the marker from the map
    delete markers[id]; // Delete the marker from the markers object
    console.log(`User ${id} disconnected`);
  }
});

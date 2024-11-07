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
      enableHighAccuracy: false, // Reduce delay by disabling high accuracy
      maximumAge: 1000,  // Cache the position for 1 second before re-requesting
      timeout: 5000, // Wait for 5 seconds before timing out
    }
  );
}

// Initialize map immediately with a zoom level of 16
const map = L.map("map", { zoomControl: true }).setView([0, 0], 16);
L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Create an object to store markers for each user
const markers = {};
const updateThreshold = 0.0001;  // Minimal movement threshold (in degrees)

// Listen for location updates from the server
socket.on("receive-location", (data) => {
  const { id, latitude, longitude } = data;

  // Only update marker if the location has changed by more than the threshold
  if (markers[id]) {
    const { lat, lng } = markers[id].getLatLng();
    const distance = Math.sqrt(Math.pow(lat - latitude, 2) + Math.pow(lng - longitude, 2));

    if (distance > updateThreshold) {
      markers[id].setLatLng([latitude, longitude]); // Update marker position
    }
  } else {
    // Add new marker to the map if it doesn't already exist
    markers[id] = L.marker([latitude, longitude]).addTo(map);
  }

  // Center map on the first user (or set of users)
  if (Object.keys(markers).length === 1) {
    map.setView([latitude, longitude], 16);  // Center map on the first marker
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

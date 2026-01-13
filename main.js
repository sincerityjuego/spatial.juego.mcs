// Initialize map
const map = L.map('map').setView([14.3219, 121.1126], 13); // Biñan, Laguna coordinates

// Base tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 22,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Sample infrastructure markers (placeholder)
const infrastructureData = [
    {name: "Bridge A", lat: 14.3230, lng: 121.1100, type: "Bridge"},
    {name: "Barangay Hall", lat: 14.3220, lng: 121.1140, type: "Building"},
    {name: "Water Pump Station", lat: 14.3205, lng: 121.1160, type: "Utility"}
];

// Add markers to map
infrastructureData.forEach(item => {
    const marker = L.marker([item.lat, item.lng]).addTo(map);
    marker.bindPopup(`<strong>${item.name}</strong><br>Type: ${item.type}`);
});

// Search bar functionality
document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('searchBar').value;
    if (!query) return alert("Enter a location!");

    // Placeholder: Geocode using OpenStreetMap Nominatim API
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
            if (data.length === 0) {
                document.getElementById('locationInfo').innerHTML = "Location not found.";
                return;
            }
            const loc = data[0];
            const lat = parseFloat(loc.lat);
            const lon = parseFloat(loc.lon);

            // Move map to location
            map.setView([lat, lon], 18);

            // Add temporary marker
            const searchMarker = L.marker([lat, lon]).addTo(map);
            searchMarker.bindPopup(`<strong>${loc.display_name}</strong>`).openPopup();

            // Update sidebar info
            document.getElementById('locationInfo').innerHTML = `
                <strong>Address:</strong> ${loc.display_name}<br>
                <strong>Latitude:</strong> ${lat}<br>
                <strong>Longitude:</strong> ${lon}
            `;
        })
        .catch(err => console.error(err));
});

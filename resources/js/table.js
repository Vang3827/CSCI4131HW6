window.addEventListener("DOMContentLoaded", () => {
    console.log("In table.js script");

    // Function to for countdown timers
    function updateAuctionTimers(listings) {
        listings.forEach(listing => {
            const endTime = new Date(listing.end_time).getTime();
            const timerElement = document.getElementById(`timerid${listing.id}`);

            const updateInterval = setInterval(() => {
                const now = new Date().getTime();
                const distance = endTime - now;

                if (distance < 0) {
                    clearInterval(updateInterval);
                    if (timerElement) {
                        timerElement.textContent = "EXPIRED";
                    }
                    return;
                }

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                if (timerElement) {
                    timerElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
                }
            }, 1000);
        });
    }

    async function fetchListings() {
        try {
            const response = await fetch('/api/gallery');
            if (response.ok) {
                const listings = await response.json();
                console.log('Fetched Listings:', listings); // Log the response
                updateAuctionTimers(listings);
            } else {
                console.error('Failed to fetch listings');
            }
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    }

    //image preview
    function setupImagePreview() {
        const imgDataElements = document.querySelectorAll('[data-image]');
        imgDataElements.forEach(imgData => {
            imgData.addEventListener('mouseover', function () {
                const imgNode = document.createElement("img");
                const dataImage = imgData.dataset.image;
                imgNode.src = dataImage;
                imgNode.alt = "Image Preview";
                imgNode.width = 320;
                imgNode.height = 270;
                imgNode.id = "newNode";

                const previewElement = document.getElementById('imgPreview');
                previewElement.innerHTML = ''; // Clear previous previews
                previewElement.appendChild(imgNode);
            });

            imgData.addEventListener("mouseout", () => {
                const removeElement = document.getElementById("newNode");
                if (removeElement) removeElement.remove();
            });
        });
    }

    // Setup delete buttons
    function setupDeleteListeners() {
        const deleteButtons = document.querySelectorAll('.bidButton');
        deleteButtons.forEach(button => {
            button.addEventListener('click', async function () {
                const listingId = this.getAttribute('data-id');
                
                try {
                    //DELETE request
                    const response = await fetch('/api/delete_listing', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ listing_id: listingId }),
                    });
    
                    if (response.ok) {
                        // Remove the row the deleted listing
                        const row = document.querySelector(`#tableRow-${listingId}`);
                        if (row) {
                            row.remove(); // Trying to remove the row from the table immediately
                        }
                        fetchListings();
                    } else {
                        console.error('Failed to delete listing');
                    }
                } catch (error) {
                    console.error('Error deleting listing:', error);
                }
            });
        });
    }
    
    // Initialize functions on page load
    fetchListings();
    setupImagePreview();
    setupDeleteListeners();
});

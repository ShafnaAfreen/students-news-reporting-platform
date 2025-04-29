// Add this function
async function loadAnnouncements() {
    const announcementsDiv = document.getElementById('announcementsList');
    
    try {
        const q = query(collection(db, 'announcements'), 
                       orderBy('timestamp', 'desc'), 
                       limit(5));
        
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            announcementsDiv.innerHTML = '<p class="text-gray-500">No announcements yet</p>';
            return;
        }

        announcementsDiv.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const announcement = doc.data();
            announcementsDiv.innerHTML += `
                <div class="bg-gray-50 p-4 rounded-lg border-l-4 border-pink-300">
                    <h3 class="font-semibold text-lg mb-2">${announcement.title}</h3>
                    <p class="text-gray-600 mb-2">${announcement.message}</p>
                    <div class="text-sm text-gray-500">
                        Posted by: ${announcement.authorName}
                        <span class="mx-2">•</span>
                        ${announcement.timestamp ? new Date(announcement.timestamp.toDate()).toLocaleString() : 'Just now'}
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error loading announcements:', error);
        announcementsDiv.innerHTML = '<p class="text-red-500">Failed to load announcements</p>';
    }
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', loadAnnouncements);
/**
 * TRM Records Dashboard
 * Optimized for Desktop
 */

// --- DATA CONFIGURATION ---
const ARTISTS = {
    'therichmusic': { name: 'therichmusic', genre: 'Various' }
};

const ALBUMS = [
    { 
        id: 'rich-era', 
        name: 'RICH ERA', 
        art: 'https://images2.imgbox.com/01/3b/p1pphY1X_o.png', 
        artistId: 'therichmusic' 
    },
    { 
        id: 'memories', 
        name: 'memories.', 
        art: 'https://images2.imgbox.com/71/3b/q9zN6GfU_o.png', 
        artistId: 'therichmusic' 
    }
];

// Controls for the Home Screen
const FEATURED_RELEASE_ID = 'rich-era'; 
const RECENT_RELEASE_IDS = ['rich-era', 'memories']; 

const SONG_DATA = {
    "about-damn-time": {
        id: "about-damn-time", artistId: "therichmusic", title: "ABOUT DAMN TIME", albumId: "rich-era",
        cover: "https://images2.imgbox.com/01/3b/p1pphY1X_o.png",
        url: "https://audio.jukehost.co.uk/L6ChsEYAWXOzJYVrjnrt7LqKFddIsGYz.mp3",
        duration: "2:12",
        lyrics: `[Intro]\nHuh, huh, huh, huh\nAbout Damn-\n\n[Verse 1]\nSaid to the doubters it's about damn time...`,
        credits: `Produced by H3 Music\nWritten by therichmusic`
    },
    "memories": {
        id: "memories", artistId: "therichmusic", title: "memories.", albumId: "memories",
        cover: "https://images2.imgbox.com/71/3b/q9zN6GfU_o.png",
        url: "https://audio.jukehost.co.uk/example.mp3",
        duration: "2:10",
        lyrics: `[Lyrics for memories.]`,
        credits: `Produced by therichmusic`
    }
};

// Map tracks to albums for the album view
const TRACKS = {
    'rich-era': [SONG_DATA['about-damn-time']],
    'memories': [SONG_DATA['memories']]
};

// --- CORE STATE ---
let lastView = { type: 'home', id: null };

// --- NAVIGATION & RENDERING ---

function init() {
    renderSidebar();
    viewHome(); // Start on the Home Screen
}

function renderSidebar() {
    const sidebarNav = document.getElementById('sidebar-nav');
    const sidebarReleases = document.getElementById('sidebar-releases');

    // Home Button
    sidebarNav.innerHTML = `
        <div class="sidebar-item" onclick="viewHome()">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" style="flex-shrink:0;">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>
            <span class="sidebar-full-elem">Home</span>
        </div>
    `;

    // Album List
    sidebarReleases.innerHTML = ALBUMS.map(album => `
        <div class="sidebar-item" onclick="viewAlbum('${album.id}')">
            <img src="${album.art}" class="sidebar-icon" style="width:28px; height:28px; border-radius:4px; flex-shrink:0;">
            <span class="sidebar-full-elem">${album.name}</span>
        </div>
    `).join('');
}

function viewHome() {
    lastView = { type: 'home', id: null };
    const contentView = document.getElementById('content-view');
    
    const featured = ALBUMS.find(a => a.id === FEATURED_RELEASE_ID) || ALBUMS[0];
    const recents = ALBUMS.filter(a => RECENT_RELEASE_IDS.includes(a.id));

    contentView.innerHTML = `
        <div style="padding: 20px;">
            <div onclick="viewAlbum('${featured.id}')" style="cursor:pointer; margin-bottom:40px; border-radius:20px; background:linear-gradient(135deg, #1a1a1a, #050505); border:1px solid #222; overflow:hidden;">
                <div style="display:flex; gap:30px; align-items:center; padding:40px;">
                    <img src="${featured.art}" style="width:200px; height:200px; border-radius:12px; box-shadow:0 20px 40px rgba(0,0,0,0.5);">
                    <div>
                        <span style="background:#00ff88; color:#000; padding:4px 12px; border-radius:6px; font-size:11px; font-weight:900; letter-spacing:1px;">FEATURED RELEASE</span>
                        <h1 style="font-size:56px; margin:15px 0; font-weight:900; letter-spacing:-2px;">${featured.name}</h1>
                        <p style="color:#00ff88; font-weight:700;">${ARTISTS[featured.artistId].name}</p>
                    </div>
                </div>
            </div>

            <h2 style="margin-bottom:25px; font-size:24px; font-weight:800;">Recent Releases</h2>
            <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:25px;">
                ${recents.map(album => `
                    <div onclick="viewAlbum('${album.id}')" style="cursor:pointer; background:#111; padding:15px; border-radius:15px; border:1px solid #222; transition:0.3s;">
                        <img src="${album.art}" style="width:100%; aspect-ratio:1; border-radius:10px; margin-bottom:15px; object-fit:cover;">
                        <h4 style="margin:0; font-size:16px;">${album.name}</h4>
                        <p style="margin:5px 0 0; color:#666; font-size:13px;">${ARTISTS[album.artistId].name}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    contentView.scrollTop = 0;
}

function viewAlbum(id) {
    lastView = { type: 'album', id: id };
    const album = ALBUMS.find(a => a.id === id);
    const tracks = TRACKS[id] || [];
    const contentView = document.getElementById('content-view');

    contentView.innerHTML = `
        <div style="padding:40px;">
            <div style="display:flex; gap:30px; align-items:flex-end; margin-bottom:40px;">
                <img src="${album.art}" style="width:232px; height:232px; border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,0.5);">
                <div>
                    <p style="font-size:12px; font-weight:800; color:#00ff88; margin-bottom:10px;">ALBUM</p>
                    <h1 style="font-size:72px; margin:0; font-weight:900; letter-spacing:-3px;">${album.name}</h1>
                    <p style="margin-top:15px; font-weight:600;">${ARTISTS[album.artistId].name} • ${tracks.length} songs</p>
                </div>
            </div>
            <div style="border-top:1px solid #222; padding-top:20px;">
                ${tracks.map((track, index) => `
                    <div class="track-row" onclick="playTrack('${track.id}')" style="display:flex; align-items:center; padding:12px; border-radius:8px; cursor:pointer; transition:0.2s;">
                        <span style="width:40px; color:#666;">${index + 1}</span>
                        <div style="flex:1;">
                            <div style="font-weight:500;">${track.title}</div>
                            <div style="font-size:12px; color:#666;">${ARTISTS[track.artistId].name}</div>
                        </div>
                        <span style="color:#666; font-size:14px;">${track.duration}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    contentView.scrollTop = 0;
}

// Player functions (Keep your current logic)
function playTrack(id) {
    console.log("Playing:", id);
    // Add your audio player logic here
}

// Initialize when ready
document.addEventListener('DOMContentLoaded', init);

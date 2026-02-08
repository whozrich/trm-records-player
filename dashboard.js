/**
 * TRM Records Dashboard - FULL STABLE VERSION
 */

// 1. DATA - Keep this exactly as is
const ARTISTS = {
    'therichmusic': { name: 'therichmusic' }
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

// 2. CONFIG - Use these to control the Home Screen
const FEATURED_RELEASE_ID = 'rich-era'; 
const RECENT_RELEASE_IDS = ['rich-era', 'memories']; 

// 3. TRACK DATA
const SONG_DATA = {
    "about-damn-time": {
        id: "about-damn-time", artistId: "therichmusic", title: "ABOUT DAMN TIME", albumId: "rich-era",
        cover: "https://images2.imgbox.com/01/3b/p1pphY1X_o.png",
        url: "https://audio.jukehost.co.uk/L6ChsEYAWXOzJYVrjnrt7LqKFddIsGYz.mp3",
        duration: "2:12"
    },
    "memories": {
        id: "memories", artistId: "therichmusic", title: "memories.", albumId: "memories",
        cover: "https://images2.imgbox.com/71/3b/q9zN6GfU_o.png",
        url: "https://audio.jukehost.co.uk/example.mp3",
        duration: "2:10"
    }
};

const TRACKS = {
    'rich-era': [SONG_DATA['about-damn-time']],
    'memories': [SONG_DATA['memories']]
};

// 4. CORE ENGINE
let lastView = { type: 'home', id: null };

function init() {
    console.log("TRM Dashboard Initializing...");
    renderSidebar();
    viewHome(); 
}

function renderSidebar() {
    const sidebarNav = document.getElementById('sidebar-nav');
    const sidebarReleases = document.getElementById('sidebar-releases');

    if (sidebarNav) {
        sidebarNav.innerHTML = `
            <div class="sidebar-item" onclick="viewHome()" style="display:flex; align-items:center; padding:12px; cursor:pointer; border-radius:8px; margin-bottom:10px;">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" style="margin-right:15px; flex-shrink:0;">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span class="sidebar-full-elem" style="font-weight:600;">Home</span>
            </div>
        `;
    }

    if (sidebarReleases) {
        sidebarReleases.innerHTML = ALBUMS.map(album => `
            <div class="sidebar-item" onclick="viewAlbum('${album.id}')" style="display:flex; align-items:center; padding:12px; cursor:pointer; border-radius:8px; margin-bottom:5px;">
                <img src="${album.art}" style="width:30px; height:30px; border-radius:4px; margin-right:15px; flex-shrink:0; object-fit:cover;">
                <span class="sidebar-full-elem" style="font-size:14px;">${album.name}</span>
            </div>
        `).join('');
    }
}

function viewHome() {
    const contentView = document.getElementById('content-view');
    if (!contentView) return;

    const featured = ALBUMS.find(a => a.id === FEATURED_RELEASE_ID) || ALBUMS[0];
    const recents = ALBUMS.filter(a => RECENT_RELEASE_IDS.includes(a.id));

    contentView.innerHTML = `
        <div style="padding: 30px; font-family: sans-serif;">
            <div onclick="viewAlbum('${featured.id}')" style="cursor:pointer; background: linear-gradient(135deg, #1a1a1a, #000); border: 1px solid #333; border-radius: 20px; padding: 40px; display: flex; align-items: center; gap: 30px;">
                <img src="${featured.art}" style="width: 200px; height: 200px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                <div>
                    <span style="background: #00ff88; color: #000; padding: 4px 10px; border-radius: 4px; font-size: 10px; font-weight: 900;">FEATURED RELEASE</span>
                    <h1 style="font-size: 50px; margin: 10px 0; color: #fff;">${featured.name}</h1>
                    <p style="color: #888;">therichmusic</p>
                </div>
            </div>

            <h2 style="margin-top: 40px; color: #fff;">Recent Releases</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; margin-top: 20px;">
                ${recents.map(album => `
                    <div onclick="viewAlbum('${album.id}')" style="background: #111; padding: 15px; border-radius: 12px; cursor: pointer; border: 1px solid #222;">
                        <img src="${album.art}" style="width: 100%; border-radius: 8px;">
                        <h4 style="margin: 10px 0 5px 0; color: #fff;">${album.name}</h4>
                        <p style="margin: 0; color: #666; font-size: 12px;">therichmusic</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function viewAlbum(id) {
    const album = ALBUMS.find(a => a.id === id);
    const tracks = TRACKS[id] || [];
    const contentView = document.getElementById('content-view');

    contentView.innerHTML = `
        <div style="padding: 40px; font-family: sans-serif;">
            <div style="display: flex; gap: 30px; align-items: flex-end; margin-bottom: 40px;">
                <img src="${album.art}" style="width: 230px; height: 230px; border-radius: 10px;">
                <div>
                    <p style="color: #00ff88; font-weight: 800; font-size: 12px; margin: 0;">ALBUM</p>
                    <h1 style="font-size: 60px; margin: 10px 0; color: #fff;">${album.name}</h1>
                </div>
            </div>
            ${tracks.map((t, i) => `
                <div style="display: flex; padding: 15px; border-bottom: 1px solid #222; color: #fff;">
                    <span style="width: 30px; color: #666;">${i+1}</span>
                    <span style="flex: 1;">${t.title}</span>
                    <span style="color: #666;">${t.duration}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// Ensure the code runs
window.onload = init;
if (document.readyState === "complete") { init(); }

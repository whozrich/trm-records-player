<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TRM Music Player</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        
        :root {
            --header-height: 56px; 
            --accent-green: #00ff88;
            --neon-glow: drop-shadow(0 0 8px rgba(0, 255, 136, 0.6));
            --sidebar-width: 280px;
    --sidebar-collapsed-width: 80px;
        }

        /* 1. LAYOUT & STACKING - FORCED FULL SCREEN OVERLAY */
        body { 
            margin: 0; 
            background: #000; 
            color: #fff; 
            font-family: 'Inter', sans-serif; 
            overflow: hidden; 
            height: 100vh;
            width: 100vw;
        }

        #dashboard-wrapper {
            position: fixed; 
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex; 
            flex-direction: column;
            overflow: hidden;
            z-index: 9999999; 
            background: #000;
        }

        /* Like Button Base Style */
#player-like-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Bouncy transition */
}

/* Hover Effect: Subtle Scale and Glow */
#player-like-btn:hover {
    transform: scale(1.2);
    color: #fff !important;
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
}

/* Active Liked State: Intense Neon Glow */
#player-like-btn.is-liked {
    color: var(--accent-green) !important;
    filter: var(--neon-glow);
}

/* Heart Pop Animation Class */
.heart-pop {
    animation: heart-beat 0.3s ease-out;
}

@keyframes heart-beat {
    0% { transform: scale(1); }
    50% { transform: scale(1.4); }
    100% { transform: scale(1.2); }
}

        .main-viewport {
            display: flex; 
            flex: 1; 
            overflow: hidden; 
            height: calc(100vh - 100px); 
        }

        /* EXIT BUTTON */
        .exit-player-btn {
            position: absolute;
            top: 20px;
            right: 25px;
            z-index: 10000001;
            background: rgba(255, 255, 255, 0.1);
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 10px 18px;
            border-radius: 30px;
            font-size: 11px;
            font-weight: 900;
            text-decoration: none;
            letter-spacing: 1.5px;
            backdrop-filter: blur(10px);
            transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .exit-player-btn:hover {
            background: #ff4444;
            border-color: #ff4444;
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(255, 68, 68, 0.3);
        }

        /* 2. THE PLAYER */
        #mini-player {
            height: 100px; 
            background: #050505; 
            border-top: 1px solid #111;
            display: flex; 
            align-items: center; 
            padding: 0 25px; 
            gap: 30px;
            position: relative;
            z-index: 10000000 !important;
        }

        #share-btn:hover {
    background: rgba(255, 255, 255, 0.2) !important;
    transform: scale(1.1);
}
#share-btn:active {
    transform: scale(0.95);
}

        /* CATALOGUE GLOW EFFECT */
        .glow-card {
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .glow-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 30px rgba(0, 255, 136, 0.2);
            border-color: rgba(0, 255, 136, 0.3);
        }

        #progress-container {
    cursor: pointer;
    position: relative;
}

#progress-bar {
    pointer-events: none; /* This ensures the click passes THROUGH the green bar to the container */
    transition: width 0.1s linear; /* Makes the movement smooth */
}

/* Ensure the panel sits on top of everything except the mini-player */
#info-panel {
position: fixed; /* Or absolute if inside main-viewport */
    right: -400px; 
    top: 0; 
    width: 350px; 
    height: calc(100vh - 100px); /* Leave room for player */
    background: #0a0a0a;
    z-index: 9999; /* Ensure this is HIGHER than #content-view */
    transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    border-left: 1px solid #222;
    display: flex;
    flex-direction: column;
    overflow: hidden; /* Prevent the container from scrolling */
}

#info-panel.open { 
    right: 0; 
    visibility: visible; 
    box-shadow: -20px 0 50px rgba(0,0,0,0.8);
}

/* Add this new rule for the inner content */
#panel-content {
flex: 1;
    overflow-y: auto !important; /* Allow the content to scroll */
    padding: 0 30px 100px 30px; /* Extra bottom padding for the mini-player clearance */
    -webkit-overflow-scrolling: touch;
    padding-bottom: 60px;     /* Extra space at the bottom of the scroll */
}


#sidebar {
    width: 280px;
    min-width: 80px; /* Minimum width when collapsed */
    max-width: 450px;
    background: #000;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #111;
    position: relative;
    transition: width 0.1s ease; /* Fast transition for dragging */
}

/* Draggable Divider */
#sidebar-resizer {
    width: 4px;
    cursor: col-resize;
    background: transparent;
    transition: background 0.2s;
    z-index: 10;
}
#sidebar-resizer:hover { background: var(--accent-green); }

/* Collapsed States */
#sidebar.collapsed { width: 80px !important; }
#sidebar.collapsed span, 
#sidebar.collapsed .catalogue-header,
#sidebar.collapsed #search-input { 
    display: none; 
}
#sidebar.collapsed .sidebar-item { justify-content: center; padding: 15px 0; }

#main-content {
    flex: 1;
}

        #search-input {
            width: calc(100% - 32px); 
            background: #111; 
            border: 1px solid #222;
            color: #fff; 
            padding: 12px; 
            border-radius: 8px; 
            margin: 16px;
            outline: none; 
            transition: 0.3s; 
            box-sizing: border-box;
        }
        #search-input:focus {
            border-color: var(--accent-green);
            box-shadow: 0 0 10px rgba(0, 255, 136, 0.2);
        }

        /* 5. GLOW & INTERACTION RESTORATION */
        .control-toggle, .social-link, #volume-icon-wrapper, #play-btn {
            cursor: pointer !important;
            transition: 0.2s ease;
        }

        .control-toggle:hover svg, #vol-svg:hover, .social-link:hover svg {
            color: var(--accent-green) !important;
            filter: var(--neon-glow);
            transform: scale(1.1);
        }

        .control-toggle.active svg {
            color: var(--accent-green) !important;
            filter: var(--neon-glow);
        }

        #play-btn:hover {
            background: var(--accent-green) !important;
            box-shadow: 0 0 20px rgba(0, 255, 136, 0.4);
            transform: scale(1.05);
        }

        /* 6. CATALOGUE HOVER FIX - Adjusted for Image 2 Alignment */
        .sidebar-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 15px; 
            cursor: pointer; 
            border-radius: 6px;
            margin: 2px 10px; 
            transition: 0.2s; 
            color: #b3b3b3;
            font-size: 13px;
            font-weight: 600;
        }
        .sidebar-item:hover {
            background: rgba(255,255,255,0.05);
            color: #fff;
        }
        .sidebar-item img {
            width: 32px;
            height: 32px;
            border-radius: 4px;
            object-fit: cover;
        }

        /* 7. TRACK ROW COLLISIONS */
        .track-row {
            display: flex; 
            padding: 12px 25px; 
            border-radius: 10px; 
            cursor: pointer; 
            align-items: center; 
            transition: all 0.2s ease; 
            border: 1px solid transparent;
            margin-bottom: 2px;
        }

        .track-row:hover {
            background: rgba(0, 255, 136, 0.04); 
            box-shadow: inset 0 0 15px rgba(0, 255, 136, 0.05), 0 0 10px rgba(0, 255, 136, 0.02);
            border-color: rgba(0, 255, 136, 0.1);
            transform: translateX(4px); 
        }

        .track-row.disabled {
            cursor: default;
            opacity: 0.5;
            filter: grayscale(1);
        }

        .track-index-col {
            width: 25px; 
            flex-shrink: 0; 
            font-weight: 900; 
            color: #444;
        }

        .album-view-header {
            display: flex; 
            gap: 40px; 
            align-items: flex-end; 
            margin-bottom: 40px;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--accent-green); }

        /* 8. ANIMATION SYSTEM */
        @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
        }

        .view-animate {
            animation: fadeInScale 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* 9. BUTTON & LINK RESTORATION */
        .signup-btn {
            display: inline-block;
            background: #00ff88;
            color: #000 !important;
            padding: 12px 24px;
            border-radius: 30px;
            font-weight: 800;
            font-size: 13px;
            text-decoration: none !important;
            letter-spacing: 1px;
            transition: 0.3s;
            margin-top: 15px;
        }

        .signup-btn:hover {
            background: #fff;
            box-shadow: 0 0 20px rgba(0, 255, 136, 0.4);
            transform: translateY(-2px);
        }

        .purchase-select {
            background: #111;
            color: #fff;
            border: 1px solid #333;
            padding: 10px 20px;
            border-radius: 8px;
            font-weight: 700;
            cursor: pointer;
            outline: none;
            margin-top: 15px;
        }

        .purchase-select:hover { border-color: #00ff88; }

        .social-link {
            color: #666; 
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.03);
            text-decoration: none;
        }

        .social-link:hover {
            color: #00ff88; 
            background: rgba(0, 255, 136, 0.1);
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 255, 136, 0.2);
        }

        #content-view {
            flex: 1;
            overflow-y: auto !important; 
            overflow-x: hidden;
            height: 100%; 
            background: linear-gradient(to bottom, #121212, #000);
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
            position: relative;
        }
    </style>
</head>
<body>

<div id="dashboard-wrapper">
    <a href="https://trm-brand-shop.fourthwall.com" class="exit-player-btn">✕ EXIT PLAYER</a>

    <div class="main-viewport">
        
        <div class="sidebar-container">
            <input type="text" id="search-input" placeholder="Search" oninput="performSearch(this.value)">
            <div id="sidebar-resizer"></div>
            <div class="sidebar-nav">
                <div class="sidebar-item" onclick="viewHome()">
                    <span class="material-icons">home</span><span>Home</span>
                </div>
                <div class="sidebar-item" onclick="viewRecents()">
                    <span class="material-icons">history</span><span>Recents</span>
                </div>
                <div class="sidebar-item" onclick="viewLikedSongs()">
                    <span class="material-icons" style="color:var(--accent-green);">favorite</span><span>Liked Songs</span>
                </div>
            </div>

            <div style="padding: 0 20px; font-size: 11px; font-weight: 900; color: #444; letter-spacing: 1px; margin-bottom: 10px;">CATALOGUE</div>
            <div id="sidebar-releases" style="flex: 1; overflow-y: auto;"></div>
        </div>

        <div id="content-view">
            <div style="padding: 40px; font-weight: 900; letter-spacing: 1px;">INITIALIZING TRM MUSIC PLAYER...</div>
        </div>

        <div id="info-panel">
            <div style="display:flex; justify-content: space-between; align-items: center; padding: 30px 30px 10px 30px;">
                <h3 id="panel-type" style="margin:0; font-weight:900; color:#00ff88; font-size:12px; letter-spacing:2px;">LYRICS & INFO</h3>
                <button onclick="togglePanel()" style="background:none; border:none; color:#666; cursor:pointer; font-size:24px;">&times;</button>
            </div>
            <div id="panel-content" style="flex: 1; overflow-y: auto; padding: 0 30px 30px 30px;"></div>
        </div>

    </div> <div id="mini-player">
        <div style="width: 30%; display: flex; align-items: center; gap: 15px;">
            <img id="player-art" src="" style="width: 56px; height: 56px; border-radius: 4px; display: none; object-fit: cover;">
            <div style="overflow: hidden; flex: 1;">
                <div id="player-title" style="font-weight: 700; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Select a track</div>
                <div id="player-artist" style="font-size: 12px; color: #b3b3b3; cursor: pointer;"></div>
            </div>
            <div id="player-like-btn" onclick="handleLikeClick()" style="cursor:pointer; color:#666; transition: 0.2s; padding-right: 10px;">
                <span class="material-icons" id="main-heart-icon" style="font-size: 20px;">favorite_border</span>
            </div>
        </div>
        
        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 24px;">
                <div id="shuffle-btn" class="control-toggle" onclick="toggleShuffle()">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg>
                </div>
                <div class="control-toggle" onclick="prevTrack()">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                </div>
                <button onclick="togglePlay()" id="play-btn" style="background: #fff; border: none; width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                    <svg id="play-icon" viewBox="0 0 24 24" width="20" height="20" fill="black"><path d="M8 5v14l11-7z"/></svg>
                </button>
                <div class="control-toggle" onclick="nextTrack()">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                </div>
                <div id="loop-btn" class="control-toggle" onclick="toggleLoop()">
                    <svg id="loop-svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>
                </div>
            </div>
            <div style="width: 100%; max-width: 480px; display: flex; align-items: center; gap: 10px;">
                <span id="current-time" style="font-size: 11px; color: #666; width: 35px; text-align: right;">0:00</span>
                <div id="progress-container" onclick="seek(event)" style="flex: 1; height: 4px; background: #333; border-radius: 2px; cursor: pointer;">
                    <div id="progress-bar" style="width: 0%; height: 100%; background: #00ff88; border-radius: 2px;"></div>
                </div>
                <span id="total-duration" style="font-size: 11px; color: #666; width: 35px;">0:00</span>
            </div>
        </div>

        <div style="width: 30%; display: flex; justify-content: flex-end; align-items: center; gap: 20px;">
            <div class="control-toggle" onclick="togglePanel()">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
            </div>
            <div id="volume-icon-wrapper" onclick="toggleMute()" style="color:#666;">
                <svg id="vol-svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
            </div>
            <input id="volume-slider" type="range" min="0" max="1" step="0.01" value="0.5" oninput="updateVolume(this.value)" style="width: 80px; accent-color: #00ff88;">
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
    // 1. Declare variables globally so they are accessible
    let supabaseClient;
    window.ALBUMS = [];
    window.TRACKS = {};
    window.ARTISTS = {};
    let currentTrackId = null;
    let currentArtistId = null;
    let isShuffle = false;
    let isRepeat = false;
    const audio = new Audio();
    const contentView = document.getElementById('content-view');

let isSidebarCollapsed = localStorage.getItem('trm_sidebar_collapsed') === 'true';

const audio = new Audio();
audio.preload = "auto"; 
audio.volume = 0.5;

const supabaseUrl = 'https://sxagulxljpzftqfnllhv.supabase.co';
const supabaseKey = 'sb_publishable_GG1VzWph8ZCK2hCyZugMfA_qR6LZcRn';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

window.onload = () => {
        if (typeof supabase === 'undefined') {
            console.error("Supabase failed to load. Check if an ad-blocker is blocking the CDN.");
            document.getElementById('content-view').innerHTML = 
                '<div class="standard-padding">Connection Error: Please disable ad-blockers for TRM Records.</div>';
            return;
        }
        
        const S_URL = 'https://sxagulxljpzftqfnllhv.supabase.co';
        const S_KEY = 'sb_publishable_GG1VzWph8ZCK2hCyZugMfA_qR6LZcRn';
        supabaseClient = supabase.createClient(S_URL, S_KEY);
        
        init(); // Only run init after client is created
    };

    const STORAGE = {
        getLikes: () => JSON.parse(localStorage.getItem('trm_likes') || '[]'),
        getRecent: () => JSON.parse(localStorage.getItem('trm_recent') || '[]'),
        toggleLike: (id) => {
            let likes = STORAGE.getLikes();
            likes = likes.includes(id) ? likes.filter(x => x !== id) : [...likes, id];
            localStorage.setItem('trm_likes', JSON.stringify(likes));
            return likes.includes(id);
        },
        addRecent: (id) => {
            let recent = STORAGE.getRecent().filter(x => x !== id);
            recent.unshift(id);
            localStorage.setItem('trm_recent', JSON.stringify(recent.slice(0, 20)));
        }
    };
// --- 2. PLAYER & UI LOGIC ---

function formatTime(secs) {
    if (isNaN(secs) || secs === Infinity) return "0:00";
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
}

audio.onloadedmetadata = () => {
    const totalT = document.getElementById('total-duration');
    if (totalT) totalT.innerText = formatTime(audio.duration);
};

audio.ontimeupdate = () => {
    const progressBar = document.getElementById('progress-bar');
    const currentT = document.getElementById('current-time');
    if (audio.duration) {
        const pct = (audio.currentTime / audio.duration) * 100;
        if (progressBar) progressBar.style.width = pct + "%";
        if (currentT) currentT.innerText = formatTime(audio.currentTime);
    }
};

window.performSearch = function(query) {
    if (!query) { window.viewHome(); return; }
    const q = query.toLowerCase();
    
    // Filter Data
const albumResults = window.ALBUMS.filter(a => a.name.toLowerCase().includes(q) && !a.hidden);
    const artistResults = Object.values(window.ARTISTS).filter(art => art.name.toLowerCase().includes(q));
    const allTracks = Object.values(window.TRACKS).flat();
    const trackResults = Array.from(new Map(allTracks.map(t => [t.id, t])).values())
                              .filter(t => t.title.toLowerCase().includes(q));

    document.getElementById('content-view').innerHTML = `
    <div class="view-animate" style="padding:50px;">
        <h1 style="font-size:32px; font-weight:900; margin-bottom:40px;">Results for "${query}"</h1>
        
        ${artistResults.length ? `
            <section style="margin-bottom:40px;">
                <h3 style="color:#666; font-size:12px; letter-spacing:1px; margin-bottom:15px;">ARTISTS</h3>
                ${artistResults.map(art => `
                    <div onclick="viewArtist('${art.id}')" style="display:flex; align-items:center; gap:15px; cursor:pointer; padding:10px; border-radius:8px;" class="track-row">
                        <div style="width:50px; height:50px; border-radius:50%; background:#222; display:flex; align-items:center; justify-content:center; font-weight:900;">${art.name[0]}</div>
                        <div style="font-weight:700;">${art.name}</div>
                    </div>
                `).join('')}
            </section>
        ` : ''}

        ${albumResults.length ? `
            <section style="margin-bottom:40px;">
                <h3 style="color:#666; font-size:12px; letter-spacing:1px; margin-bottom:15px;">ALBUMS</h3>
                <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap:20px;">
                    ${albumResults.map(alb => `
                        <div onclick="viewAlbum('${alb.id}')" class="glow-card" style="padding:15px; background:#111; border-radius:10px; cursor:pointer;">
                            <img src="${alb.art_url}" style="width:100%; aspect-ratio:1; border-radius:5px; margin-bottom:10px;">
                            <div style="font-weight:700;">${alb.name}</div>
                        </div>
                    `).join('')}
                </div>
            </section>
        ` : ''}

        <section>
            <h3 style="color:#666; font-size:12px; letter-spacing:1px; margin-bottom:15px;">SONGS</h3>
            ${trackResults.map((t, i) => renderTrackRow(t, i)).join('')}
        </section>
    </div>`;
};

window.seek = function(e) {
    if (!audio.duration) return;
    const container = document.getElementById('progress-container');
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    audio.currentTime = (x / rect.width) * audio.duration;
};

window.togglePlay = function() {
    if (!audio.src || audio.src === window.location.href) return;
    if (audio.paused) {
        audio.play().then(() => { window.isPlaying = true; updatePlayerUI(); }).catch(e => console.error("Playback failed:", e));
    } else {
        audio.pause();
        window.isPlaying = false;
        updatePlayerUI();
    }
};

// --- UPDATED INFO PANEL (SINGLE DEFINITION) ---
window.updateInfoPanel = function(track, album) {
    const content = document.getElementById('panel-content');
    if (!content) return;

    const safeTrack = track || {};
    const safeAlbum = album || {};
    
    // Safety check for artist data
    const artistKey = safeTrack.artist_id || safeAlbum.artist_id;
    const artistObj = (window.ARTISTS && artistKey && window.ARTISTS[artistKey]) ? window.ARTISTS[artistKey] : { name: "therichmusic" };
    
    content.innerHTML = `
        <img src="${safeAlbum.art_url || ''}" style="width:100%; border-radius:12px; margin-bottom:20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <h2 style="margin:0; font-size: 24px; font-weight: 900;">${safeTrack.title || 'Unknown Track'}</h2>
        <p style="color:var(--accent-green); cursor:pointer; font-weight: 700; margin-top: 5px;" onclick="viewArtist('${artistObj.id || ''}')">${artistObj.name}</p>
        
        <h3 style="font-size:12px; color:#666; letter-spacing:1px; margin-top:32px; margin-bottom:12px; font-weight: 900;">LYRICS</h3>
        <div style="color:#b3b3b3; font-size:16px; line-height:1.8; white-space:pre-wrap; margin-bottom:40px;">${safeTrack.lyrics || 'No lyrics available.'}</div>
        
        <h3 style="font-size:12px; color:#666; letter-spacing:1px; margin-bottom:12px; font-weight: 900;">CREDITS</h3>
        <div style="color:#888; font-size:13px; line-height:1.6; padding-bottom: 180px;">${safeTrack.credits || 'No credits listed.'}</div>
    `;
};

// --- UPDATED PLAY FUNCTION ---
window.playTrack = function(id, autoPlay = true, explicitAlbumId = null) {
    const allTracks = Object.values(window.TRACKS).flat();
    const track = allTracks.find(t => t.id === id);
    if (!track) return;

    const albId = explicitAlbumId || track.album_id.split(',')[0].trim();
    const album = window.ALBUMS.find(a => a.id === albId);
    
    const artistId = track.artist_id || album?.artist_id;
    const artist = window.ARTISTS[artistId] || { name: "therichmusic" };

    window.currentTrackId = id;
    window.currentAlbumId = albId;
    
    if (audio.src !== track.url) {
        audio.src = track.url; 
        audio.load();
    }

    // Update Bottom Player UI
    const artImg = document.getElementById('player-art');
    if(artImg) {
        artImg.src = album?.art_url || '';
        artImg.style.display = 'block';
    }
    
    const titleEl = document.getElementById('player-title');
    if(titleEl) titleEl.innerText = track.title;
    
    const pArtist = document.getElementById('player-artist');
    if(pArtist) {
        pArtist.innerText = artist.name; 
        pArtist.onclick = () => viewArtist(artist.id);
    }

    // Refresh Panel and Metadata
    window.updateInfoPanel(track, album);
    window.updateLikeButtonUI(id);
    window.onload.saveRecent(id);
    localStorage.setItem('trm_last_track', id);

    if (autoPlay) {
        audio.play().then(() => { 
            window.isPlaying = true; 
            updatePlayerUI(); 
        }).catch(e => console.warn("Auto-play blocked by browser. User must click play."));
    }
};

// --- RESTORED ARTIST VIEW ---
window.viewArtist = function(artistId) {
    // Pull the full artist object from our global state
    const artist = window.ARTISTS[artistId] || { 
        name: "therichmusic", 
        bio: "No biography.", 
        verified: false,
        banner_url: "" // Fallback if no banner exists
    };
    
    const artistAlbums = window.ALBUMS.filter(a => a.artist_id === artistId);

    document.getElementById('content-view').innerHTML = `
    <div class="view-animate">
        <div style="position: relative; height: 400px; width: 100%; display: flex; align-items: flex-end; padding: 50px; box-sizing: border-box; overflow: hidden;">
            <div style="position: absolute; inset: 0; background: url('${artist.banner_url || 'https://via.placeholder.com/1200x400/111/111'}') center/cover no-repeat; z-index: 1;"></div>
            <div style="position: absolute; inset: 0; background: linear-gradient(to top, #000 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%); z-index: 2;"></div>
            
            <div style="position: relative; z-index: 3; width: 100%;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                    ${artist.verified ? `
                        <div style="display: flex; align-items: center; gap: 6px; background: #0070f3; color: white; padding: 6px 14px; border-radius: 4px; font-size: 11px; font-weight: 900; letter-spacing: 1px; box-shadow: 0 4px 15px rgba(0, 112, 243, 0.3);">
                            <span class="material-icons" style="font-size: 14px;">verified</span> VERIFIED ARTIST
                        </div>
                    ` : ''}
                </div>
                <h1 style="font-size: 96px; font-weight: 900; margin: 0; letter-spacing: -5px; line-height: 0.9; text-transform: uppercase;">
                    ${artist.name}
                </h1>
            </div>
        </div>

        <div style="padding: 40px 50px;">
            <div style="display: flex; gap: 60px; align-items: flex-start;">
                <div style="flex: 2;">
                    <h2 style="font-size: 24px; font-weight: 900; margin-bottom: 25px; letter-spacing: -0.5px; border-bottom: 1px solid #222; padding-bottom: 15px;">Discography</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 25px;">
                        ${artistAlbums.length > 0 ? artistAlbums.map(alb => `
                            <div class="glow-card" onclick="viewAlbum('${alb.id}')" style="cursor:pointer; background: rgba(255,255,255,0.02); padding:15px; border-radius:12px; border: 1px solid rgba(255,255,255,0.05);">
                                <img src="${alb.art_url}" style="width:100%; aspect-ratio:1; border-radius:8px; margin-bottom:12px; box-shadow: 0 8px 20px rgba(0,0,0,0.5);">
                                <div style="font-weight:700; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${alb.name}</div>
                                <div style="color: #666; font-size: 11px; margin-top: 4px; font-weight: 800; letter-spacing: 0.5px;">${(alb.type || 'Album').toUpperCase()}</div>
                            </div>
                        `).join('') : '<p style="color:#444;">No releases found.</p>'}
                    </div>
                </div>

                <div style="flex: 1; background: rgba(255,255,255,0.03); padding: 30px; border-radius: 15px; border: 1px solid #111;">
                    <h3 style="font-size: 12px; color: #666; letter-spacing: 2px; margin-bottom: 15px; font-weight: 900;">ABOUT THE ARTIST</h3>
                    <p style="color: #b3b3b3; line-height: 1.8; font-size: 14px; margin: 0;">
                        ${artist.bio || 'No biography set.'}
                    </p>
                </div>
            </div>
        </div>
    </div>`;
};

window.updateLikeButtonUI = function(trackId) {
    const icon = document.getElementById('main-heart-icon');
    if (!icon) return;
    const isLiked = window.onload.getLikes().includes(trackId);
    icon.innerText = isLiked ? 'favorite' : 'favorite_border';
    icon.parentElement.style.color = isLiked ? 'var(--accent-green)' : '#666';
};

window.handleLikeClick = function() {
    if (!window.currentTrackId) return;
    window.onload.toggleLike(window.currentTrackId);
    window.updateLikeButtonUI(window.currentTrackId);
    
    // Refresh view if on Liked Songs page
    const title = document.querySelector('#content-view h1');
    if (title && title.innerText === 'Liked Songs') window.viewLikedSongs();
};

window.viewLikedSongs = function() {
    const likedIds = window.onload.getLikes();
    const allTracks = Object.values(window.TRACKS).flat();
    // Unique tracks only (since tracks can belong to multiple albums)
    const uniqueTracks = Array.from(new Map(allTracks.map(t => [t.id, t])).values());
    const likedTracks = uniqueTracks.filter(t => likedIds.includes(t.id));

    document.getElementById('content-view').innerHTML = `
    <div class="view-animate" style="padding:50px;">
        <h1 style="font-size:48px; margin-bottom:30px; font-weight:900;">Liked Songs</h1>
        <div style="margin-top:20px;">
            ${likedTracks.length ? likedTracks.map((t, i) => renderTrackRow(t, i)).join('') : '<p style="color:#666;">No liked songs yet.</p>'}
        </div>
    </div>`;
};

function renderTrackRow(t, i) {
    const parentAlbumIds = t.album_id.split(',').map(s => s.trim());
    const isPlayable = parentAlbumIds.some(aid => {
        const alb = window.ALBUMS.find(a => a.id === aid);
        return alb && !alb.coming_soon;
    });

    return `
    <div class="track-row ${isPlayable ? '' : 'disabled'}" 
         style="display:flex; align-items:center; padding:10px; border-radius:4px; ${isPlayable ? '' : 'opacity:0.3; pointer-events:none;'}"
         onclick="playTrack('${t.id}')">
        <div style="width:30px; color:#666;">${i + 1}</div>
        <div style="flex:1; font-weight:700;">${t.title}</div>
        <div style="color:#666;">${t.duration || '0:00'}</div>
    </div>`;
}

window.viewRecents = function() {
    const recentIds = window.onload.getRecents();
    const allTracks = Object.values(window.TRACKS).flat();
    const uniqueTracks = Array.from(new Map(allTracks.map(t => [t.id, t])).values());
    
    // Maintain the order of the recents array
    const recentTracks = recentIds.map(id => uniqueTracks.find(t => t.id === id)).filter(Boolean);

    document.getElementById('content-view').innerHTML = `
    <div class="view-animate" style="padding:50px;">
        <h1 style="font-size:48px; margin-bottom:30px; font-weight:900;">Recently Played</h1>
        <div style="margin-top:20px;">
            ${recentTracks.length ? recentTracks.map((t, i) => renderTrackRow(t, i)).join('') : '<p style="color:#666;">Your history is empty.</p>'}
        </div>
    </div>`;
};

// --- 3. VOLUME & NAVIGATION ---

window.updateVolume = (val) => {
    audio.volume = val;
    if (val > 0) window.preMuteVolume = val;
    updateVolumeIcon(val);
};

window.toggleMute = function() {
    const slider = document.getElementById('volume-slider');
    if (audio.volume > 0) {
        window.preMuteVolume = audio.volume;
        audio.volume = 0;
        if (slider) slider.value = 0;
    } else {
        audio.volume = window.preMuteVolume || 0.5;
        if (slider) slider.value = audio.volume;
    }
    updateVolumeIcon(audio.volume);
};

function updateVolumeIcon(vol) {
    const volIcon = document.getElementById('vol-svg');
    if (!volIcon) return;
    volIcon.innerHTML = vol == 0 ? 
        '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>' : 
        '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>';
}

window.viewHome = function() {
    const featured = window.ALBUMS.find(a => a.is_featured && !a.hidden) || window.ALBUMS.find(a => !a.hidden);
    
    // Filter out hidden albums from the main catalogue
    const publicCatalogue = window.ALBUMS.filter(alb => !alb.hidden).sort((a, b) => {
        const parseDate = (str) => {
            if (!str) return 0;
            const clean = str.replace(/st|nd|rd|th/g, ""); 
            return new Date(clean).getTime();
        };
        return parseDate(b.full_release_date) - parseDate(a.full_release_date);
    });

    document.getElementById('content-view').innerHTML = `
    <div class="view-animate" style="padding: 40px;">
        ${featured ? `
        <div onclick="viewAlbum('${featured.id}')" style="position:relative; height:320px; border-radius:15px; overflow:hidden; margin-bottom:40px; cursor:pointer; display:flex; align-items:center; padding:0 60px;">
            <div style="position:absolute; inset:0; background:url('${featured.art_url}') center/cover; filter:blur(40px) brightness(0.3); z-index:1;"></div>
            <div style="position:relative; z-index:2; display:flex; gap:40px; align-items:center;">
                <img src="${featured.art_url}" style="width:220px; height:220px; border-radius:12px; box-shadow:0 20px 50px rgba(0,0,0,0.8);">
                <div>
                    <span style="background:var(--accent-green); color:#000; padding:5px 12px; font-size:11px; font-weight:900; border-radius:4px; letter-spacing:1px;">FEATURED RELEASE</span>
                    <h1 style="font-size:72px; margin:15px 0; font-weight:900; letter-spacing:-3px;">${featured.name}</h1>
                    <button class="signup-btn">View Album</button>
                </div>
            </div>
        </div>
        ` : ''}

        <h2 style="margin-bottom:24px; font-size: 24px; font-weight: 900;">Catalogue</h2>
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap:30px;">
            ${publicCatalogue.map(alb => `
                <div class="glow-card" onclick="viewAlbum('${alb.id}')" style="cursor:pointer; background:#0a0a0a; padding:20px; border-radius:12px;">
                    <img src="${alb.art_url}" style="width:100%; aspect-ratio:1; border-radius:8px; margin-bottom:16px; ${alb.coming_soon ? 'filter:grayscale(1); opacity:0.5;' : ''}">
                    <div style="font-weight:700;">${alb.name}</div>
                    <div style="color:${alb.coming_soon ? '#ff4444' : '#666'}; font-size:12px; margin-top:5px; font-weight: 700;">
                        ${alb.coming_soon ? 'COMING SOON' : (alb.full_release_date || 'RELEASED')}
                    </div>
                </div>
            `).join('')}
        </div>
    </div>`;
};

function initSidebarLogic() {
    const sidebar = document.getElementById('sidebar');
    const resizer = document.getElementById('sidebar-resizer');
    
    if (!sidebar || !resizer) return;

    let isResizing = false;

    // Apply initial state from localStorage immediately
    if (isSidebarCollapsed) {
        sidebar.classList.add('collapsed');
        sidebar.style.width = '80px';
    } else {
        const savedWidth = localStorage.getItem('trm_sidebar_width');
        if (savedWidth) sidebar.style.width = savedWidth;
    }

    resizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        document.body.style.cursor = 'col-resize';
        sidebar.style.transition = 'none'; // Disable transition while dragging for smoothness
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        
        let newWidth = e.clientX;
        
        // Snapping logic
        if (newWidth < 150) {
            newWidth = 80;
            sidebar.classList.add('collapsed');
            isSidebarCollapsed = true;
        } else {
            sidebar.classList.remove('collapsed');
            isSidebarCollapsed = false;
        }
        
        if (newWidth > 450) newWidth = 450;
        
        sidebar.style.width = newWidth + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (!isResizing) return;
        isResizing = false;
        document.body.style.cursor = 'default';
        sidebar.style.transition = 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'; // Restore transition
        
        // Save states
        localStorage.setItem('trm_sidebar_width', sidebar.style.width);
        localStorage.setItem('trm_sidebar_collapsed', isSidebarCollapsed);
    });
}

window.toggleSidebar = function() {
    const sb = document.getElementById('sidebar');
    if (!sb) return;
    
    isSidebarCollapsed = !isSidebarCollapsed;
    if (isSidebarCollapsed) {
        sb.classList.add('collapsed');
        sb.style.width = '80px';
    } else {
        sb.classList.remove('collapsed');
        const savedWidth = localStorage.getItem('trm_sidebar_width');
        sb.style.width = (savedWidth && savedWidth !== '80px') ? savedWidth : '280px';
    }
    localStorage.setItem('trm_sidebar_collapsed', isSidebarCollapsed);
};

window.viewAlbum = function(id) {
    const alb = window.ALBUMS.find(a => a.id === id);
    if (!alb) return;
    
    const artist = window.ARTISTS[alb.artist_id] || { name: "therichmusic", id: "" };
    const tks = window.TRACKS[id] || [];
    const isSingle = alb.type === 'Single' || tks.length === 1;
    
    document.getElementById('content-view').innerHTML = `
    <div class="view-animate" style="padding:50px;">
        <div style="display:flex; gap:30px; align-items:flex-end; margin-bottom:30px;">
            <img src="${alb.art_url}" style="width:240px; height:240px; border-radius:12px; box-shadow: 0 15px 50px rgba(0,0,0,0.6);">
            <div>
                <p style="color:var(--accent-green); font-weight:900; letter-spacing:1px; margin-bottom:8px;">${(alb.type || 'ALBUM').toUpperCase()}</p>
                
                <div style="display:flex; align-items:center; gap:20px;">
                    <h1 style="font-size:84px; margin:0; font-weight:900; letter-spacing:-4px; line-height:1;">
                        ${alb.name}
                        ${alb.hidden ? '<span class="material-icons" style="font-size:24px; color:#ff4444; vertical-align:middle; margin-left:10px;" title="Unlisted Release">visibility_off</span>' : ''}
                    </h1>
                    <button onclick="copyAlbumLink('${alb.id}')" id="share-btn" style="background:rgba(255,255,255,0.1); border:none; color:white; width:45px; height:45px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:0.2s;">
                        <span class="material-icons" style="font-size:20px;">share</span>
                    </button>
                </div>

                <div style="display:flex; align-items:center; gap:8px; margin-top:20px;">
                    <span onclick="viewArtist('${artist.id}')" style="cursor:pointer; text-decoration:underline; font-weight:700;">${artist.name}</span> 
                    <span style="color:#666;">•</span>
                    <span style="color:#666;">${tks.length} ${tks.length === 1 ? 'Song' : 'Songs'}</span>
                </div>
            </div>
        </div>

        <div style="margin-top:40px;">
            ${tks.map((t, i) => {
                // RULE: Playable if ANY album it belongs to is NOT "coming soon"
                const parentAlbumIds = t.album_id.split(',').map(s => s.trim());
                const isPlayable = parentAlbumIds.some(aid => {
                    const otherAlb = window.ALBUMS.find(a => a.id === aid);
                    return otherAlb && !otherAlb.coming_soon;
                });

                // RULE: Metadata track_order for 2+ songs, else #1
                const trackIndex = isSingle ? 1 : (t.track_order || (i + 1));
                
                // RULE: Mask title if hidden
                const displayTitle = isPlayable ? t.title : `Track ${trackIndex}`;
                
                return `
                <div class="track-row ${isPlayable ? '' : 'disabled'}" 
                     style="display:flex; align-items:center; padding:10px; border-radius:4px; ${isPlayable ? '' : 'opacity:0.3; cursor:default; pointer-events:none;'}"
                     onclick="${isPlayable ? `playTrack('${t.id}', true, '${alb.id}')` : ''}">
                    <div style="width:30px; color:#666;">${trackIndex}</div>
                    <div style="flex:1; font-weight:700;">${displayTitle}</div>
                    <div style="color:#666;">${isPlayable ? (t.duration || '0:00') : '??:??'}</div>
                </div>`;
            }).join('')}
        </div>
    </div>`;
};

window.copyAlbumLink = function(albumId) {
    // Construct the URL with the parameter
    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?album=${albumId}`;

    // Use the Clipboard API
    navigator.clipboard.writeText(shareUrl).then(() => {
        const btn = document.getElementById('share-btn');
        const icon = btn.querySelector('.material-icons');
        
        // Visual Feedback
        const originalIcon = icon.innerText;
        icon.innerText = 'check';
        btn.style.background = 'var(--accent-green)';
        btn.style.color = '#000';

        setTimeout(() => {
            icon.innerText = originalIcon;
            btn.style.background = 'rgba(255,255,255,0.1)';
            btn.style.color = 'white';
        }, 2000);
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
};

window.nextTrack = function() {
    if (!window.currentTrackId || !window.TRACKS[window.currentAlbumId]) return;
    const tracks = window.TRACKS[window.currentAlbumId];
    const idx = tracks.findIndex(t => t.id === window.currentTrackId);
    
    let nextIdx = idx + 1;
    if (window.isShuffle) nextIdx = Math.floor(Math.random() * tracks.length);

    if (nextIdx < tracks.length) {
        const nextTrack = tracks[nextIdx];
        // Check if playable before trying to play
        const isPlayable = nextTrack.album_id.split(',').some(aid => {
            const alb = window.ALBUMS.find(a => a.id === aid.trim());
            return alb && !alb.coming_soon;
        });

        if (isPlayable) {
            window.playTrack(nextTrack.id);
        } else {
            // Recursively find the next playable one
            window.currentTrackId = nextTrack.id;
            window.nextTrack();
        }
    }
};

window.prevTrack = function() {
    if (audio.currentTime > 3) { audio.currentTime = 0; return; }
    const tracks = window.TRACKS[window.currentAlbumId];
    if (!tracks) return;
    const idx = tracks.findIndex(t => t.id === window.currentTrackId);
    if (idx > 0) window.playTrack(tracks[idx - 1].id);
};

window.toggleShuffle = () => { window.isShuffle = !window.isShuffle; document.getElementById('shuffle-btn').classList.toggle('active', window.isShuffle); };
window.toggleLoop = () => { window.loopState = (window.loopState + 1) % 3; document.getElementById('loop-btn').style.color = window.loopState === 0 ? '' : 'var(--accent-green)'; };
window.togglePanel = function() {
    const panel = document.getElementById('info-panel');
    if (panel) panel.classList.toggle('open');
};

function updatePlayerUI() {
    const icon = document.getElementById('play-icon');
    if (icon) icon.innerHTML = window.isPlaying ? '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>' : '<path d="M8 5v14l11-7z"/>';
}

async function initApp() {
    try {
        const { data: artists } = await supabaseClient.from('artists').select('*');
        window.ARTISTS = {};
        if (artists) artists.forEach(a => { window.ARTISTS[a.id] = a; });

        const { data: albums } = await supabaseClient.from('albums').select('*');
        const { data: tracks } = await supabaseClient.from('tracks').select('*');
    
        window.ALBUMS = albums || [];
        window.TRACKS = {};

        if (tracks) {
            tracks.forEach(t => { 
                const albumIds = t.album_id.split(',').map(id => id.trim());
                albumIds.forEach(aid => {
                    if (!window.TRACKS[aid]) window.TRACKS[aid] = [];
                    window.TRACKS[aid].push({ ...t });
                });
            });
            Object.keys(window.TRACKS).forEach(aid => {
                window.TRACKS[aid].sort((a, b) => (a.track_order || 0) - (b.track_order || 0));
            });
        }

const sb = document.getElementById('sidebar-releases');
if (sb) {
    // Only show albums in sidebar if NOT hidden
    sb.innerHTML = window.ALBUMS.filter(alb => !alb.hidden).map(alb => `
        <div class="sidebar-item" onclick="viewAlbum('${alb.id}')">
            <img src="${alb.art_url}" style="width:24px; height:24px; border-radius:2px; margin-right:10px;">
            <span>${alb.name}</span>
        </div>`).join('');
}
        
        // CRITICAL: Initialize the dragging logic AFTER elements exist
        initSidebarLogic();
        
        window.viewHome();

        // Set the initial home view
        window.viewHome();
        
        // Ensure data is ready before checking URL
        if (window.ALBUMS.length > 0) {
            window.handleDeepLinking(); 
        }
        
        const lastId = localStorage.getItem('trm_last_track');
        if (lastId) {
            const allTracks = Object.values(window.TRACKS).flat();
            if (allTracks.some(t => t.id === lastId)) window.playTrack(lastId, false); 
        }
    } catch (e) { console.error("Initialization failed:", e); }
}

window.handleDeepLinking = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const albumId = urlParams.get('album');

    if (albumId) {
        window.viewAlbum(albumId);
        // Optional: Clean URL without refreshing page
        window.history.replaceState({}, document.title, window.location.pathname);
    }
};

audio.onended = () => (window.loopState === 2) ? (audio.currentTime = 0, audio.play()) : window.nextTrack();
document.addEventListener('DOMContentLoaded', initApp);
</script>

console.log("v1.0");
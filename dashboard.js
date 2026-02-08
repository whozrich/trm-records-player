<!DOCTYPE html>
<html lang="en">
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TRM Music Player</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        
        :root {
            --header-height: 56px; 
            --accent-green: #00ff88;
            --neon-glow: drop-shadow(0 0 8px rgba(0, 255, 136, 0.6));
        }

        /* 1. LAYOUT & STACKING */
        body { 
            margin: 0; background: #000; color: #fff; 
            font-family: 'Inter', sans-serif; overflow: hidden;
        }

        #dashboard-wrapper {
            height: 100vh; display: flex; flex-direction: column;
        }

        /* 2. THE PLAYER (KING OF Z-INDEX) */
        #mini-player {
            height: 100px; background: #050505; border-top: 1px solid #111;
            display: flex; align-items: center; padding: 0 25px; gap: 30px;
            position: relative;
            z-index: 10000 !important; /* Above EVERYTHING */
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

        /* 3. THE SLIDE-OUT PANEL */
        #info-panel {
            position: fixed; right: -450px; top: 0; width: 350px; height: calc(100vh - 100px);
            background: rgba(8, 8, 8, 0.98); backdrop-filter: blur(15px);
            border-left: 1px solid #222;
            z-index: 999; /* Below the player bar */
            transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            visibility: hidden; padding: 30px;
        }
        #info-panel.open { right: 0; visibility: visible; }

        /* 4. SIDEBAR & SEARCH FIX */
        .sidebar-container {
            width: 240px; background: #000; border-right: 1px solid #111;
            display: flex; flex-direction: column; flex-shrink: 0;
        }

        #search-input {
            width: calc(100% - 32px); background: #111; border: 1px solid #222;
            color: #fff; padding: 12px; border-radius: 8px; margin: 16px;
            outline: none; transition: 0.3s; box-sizing: border-box;
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

        /* Restore Hover Glows */
        .control-toggle:hover svg, #vol-svg:hover, .social-link:hover svg {
            color: var(--accent-green) !important;
            filter: var(--neon-glow);
            transform: scale(1.1);
        }

        /* Active State for Shuffle/Loop */
        .control-toggle.active svg {
            color: var(--accent-green) !important;
            filter: var(--neon-glow);
        }

        #play-btn:hover {
            background: var(--accent-green) !important;
            box-shadow: 0 0 20px rgba(0, 255, 136, 0.4);
            transform: scale(1.05);
        }

        /* 6. CATALOGUE HOVER FIX */
        .sidebar-item {
            padding: 10px 20px; cursor: pointer; border-radius: 6px;
            margin: 2px 10px; transition: 0.2s; color: #b3b3b3;
        }
        .sidebar-item:hover {
            background: rgba(255,255,255,0.05);
            color: #fff;
        }

        /* 7. TRACK ROW COLLISIONS */
/* TRACK ROW HOVER GLOW */
.track-row {
    display: flex; 
    padding: 12px 25px; 
    border-radius: 10px; 
    cursor: pointer; 
    align-items: center; 
    transition: all 0.2s ease; /* Smooth transition for the glow */
    border: 1px solid transparent;
    margin-bottom: 2px;
}

.track-row:hover {
    background: rgba(0, 255, 136, 0.04); /* Very faint green tint */
    box-shadow: inset 0 0 15px rgba(0, 255, 136, 0.05), 0 0 10px rgba(0, 255, 136, 0.02);
    border-color: rgba(0, 255, 136, 0.1);
    transform: translateX(4px); /* Subtle shift to the right */
}

/* Ensure the disabled (Coming Soon) tracks don't glow */
.track-row.disabled {
    cursor: default;
    opacity: 0.5;
    filter: grayscale(1);
}

.track-row.disabled:hover {
    background: transparent;
    box-shadow: none;
    transform: none;
    border-color: transparent;
}

        .track-index-col {
            width: 25px; flex-shrink: 0; font-weight: 900; color: #444;
        }

        /* Album Art Fix */
        .album-view-header {
            display: flex; gap: 40px; align-items: flex-end; margin-bottom: 40px;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 10px; }

        /* 1. ANIMATION SYSTEM */
    @keyframes fadeInScale {
        from { opacity: 0; transform: scale(0.98); }
        to { opacity: 1; transform: scale(1); }
    }

    .view-animate {
        animation: fadeInScale 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    /* 2. BUTTON & LINK RESTORATION */
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

    .purchase-select:hover {
        border-color: #00ff88;
    }

    /* 3. SIDEBAR HOVER RESTORATION */
    .sidebar-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 15px;
        cursor: pointer;
        border-radius: 8px;
        transition: 0.2s;
        color: #b3b3b3;
    }

    .sidebar-item:hover {
        background: rgba(255, 255, 255, 0.05);
        color: #fff;
    }

    .sidebar-item img {
        width: 32px;
        height: 32px;
        border-radius: 4px;
    }

    .social-link {
    color: #666; /* Default gray */
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
    color: #00ff88; /* Glow green on hover */
    background: rgba(0, 255, 136, 0.1);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 255, 136, 0.2);
}

.social-link svg {
    fill: currentColor;
}
    </style>
</head>
<body>

<div id="dashboard-wrapper">
    <div style="display: flex; flex: 1; overflow: hidden;">
        <div class="sidebar-container">
            <div id="sidebar-nav" style="padding: 20px 10px;">
                <div class="sidebar-item" onclick="viewHome()">Home</div>
            </div>
            <input type="text" id="search-input" placeholder="Search everything..." onkeyup="handleGlobalSearch(this.value)">
            <div style="padding: 10px 20px; color: #444; font-size: 11px; font-weight: 800; letter-spacing: 1.5px;">CATALOGUE</div>
            <div id="sidebar-releases" style="flex: 1; overflow-y: auto; padding-bottom: 20px;">
                </div>
        </div>

        <div id="content-view" style="flex: 1; overflow-y: auto; background: linear-gradient(to bottom, #121212, #000); scroll-behavior: smooth;">
            <div style="padding: 40px;">Initializing TRM...</div>
        </div>

        <div id="info-panel">
            <div style="display:flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <h3 id="panel-type" style="margin:0; font-weight:900; color:#00ff88; font-size:12px; letter-spacing:2px;">LYRICS & INFO</h3>
                <button onclick="togglePanel()" style="background:none; border:none; color:#666; cursor:pointer; font-size:24px;">&times;</button>
            </div>
            <div id="panel-content"></div>
        </div>
    </div>

    <div id="mini-player">
        <div style="width: 30%; display: flex; align-items: center; gap: 15px;">
            <img id="player-art" src="" style="width: 56px; height: 56px; border-radius: 4px; display: none; object-fit: cover;">
            <div style="overflow: hidden;">
                <div id="player-title" style="font-weight: 700; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Select a track</div>
                <div id="player-artist" style="font-size: 12px; color: #b3b3b3; cursor: pointer;"></div>
            </div>
        </div>
        
        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 24px;">
                <div id="shuffle-btn" class="control-toggle" onclick="toggleShuffle()"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg></div>
                <div class="control-toggle" onclick="prevTrack()"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg></div>
                <button onclick="togglePlay()" id="play-btn" style="background: #fff; border: none; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <svg id="play-icon" viewBox="0 0 24 24" width="20" height="20" fill="black"><path d="M8 5v14l11-7z"/></svg>
                </button>
                <div class="control-toggle" onclick="nextTrack()"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg></div>
                <div id="loop-btn" class="control-toggle" onclick="toggleLoop()"><svg id="loop-svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg></div>
            </div>
            <div style="width: 100%; max-width: 480px; display: flex; align-items: center; gap: 10px;">
                <span id="current-time" style="font-size: 11px; color: #666; width: 35px; text-align: right;">0:00</span>
                <div id="progress-container" onclick="seek(event)" style="flex: 1; height: 4px; background: #333; border-radius: 2px; cursor: pointer;">
                    <div id="progress-bar" style="width: 0%; height: 100%; background: #00ff88; border-radius: 2px; box-shadow: 0 0 10px rgba(0,255,136,0.4);"></div>
                </div>
                <span id="total-duration" style="font-size: 11px; color: #666; width: 35px;">0:00</span>
            </div>
        </div>

        <div style="width: 30%; display: flex; justify-content: flex-end; align-items: center; gap: 20px;">
            <div class="control-toggle" onclick="togglePanel()"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg></div>
            <div id="volume-icon-wrapper" onclick="toggleMute()" style="color:#666;"><svg id="vol-svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg></div>
            <input id="volume-slider" type="range" min="0" max="1" step="0.01" value="0.5" oninput="updateVolume(this.value)" style="width: 80px; accent-color: #00ff88;">
        </div>
    </div>
</div>

<script>
(function() {
    var ARTISTS = {
        'therichmusic': { 
            name: 'therichmusic', 
            bio: 'The driving force of TRM Records, defining a new era of Hip-Hop and Lofi textures.',
            socials: [
                { name: 'Instagram', url: 'https://instagram.com/themusicrich', icon: '<path d="M7 2c-2.761 0-5 2.239-5 5v10c0 2.761 2.239 5 5 5h10c2.761 0 5-2.239 5-5v-10c0-2.761-2.239-5-5-5h-10zm0 2h10c1.657 0 3 1.343 3 3v10c0 1.657-1.343 3-3 3h-10c-1.657 0-3-1.343-3-3v-10c0-1.657 1.343-3 3-3zm10 2c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1zm-5 1c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 2c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"/>' },
                { name: 'Spotify', url: 'https://open.spotify.com/artist/1NY2OmKCkvxTom76PebI2M', icon: '<path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.498 17.305c-.215.352-.676.463-1.028.248-2.856-1.745-6.45-2.14-10.682-1.173-.404.092-.81-.158-.902-.562-.092-.404.158-.81.562-.902 4.634-1.06 8.59-.604 11.798 1.353.353.215.464.676.25 1.028v.008zm1.466-3.26c-.27.44-.844.577-1.285.308-3.268-2.008-8.25-2.592-12.115-1.42-.497.15-1.02-.132-1.17-.629-.15-.497.132-1.02.629-1.17 4.417-1.34 9.914-.683 13.633 1.605.44.27.577.844.308 1.285v.022zm.126-3.398c-3.92-2.327-10.373-2.542-14.13-1.402-.602.183-1.24-.16-1.423-.76-.183-.603.16-1.24.76-1.423 4.306-1.306 11.44-1.05 15.952 1.628.542.322.72.1.398.542-.32.6-.02 1.222-.542 1.542-.016.012-.016.012-.018.012z"/>' },
                { name: 'Twitter', url: 'https://x.com/therichmusic', icon: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>' },
                { name: 'YouTube', url: 'https://youtube.com/@themusicrich', icon: '<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.872.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>' }
            ]
        },
        'lc-xavier': { 
            name: 'LC XAVIER', 
            bio: 'The driving force of TRM Records, defining a new era of Hip-Hop and Lofi textures.',
            socials: [
                { name: 'Instagram', url: 'https://www.instagram.com/lcxavierofficial_/', icon: '<path d="M7 2c-2.761 0-5 2.239-5 5v10c0 2.761 2.239 5 5 5h10c2.761 0 5-2.239 5-5v-10c0-2.761-2.239-5-5-5h-10zm0 2h10c1.657 0 3 1.343 3 3v10c0 1.657-1.343 3-3 3h-10c-1.657 0-3-1.343-3-3v-10c0-1.657 1.343-3 3-3zm10 2c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1zm-5 1c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 2c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"/>' },
            ]
        }
    };

    var ALBUMS = [
        {
            id: 'adt-single',
            name: 'ABOUT DAMN TIME',
            type: 'Single',
            releaseDate: 2026,
            fullDate: 'March 17th, 2026',
            genre: 'Hip-Hop',
            art: 'https://images2.imgbox.com/01/3b/p1pphY1X_o.png',
            artistId: 'therichmusic',
            purchaseLinks: [] },
        {
            id: 'memories',
            name: 'memories. the prelude.',
            type: 'EP', releaseDate: 2025,
            fullDate: 'November 11th, 2025',
            genre: 'Hip-Hop',
            art: 'https://thumbs2.imgbox.com/06/4d/eRxEyirW_t.jpg',
            artistId: 'lc-xavier',
            purchaseLinks: [] },
        {
            id: 'hearts-bleeding-single',
            name: 'hearts bleeding out. (feat. therichmusic)',
            type: 'Single', releaseDate: 2026,
            fullDate: 'March 13th, 2026',
            genre: 'Hip-Hop', art: 'https://thumbs2.imgbox.com/06/4d/eRxEyirW_t.jpg',
            artistId: 'lc-xavier',
            comingSoon: true,
            purchaseLinks: [] },
        {
            id: 'rich-album',
            name: 'RICH',
            type: 'Album',
            releaseDate: 2027,
            fullDate: 'TBA 2027',
            genre: 'Hip-Hop',
            art: 'https://images2.imgbox.com/21/07/fBkN1oX6_o.png',
            artistId: 'therichmusic',
            comingSoon: true,
            signUpLink: 'https://even.biz/l/rich-sign-up',
            purchaseLinks: [] },
        {
            id: 'rich-freestyle-single',
            name: 'RICH (Freestyle)',
            type: 'Single', releaseDate: 2025,
            fullDate: 'December 26th, 2026',
            genre: 'Hip-Hop', art: 'https://images2.imgbox.com/21/07/fBkN1oX6_o.png',
            artistId: 'therichmusic',
            comingSoon: false,
            purchaseLinks: [] },
    ];

    var SONG_DATA = {
        "about-damn-time": {
            id: "about-damn-time",
            title: "ABOUT DAMN TIME",
            duration: "2:54",
            url:"https://audio.jukehost.co.uk/L6ChsEYAWXOzJYVrjnrt7LqKFddIsGYz.mp3",
            lyrics: ``,
            credits: `` },
        "hearts-bleeding": {
            id:"hearts-bleeding",
            title: "hearts bleeding out. (feat. therichmusic)",
            duration: "3:25",
            url: "https://audio.jukehost.co.uk/0JTJWdbckRjoGCg2vGel5QQ1kSwnWNql",
            lyrics: ``,
            credits: `` },
        "decision-made": {
            id: "decision-made",
            title: "decision made.",
            duration: "3:54",
            url: "https://audio.jukehost.co.uk/uKuiOqFrnUes7PgqFNTpCUyQ1UCceV2R",
            lyrics: ``,
            credits: `` },
        "distant-memory": {
            id: "distant-memory",
            title: "distant memory. (feat. therichmusic)",
            duration: "3:54",
            url: "https://audio.jukehost.co.uk/vS9x0OUdE7NpGLTNj6k7d0sizmkRCKIX",
            lyrics: ``,
            credits: `` },
        "rich-intro": {
            id: "rich-intro",
            title: "Intro",
            hiddenName: true,
            duration: "??:??",
            url: "",
            lyrics: "",
            credits: "" },
        "rich-alone": {
            id: "rich-alone",
            title: "Alone",
            hiddenName: true,
            duration: "??:??",
            url: "",
            lyrics: "",
            credits: "" },
        "heard-enough": {
            id: "heard-enough",
            title: "Heard Enough (feat. Norad)",
            hiddenName: true,
            duration: "??:??",
            url: "",
            lyrics: "",
            credits: "" },
        "rich-freestyle": {
            id: "rich-freestyle",
            title: "RICH (Freestyle)",
            duration: "1:29",
            url: "https://audio.jukehost.co.uk/m5yGkyak8NFeWP9DeTObJvH46D1fDmiu",
            lyrics: "",
            credits: "" },
    };

    var TRACKS = { 
        'adt-single':[
            SONG_DATA['about-damn-time']],
        'memories': [
            SONG_DATA['decision-made'],
            SONG_DATA['hearts-bleeding'],
            SONG_DATA['distant-memory']],
        'hearts-bleeding-single': [
            SONG_DATA['hearts-bleeding']],
        'rich-album': [
            SONG_DATA['rich-intro'],
            SONG_DATA['rich-alone'],
            SONG_DATA['heard-enough'],
            SONG_DATA['rich-freestyle'],
            SONG_DATA['about-damn-time']],
        'rich-freestyle-single': [
            SONG_DATA['rich-freestyle']],
    };

    var audio = new Audio(), isPlaying = false, lastVolume = 0.5, currentTrackId = null, currentAlbumId = null, isShuffle = false, loopState = 0; 
    var SVG_PLAY = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>', SVG_PAUSE = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';

    // --- VIEW HANDLER (RESTORES ANIMATION) ---
function renderView(html) {
    const cv = document.getElementById('content-view');
    // Force the scroll to the top every time a new page is loaded
    cv.scrollTop = 0; 
    // Re-inject the HTML wrapped in the animation div
    cv.innerHTML = `<div class="view-animate">${html}</div>`;
    // Ensure scrolling is enabled
    cv.style.overflowY = 'auto'; 
}

    function formatTime(secs) { if (isNaN(secs)) return "0:00"; var min = Math.floor(secs / 60), sec = Math.floor(secs % 60); return min + ":" + (sec < 10 ? "0" + sec : sec); }
    window.togglePanel = function() { document.getElementById('info-panel').classList.toggle('open'); };
    window.toggleShuffle = function() { isShuffle = !isShuffle; document.getElementById('shuffle-btn').classList.toggle('active', isShuffle); };
    window.toggleLoop = function() { loopState = (loopState + 1) % 3; var btn = document.getElementById('loop-btn'), svg = document.getElementById('loop-svg'); btn.classList.toggle('active', loopState > 0); svg.innerHTML = (loopState === 2) ? '<path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z"/>' : '<path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>'; };
    window.nextTrack = function() { var nextId = getNextTrack(); if (nextId) playTrack(nextId); };
    window.prevTrack = function() { if (audio.currentTime > 3) { audio.currentTime = 0; return; } if (!currentAlbumId) return; var albumTracks = TRACKS[currentAlbumId], currentIndex = albumTracks.findIndex(t => t.id === currentTrackId), prevIndex = currentIndex - 1; if (prevIndex >= 0) playTrack(albumTracks[prevIndex].id); else audio.currentTime = 0; };
    function getNextTrack() { if (!currentAlbumId) return null; var albumTracks = TRACKS[currentAlbumId], currentIndex = albumTracks.findIndex(t => t.id === currentTrackId); if (isShuffle) { var randomIndex = Math.floor(Math.random() * albumTracks.length); if (randomIndex === currentIndex && albumTracks.length > 1) randomIndex = (randomIndex + 1) % albumTracks.length; return albumTracks[randomIndex].id; } else { var nextIndex = currentIndex + 1; if (nextIndex < albumTracks.length) return albumTracks[nextIndex].id; else if (loopState === 1) return albumTracks[0].id; } return null; }

    window.handleGlobalSearch = function(val) { 
        var query = val.toLowerCase(); 
        if (query.length > 0) renderSearchResults(query); 
        else viewHome(); 
    };

    function renderSearchResults(query) {
        var html = `<div style="padding:40px;"><h2 style="font-weight:900; margin-bottom:30px;">Search results for "${query}"</h2>`;
        var artistHits = Object.keys(ARTISTS).filter(k => ARTISTS[k].name.toLowerCase().includes(query));
        if (artistHits.length > 0) { html += '<h3 style="color:#666; font-size:11px; letter-spacing:1px; margin-bottom:15px;">ARTISTS</h3>'; artistHits.forEach(k => html += `<div onclick="viewArtist('${k}')" class="track-row" style="padding:15px; cursor:pointer; font-weight:700;">${ARTISTS[k].name}</div>`); html += '<br>'; }
        var trackHits = Object.keys(SONG_DATA).filter(k => SONG_DATA[k].title.toLowerCase().includes(query));
        if (trackHits.length > 0) { html += '<h3 style="color:#666; font-size:11px; letter-spacing:1px; margin-bottom:15px;">TRACKS</h3>'; trackHits.forEach(k => html += `<div onclick="playTrack('${k}')" class="track-row" style="padding:15px; cursor:pointer; display:flex; justify-content:space-between;"><span>${SONG_DATA[k].title}</span><span style="color:#444">${SONG_DATA[k].duration}</span></div>`); html += '<br>'; }
        var albumHits = ALBUMS.filter(a => a.name.toLowerCase().includes(query));
        if (albumHits.length > 0) { html += '<h3 style="color:#666; font-size:11px; letter-spacing:1px; margin-bottom:15px;">ALBUMS</h3><div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;">'; albumHits.forEach(a => html += `<div onclick="viewAlbum('${a.id}')" class="glow-card" style="background:#111; padding:15px; border-radius:12px; cursor:pointer;"><img src="${a.art}" style="width:100%; border-radius:8px; margin-bottom:10px;"><h4 style="margin:0; font-size:15px;">${a.name}</h4></div>`); html += '</div>'; }
        renderView(html + (artistHits.length === 0 && trackHits.length === 0 && albumHits.length === 0 ? '<p style="color:#444;">No results found.</p></div>' : '</div>'));
    }

    window.playTrack = function(id) {
        if (!id || !SONG_DATA[id].url) return;
        if (currentTrackId === id) { togglePlay(); return; } currentTrackId = id; var track = SONG_DATA[id], album = ALBUMS.find(a => TRACKS[a.id].some(t => t.id === id));
        currentAlbumId = album.id; audio.src = track.url; audio.play(); isPlaying = true;
        document.getElementById('player-art').src = album.art; document.getElementById('player-art').style.display = 'block';
        document.getElementById('player-title').innerText = track.title; document.getElementById('player-artist').innerText = ARTISTS[album.artistId].name;
        document.getElementById('player-artist').onclick = function() { viewArtist(album.artistId); };
        document.getElementById('panel-content').innerHTML = `<div style="margin-bottom:30px;"><h2 style="margin:0 0 5px 0;">${track.title}</h2><p style="color:#666; font-size:13px; margin:0;">${ARTISTS[album.artistId].name}</p></div><div style="margin-bottom:30px;"><h4 style="font-size:11px; letter-spacing:1px; color:#444; margin-bottom:15px;">LYRICS</h4><div style="line-height:1.8; font-size:15px; color:#ccc;">${track.lyrics || 'No lyrics available.'}</div></div><div><h4 style="font-size:11px; letter-spacing:1px; color:#444; margin-bottom:15px;">CREDITS</h4><div style="line-height:1.6; font-size:13px; color:#888;">${track.credits}</div></div>`;
        updatePlayButton(); refreshTracklistDisplay();
    };

    window.togglePlay = function() { if (!audio.src) return; isPlaying ? audio.pause() : audio.play(); isPlaying = !isPlaying; updatePlayButton(); refreshTracklistDisplay(); };
    audio.onended = function() { if (loopState === 2) { audio.currentTime = 0; audio.play(); } else { var nextId = getNextTrack(); if (nextId) playTrack(nextId); else { isPlaying = false; audio.currentTime = 0; updatePlayButton(); document.getElementById('progress-bar').style.width = '0%'; refreshTracklistDisplay(); } } };
    function updatePlayButton() { var icon = document.getElementById('play-icon'); icon.innerHTML = isPlaying ? '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>' : '<path d="M8 5v14l11-7z"/>'; }
    function refreshTracklistDisplay() { document.querySelectorAll('.track-row').forEach(row => { var id = row.getAttribute('data-id'), isCur = (id === currentTrackId), playH = row.querySelector('.track-play-hover'); row.style.color = isCur ? '#00ff88' : '#fff'; if (playH) playH.innerHTML = (isCur && isPlaying) ? SVG_PAUSE : SVG_PLAY; }); }
    window.updateVolume = function(val) { audio.volume = val; var volSvg = document.getElementById('vol-svg'), slider = document.getElementById('volume-slider'); slider.value = val; volSvg.innerHTML = (val == 0) ? '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>' : '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>'; };
    window.toggleMute = function() { if (audio.volume > 0) { lastVolume = audio.volume; updateVolume(0); } else { updateVolume(lastVolume || 0.5); } };
    window.seek = function(e) { if (!audio.duration) return; var rect = document.getElementById('progress-container').getBoundingClientRect(); audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration; };
    audio.ontimeupdate = function() { if (audio.duration) { document.getElementById('progress-bar').style.width = (audio.currentTime / audio.duration) * 100 + '%'; document.getElementById('current-time').innerText = formatTime(audio.currentTime); document.getElementById('total-duration').innerText = formatTime(audio.duration); } };

    window.viewHome = function() {
        var feat = ALBUMS[0];
        var html = `<div style="padding: 40px;"><div class="glow-card" style="position:relative; height:350px; border-radius:20px; overflow:hidden; margin-bottom:50px; background:#111; display:flex; align-items:center;"><img src="${feat.art}" style="position:absolute; right:0; top:0; height:100%; width:50%; object-fit:cover; opacity:0.6; mask-image: linear-gradient(to left, black, transparent);"><div style="position:relative; padding:60px; z-index:2;"><span style="background:#00ff88; color:#000; padding:4px 12px; border-radius:4px; font-size:11px; font-weight:900; letter-spacing:1px;">FEATURED RELEASE</span><h1 style="font-size:72px; margin:15px 0; font-weight:900; letter-spacing:-3px;">${feat.name}</h1><button onclick="viewAlbum('${feat.id}')" style="background:#fff; color:#000; border:none; padding:12px 30px; border-radius:30px; font-weight:800; cursor:pointer; font-size:14px;">View Album</button></div></div><h2 style="margin-bottom:25px; font-size:24px; font-weight:900;">Catalogue</h2><div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 25px;">`;
        for (var i = 0; i < ALBUMS.length; i++) html += `<div onclick="viewAlbum('${ALBUMS[i].id}')" class="glow-card" style="background: #0f0f0f; padding: 20px; border-radius: 12px; cursor: pointer; ${ALBUMS[i].comingSoon ? 'border-style: dashed !important;' : ''}"><img src="${ALBUMS[i].art}" style="width: 100%; border-radius: 8px; margin-bottom: 15px; box-shadow: 0 8px 20px rgba(0,0,0,0.4); ${ALBUMS[i].comingSoon ? 'filter: grayscale(1);' : ''}"><h4 style="margin: 0; font-size:16px;">${ALBUMS[i].name}</h4><p style="color: #666; font-size: 13px; margin: 6px 0 0 0;">${ALBUMS[i].comingSoon ? 'COMING SOON' : ALBUMS[i].genre + ' • ' + ALBUMS[i].releaseDate}</p></div>`;
        renderView(html + '</div></div>');
    };

    window.viewArtist = function(id) {
        var art = ARTISTS[id], artAlbums = ALBUMS.filter(a => a.artistId === id);
        var html = `<div><div style="height:40vh; background: linear-gradient(to bottom, #222, #000); display:flex; align-items:flex-end; padding:60px;"><div><h1 style="font-size: 120px; margin: 0; font-weight: 900; letter-spacing: -6px;">${art.name}</h1><p style="color: #888; margin-top: 15px; max-width: 600px; font-size: 16px; line-height:1.6;">${art.bio}</p><div style="display:flex; gap:15px; margin-top:30px;">`;
        if (art.socials) art.socials.forEach(s => html += `<a href="${s.url}" class="social-link" title="${s.name}"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">${s.icon}</svg></a>`);
        html += `</div></div></div><div style="padding:40px;"><h3 style="font-size:24px; font-weight:900; margin-bottom:25px;">Releases</h3><div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px;">`;
        for (var i = 0; i < artAlbums.length; i++) html += `<div onclick="viewAlbum('${artAlbums[i].id}')" class="glow-card" style="background: #111; padding: 15px; border-radius: 12px; cursor: pointer;"><img src="${artAlbums[i].art}" style="width: 100%; border-radius: 8px; margin-bottom: 10px;"><h4 style="margin: 0; font-size:15px;">${artAlbums[i].name}</h4></div>`;
        renderView(html + '</div></div></div>');
    };

    window.viewAlbum = function(id) {
        var alb = ALBUMS.find(a => a.id === id), tks = TRACKS[id] || [];
        var purchaseHtml = '';
        if (alb.comingSoon && alb.signUpLink) {
            purchaseHtml = `<a href="${alb.signUpLink}" target="_blank" class="signup-btn">SIGN UP FOR UPDATES</a>`;
        } else if (alb.purchaseLinks && alb.purchaseLinks.length > 0) {
            purchaseHtml = `<select class="purchase-select" onchange="if(this.value) window.open(this.value, '_blank'); this.selectedIndex=0;">
                <option value="">WAYS TO PURCHASE</option>`;
            alb.purchaseLinks.forEach(link => { purchaseHtml += `<option value="${link.url}">${link.label}</option>`; });
            purchaseHtml += `</select>`;
        }
        var html = `<div style="padding: 60px 40px;"><div style="display: flex; gap: 40px; align-items: flex-end; margin-bottom: 50px;"><div style="position:relative;"><img src="${alb.art}" style="width: 280px; height: 280px; border-radius: 12px; box-shadow: 0 20px 50px rgba(0,0,0,0.6); ${alb.comingSoon ? 'filter:grayscale(1) brightness(0.5);' : ''}">${alb.comingSoon ? '<div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-weight:900; color:#00ff88; letter-spacing:2px; font-size:12px; width:100%; text-align:center;">COMING SOON</div>' : ''}</div><div><p style="color: #00ff88; font-weight: 800; font-size: 13px; margin: 0; letter-spacing:1px;">${alb.genre.toUpperCase()}</p><h1 style="font-size: 80px; margin: 10px 0; font-weight: 900; letter-spacing: -4px;">${alb.name}</h1><p onclick="viewArtist('${alb.artistId}')" style="cursor:pointer; color: #b3b3b3; font-size:18px;">${ARTISTS[alb.artistId].name} • ${alb.releaseDate}</p>${purchaseHtml}</div></div>`;
// Inside window.viewAlbum loop...
for (var j = 0; j < tks.length; j++) { 
    var isCur = (tks[j].id === currentTrackId); 
    var displayTitle = (alb.comingSoon && tks[j].hiddenName) ? `Track ${j+1}` : tks[j].title;
    
    // Check if the album is coming soon to disable hover/click
    var rowClass = alb.comingSoon ? "track-row disabled" : "track-row";
    var clickAction = alb.comingSoon ? "" : `onclick="playTrack('${tks[j].id}')"`;

    html += `
    <div class="${rowClass}" data-id="${tks[j].id}" ${clickAction}>
        <div class="track-index-col" style="width: 30px; display: flex; align-items: center;">
            <span class="track-num" style="font-size: 13px; color: #666;">${j+1}</span>
            <span class="track-play-hover" style="display:none;">${(isCur && isPlaying) ? SVG_PAUSE : SVG_PLAY}</span>
        </div>
        <span style="flex: 1; font-weight: 600; font-size:15px; margin-left: 10px;">${displayTitle}</span>
        <span style="color:#666; font-size:13px; font-family: monospace;">${tks[j].duration}</span>
    </div>`; 
}
        renderView(html + `<div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #111; color: #444; font-size: 12px; font-weight: 800;">${alb.type.toUpperCase()} RELEASED ${alb.fullDate.toUpperCase()}<br>© 2026 TRM RECORDS</div></div>`); 
    };

    // Sidebar Initialization
    document.getElementById('sidebar-nav').innerHTML = '<div onclick="viewHome()" class="sidebar-item" style="padding:12px 20px; cursor:pointer; font-weight:800; font-size:15px; display:flex; align-items:center; gap:12px;"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>Home</div>';
    var relHtml = ''; 
    for (var k = 0; k < ALBUMS.length; k++) {
        relHtml += `<div onclick="viewAlbum('${ALBUMS[k].id}')" class="sidebar-item">
            <img src="${ALBUMS[k].art}" style="width:34px; height:34px; border-radius:4px; margin-right:12px; object-fit:cover;">
            <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${ALBUMS[k].name}</span>
        </div>`;
    }
    document.getElementById('sidebar-releases').innerHTML = relHtml; 
    
    // Initial Load
    viewHome();
})();
</script>

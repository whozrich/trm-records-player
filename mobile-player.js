<style>
    :root {
        --spotify-black: #121212;
        --spotify-green: #00ff88;
        --tile-bg: #1a1a1a;
        --player-bg: #181818;
        --glow-green: drop-shadow(0 0 8px rgba(0, 255, 136, 0.7));
        --glow-white: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
    }

    #trm-mobile-container {
        background-color: #000;
        color: #fff;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        margin: 0; padding: 0; overflow-x: hidden; user-select: none;
        min-height: 100vh; width: 100%; position: absolute; top: 0; left: 0; z-index: 9999;
    }

    #content-view { padding: 0; min-height: 100vh; position: relative; z-index: 1; }
    .standard-padding { padding: 10px 16px 200px 16px; }

    .view-animate { animation: fadeIn 0.4s ease-out forwards; }
    .search-view-animate { animation: fadeInSimple 0.3s ease-out forwards; }
    
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeInSimple { from { opacity: 0; } to { opacity: 1; } }

    .home-banner {
        width: calc(100% - 32px); height: 160px; margin: 20px 16px;
        border-radius: 12px; position: relative; overflow: hidden;
        background: #222; display: flex; align-items: flex-end; padding: 20px; box-sizing: border-box;
    }
    .home-banner img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; opacity: 0.5; }
    .banner-text { z-index: 2; text-shadow: 0 2px 10px rgba(0,0,0,0.8); }

    .mobile-home-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px; }
    .track-tile { background: var(--tile-bg); border-radius: 6px; overflow: hidden; display: flex; align-items: center; height: 60px; }
    .track-tile img { width: 60px; height: 60px; object-fit: cover; }
    
    /* Layout fix for search labels */
    .tile-content { display: flex; flex-direction: column; padding: 0 10px; overflow: hidden; }
    .tile-title { font-size: 11px; font-weight: 700; white-space: nowrap; text-overflow: ellipsis; }
    .tile-label { font-size: 9px; color: #888; text-transform: uppercase; margin-top: 2px; }
    .artist-circle { border-radius: 50% !important; }

    .album-header { position: relative; display: flex; flex-direction: column; align-items: center; padding: 60px 16px 30px 16px; text-align: center; }
    .album-header-bg { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-size: cover; background-position: center; filter: blur(40px) brightness(0.3); z-index: -1; }
    .cover-art-large { width: 220px; height: 220px; border-radius: 4px; box-shadow: 0 10px 40px rgba(0,0,0,0.6); margin-bottom: 20px; }

    .play-all-btn { background: var(--spotify-green); color: #000; border: none; padding: 14px 50px; border-radius: 30px; font-weight: 800; margin-top: 10px; }
    .play-all-btn:disabled { background: #444; color: #888; cursor: not-allowed; }

    .song-row { display: flex; flex-direction: column; padding: 12px 16px; transition: background 0.2s; }
    .song-row:active { background: rgba(255,255,255,0.1); }
    .song-row.disabled { opacity: 0.3; pointer-events: none; }

    #mini-player { position: fixed; bottom: 95px; left: 10px; right: 10px; height: 62px; background: #282828; border-radius: 8px; display: none; align-items: center; padding: 0 12px; z-index: 10000; overflow: hidden; }
    .progress-hitbox { position: absolute; top: 0; left: 0; width: 100%; height: 4px; cursor: pointer; z-index: 5; }
    .mini-progress { position: absolute; top: 0; left: 0; height: 2px; background: var(--spotify-green); width: 0%; transition: width 0.1s linear; }

    #full-player {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: #121212; z-index: 10100; transform: translateY(100%); transition: transform 0.4s cubic-bezier(0.17, 0.84, 0.44, 1);
        display: flex; flex-direction: column; align-items: center; padding: 40px 24px; box-sizing: border-box;
    }
    #full-player.active { transform: translateY(0); }

    .f-progress-container { width: 100%; height: 20px; display: flex; align-items: center; margin-top: 40px; cursor: pointer; }
    .f-progress-bg { width: 100%; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; position: relative; }
    #f-progress { height: 100%; background: var(--spotify-green); width: 0%; border-radius: 2px; box-shadow: 0 0 10px var(--spotify-green); }

    .mobile-nav { position: fixed; bottom: 0; left: 0; width: 100%; height: 85px; background: rgba(0,0,0,0.95); display: flex; justify-content: space-around; align-items: center; padding-bottom: 15px; z-index: 10050; border-top: 1px solid #111; backdrop-filter: blur(10px); }
    .nav-item { display: flex; flex-direction: column; align-items: center; color: #888; font-size: 10px; cursor: pointer; flex: 1; }
    .nav-item.active { color: #fff; }

    .control-btn { fill: #fff; opacity: 0.6; transition: all 0.2s; }
    .control-btn.active { fill: var(--spotify-green); opacity: 1; filter: var(--glow-green); }
    .play-glow-active { filter: var(--glow-white); }
    #loop-1-indicator { display: none; font-size: 8px; font-weight: 900; }
    .loop-track #loop-1-indicator { display: block; }
</style>

<div id="trm-mobile-container">
    <div id="content-view"></div>

    <div id="mini-player" onclick="toggleFullPlayer(true)">
        <div class="progress-hitbox" onclick="event.stopPropagation(); scrub(event, this)"></div>
        <div class="mini-progress" id="m-progress"></div>
        <div style="flex: 1; display: flex; align-items: center; overflow: hidden;">
            <img id="m-player-art" src="" style="width: 44px; height: 44px; border-radius: 4px; margin-right: 12px;">
            <div style="overflow: hidden;">
                <div id="m-player-title" style="font-size: 14px; font-weight: 700; white-space: nowrap; text-overflow: ellipsis;">---</div>
                <div id="m-player-artist" style="font-size: 12px; color: #aaa;">TRM Records</div>
            </div>
        </div>
        <div onclick="event.stopPropagation(); togglePlay();" id="m-play-btn" style="padding: 10px;">
            <svg id="m-play-svg" width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
        </div>
    </div>

    <div id="full-player">
        <div class="album-header-bg" id="full-bg"></div>
        <div onclick="toggleFullPlayer(false)" style="align-self: flex-start; padding: 10px;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
        </div>
        <img id="f-player-art" style="width: 85%; aspect-ratio: 1/1; object-fit: cover; border-radius: 8px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); margin: 30px 0;">
        <div style="width: 100%; text-align: left;">
            <h2 id="f-player-title" style="margin:0; font-size: 24px;">Track Title</h2>
            <p id="f-player-artist" style="color: #b3b3b3; font-size: 16px; margin-top: 4px;">Artist Name</p>
        </div>
        <div class="f-progress-container" onclick="scrub(event, this)">
            <div class="f-progress-bg">
                <div id="f-progress"></div>
            </div>
        </div>
        <div class="full-controls" style="display: flex; justify-content: space-between; width: 100%; margin-top: 40px; align-items: center;">
            <div onclick="toggleShuffle()" id="shuffle-btn" class="control-btn"><svg viewBox="0 0 24 24" width="24" height="24"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.45 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg></div>
            <div onclick="prevTrack()"><svg width="36" height="36" viewBox="0 0 24 24" fill="white"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg></div>
            <div onclick="togglePlay()" id="f-play-btn-circle" style="background: white; border-radius: 50%; width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; transition: filter 0.3s;">
                <svg id="f-play-svg" width="32" height="32" viewBox="0 0 24 24" fill="black"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <div onclick="nextTrack()"><svg width="36" height="36" viewBox="0 0 24 24" fill="white"><path d="M16 18h2V6h-2zM14.5 12L6 6v12z"/></svg></div>
            <div onclick="toggleLoop()" id="loop-btn" class="control-btn" style="position: relative; display: flex; align-items: center; justify-content: center;">
                <svg viewBox="0 0 24 24" width="24" height="24"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>
                <span id="loop-1-indicator" style="position: absolute; color: inherit; top: 8px;">1</span>
            </div>
        </div>
    </div>

    <nav class="mobile-nav">
        <div class="nav-item active" onclick="MobilePlayer.viewHome()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            <span>Home</span>
        </div>
        <div class="nav-item" onclick="MobilePlayer.viewSearch()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            <span>Search</span>
        </div>
    </nav>
</div>

<script>
    (function() {
        const CATALOGUE_URL = 'https://raw.githubusercontent.com/whozrich/trm-records-player/main/catalogue.json';
        const ARTIST_MAP = { 'therichmusic': 'therichmusic', 'lc-xavier': 'LC XAVIER' };
        
        if (window.audio) window.audio.pause();
        window.audio = new Audio();
        let ALBUMS = [], TRACKS = {}, SONG_DATA = {};
        let currentQueue = [], originalQueue = [], queueIndex = 0;
        let isShuffle = false, loopState = 0;

        async function loadMusicData() {
            try {
                const response = await fetch(CATALOGUE_URL + '?t=' + Date.now());
                const data = await response.json();
                ALBUMS = data.albums; TRACKS = data.tracks; SONG_DATA = data.songData;
                MobilePlayer.viewHome();
            } catch (e) { console.error("Data error", e); }
        }

        window.scrub = (e, el) => {
            if (!audio.duration) return;
            const pct = (e.clientX - el.getBoundingClientRect().left) / el.offsetWidth;
            audio.currentTime = pct * audio.duration;
        };

        window.playTrack = (trackId, queue = null, isSoon = false) => {
            if (isSoon) return;
            const trackFile = SONG_DATA[trackId];
            if (!trackFile) return;
            if (queue) {
                originalQueue = [...queue];
                currentQueue = isShuffle ? [...queue].sort(() => Math.random() - 0.5) : [...queue];
                queueIndex = currentQueue.indexOf(trackId);
            }
            audio.src = trackFile.url; audio.play();
            document.getElementById('mini-player').style.display = 'flex';
            const albumId = Object.keys(TRACKS).find(id => TRACKS[id].some(t => t.id == trackId));
            const alb = ALBUMS.find(a => a.id == albumId);
            const tMeta = TRACKS[albumId].find(t => t.id == trackId);
            const title = tMeta.hiddenName ? "???" : tMeta.title;
            const artist = ARTIST_MAP[alb.artistId] || "TRM Records";
            document.getElementById('m-player-title').innerText = title;
            document.getElementById('f-player-title').innerText = title;
            document.getElementById('m-player-artist').innerText = artist;
            document.getElementById('f-player-artist').innerText = artist;
            document.getElementById('m-player-art').src = alb.art;
            document.getElementById('f-player-art').src = alb.art;
            document.getElementById('full-bg').style.backgroundImage = `url('${alb.art}')`;
        };

        window.togglePlay = () => audio.paused ? audio.play() : audio.pause();
        window.toggleFullPlayer = (s) => document.getElementById('full-player').classList.toggle('active', s);
        window.nextTrack = () => {
            if (loopState === 2) { audio.currentTime = 0; audio.play(); return; }
            queueIndex++;
            if (queueIndex >= currentQueue.length) {
                if (loopState === 1) queueIndex = 0; else { queueIndex--; return; }
            }
            playTrack(currentQueue[queueIndex]);
        };
        window.prevTrack = () => {
            if (audio.currentTime > 3) { audio.currentTime = 0; return; }
            queueIndex = Math.max(0, queueIndex - 1);
            playTrack(currentQueue[queueIndex]);
        };
        window.toggleShuffle = () => { isShuffle = !isShuffle; document.getElementById('shuffle-btn').classList.toggle('active', isShuffle); };
        window.toggleLoop = () => {
            loopState = (loopState + 1) % 3;
            const btn = document.getElementById('loop-btn');
            btn.classList.toggle('active', loopState > 0);
            btn.classList.toggle('loop-track', loopState === 2);
        };

        audio.onplay = () => {
            const icon = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>`;
            document.getElementById('m-play-svg').innerHTML = icon;
            document.getElementById('f-play-svg').innerHTML = icon;
            document.getElementById('f-play-btn-circle').classList.add('play-glow-active');
        };
        audio.onpause = () => {
            const icon = `<path d="M8 5v14l11-7z"/>`;
            document.getElementById('m-play-svg').innerHTML = icon;
            document.getElementById('f-play-svg').innerHTML = icon;
            document.getElementById('f-play-btn-circle').classList.remove('play-glow-active');
        };
        audio.ontimeupdate = () => {
            const p = (audio.currentTime / audio.duration) * 100 || 0;
            document.getElementById('m-progress').style.width = p + '%';
            document.getElementById('f-progress').style.width = p + '%';
        };
        audio.onended = () => nextTrack();

        window.MobilePlayer = {
            viewHome() {
                let html = `<div class="view-animate">
                    <div class="home-banner"><img src="${ALBUMS[0].art}"><div class="banner-text"><h3>Featured<br>${ALBUMS[0].name}</h3></div></div>
                    <div class="standard-padding"><h2 style="margin-bottom:15px">Catalogue</h2><div class="mobile-home-grid">`;
                html += ALBUMS.map(a => `<div class="track-tile" onclick="MobilePlayer.viewAlbum('${a.id}')"><img src="${a.art}"><span>${a.name} ${a.comingSoon ? '(Soon)' : ''}</span></div>`).join('');
                document.getElementById('content-view').innerHTML = html + `</div></div></div>`;
                this.setNav(0);
            },
            viewAlbum(id) {
                const alb = ALBUMS.find(a => a.id == id);
                const tracks = TRACKS[id] || [];
                const ids = tracks.map(t => t.id);
                const isSoon = alb.comingSoon === true;
                let html = `<div class="view-animate">
                    <div class="album-header">
                        <div class="album-header-bg" style="background-image:url('${alb.art}')"></div>
                        <div onclick="MobilePlayer.viewHome()" style="position:absolute;top:30px;left:16px;padding:10px"><svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg></div>
                        <img src="${alb.art}" class="cover-art-large">
                        <h1 style="margin:0">${alb.name}</h1>
                        <p onclick="MobilePlayer.viewArtist('${alb.artistId}')" style="color:var(--spotify-green); margin:5px 0 15px 0; cursor:pointer">Album • ${ARTIST_MAP[alb.artistId] || 'TRM Records'}</p>
                        <button class="play-all-btn" ${isSoon ? 'disabled' : ''} onclick="playTrack('${ids[0]}', [${ids.map(x=>`'${x}'`).join(',')}])">${isSoon ? 'LOCKED' : 'PLAY'}</button>
                    </div>
                    <div style="padding-bottom:200px">` + 
                    tracks.map(t => `<div class="song-row ${isSoon ? 'disabled' : ''}" onclick="playTrack('${t.id}', [${ids.map(x=>`'${x}'`).join(',')}])">
                        <div style="font-weight:600">${t.hiddenName ? '???' : t.title}</div>
                        <div style="font-size:12px;color:#888;margin-top:2px">${ARTIST_MAP[alb.artistId] || 'TRM Records'}</div>
                    </div>`).join('') + `</div></div>`;
                document.getElementById('content-view').innerHTML = html;
            },
            viewArtist(slug) {
                const name = ARTIST_MAP[slug] || "Artist";
                const artistAlbums = ALBUMS.filter(a => a.artistId === slug);
                const art = artistAlbums[0]?.art || "";
                let html = `<div class="view-animate">
                    <div class="album-header">
                        <div class="album-header-bg" style="background-image:url('${art}')"></div>
                        <div onclick="MobilePlayer.viewHome()" style="position:absolute;top:30px;left:16px;padding:10px"><svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg></div>
                        <img src="${art}" class="cover-art-large" style="border-radius:50%">
                        <h1 style="margin:0; font-size: 36px;">${name}</h1>
                        <p style="color:#aaa; margin:10px 0">Artist</p>
                    </div>
                    <div class="standard-padding">
                        <h3 style="margin-bottom:15px">Discography</h3>
                        ${artistAlbums.map(a => `<div class="track-tile" style="margin-bottom:10px" onclick="MobilePlayer.viewAlbum('${a.id}')"><img src="${a.art}"><div class="tile-content"><span class="tile-title">${a.name}</span><span class="tile-label">Album</span></div></div>`).join('')}
                    </div>
                </div>`;
                document.getElementById('content-view').innerHTML = html;
            },
            viewSearch() {
                document.getElementById('content-view').innerHTML = `
                    <div class="search-view-animate standard-padding">
                        <h1>Search</h1>
                        <div style="position: relative; margin-bottom: 20px;">
                            <input type="text" style="width:100%; padding:14px; background:#222; border:1px solid #333; color:white; border-radius:8px; box-sizing: border-box;" placeholder="Artists, tracks, or albums" oninput="MobilePlayer.runSearch(this.value)">
                        </div>
                        <div id="search-results"></div>
                    </div>`;
                this.setNav(1);
            },
            runSearch(q) {
                const resultsDiv = document.getElementById('search-results');
                if (!q) { resultsDiv.innerHTML = ''; return; }
                const query = q.toLowerCase();
                let results = [];

                // 1. Search Artists
                Object.entries(ARTIST_MAP).forEach(([slug, name]) => {
                    if (name.toLowerCase().includes(query)) {
                        const firstArt = ALBUMS.find(a => a.artistId === slug)?.art || "";
                        results.push({ type: 'Artist', name, id: slug, art: firstArt });
                    }
                });

                // 2. Search Albums
                ALBUMS.forEach(a => {
                    if (a.name.toLowerCase().includes(query)) results.push({ type: 'Album', name: a.name, id: a.id, art: a.art });
                });

                // 3. Search Tracks
                Object.keys(TRACKS).forEach(albId => {
                    const alb = ALBUMS.find(a => a.id === albId);
                    TRACKS[albId].forEach(t => {
                        if (t.title.toLowerCase().includes(query)) {
                            results.push({ type: 'Track', name: t.title, id: t.id, art: alb.art, queue: TRACKS[albId].map(x => x.id) });
                        }
                    });
                });

                resultsDiv.innerHTML = results.map(r => `
                    <div class="track-tile" style="margin-bottom:10px" onclick="${r.type === 'Artist' ? `MobilePlayer.viewArtist('${r.id}')` : r.type === 'Album' ? `MobilePlayer.viewAlbum('${r.id}')` : `playTrack('${r.id}', [${r.queue.map(i=>`'${i}'`).join(',')}])`}">
                        <img src="${r.art}" class="${r.type === 'Artist' ? 'artist-circle' : ''}">
                        <div class="tile-content">
                            <span class="tile-title">${r.name}</span>
                            <span class="tile-label">${r.type}</span>
                        </div>
                    </div>`).join('');
            },
            setNav(idx) { document.querySelectorAll('.nav-item').forEach((el, i) => el.classList.toggle('active', i === idx)); }
        };

        loadMusicData();
    })();
</script>

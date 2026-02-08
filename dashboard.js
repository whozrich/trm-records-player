<div id="app-container" style="display: flex; flex-direction: column; height: 95vh; max-width: 1200px; margin: 10px auto; background: #050505; border-radius: 20px; overflow: hidden; font-family: 'Inter', sans-serif; color: white; border: 1px solid #222; position: relative; box-shadow: 0 40px 100px rgba(0,0,0,0.8);">
  
  <div style="display: flex; flex: 1; overflow: hidden; position: relative;">
    
    <div id="sidebar" style="width: 280px; min-width: 85px; max-width: 450px; border-right: 1px solid #1a1a1a; display: flex; flex-direction: column; background: #000; position: relative; will-change: width;">
      <div style="padding: 20px; display: flex; align-items: center; gap: 10px;">
        <button onclick="toggleSidebarSize()" class="icon-btn active-glow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button>
        <input type="text" id="global-search" placeholder="Search..." style="flex:1; background: #111; border: 1px solid #222; color: #fff; padding: 8px; border-radius: 6px; font-size: 12px; outline: none;" class="sidebar-full-elem">
      </div>
      <div id="sidebar-scroll" style="flex: 1; overflow-y: auto; padding: 0 10px 20px;"></div>
      <div id="drag-handle" style="position: absolute; right: -2px; top: 0; bottom: 0; width: 6px; cursor: ew-resize; background: transparent; z-index: 20;"></div>
    </div>

    <div id="main-content" style="flex: 1; overflow-y: auto; background: linear-gradient(180deg, #111 0%, #050505 100%); position: relative;">
      <div id="content-view" style="padding: 40px;"></div>
    </div>

    <div id="right-panel" style="width: 0; background: #080808; border-left: 0px solid #1a1a1a; overflow: hidden; transition: 0.3s ease-out; z-index: 50;">
        <div style="padding: 30px; min-width: 320px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <h2 id="panel-title" style="margin:0; font-size: 11px; letter-spacing: 3px; color: #00ff88; font-weight: 900;"></h2>
                <button onclick="closeRightPanel()" class="icon-btn">✕</button>
            </div>
            <div id="panel-body" style="line-height: 1.8; color: #eee; font-size: 15px; white-space: pre-wrap; font-weight: 300;"></div>
        </div>
    </div>
  </div>

  <div id="bottom-bar" style="height: 110px; background: #000; border-top: 1px solid #1a1a1a; display: flex; align-items: center; padding: 0 25px; justify-content: space-between; z-index: 100;">
    <div style="display: flex; align-items: center; width: 30%; gap: 15px;">
      <img id="mini-cover" onclick="toggleFullscreen()" src="" style="width: 65px; height: 65px; border-radius: 8px; cursor: pointer; border: 1px solid #222; background: #111; object-fit: cover;" class="active-glow">
      <div style="max-width: 200px; overflow: hidden;">
        <div id="mini-title" onclick="handleTitleClick()" style="font-size: 14px; font-weight: 700; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; cursor: pointer;">No Track Selected</div>
        <div id="mini-artist" onclick="viewArtist(currentTrack.artistId)" style="font-size: 12px; color: #00ff88; cursor: pointer;">Select a song</div>
      </div>
    </div>

    <div style="display: flex; flex-direction: column; align-items: center; width: 40%; gap: 12px;">
      <div style="display: flex; align-items: center; gap: 20px;">
        <button id="shuffle-btn" class="icon-btn" onclick="toggleShuffle()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg></button>
        <button class="icon-btn" onclick="skipTrack(-1)"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6L18 18V6z"/></svg></button>
        
        <button id="play-btn" onclick="togglePlay()" class="main-play-glow" style="background: #fff; border: none; width: 45px; height: 45px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s transform ease, 0.3s box-shadow;">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="#000"><path id="play-path" d="M8 5v14l11-7z"/></svg>
        </button>

        <button class="icon-btn" onclick="skipTrack(1)"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6zm9-12h2v12h-2z"/></svg></button>
        <button id="loop-btn" class="icon-btn" onclick="toggleLoop()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg></button>
      </div>
      <div style="display: flex; align-items: center; width: 100%; gap: 12px;">
        <span id="cur-time" style="font-size: 11px; color: #555; width: 35px; text-align: right;">0:00</span>
        <div id="progress-container" style="flex: 1; height: 5px; background: #222; border-radius: 3px; cursor: pointer; position: relative;">
          <div id="progress-bar" style="width: 0%; height: 100%; background: #00ff88; border-radius: 3px; box-shadow: 0 0 10px #00ff88;"></div>
        </div>
        <span id="total-time" style="font-size: 11px; color: #555; width: 35px;">0:00</span>
      </div>
    </div>

    <div style="display: flex; align-items: center; justify-content: flex-end; width: 30%; gap: 18px;">
       <button id="lyrics-btn" class="icon-btn" onclick="togglePanel('lyrics')"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></button>
       <button id="credits-btn" class="icon-btn" onclick="togglePanel('credits')"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></button>
       
       <div style="display: flex; align-items: center; gap: 8px;">
           <button onclick="toggleMute()" class="icon-btn" id="vol-btn" style="padding:0; width: 25px;">
               <svg id="vol-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                   <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                   <path class="vol-waves" d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
               </svg>
           </button>
           <input type="range" id="vol-slider" min="0" max="1" step="0.01" value="0.8" style="width: 70px; accent-color: #00ff88; cursor: pointer;">
       </div>
    </div>
  </div>

  <div id="fullscreen-overlay" style="display:none; position: fixed; inset: 0; background: #000; z-index: 2000; padding: 60px; flex-direction: row; gap: 80px; align-items: center; justify-content: center;">
      <button onclick="toggleFullscreen()" class="icon-btn" style="position:absolute; top:30px; right:30px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
      <img id="fs-art" src="" style="width: 40vw; max-width: 500px; aspect-ratio:1; border-radius: 20px; box-shadow: 0 0 100px rgba(0,255,136,0.3); object-fit: cover;">
      <div id="fs-lyrics" style="flex:1; overflow-y:auto; height: 70vh; font-size: 42px; font-weight: 900; line-height: 1.3; color: #fff; padding-right: 20px;"></div>
  </div>

  <audio id="audio-engine" crossOrigin="anonymous"></audio>
</div>

<style>
  .icon-btn { background: none; border: none; color: #666; cursor: pointer; transition: 0.2s; display: flex; align-items: center; justify-content: center; outline: none; }
  .icon-btn:hover, .icon-btn.active { color: #00ff88; filter: drop-shadow(0 0 5px #00ff88); }
  
  /* Restoration of Glow Effects */
  .active-glow { transition: 0.3s; }
  .active-glow:hover { filter: drop-shadow(0 0 8px #00ff88); }

  .main-play-glow:hover { transform: scale(1.1) translateY(-2px); box-shadow: 0 10px 25px rgba(0, 255, 136, 0.5); }
  .main-play-glow:active { transform: scale(0.95); }

  .track-row { display: grid; grid-template-columns: 40px 1fr 1fr 60px; padding: 12px; border-radius: 8px; cursor: pointer; align-items: center; transition: 0.2s; position: relative; }
  .track-row:hover { background: rgba(255,255,255,0.07); }
  
  .track-row .row-number { display: block; }
  .track-row .row-play-icon { display: none; color: #00ff88; filter: drop-shadow(0 0 5px #00ff88); }
  .track-row:hover .row-number { display: none; }
  .track-row:hover .row-play-icon { display: block; }
  
  .track-row.playing .track-title-text { color: #00ff88; font-weight: 700; text-shadow: 0 0 10px rgba(0,255,136,0.3); }
  .track-row.playing .row-number { color: #00ff88; }

  .sidebar-minimized .sidebar-full-elem { display: none; }
  .sidebar-minimized { width: 85px !important; }
  
  .sidebar-item { display: flex; align-items: center; gap: 12px; padding: 10px; border-radius: 10px; cursor: pointer; transition: 0.2s; margin-bottom: 2px; }
  .sidebar-item:hover { background: rgba(255,255,255,0.05); }

  .social-icon { width: 20px; height: 20px; filter: invert(1); opacity: 0.6; transition: 0.3s; }
  .social-icon:hover { opacity: 1; filter: invert(1) drop-shadow(0 0 8px #00ff88); }
  
  .result-card { background: #111; padding: 20px; border-radius: 15px; cursor: pointer; transition: 0.3s; border: 1px solid #222; }
  .result-card:hover { border-color: #00ff88; transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,255,136,0.1); }
  
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
</style>

<script>
  // --- CONFIGURATION ---
// Change these IDs to control what appears on the Home Screen
const FEATURED_RELEASE_ID = 'leaving-soon'; 
const RECENT_RELEASE_IDS = ['leaving-soon', 'memories'];

// --- DATA ---
const ARTISTS = {
  "therichmusic": {
    name: "therichmusic",
    pfp: "https://images2.imgbox.com/d6/47/HbPZE29T_o.png",
    bio: "Unfiltered storytelling focused on the RICH era.",
    socials: [{ icon: "https://www.svgrepo.com/show/303154/instagram-2016-logo.svg", url: "https://instagram.com" }]
  },
  "lc-xavier": {
    name: "LC XAVIER",
    pfp: "https://images2.imgbox.com/f0/3d/qX9Rz8YF_o.png",
    bio: "Atmospheric melodic rap.",
    socials: []
  }
};

const TRACKS = {
  "leaving-soon": {
    id: "leaving-soon", artistId: "therichmusic", title: "LEAVING SOON", albumId: "rich-era",
    cover: "https://images2.imgbox.com/d6/47/HbPZE29T_o.png",
    url: "https://audio.jukehost.co.uk/MnDDdmw7m8kveT1b9Ihz48RcGNZKTYk7.mp3",
    lyrics: `[Chorus]
The day that I leave
Bring pride to the grave
Took so long to believe in myself
Oh yeah (Yeah, yeah, yeah)
The day that I leave
Bring pride to the grave
Wonder if I'm leaving soon
Oh yeah

[Verse 1]
Took me my whole life to believe in myself
It's like I was tryna reach for the stars that I couldn't touch
Every time I thought about it, it was different
It's like a hush-hush, can't open my mouth about anything
Hate to get introspective because then I admit
I ain't had no relevance, I'm speakin' to no audience
It's like I'm already in my grave, want a magnum opus
But at this point I'm startin' to get hopeless
Going to be lookin' at my future kids wonderin' where I went wrong
Why I'm stuck inside of a mental state, release it into a song
Askin' myself already, "What if this is the last one?"
Starvin' myself mentally over the thought of never makin' it
That's somethin' you'd never here from another artist
Attention is all I ask for, whether it's good or honest
(Whether it's good or honest)
I've been trying and trying, God, I'm trying my hardest

[Chorus]
The day that I leave
Bring pride to the grave
Took so long to believe in myself
Oh yeah
The day that I leave (The day that I leave)
Bring pride to the grave (Aye, bring it to the grave)
Wonder if I'm leaving soon
Oh yeah (Yeah, yeah, yeah)

[Verse 2]
I always thought I'd have a normal life as a kid, I kid
Go backwards in time, pushin' fifty with grandkids
Hurts to open up a wound when I ain't even healed
Rememberin' what they said, "If you can believe
You can continue to achieve, put those words under your sleeve"
But why couldn't I just stay to the route, rappin' to appease
That's what I don't understand, I know I'm so naive
But that's what I've been trained to believe, huh
My mind cyclin' like it's own disease, don't be deceived
Not gettin' any attention, I know that's a pet peeve
I know there's somethin' wrong with me, I don't disbelieve
I wanna go back just a few years, the happiness retrieved
I hate that when I panic it gets hard to breathe
I hate that I lie about broken trust gettin' to the heart of me
Basic emotions, double that by tenfold, then fold, that's cold
Preachin' 'bout somethin' that ain't money and sex, that's bold

[Chorus]
The day that I leave
Bring pride to the grave
Took so long to believe in myself
Oh yeah
The day that I leave
Bring pride to the grave
Wonder if I'm leaving soon
Oh yeah`,
    credits: `Produced by IK-EY Beats
Written by therichmusic`
  },
  "about-damn-time": {
    id: "about-damn-time", artistId: "therichmusic", title: "ABOUT DAMN TIME", albumId: "rich-era",
    cover: "https://images2.imgbox.com/01/3b/p1pphY1X_o.png",
    url: "https://audio.jukehost.co.uk/L6ChsEYAWXOzJYVrjnrt7LqKFddIsGYz.mp3",
    lyrics: `[Intro]
Huh, huh, huh, huh
About Damn-

[Verse 1]
Said to the doubters it's about damn time
Hate it when I flex on you through a rhyme
Generic bars, then it ain't pass the line
I ain't care bitch, this shit 'bouta be mine
Part-Time Boyfriend, bitch that's a lie
Say that you ain't believe, I'd say it's our time
If I were you I'd ask myself to commit
Keep the peace? Bitch I already tried, hey, yeah

[Chorus]
They say bounce back
They say bounce back
They say bounce back
I say it's about time
They say bounce back
They say bounce back
They say bounce back
I say it's about time
I say it's about time

[Verse 2]
Said to the doubters it's about damn time
Bitch, I already know I'm not in my prime
I'm so broke I can't even afford a dime
Thinkin' we slick bitch, you ain't even a slime
That's right we know yo ass ain't grime
Sayin' you loaded, bitch where's the nine?
If I'm not your first chapter, then I must be the spine, yeah

[Bridge]
They say it's about time
They say it's about time
They say it's about time
They say it's about time, yeah

[Verse 3]
Said to the doubters it's about damn time
Tell 'em that the skill took years to refine
Deep Seek, there ain't nothin' to find
I ain't know bitch, this life just ain't mine

[Pre-Chorus]
They say it's about time
They say it's about time
They say it's about time
They say it's about time, yeah

[Chorus]
They say bounce back
They say bounce back
They say bounce back
I say it's about time
They say bounce back
They say bounce back
They say bounce back
I say it's about time
I say it's about time

[Outro]
They say it's about time
They say it's about time
They say it's about time
They say it's about time, yeah
They say it's about time
They say it's about time
They say it's about time
They say it's about time, yeah
They say it's about time
They say it's about time
They say it's about time
They say it's about time, yeah`,
    credits: `Produced by H3 Music
Written by therichmusic`
  },
  "broken-hearts": {
    id: "broken-hearts", artistId: "lc-xavier", title: "hearts bleeding out.", albumId: "memories",
    cover: "https://thumbs2.imgbox.com/06/4d/eRxEyirW_t.jpg",
    url: "https://audio.jukehost.co.uk/0JTJWdbckRjoGCg2vGel5QQ1kSwnWNql",
    lyrics: `[Chorus: LC XAVIER]
Heart's bleeding out (bleeding out)
As I look to the ground
Fall on my knees
I don't hear a sound
Vision going blurry (blurry)
Am I in a hurry?

[Verse 1: therichmusic]
Vision goin' blurry, wonderin' if they still worry
Askin' myself where I'm going, am I in a hurry?
At the point where ego so bad I ask if I'm Curry
I know my time's coming soon, wonderin' if I'm early
Lights go off by the age of thirty, that's quirky
Surprised I ain't ended up like all the others poppin'-
I'm wondering if I'm worried about my legacy
At a point where I'm aimin' disses over jealousy
Look at the ground, realizin' that I'm sippin' on Hennessy
Mind racin' with broken up thoughts and tendancies, like-

[Chorus: LC XAVIER]
Heart's bleeding out (bleeding out)
As I look to the ground
Fall on my knees
I don't hear a sound
Vision going blurry (blurry)
Am I in a hurry?

[Verse 2: therichmusic]
Fall down on my knees, it's a quarter past three
Sayin' that it'll be alright, I have to disagree
Talkin' to all the friends you have, sayin' you have tea
While you're still leavin' me empty
Spill it, say that you hate me, I'm used to it
My heart still open, you got the key to it
Call me up and say you got a new guy, I knew it
Say that it's because I have anger issues, I blew it
All I can think and ask is
All I can think and ask is

[Skit: therichmusic]
Hey, uh, I know you said not to get in contact but uhm...
I just wanted to ask if...
We could redo it, maybe?`,
    credits: `Produced by boy50
Written by LC XAVIER, therichmusic`
  }
};

const ALBUMS = [
  { id: "leaving-soon", name: "LEAVING SOON", artistId: "therichmusic", art: "https://images2.imgbox.com/d6/47/HbPZE29T_o.png", tracks: ["leaving-soon"], type: "Single" },
  { id: "about-damn-time", name: "ABOUT DAMN TIME", artistId: "therichmusic", art: "https://images2.imgbox.com/01/3b/p1pphY1X_o.png", tracks: ["about-damn-time"], type: "Single" },
  // Fixed the artistId below (removed the space after xavier)
  { id: "memories", name: "memories.", artistId: "lc-xavier", art: "https://thumbs2.imgbox.com/06/4d/eRxEyirW_t.jpg", tracks: ["broken-hearts"], type: "Album" },
  { id: "heart-bleeding-out", name: "hearts bleeding out. (feat. therichmusic)", artistId: "lc-xavier", art: "https://thumbs2.imgbox.com/06/4d/eRxEyirW_t.jpg", tracks: ["broken-hearts"], type: "Single" },
];

// --- APP STATE ---
let currentTrack = null;
let isShuffle = false;
let activePanelType = null; 
let lastView = { type: 'album', id: 'leaving-soon' };
const audio = document.getElementById('audio-engine');

function init() {
    renderSidebar();
    document.getElementById('global-search').addEventListener('input', (e) => {
        const query = e.target.value;
        renderSidebar(query);
        query.length > 0 ? handleSearch(query) : updateView();
    });
    setupSidebarDrag();
    setupKeyboardShortcuts();
    viewHome(); // Set Home as the default start page
}

// --- NAVIGATION LOGIC ---
function handleTitleClick() {
    if (!currentTrack) return;
    // If we are currently on the album page for this song, go to the song page.
    // Otherwise, go to the album page.
    if (lastView.type === 'album' && lastView.id === currentTrack.albumId) {
        viewSongPage(currentTrack.id);
    } else {
        viewAlbum(currentTrack.albumId);
    }
}

// --- PLAYER ENGINE ---
function playTrack(id) {
    if (currentTrack?.id === id) {
        togglePlay();
        return;
    }
    currentTrack = TRACKS[id];
    audio.src = currentTrack.url;
    audio.play();
    updatePlayerBar();
    updateView(); 
}

function togglePlay() {
    if (!audio.src) return;
    audio.paused ? audio.play() : audio.pause();
}

function handleAudioStatusChange(isPlaying) {
    const playBtn = document.getElementById('play-path');
    playBtn.setAttribute('d', isPlaying ? 'M6 19h4V5H6v14zm8-14v14h4V5h-4z' : 'M8 5v14l11-7z');
    updateView(); 
}

function updatePlayerBar() {
    document.getElementById('mini-cover').src = currentTrack.cover;
    document.getElementById('mini-title').innerText = currentTrack.title;
    document.getElementById('mini-artist').innerText = ARTISTS[currentTrack.artistId].name;
}

function skipTrack(dir) {
    const keys = Object.keys(TRACKS);
    if (isShuffle) {
        let nextId;
        do { nextId = keys[Math.floor(Math.random() * keys.length)]; } while (nextId === currentTrack?.id && keys.length > 1);
        playTrack(nextId);
    } else {
        let idx = keys.indexOf(currentTrack?.id);
        let nextIdx = (idx + dir + keys.length) % keys.length;
        playTrack(keys[nextIdx]);
    }
}

// --- VIEWS ---
function viewAlbum(id) {
    lastView = { type: 'album', id: id };
    const alb = ALBUMS.find(a => a.id === id);
    document.getElementById('content-view').innerHTML = `
        <div style="display:flex; gap:35px; align-items:flex-end; margin-bottom:50px;">
            <img src="${alb.art}" style="width:230px; border-radius:12px; box-shadow:0 20px 50px rgba(0,0,0,0.5);" class="active-glow">
            <div>
                <span style="font-size:11px; font-weight:900; color:#00ff88; letter-spacing:1px;">${alb.type.toUpperCase()}</span>
                <h1 style="font-size:60px; margin:10px 0; letter-spacing:-2px;">${alb.name}</h1>
                <p><strong onclick="viewArtist('${alb.artistId}')" style="cursor:pointer;" class="active-glow">${ARTISTS[alb.artistId].name}</strong> • ${alb.tracks.length} Songs</p>
            </div>
        </div>
        ${alb.tracks.map((tid, i) => {
            const isThisPlaying = (currentTrack?.id === tid && !audio.paused);
            return `
            <div class="track-row ${currentTrack?.id === tid ? 'playing' : ''}" onclick="playTrack('${tid}')">
                <div class="row-num-container" style="width: 25px;">
                    <span class="row-number">${i+1}</span>
                    <span class="row-play-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="${isThisPlaying ? 'M6 19h4V5H6v14zm8-14v14h4V5h-4z' : 'M8 5v14l11-7z'}"/>
                        </svg>
                    </span>
                </div>
                <span class="track-title-text" onclick="event.stopPropagation(); viewSongPage('${tid}')">${TRACKS[tid].title}</span>
                <span style="color:#777;">${ARTISTS[TRACKS[tid].artistId].name}</span>
                <span style="text-align:right; color:#555; font-size:12px;">---</span>
            </div>`}).join('')}
    `;
}

function viewSongPage(id) {
    lastView = { type: 'song', id: id };
    const t = TRACKS[id];
    const isPlaying = currentTrack?.id === id && !audio.paused;
    document.getElementById('content-view').innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; text-align:center;">
            <img src="${t.cover}" style="width:400px; height:400px; border-radius:20px; box-shadow:0 30px 80px rgba(0,0,0,0.6); margin-bottom:30px; border: 1px solid #333;" class="active-glow">
            <h1 style="font-size:55px; margin:0; letter-spacing:-2px;">${t.title}</h1>
            <p style="color:#00ff88; font-size:22px; font-weight:bold; cursor:pointer;" onclick="viewArtist('${t.artistId}')" class="active-glow">${ARTISTS[t.artistId].name}</p>
            <div style="display:flex; gap:25px; margin-top:30px;">
                <button onclick="playTrack('${id}')" class="icon-btn main-play-glow" style="background:#fff; width:65px; height:65px; border-radius:50%;">
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="black"><path d="${isPlaying ? 'M6 19h4V5H6v14zm8-14v14h4V5h-4z' : 'M8 5v14l11-7z'}"/></svg>
                </button>
            </div>
        </div>
    `;
}

function viewArtist(id) {
    lastView = { type: 'artist', id: id };
    const a = ARTISTS[id];
    document.getElementById('content-view').innerHTML = `
        <div style="display:flex; gap:40px; align-items:center; margin-bottom:40px;">
            <img src="${a.pfp}" style="width:180px; height:180px; border-radius:50%; object-fit:cover; border: 2px solid #222;" class="active-glow">
            <div>
              <h1 style="font-size:70px; margin:0; letter-spacing:-3px;">${a.name}</h1>
              <div style="display:flex; gap:15px; margin-top:15px;">
                  ${a.socials.map(s => `<a href="${s.url}" target="_blank"><img src="${s.icon}" class="social-icon"></a>`).join('')}
              </div>
            </div>
        </div>
        <p style="color:#aaa; max-width:600px; line-height:1.7; font-size:16px;">${a.bio}</p>
        <h2 style="font-size: 18px; margin: 40px 0 20px; letter-spacing: 1px; color: #555;">RELEASES</h2>
        <div style="display:flex; gap:25px;">
            ${ALBUMS.filter(alb => alb.artistId === id).map(alb => `
            <div onclick="viewAlbum('${alb.id}')" style="cursor:pointer; width:160px;" class="active-glow">
                <img src="${alb.art}" style="width:160px; border-radius:10px; border: 1px solid #222;">
                <div style="margin-top:10px; font-weight:700; font-size:14px;">${alb.name}</div>
            </div>`).join('')}
        </div>
    `;
}

function viewHome() {
    lastView = { type: 'home', id: null };
    const contentView = document.getElementById('content-view');
    
    // Find the data for featured/recent releases
    const featured = ALBUMS.find(a => a.id === FEATURED_RELEASE_ID);
    const recents = ALBUMS.filter(a => RECENT_RELEASE_IDS.includes(a.id));

    contentView.innerHTML = `
        <div class="hero-banner" onclick="viewAlbum('${featured.id}')" style="cursor:pointer; margin-bottom:40px;">
            <div class="hero-content" style="display:flex; gap:30px; align-items:center; background:rgba(255,255,255,0.05); padding:40px; border-radius:20px;">
                <img src="${featured.art}" style="width:200px; height:200px; border-radius:12px; box-shadow:0 20px 40px rgba(0,0,0,0.5);">
                <div>
                    <span style="background:#00ff88; color:#000; padding:4px 12px; border-radius:4px; font-size:10px; font-weight:900;">FEATURED RELEASE</span>
                    <h1 style="font-size:48px; margin:15px 0;">${featured.name}</h1>
                    <p style="color:#888;">${ARTISTS[featured.artistId].name}</p>
                </div>
            </div>
        </div>

        <h2 style="margin-bottom:20px;">Recent Releases</h2>
        <div class="release-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:25px;">
            ${recents.map(album => `
                <div class="card" onclick="viewAlbum('${album.id}')" style="cursor:pointer; background:#111; padding:15px; border-radius:15px;">
                    <img src="${album.art}" style="width:100%; border-radius:10px; margin-bottom:15px;">
                    <h4 style="margin:0;">${album.name}</h4>
                    <p style="margin:5px 0 0; color:#666; font-size:12px;">${ARTISTS[album.artistId].name}</p>
                </div>
            `).join('')}
        </div>
    `;
    contentView.scrollTop = 0;
}

function handleSearch(query) {
    lastView = { type: 'search', id: query };
    const q = query.toLowerCase();
    const matchedArtists = Object.keys(ARTISTS).filter(k => ARTISTS[k].name.toLowerCase().includes(q));
    const matchedAlbums = ALBUMS.filter(a => a.name.toLowerCase().includes(q));
    
    let html = `<h1 style="font-size: 32px; margin-bottom: 30px;">Search Results</h1>`;
    if (matchedArtists.length) {
        html += `<div style="display: flex; gap: 20px; margin-bottom: 40px;">`;
        matchedArtists.forEach(k => {
            html += `<div class="result-card" onclick="viewArtist('${k}')" style="text-align: center; width: 180px;">
                        <img src="${ARTISTS[k].pfp}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin-bottom: 15px;">
                        <div style="font-weight: bold;">${ARTISTS[k].name}</div>
                     </div>`;
        });
        html += `</div>`;
    }
    if (matchedAlbums.length) {
        html += `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 20px;">`;
        matchedAlbums.forEach(a => {
            html += `<div class="result-card" onclick="viewAlbum('${a.id}')">
                        <img src="${a.art}" style="width: 100%; border-radius: 10px; margin-bottom: 15px;">
                        <div style="font-weight: bold;">${a.name}</div>
                        <div style="font-size: 12px; color: #666;">${ARTISTS[a.artistId].name}</div>
                     </div>`;
        });
        html += `</div>`;
    }
    document.getElementById('content-view').innerHTML = html;
}

function updateView() {
    if (lastView.type === 'album') viewAlbum(lastView.id);
    else if (lastView.type === 'song') viewSongPage(lastView.id);
    else if (lastView.type === 'artist') viewArtist(lastView.id);
    else if (lastView.type === 'search') handleSearch(lastView.id);
}

// --- TOOLS ---
function renderSidebar() {
    const sidebarNav = document.getElementById('sidebar-nav');
    const sidebarReleases = document.getElementById('sidebar-releases');

    // 1. Add the Home Button at the very top
    sidebarNav.innerHTML = `
        <div class="sidebar-item" onclick="viewHome()">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>
            <span class="sidebar-full-elem">Home</span>
        </div>
    `;

    // 2. Your existing Album List logic
    sidebarReleases.innerHTML = ALBUMS.map(album => `
        <div class="sidebar-item" onclick="viewAlbum('${album.id}')">
            <img src="${album.art}" class="sidebar-icon">
            <span class="sidebar-full-elem">${album.name}</span>
        </div>
    `).join('');
}

function toggleShuffle() { isShuffle = !isShuffle; document.getElementById('shuffle-btn').classList.toggle('active', isShuffle); }
function toggleLoop() { audio.loop = !audio.loop; document.getElementById('loop-btn').classList.toggle('active', audio.loop); }

function toggleMute() {
    audio.muted = !audio.muted;
    const icon = document.getElementById('vol-icon');
    const waves = icon.querySelector('.vol-waves');
    if (audio.muted || audio.volume === 0) {
        waves.style.display = 'none';
        icon.style.color = '#ff4444';
    } else {
        waves.style.display = 'block';
        icon.style.color = 'inherit';
    }
}

function togglePanel(type) {
    if (!currentTrack) return;
    const p = document.getElementById('right-panel');
    const lyricsBtn = document.getElementById('lyrics-btn');
    const creditsBtn = document.getElementById('credits-btn');

    if (activePanelType === type) {
        closeRightPanel();
        return;
    }

    activePanelType = type;
    document.getElementById('panel-title').innerText = type.toUpperCase();
    document.getElementById('panel-body').innerText = currentTrack[type];
    p.style.width = '350px'; 
    p.style.borderLeft = '1px solid #1a1a1a';
    
    lyricsBtn.classList.toggle('active', type === 'lyrics');
    creditsBtn.classList.toggle('active', type === 'credits');
}

function closeRightPanel() { 
    document.getElementById('right-panel').style.width = '0'; 
    document.getElementById('right-panel').style.borderLeft = '0';
    document.getElementById('lyrics-btn').classList.remove('active');
    document.getElementById('credits-btn').classList.remove('active');
    activePanelType = null;
}

function toggleFullscreen() { 
    const fs = document.getElementById('fullscreen-overlay');
    if (fs.style.display === 'none' && currentTrack) {
        document.getElementById('fs-art').src = currentTrack.cover;
        document.getElementById('fs-lyrics').innerText = currentTrack.lyrics;
        fs.style.display = 'flex';
    } else { fs.style.display = 'none'; }
}

function setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT') return;
        if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
        if (e.code === 'ArrowRight') audio.currentTime += 5;
        if (e.code === 'ArrowLeft') audio.currentTime -= 5;
        if (e.code === 'KeyM') toggleMute();
    });
}

// --- HIGH PERFORMANCE SIDEBAR DRAG ---
function setupSidebarDrag() {
    const s = document.getElementById('sidebar');
    const h = document.getElementById('drag-handle');
    
    h.addEventListener('mousedown', (e) => {
        e.preventDefault();
        document.body.style.cursor = 'ew-resize';
        
        const moveHandler = (ev) => {
            // Use requestAnimationFrame for smooth 60fps dragging
            window.requestAnimationFrame(() => {
                let newWidth = ev.clientX - s.getBoundingClientRect().left;
                if (newWidth < 88) {
                    s.classList.add('sidebar-minimized');
                } else if (newWidth < 450) {
                    s.classList.remove('sidebar-minimized');
                    s.style.width = newWidth + 'px';
                }
            });
        };
        
        const upHandler = () => {
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mouseup', upHandler);
            document.body.style.cursor = 'default';
        };
        
        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', upHandler);
    });
}

function toggleSidebarSize() {
    const s = document.getElementById('sidebar');
    s.classList.toggle('sidebar-minimized');
    if (!s.classList.contains('sidebar-minimized')) s.style.width = '280px';
}

// --- AUDIO EVENTS ---
audio.onplay = () => handleAudioStatusChange(true);
audio.onpause = () => handleAudioStatusChange(false);
audio.onended = () => { if(!audio.loop) isShuffle ? skipTrack(1) : (audio.currentTime = 0, handleAudioStatusChange(false)); };
audio.ontimeupdate = () => { document.getElementById('progress-bar').style.width = (audio.currentTime/audio.duration)*100+'%'; document.getElementById('cur-time').innerText = formatTime(audio.currentTime); };
audio.onloadedmetadata = () => document.getElementById('total-time').innerText = formatTime(audio.duration);
document.getElementById('progress-container').onclick = (e) => audio.currentTime = ((e.clientX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth) * audio.duration;
document.getElementById('vol-slider').oninput = (e) => { audio.volume = e.target.value; if(audio.volume > 0) audio.muted = false; };
function formatTime(s) { let m=Math.floor(s/60), sec=Math.floor(s%60); return `${m}:${sec<10?'0':''}${sec}`; }

document.addEventListener('DOMContentLoaded', init);
init();
</script>

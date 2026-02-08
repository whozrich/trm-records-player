/**
 * TRM Music Player
 */

var ARTISTS = {
    'therichmusic': { name: 'therichmusic' }
};

var ALBUMS = [
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

var FEATURED_RELEASE_ID = 'rich-era'; 
var RECENT_RELEASE_IDS = ['rich-era', 'memories']; 

var SONG_DATA = {
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

var TRACKS = {
    'rich-era': [SONG_DATA['about-damn-time']],
    'memories': [SONG_DATA['memories']]
};

function init() {
    renderSidebar();
    viewHome(); 
}

function renderSidebar() {
    var sidebarNav = document.getElementById('sidebar-nav');
    var sidebarReleases = document.getElementById('sidebar-releases');

    if (sidebarNav) {
        sidebarNav.innerHTML = '<div class="sidebar-item" onclick="viewHome()" style="display:flex; align-items:center; padding:12px; cursor:pointer; border-radius:8px; margin-bottom:10px;"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" style="margin-right:15px; flex-shrink:0;"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg><span class="sidebar-full-elem" style="font-weight:600; font-family:sans-serif; color:#fff;">Home</span></div>';
    }

    if (sidebarReleases) {
        var albumHtml = '';
        for (var i = 0; i < ALBUMS.length; i++) {
            albumHtml += '<div class="sidebar-item" onclick="viewAlbum(\'' + ALBUMS[i].id + '\')" style="display:flex; align-items:center; padding:12px; cursor:pointer; border-radius:8px; margin-bottom:5px;"><img src="' + ALBUMS[i].art + '" style="width:30px; height:30px; border-radius:4px; margin-right:15px; flex-shrink:0; object-fit:cover;"><span class="sidebar-full-elem" style="font-size:14px; font-family:sans-serif; color:#fff;">' + ALBUMS[i].name + '</span></div>';
        }
        sidebarReleases.innerHTML = albumHtml;
    }
}

function viewHome() {
    var contentView = document.getElementById('content-view');
    if (!contentView) return;

    var featured = ALBUMS[0];
    for (var i = 0; i < ALBUMS.length; i++) {
        if (ALBUMS[i].id === FEATURED_RELEASE_ID) featured = ALBUMS[i];
    }

    var html = '<div style="padding: 30px; font-family: sans-serif;">';
    html += '<div onclick="viewAlbum(\'' + featured.id + '\')" style="cursor:pointer; background: linear-gradient(135deg, #1a1a1a, #000); border: 1px solid #333; border-radius: 20px; padding: 40px; display: flex; align-items: center; gap: 30px;">';
    html += '<img src="' + featured.art + '" style="width: 200px; height: 200px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">';
    html += '<div><span style="background: #00ff88; color: #000; padding: 4px 10px; border-radius: 4px; font-size: 10px; font-weight: 900;">FEATURED RELEASE</span>';
    html += '<h1 style="font-size: 50px; margin: 10px 0; color: #fff; font-family:sans-serif;">' + featured.name + '</h1>';
    html += '<p style="color: #888;">therichmusic</p></div></div>';
    
    html += '<h2 style="margin-top: 40px; color: #fff; font-family:sans-serif;">Recent Releases</h2>';
    html += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; margin-top: 20px;">';
    
    for (var j = 0; j < ALBUMS.length; j++) {
        html += '<div onclick="viewAlbum(\'' + ALBUMS[j].id + '\')" style="background: #111; padding: 15px; border-radius: 12px; cursor: pointer; border: 1px solid #222;">';
        html += '<img src="' + ALBUMS[j].art + '" style="width: 100%; border-radius: 8px;">';
        html += '<h4 style="margin: 10px 0 5px 0; color: #fff; font-family:sans-serif;">' + ALBUMS[j].name + '</h4>';
        html += '<p style="margin: 0; color: #666; font-size: 12px;">therichmusic</p></div>';
    }
    html += '</div></div>';
    
    contentView.innerHTML = html;
    contentView.scrollTop = 0;
}

function viewAlbum(id) {
    var album = ALBUMS[0];
    for (var i = 0; i < ALBUMS.length; i++) {
        if (ALBUMS[i].id === id) album = ALBUMS[i];
    }
    var tracks = TRACKS[id] || [];
    var contentView = document.getElementById('content-view');

    var html = '<div style="padding: 40px; font-family: sans-serif;">';
    html += '<div style="display: flex; gap: 30px; align-items: flex-end; margin-bottom: 40px;">';
    html += '<img src="' + album.art + '" style="width: 230px; height: 230px; border-radius: 10px;">';
    html += '<div><p style="color: #00ff88; font-weight: 800; font-size: 12px; margin: 0;">ALBUM</p>';
    html += '<h1 style="font-size: 60px; margin: 10px 0; color: #fff; font-family:sans-serif;">' + album.name + '</h1></div></div>';
    
    for (var k = 0; k < tracks.length; k++) {
        html += '<div style="display: flex; padding: 15px; border-bottom: 1px solid #222; color: #fff; font-family:sans-serif;">';
        html += '<span style="width: 30px; color: #666;">' + (k + 1) + '</span>';
        html += '<span style="flex: 1;">' + tracks[k].title + '</span>';
        html += '<span style="color: #666;">' + tracks[k].duration + '</span></div>';
    }
    html += '</div>';
    
    contentView.innerHTML = html;
    contentView.scrollTop = 0;
}

init();

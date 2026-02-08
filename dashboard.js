<div id="dashboard-wrapper" style="font-family: sans-serif; background: #000; color: #fff; display: flex; height: 100vh; overflow: hidden;">
    <div style="width: 260px; background: #000; border-right: 1px solid #222; display: flex; flex-direction: column;">
        <div id="sidebar-nav" style="padding: 20px 10px 10px 10px;"></div>
        <div id="sidebar-releases" style="flex: 1; overflow-y: auto; padding: 0 10px;"></div>
    </div>

    <div id="content-view" style="flex: 1; overflow-y: auto; background: linear-gradient(to bottom, #121212, #000);">
        <div style="padding: 40px;">Loading Dashboard...</div>
    </div>
</div>

<script>
(function() {
    var ARTISTS = { 'therichmusic': { name: 'therichmusic' } };
    var ALBUMS = [
        { id: 'rich-era', name: 'RICH ERA', art: 'https://images2.imgbox.com/01/3b/p1pphY1X_o.png', artistId: 'therichmusic' },
        { id: 'memories', name: 'memories.', art: 'https://images2.imgbox.com/71/3b/q9zN6GfU_o.png', artistId: 'therichmusic' }
    ];

    var SONG_DATA = {
        "about-damn-time": { id: "about-damn-time", title: "ABOUT DAMN TIME", duration: "2:12" },
        "memories": { id: "memories", title: "memories.", duration: "2:10" }
    };

    var TRACKS = {
        'rich-era': [SONG_DATA['about-damn-time']],
        'memories': [SONG_DATA['memories']]
    };

    window.viewHome = function() {
        var contentView = document.getElementById('content-view');
        if (!contentView) return;

        var featured = ALBUMS[0];
        var html = '<div style="padding: 40px;">';
        html += '<div onclick="viewAlbum(\'rich-era\')" style="cursor:pointer; background: #181818; border-radius: 15px; padding: 40px; display: flex; align-items: center; gap: 30px; border: 1px solid #333;">';
        html += '<img src="' + featured.art + '" style="width: 200px; height: 200px; border-radius: 10px;">';
        html += '<div><span style="background: #00ff88; color: #000; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: 900;">FEATURED</span>';
        html += '<h1 style="font-size: 48px; margin: 10px 0;">' + featured.name + '</h1>';
        html += '<p style="color: #888;">therichmusic</p></div></div>';
        
        html += '<h2 style="margin-top: 40px;">Recent Releases</h2>';
        html += '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; margin-top: 20px;">';
        for (var i = 0; i < ALBUMS.length; i++) {
            html += '<div onclick="viewAlbum(\'' + ALBUMS[i].id + '\')" style="background: #111; padding: 15px; border-radius: 12px; cursor: pointer; border: 1px solid #222;">';
            html += '<img src="' + ALBUMS[i].art + '" style="width: 100%; border-radius: 8px; margin-bottom: 10px;">';
            html += '<h4 style="margin: 0;">' + ALBUMS[i].name + '</h4><p style="color: #666; font-size: 12px; margin: 5px 0 0 0;">therichmusic</p></div>';
        }
        html += '</div></div>';
        contentView.innerHTML = html;
    };

    window.viewAlbum = function(id) {
        var album = ALBUMS.find(function(a) { return a.id === id; });
        var tracks = TRACKS[id] || [];
        var contentView = document.getElementById('content-view');
        
        var html = '<div style="padding: 40px;">';
        html += '<div style="display: flex; gap: 30px; align-items: flex-end; margin-bottom: 40px;">';
        html += '<img src="' + album.art + '" style="width: 230px; height: 230px; border-radius: 10px;">';
        html += '<div><p style="color: #00ff88; font-weight: 800; font-size: 12px; margin: 0;">ALBUM</p><h1 style="font-size: 60px; margin: 10px 0;">' + album.name + '</h1></div></div>';
        
        for (var j = 0; j < tracks.length; j++) {
            html += '<div style="display: flex; padding: 15px; border-bottom: 1px solid #222;">';
            html += '<span style="width: 30px; color: #666;">' + (j + 1) + '</span>';
            html += '<span style="flex: 1;">' + tracks[j].title + '</span>';
            html += '<span style="color: #666;">' + tracks[j].duration + '</span></div>';
        }
        html += '</div>';
        contentView.innerHTML = html;
    };

    // Sidebar Render
    var sidebarNav = document.getElementById('sidebar-nav');
    sidebarNav.innerHTML = '<div onclick="viewHome()" style="display:flex; align-items:center; padding:12px; cursor:pointer; border-radius:8px;"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" style="margin-right:15px;"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg><b>Home</b></div>';

    var sidebarReleases = document.getElementById('sidebar-releases');
    var relHtml = '';
    for (var k = 0; k < ALBUMS.length; k++) {
        relHtml += '<div onclick="viewAlbum(\'' + ALBUMS[k].id + '\')" style="display:flex; align-items:center; padding:10px; cursor:pointer;"><img src="' + ALBUMS[k].art + '" style="width:30px; height:30px; border-radius:4px; margin-right:15px;"><span>' + ALBUMS[k].name + '</span></div>';
    }
    sidebarReleases.innerHTML = relHtml;

    viewHome();
})();
</script>

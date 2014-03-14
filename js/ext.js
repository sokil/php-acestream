var AceStreamPlayer = function(container, options) {
    
    this._deferred = $.Deferred();
    
    // options
    this._options = $.extend({}, {
        debug: false,
        controls: true,
        onload: function() {},
        deinterlace: {
            status: 'auto',
            mode: 'yadif'
        },
        media: null
    }, options);
    
    // currently playing url
    this._currentUrl = null;
    
    // init player
    this._player = null;
    this._initPlayer(container);
    
};

AceStreamPlayer.prototype = {
    
    _initPlayer: function(container) {
            
        var self = this;
    
        /**
         * OnLoad events
         */
        // add onload event to onload event's pool
        if(this._options.onload) {
            this._deferred.done(this._options.onload);
        }

        // add autostart media to onload event's pool
        if(this._options.media) {
            if(this._options.media.url) {
                if(this._options.media.name) {
                    this.play(this._options.media.url, this._options.media.name);
                }
                else {
                    this.play(this._options.media.url);
                }
            }
            else {
                this.play(this._options.media);
            }
        }
        
        // init player after page load
        $(function() {
            try {
                // start init player
                self._player = new TorrentStream.Player(container, {
                    useInternalControls: true,
                    debug: self._options.debug,
                    onLoad: function() {
                        setTimeout(function() {
                            self._deferred.resolveWith(self);
                        }, 500);
                    }
                });
            }
            catch(e) {
                self._deferred.rejectWith(self);
                return;
            }

            // configure plugin
            self._plugin = self._player.getPlugin();
            self._plugin.deinterlaceStatus = self._options.deinterlace.status;
            self._plugin.deinterlaceMode = self._options.deinterlace.mode;
        });
    },
    
    isEngineStoped: function() { return 0 === this._plugin.state; },
    isEnginePrebuffering: function() { return 1 === this._plugin.state; },
    isEngineDownloading: function() { return 2 === this._plugin.state; },
    isEngineBuffering: function() { return 3 === this._plugin.state; },
    isEngineComplete: function() { return 4 === this._plugin.state; },
    isEngineHashChecking: function() { return 5 === this._plugin.state; },
    isEngineError: function() { return 6 === this._plugin.state; },
    isEngineConnecting: function() { return 7 === this._plugin.state; },
    isEnginePlaylistDownloading: function() { return 8 === this._plugin.state; },
    
    isIdle: function() { return 0 === this._plugin.inputState; },
    isOpening: function() { return 1 === this._plugin.inputState; },
    isBuffering: function() { return 2 === this._plugin.inputState; },
    isPlaying: function() { return 3 === this._plugin.inputState; },
    isPaused: function() { return 4 === this._plugin.inputState; },
    isStopping: function() { return 5 === this._plugin.inputState; },
    isStopped: function() { return 6 === this._plugin.inputState; },
    isPluginError: function() { return 7 === this._plugin.inputState; },
    
    isPlayingPrepared: function() {
        return this.isOpening() || this.isBuffering();
    },
    
    play: function(item, name) {
        
        this._deferred.done(function() {
            
            var self = this;
            
            // prevent from starting play same item
            if(item === this._currentUrl && (this.isPlayingPrepared() || this.isPlaying())) {
                return;
            }

            // remember currently playing item
            this._currentUrl = item;

            // get name
            if(!name) {
                name = "";
            }

            // playlist index
            if(typeof item === "number") {
                this._player.play(item, {name:name});
            }

            // URL
            else if(/^[a-z]+:\/\/.*$/.test(item)) {
                // torrent
                if(/\.(torrent|acelive|acestream)$/.test(item)) {
                    this._player.playlistClear();
                    setTimeout(function() {
                        self._player.loadTorrent(item, {async: false, name: name, autoplay: true}); 
                    }, 500);
                }
                // file
                else {
                    this._player.playlistClear();
                    var plugin = this._player.getPlugin(); 
                    plugin.playlistAdd(item, name); 
                    plugin.playlistPlay();
                }
            }
            // content id
            else {
                this._player.playlistClear(); 
                this._player.loadPlayer(item, {name:name});
                this._player.play(0);
            }
        });
    }
};










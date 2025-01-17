/*
 * Video.js plugin for Pannellum
 * Copyright (c) 2015-2018 Matthew Petroff
 * MIT License
 */
import videojs from 'video.js'

(function(document, videojs, pannellum) {
    'use strict';
    
    videojs.registerPlugin('pannellum', function(config) {
        // Create Pannellum instance
        var player = this;
        var container = player.el();
        var vid = container.getElementsByTagName('video')[0],
            pnlmContainer = document.createElement('div');
        config = config || {};
        config.type = 'equirectangular';
        config.dynamic = true;
        config.showZoomCtrl = false;
        config.showFullscreenCtrl = false;
        config.autoLoad = true;
        config.panorama = vid;
        pnlmContainer.style.visibility = 'hidden';
        player.pnlmViewer = pannellum.viewer(pnlmContainer, config);
        container.insertBefore(pnlmContainer, container.firstChild);
        vid.style.display = 'none';
    
        // Handle update settings
        player.on('play', function() {
            if (vid.readyState > 1)
                player.pnlmViewer.setUpdate(true);
        });
        player.on('canplay', function() {
            if (!player.paused())
                player.pnlmViewer.setUpdate(true);
        });
        player.on('pause', function() {
            player.pnlmViewer.setUpdate(false);
        });
        player.on('loadeddata', function() {
            pnlmContainer.style.visibility = 'visible';
        });
        player.on('seeking', function() {
            if (player.paused())
                player.pnlmViewer.setUpdate(true);
        });
        player.on('seeked', function() {
            if (player.paused())
                player.pnlmViewer.setUpdate(false);
        });
        player.on('timeupdate', function() {
            console.log('Current time: ' + player.currentTime());
        });
    });
    
    })(document, videojs, pannellum);
    
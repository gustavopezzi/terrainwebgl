// configure require.js
var require = {
    baseUrl: 'js/app',
    shim: {
        'threeCore': { exports: 'THREE' },
        'TrackballControls': { deps: ['threeCore'], exports: 'THREE' },
        'ImprovedNoise': { exports: 'ImprovedNoise' },
        'detector': { exports: 'Detector' },
        'stats': { exports: 'Stats' }
    },
    paths: {
        three: '../lib/three',
        threeCore: '../lib/three.min',
        TrackballControls: '../lib/controls/TrackballControls',
        ImprovedNoise: '../lib/ImprovedNoise',
        detector: '../lib/Detector',
        stats: '../lib/stats.min',
        text: '../lib/text',
        shader: '../lib/shader',
        shaders: '../shaders'
    }
};

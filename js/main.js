// start the app
require(['detector', 'app', 'container'], function(Detector, app, container) {
    if (!Detector.webgl) {
        Detector.addGetWebGLMessage();
        container.innerHTML = "";
    }

    // initialize our app and start the animation loop
    app.init();
    app.animate();
});
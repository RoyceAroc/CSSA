window.addEventListener('load', function () {
    var canvasDiv = document.getElementById('particle-canvas');
    var options = {
        particleColor: '#0097a7',
        background: 'back.png',
        interactive: true,
        speed: 'medium',
        density: 'medium'
    };

    var particleCanvas = new ParticleNetwork(canvasDiv, options);
});
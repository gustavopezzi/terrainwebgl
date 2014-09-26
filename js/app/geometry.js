define(["three"],
    function(THREE) {
		return {
			cube: new THREE.CubeGeometry(200, 200, 200),
			sky: new THREE.PlaneGeometry(1600, 1600)
		};
    }
);
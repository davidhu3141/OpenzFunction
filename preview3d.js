function preview_3d_render (element, geometry, wire) {

	var scene = new THREE.Scene();
	var ratio = 4/3;
    var camera = new THREE.PerspectiveCamera(60, ratio, 0.1, 1000);

    var renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer({ alpha: true }) : new THREE.CanvasRenderer();
	var rendererSz = window.innerWidth/3;    
	renderer.setSize(rendererSz, rendererSz/ratio);
    element.appendChild(renderer.domElement);

	var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
	scene.add( light );

	var light = new THREE.PointLight( 0xff0000, 1, 100 );
	light.position.set( 500, 50, 50 );
	scene.add( light );

	var material = new THREE.MeshLambertMaterial({ color: 0x2194ce, wireframe:wire }); 

	material.side = THREE.DoubleSide;
	var prevMesh = new THREE.Mesh(geometry, material);
	scene.add(prevMesh);

	camera.position.z = 50; // Move the camera away from the origin, down the positive z-axis.

	var render = function (rotateZ, rotateX) {
	  prevMesh.rotation.z = rotateZ;
	  prevMesh.rotation.x = rotateX;

	  renderer.render(scene, camera); // Each time we change the position of the prevMesh object, we must re-render it.
	};

	var startposX = 0;
	var startposY = 0;
	var isdown = false;
	var currentRotateZ = 0;
	var currentRotateX = 2;

	render(currentRotateZ, currentRotateX); // Start the rendering of the animation frames.

	renderer.domElement.addEventListener("mousedown", function(e){
		startposX = e.clientX;
		startposY = e.clientY;
		isdown = true;
	});
	renderer.domElement.addEventListener("mouseup", function(e){
		currentRotateZ -= (e.clientX - startposX) / 50;
		currentRotateX += (e.clientY - startposY) / 50;
		isdown = false;
	});
	renderer.domElement.addEventListener("mouseleave", function(e){
		currentRotateZ -= (e.clientX - startposX) / 50;
		currentRotateX += (e.clientY - startposY) / 50;
		isdown = false;
	});
	renderer.domElement.addEventListener("mousemove", function(e){
		if(isdown){
			render(
					currentRotateZ - (e.clientX - startposX) / 50,
					currentRotateX + (e.clientY - startposY) / 50
			);
		}
	});

}

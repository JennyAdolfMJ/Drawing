var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

document.addEventListener( 'mousedown', onDocumentMouseDown, false );
//document.addEventListener( 'mousemove', onDocumentMouseMove, false );

camera.position.z = 5;

var animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;

};

renderer.render(scene, camera);

var change = false;
var originPos = null;
var lastScale = new THREE.Vector3(1,1,1);

function onDocumentMouseDown(event)
{
    change = !change;
    if (change)
    {
        originPos = convertToCoord(event.clientX, event.clientY);
        geometry.translate(0,0,1)//position = originPos;
        renderer.render(scene, camera);
    }
}

function onDocumentMouseMove(event)
{
    if (change)
    {
        newPos = convertToCoord(event.clientX, event.clientY);
        newScale = newPos - originPos;
        geometry.scale = (1+(newScale.x/lastScale.x),1+(newScale.y/originPos.y), 1);
        lastScale = newScale;
        //renderer.render(scene, camera);
    }

}

function convertToCoord(clientX, clientY)
{
    console.log("cx: " + clientX + ", cy: " + clientY);
    var mv = new THREE.Vector3(
        (clientX / window.innerWidth) * 2 - 1,
        -(clientY / window.innerHeight) * 2 + 1,
        0.5 );
    console.log("mx: " + mv.x + ", my: " + mv.y+", mz:"+mv.z);
    mv.unproject(this.camera);
    console.log("x: " + mv.x + ", y: " + mv.y+", z:"+mv.z);
    return mv;
}
//animate();
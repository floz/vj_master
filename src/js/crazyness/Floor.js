class Floor extends THREE.Mesh {

  constructor() {
    const phongMaterial = new THREE.MeshPhongMaterial( { color: 0xaaaaaa, shininess: 0, specular: 0x050505, shading: THREE.SmoothShading } )
    super( new THREE.PlaneBufferGeometry( 1, 1, 1, 1 ), phongMaterial )

    this.scale.set( 10000, 10000, 1 )
    this.receiveShadow = true
  }

}

module.exports = Floor

let HUEMain = 216
let HUESecondary = 18

let colorAmbient = null
let colorSpotlight = null
let colorFog = null

module.exports.set = ( value ) => {
  HUEMain = value % 360
  HUESecondary = ( value - 180 ) % 360

  let hue = HUEMain / 360
  let sat = 1
  let lum = .5
  colorAmbient = new THREE.Color().setHSL( hue, sat, lum )

  hue = HUEMain / 360
  sat = .5
  lum = .2
  colorSpotlight = new THREE.Color().setHSL( hue, sat, lum )

  hue = HUEMain / 360
  sat = .5
  lum = .15
  colorFog = new THREE.Color().setHSL( hue, sat, lum )
}

module.exports.get = ( lumVal ) => {
  let hue = 0
  let sat = 1
  if( Math.random() > .1 ) {
    hue = ( ( HUEMain + Math.random() * 40 - 20 ) % 360 ) / 360
    sat = .6
  } else {
    hue = ( ( HUESecondary + Math.random() * 40 - 20 ) % 360 ) / 360
    sat = .9
  }
  const lum = ( .2 + Math.random() * .5 ) * lumVal
  return new THREE.Color().setHSL( hue, sat, lum )
}

module.exports.getAmbient = () => {
  return colorAmbient
}

module.exports.getSpotLight = () => {
  return colorSpotlight
}

module.exports.getFog = () => {
  return colorFog
}

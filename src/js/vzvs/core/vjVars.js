const Signal = require( "mnf/events/Signal" )
const stage3d = require( "mnf/core/stage3d" )

const coreData = require( "vzvs/core/data" )

const data = {
  elements: {
    zChange: 50
  },
  particles: {
    depthValue: 350,
    sizeAdd: 3
  },
  signs: {
    zChange: 100
  },
  picture: {
    canDisplaceOffsetX: false,
    canDisplaceOffsetY: false,
    canAutoUpdate: true,
    canAutoSwirl: false,
    canAutoGranularityX: false,
    canAutoGranularityY: false,
    crazyMode: false
  },
  sequence: {
    autoChangeStyle: false,
    autoChangeFrame: false,
    autoChangeCameraPos: true
  }
}

const onReset = new Signal()
const onChangeStyle = new Signal()
const onChangeFrame = new Signal()

const keyboard = require( "mnf/utils/keyboard" )
function onKeyDown( touch, e ) {
  if( touch == keyboard.touches[ "[" ] ) {
    data.picture.canDisplaceOffsetX = !data.picture.canDisplaceOffsetX
  }
  if( touch == keyboard.touches[ "]" ] ) {
    data.picture.canDisplaceOffsetY = !data.picture.canDisplaceOffsetY
  }
  if( touch == keyboard.touches[ "a" ] ) {
    data.picture.canAutoUpdate = !data.picture.canAutoUpdate
  }
  if( touch == keyboard.touches[ "c" ] ) {
    data.picture.crazyMode = !data.picture.crazyMode
  }
  if( touch == keyboard.touches[ "s" ] ) {
    data.picture.canAutoSwirl = !data.picture.canAutoSwirl
  }
  if( touch == keyboard.touches[ "g" ] ) {
    data.picture.canAutoGranularityX = !data.picture.canAutoGranularityX
  }
  if( touch == keyboard.touches[ "h" ] ) {
    data.picture.canAutoGranularityY = !data.picture.canAutoGranularityY
  }
  if( touch == keyboard.touches[ "o" ] ) {
    data.sequence.autoChangeFrame = !data.sequence.autoChangeFrame
  }
  if( touch == keyboard.touches[ "p" ] ) {
    data.sequence.autoChangeStyle = !data.sequence.autoChangeStyle
  }
  if( touch == keyboard.touches[ "enter" ] ) {
    onChangeStyle.dispatch()
  }
  if( touch == keyboard.touches[ "space" ] ) {
    onChangeFrame.dispatch()
  }
  if( touch == keyboard.touches[ "r" ] ) {
    data.picture.canDisplaceOffsetX = false
    data.picture.canDisplaceOffsetY = false
    data.picture.canAutoGranularityX = false
    data.picture.canAutoGranularityY = false
    data.picture.canAutoUpdate = false
    data.picture.canAutoSwirl = false
    data.picture.crazyMode = false
    onReset.dispatch()
  }
  if( touch == keyboard.touches[ "z" ] ) {
    TweenLite.killTweensOf( stage3d.control )
    stage3d.control.radius = stage3d.control.__radius = coreData.camera.distance + 300
    stage3d.control._phi = Math.PI * .5
    stage3d.control._theta = Math.PI * .5
  }
  if( touch == keyboard.touches[ "x" ] ) {
    data.sequence.autoChangeCameraPos = !data.sequence.autoChangeCameraPos
  }
}


module.exports = data
module.exports.onReset = onReset
module.exports.onChangeFrame = onChangeFrame
module.exports.onChangeStyle = onChangeStyle

module.exports.activate = () => {
  keyboard.onDown.add( onKeyDown )
}
module.exports.dispose = () => {
  keyboard.onDown.remove( onKeyDown )
}

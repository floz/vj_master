const PaletteBooleanButton = require( "./PaletteBooleanButton" )
const PaletteNumberButton = require( "./PaletteNumberButton" )

class PaletteGear {

  constructor( input, output ) {
    this.input = input
    if( this.input ) {
      this.input.onmidimessage = this.onMIDIMessage
    }
    this.output = output

    this.initGear()
  }

  onMIDIMessage = ( message ) => {
    const id = message.target.id
    const data = message.data
    const cmd = data[ 0 ] >> 4
    const channel = data[ 0 ] & 0xf
    const type = data[ 0 ] & 0xf0
    const note = data[ 1 ]
    const percent = data[ 2 ] / 127

    // console.log( id, data )
    // console.log( "cmd", cmd )
    // console.log( "channel", channel )
    // console.log( "type", type )
    // console.log( "note", note )
    // console.log( "percent", percent )

    const plug = this.plugs[ note ]
    if( plug ) {
      if( plug.type == "boolean" ) {
        plug.state = type
      } else if ( plug.type == "number" ) {
        plug.percent = percent
      }
    }
  }

  initGear() {
    this.plugs = []

    this.buttons = {}
    this.buttons.blue = this.register( new PaletteBooleanButton( "blue" ), 34 )
    this.buttons.green = this.register( new PaletteBooleanButton( "green" ), 33 )

    this.sliders = {}
    this.sliders.blue = this.register( new PaletteNumberButton( "blue" ), 101 )
    this.sliders.green = this.register( new PaletteNumberButton( "green" ), 100 )

    this.dials = {}
    this.dials.purple = this.register( new PaletteNumberButton( "purple" ), 0 )
    this.dials.yellow = this.register( new PaletteNumberButton( "yellow" ), 1 )
    this.dials.cyan = this.register( new PaletteNumberButton( "cyan" ), 2 )
    this.dials.green = this.register( new PaletteNumberButton( "green" ), 3 )
  }

  register( plug, code ) {
    this.plugs[ code ] = plug
    return plug
  }

}

module.exports = PaletteGear

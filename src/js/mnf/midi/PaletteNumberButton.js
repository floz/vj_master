const Signals = require( "mnf/events/Signal" )

class PaletteNumberButton {

  constructor( idColor ) {
    this.type = "number"
    this.idColor = idColor

    this._percent = 0

    this.onPercentChange = new Signals()
  }

  set percent( value ) {
    this._percent = value
    this.onPercentChange.dispatch( this._percent, this.idColor )
  }
  get percent() { return this._percent }

}

module.exports = PaletteNumberButton

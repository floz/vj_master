const Signals = require( "mnf/events/Signal" )

class PaletteBooleanButton {

  constructor( idColor ) {
    this.type = "boolean"
    this.idColor = idColor

    this._state = "released"

    this.onAction = new Signals()
  }

  set state( value ) {
    this._state = value == 144 ? "pressed" : "released"
    this.onAction.dispatch( this._state, this.idColor )
  }
  get state() { return this._state }
}

module.exports = PaletteBooleanButton

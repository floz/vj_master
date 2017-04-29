const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
const COUNT_CHARS = CHARS.length

module.exports.generate = () => {
    s = ""

    for( let i = 0; i < 14; i++ ) {
        idx = Math.random() * COUNT_CHARS >> 0
        s += CHARS[ idx ]
    }

    return s
}

module.exports.add0 = ( idx, length ) => {
  idx = "" + idx
  const n = length - idx.length
  for( let i = 0; i < n; i++ ) {
    idx = "0" + idx
  }
  return idx
}

module.exports.capitalizeFirstLetter = ( string ) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

module.exports.getFileNameFromURL = ( url ) => {
  let value = url.substr( url.lastIndexOf( "/" ) + 1 )
  value = value.substr( 0, value.lastIndexOf( "." ) )
  return value
}

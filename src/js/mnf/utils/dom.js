module.exports.indexOf = ( dom ) => {
	return Array.prototype.indexOf.call( dom.parentNode.children, dom )
}

const transformPrefix = (function(){
	var testEl = document.createElement('div');
	if(testEl.style.transform == null) {
	var vendors = ['Webkit', 'Moz', 'ms'];
	for(var vendor in vendors) {
		if(testEl.style[ vendors[vendor] + 'Transform' ] !== undefined) {
		return vendors[vendor] + 'Transform';
		}
	}
	}
	return 'transform';
})();

module.exports.getXInPage = ( dom ) => {
	let x = dom.offsetLeft
	while( dom = dom.parentNode ) {
		if( dom == document.body ) {
			break
		}
		// console.log( "dom", dom )
		x += dom.offsetLeft
	}
	return x
}

module.exports.transformPrefix = transformPrefix

module.exports.addAbsolute = ( dom ) => {
	dom.style.position = "absolute"
	dom.style.zIndex = 9999
	dom.style.top = 0
	dom.style.left = 0
	document.body.append( dom )
}

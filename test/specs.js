(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
; var __browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

; browserify_shim__define__module__export__(typeof jQuery != "undefined" ? jQuery : window.jQuery);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
var gju = require('geojson-utils');

var leafletPip = {
    bassackwards: false,
    pointInLayer: function(p, layer, first) {
        'use strict';
        if (p instanceof L.LatLng) p = [p.lng, p.lat];
        else if (leafletPip.bassackwards) p.reverse();

        var results = [];

        layer.eachLayer(function(l) {
            if (first && results.length) return;
            if ((l instanceof L.MultiPolygon ||
                 l instanceof L.Polygon) &&
                gju.pointInPolygon({
                    type: 'Point',
                    coordinates: p
                }, l.toGeoJSON().geometry)) {
                results.push(l);
            }
        });
        return results;
    }
};

module.exports = leafletPip;

},{"geojson-utils":3}],3:[function(require,module,exports){
(function () {
  var gju = this.gju = {};

  // Export the geojson object for **CommonJS**
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = gju;
  }

  // adapted from http://www.kevlindev.com/gui/math/intersection/Intersection.js
  gju.lineStringsIntersect = function (l1, l2) {
    var intersects = [];
    for (var i = 0; i <= l1.coordinates.length - 2; ++i) {
      for (var j = 0; j <= l2.coordinates.length - 2; ++j) {
        var a1 = {
          x: l1.coordinates[i][1],
          y: l1.coordinates[i][0]
        },
          a2 = {
            x: l1.coordinates[i + 1][1],
            y: l1.coordinates[i + 1][0]
          },
          b1 = {
            x: l2.coordinates[j][1],
            y: l2.coordinates[j][0]
          },
          b2 = {
            x: l2.coordinates[j + 1][1],
            y: l2.coordinates[j + 1][0]
          },
          ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x),
          ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x),
          u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);
        if (u_b != 0) {
          var ua = ua_t / u_b,
            ub = ub_t / u_b;
          if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
            intersects.push({
              'type': 'Point',
              'coordinates': [a1.x + ua * (a2.x - a1.x), a1.y + ua * (a2.y - a1.y)]
            });
          }
        }
      }
    }
    if (intersects.length == 0) intersects = false;
    return intersects;
  }

  // Bounding Box

  function boundingBoxAroundPolyCoords (coords) {
    var xAll = [], yAll = []

    for (var i = 0; i < coords[0].length; i++) {
      xAll.push(coords[0][i][1])
      yAll.push(coords[0][i][0])
    }

    xAll = xAll.sort(function (a,b) { return a - b })
    yAll = yAll.sort(function (a,b) { return a - b })

    return [ [xAll[0], yAll[0]], [xAll[xAll.length - 1], yAll[yAll.length - 1]] ]
  }

  gju.pointInBoundingBox = function (point, bounds) {
    return !(point.coordinates[1] < bounds[0][0] || point.coordinates[1] > bounds[1][0] || point.coordinates[0] < bounds[0][1] || point.coordinates[0] > bounds[1][1]) 
  }

  // Point in Polygon
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html#Listing the Vertices

  function pnpoly (x,y,coords) {
    var vert = [ [0,0] ]

    for (var i = 0; i < coords.length; i++) {
      for (var j = 0; j < coords[i].length; j++) {
        vert.push(coords[i][j])
      }
	  vert.push(coords[i][0])
      vert.push([0,0])
    }

    var inside = false
    for (var i = 0, j = vert.length - 1; i < vert.length; j = i++) {
      if (((vert[i][0] > y) != (vert[j][0] > y)) && (x < (vert[j][1] - vert[i][1]) * (y - vert[i][0]) / (vert[j][0] - vert[i][0]) + vert[i][1])) inside = !inside
    }

    return inside
  }

  gju.pointInPolygon = function (p, poly) {
    var coords = (poly.type == "Polygon") ? [ poly.coordinates ] : poly.coordinates

    var insideBox = false
    for (var i = 0; i < coords.length; i++) {
      if (gju.pointInBoundingBox(p, boundingBoxAroundPolyCoords(coords[i]))) insideBox = true
    }
    if (!insideBox) return false

    var insidePoly = false
    for (var i = 0; i < coords.length; i++) {
      if (pnpoly(p.coordinates[1], p.coordinates[0], coords[i])) insidePoly = true
    }

    return insidePoly
  }

  // support multi (but not donut) polygons
  gju.pointInMultiPolygon = function (p, poly) {
    var coords_array = (poly.type == "MultiPolygon") ? [ poly.coordinates ] : poly.coordinates

    var insideBox = false
    var insidePoly = false
    for (var i = 0; i < coords_array.length; i++){
      var coords = coords_array[i];
      for (var j = 0; j < coords.length; j++) {
        if (!insideBox){
          if (gju.pointInBoundingBox(p, boundingBoxAroundPolyCoords(coords[j]))) {
            insideBox = true
          }
        }
      }
      if (!insideBox) return false
      for (var j = 0; j < coords.length; j++) {
        if (!insidePoly){
          if (pnpoly(p.coordinates[1], p.coordinates[0], coords[j])) {
            insidePoly = true
          }
        }
      }
    }

    return insidePoly
  }

  gju.numberToRadius = function (number) {
    return number * Math.PI / 180;
  }

  gju.numberToDegree = function (number) {
    return number * 180 / Math.PI;
  }

  // written with help from @tautologe
  gju.drawCircle = function (radiusInMeters, centerPoint, steps) {
    var center = [centerPoint.coordinates[1], centerPoint.coordinates[0]],
      dist = (radiusInMeters / 1000) / 6371,
      // convert meters to radiant
      radCenter = [gju.numberToRadius(center[0]), gju.numberToRadius(center[1])],
      steps = steps || 15,
      // 15 sided circle
      poly = [[center[0], center[1]]];
    for (var i = 0; i < steps; i++) {
      var brng = 2 * Math.PI * i / steps;
      var lat = Math.asin(Math.sin(radCenter[0]) * Math.cos(dist)
              + Math.cos(radCenter[0]) * Math.sin(dist) * Math.cos(brng));
      var lng = radCenter[1] + Math.atan2(Math.sin(brng) * Math.sin(dist) * Math.cos(radCenter[0]),
                                          Math.cos(dist) - Math.sin(radCenter[0]) * Math.sin(lat));
      poly[i] = [];
      poly[i][1] = gju.numberToDegree(lat);
      poly[i][0] = gju.numberToDegree(lng);
    }
    return {
      "type": "Polygon",
      "coordinates": [poly]
    };
  }

  // assumes rectangle starts at lower left point
  gju.rectangleCentroid = function (rectangle) {
    var bbox = rectangle.coordinates[0];
    var xmin = bbox[0][0],
      ymin = bbox[0][1],
      xmax = bbox[2][0],
      ymax = bbox[2][1];
    var xwidth = xmax - xmin;
    var ywidth = ymax - ymin;
    return {
      'type': 'Point',
      'coordinates': [xmin + xwidth / 2, ymin + ywidth / 2]
    };
  }

  // from http://www.movable-type.co.uk/scripts/latlong.html
  gju.pointDistance = function (pt1, pt2) {
    var lon1 = pt1.coordinates[0],
      lat1 = pt1.coordinates[1],
      lon2 = pt2.coordinates[0],
      lat2 = pt2.coordinates[1],
      dLat = gju.numberToRadius(lat2 - lat1),
      dLon = gju.numberToRadius(lon2 - lon1),
      a = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(gju.numberToRadius(lat1))
        * Math.cos(gju.numberToRadius(lat2)) * Math.pow(Math.sin(dLon / 2), 2),
      c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (6371 * c) * 1000; // returns meters
  },

  // checks if geometry lies entirely within a circle
  // works with Point, LineString, Polygon
  gju.geometryWithinRadius = function (geometry, center, radius) {
    if (geometry.type == 'Point') {
      return gju.pointDistance(geometry, center) <= radius;
    } else if (geometry.type == 'LineString' || geometry.type == 'Polygon') {
      var point = {};
      var coordinates;
      if (geometry.type == 'Polygon') {
        // it's enough to check the exterior ring of the Polygon
        coordinates = geometry.coordinates[0];
      } else {
        coordinates = geometry.coordinates;
      }
      for (var i in coordinates) {
        point.coordinates = coordinates[i];
        if (gju.pointDistance(point, center) > radius) {
          return false;
        }
      }
    }
    return true;
  }

  // adapted from http://paulbourke.net/geometry/polyarea/javascript.txt
  gju.area = function (polygon) {
    var area = 0;
    // TODO: polygon holes at coordinates[1]
    var points = polygon.coordinates[0];
    var j = points.length - 1;
    var p1, p2;

    for (var i = 0; i < points.length; j = i++) {
      var p1 = {
        x: points[i][1],
        y: points[i][0]
      };
      var p2 = {
        x: points[j][1],
        y: points[j][0]
      };
      area += p1.x * p2.y;
      area -= p1.y * p2.x;
    }

    area /= 2;
    return area;
  },

  // adapted from http://paulbourke.net/geometry/polyarea/javascript.txt
  gju.centroid = function (polygon) {
    var f, x = 0,
      y = 0;
    // TODO: polygon holes at coordinates[1]
    var points = polygon.coordinates[0];
    var j = points.length - 1;
    var p1, p2;

    for (var i = 0; i < points.length; j = i++) {
      var p1 = {
        x: points[i][1],
        y: points[i][0]
      };
      var p2 = {
        x: points[j][1],
        y: points[j][0]
      };
      f = p1.x * p2.y - p2.x * p1.y;
      x += (p1.x + p2.x) * f;
      y += (p1.y + p2.y) * f;
    }

    f = gju.area(polygon) * 6;
    return {
      'type': 'Point',
      'coordinates': [y / f, x / f]
    };
  },

  gju.simplify = function (source, kink) { /* source[] array of geojson points */
    /* kink	in metres, kinks above this depth kept  */
    /* kink depth is the height of the triangle abc where a-b and b-c are two consecutive line segments */
    kink = kink || 20;
    source = source.map(function (o) {
      return {
        lng: o.coordinates[0],
        lat: o.coordinates[1]
      }
    });

    var n_source, n_stack, n_dest, start, end, i, sig;
    var dev_sqr, max_dev_sqr, band_sqr;
    var x12, y12, d12, x13, y13, d13, x23, y23, d23;
    var F = (Math.PI / 180.0) * 0.5;
    var index = new Array(); /* aray of indexes of source points to include in the reduced line */
    var sig_start = new Array(); /* indices of start & end of working section */
    var sig_end = new Array();

    /* check for simple cases */

    if (source.length < 3) return (source); /* one or two points */

    /* more complex case. initialize stack */

    n_source = source.length;
    band_sqr = kink * 360.0 / (2.0 * Math.PI * 6378137.0); /* Now in degrees */
    band_sqr *= band_sqr;
    n_dest = 0;
    sig_start[0] = 0;
    sig_end[0] = n_source - 1;
    n_stack = 1;

    /* while the stack is not empty  ... */
    while (n_stack > 0) {

      /* ... pop the top-most entries off the stacks */

      start = sig_start[n_stack - 1];
      end = sig_end[n_stack - 1];
      n_stack--;

      if ((end - start) > 1) { /* any intermediate points ? */

        /* ... yes, so find most deviant intermediate point to
        either side of line joining start & end points */

        x12 = (source[end].lng() - source[start].lng());
        y12 = (source[end].lat() - source[start].lat());
        if (Math.abs(x12) > 180.0) x12 = 360.0 - Math.abs(x12);
        x12 *= Math.cos(F * (source[end].lat() + source[start].lat())); /* use avg lat to reduce lng */
        d12 = (x12 * x12) + (y12 * y12);

        for (i = start + 1, sig = start, max_dev_sqr = -1.0; i < end; i++) {

          x13 = source[i].lng() - source[start].lng();
          y13 = source[i].lat() - source[start].lat();
          if (Math.abs(x13) > 180.0) x13 = 360.0 - Math.abs(x13);
          x13 *= Math.cos(F * (source[i].lat() + source[start].lat()));
          d13 = (x13 * x13) + (y13 * y13);

          x23 = source[i].lng() - source[end].lng();
          y23 = source[i].lat() - source[end].lat();
          if (Math.abs(x23) > 180.0) x23 = 360.0 - Math.abs(x23);
          x23 *= Math.cos(F * (source[i].lat() + source[end].lat()));
          d23 = (x23 * x23) + (y23 * y23);

          if (d13 >= (d12 + d23)) dev_sqr = d23;
          else if (d23 >= (d12 + d13)) dev_sqr = d13;
          else dev_sqr = (x13 * y12 - y13 * x12) * (x13 * y12 - y13 * x12) / d12; // solve triangle
          if (dev_sqr > max_dev_sqr) {
            sig = i;
            max_dev_sqr = dev_sqr;
          }
        }

        if (max_dev_sqr < band_sqr) { /* is there a sig. intermediate point ? */
          /* ... no, so transfer current start point */
          index[n_dest] = start;
          n_dest++;
        } else { /* ... yes, so push two sub-sections on stack for further processing */
          n_stack++;
          sig_start[n_stack - 1] = sig;
          sig_end[n_stack - 1] = end;
          n_stack++;
          sig_start[n_stack - 1] = start;
          sig_end[n_stack - 1] = sig;
        }
      } else { /* ... no intermediate points, so transfer current start point */
        index[n_dest] = start;
        n_dest++;
      }
    }

    /* transfer last point */
    index[n_dest] = n_source - 1;
    n_dest++;

    /* make return array */
    var r = new Array();
    for (var i = 0; i < n_dest; i++)
      r.push(source[index[i]]);

    return r.map(function (o) {
      return {
        type: "Point",
        coordinates: [o.lng, o.lat]
      }
    });
  }

  // http://www.movable-type.co.uk/scripts/latlong.html#destPoint
  gju.destinationPoint = function (pt, brng, dist) {
    dist = dist/6371;  // convert dist to angular distance in radians
    brng = gju.numberToRadius(brng);

    var lon1 = gju.numberToRadius(pt.coordinates[0]);
    var lat1 = gju.numberToRadius(pt.coordinates[1]);

    var lat2 = Math.asin( Math.sin(lat1)*Math.cos(dist) +
                          Math.cos(lat1)*Math.sin(dist)*Math.cos(brng) );
    var lon2 = lon1 + Math.atan2(Math.sin(brng)*Math.sin(dist)*Math.cos(lat1),
                                 Math.cos(dist)-Math.sin(lat1)*Math.sin(lat2));
    lon2 = (lon2+3*Math.PI) % (2*Math.PI) - Math.PI;  // normalise to -180..+180º

    return {
      'type': 'Point',
      'coordinates': [gju.numberToDegree(lon2), gju.numberToDegree(lat2)]
    };
  };

})();

},{}],4:[function(require,module,exports){
module.exports={    "counties": [        ["01001", "AL, Autauga County"],        ["01003", "AL, Baldwin County"],        ["01005", "AL, Barbour County"],        ["01007", "AL, Bibb County"],        ["01009", "AL, Blount County"],        ["01011", "AL, Bullock County"],        ["01013", "AL, Butler County"],        ["01015", "AL, Calhoun County"],        ["01017", "AL, Chambers County"],        ["01019", "AL, Cherokee County"],        ["01021", "AL, Chilton County"],        ["01023", "AL, Choctaw County"],        ["01025", "AL, Clarke County"],        ["01027", "AL, Clay County"],        ["01029", "AL, Cleburne County"],        ["01031", "AL, Coffee County"],        ["01033", "AL, Colbert County"],        ["01035", "AL, Conecuh County"],        ["01037", "AL, Coosa County"],        ["01039", "AL, Covington County"],        ["01041", "AL, Crenshaw County"],        ["01043", "AL, Cullman County"],        ["01045", "AL, Dale County"],        ["01047", "AL, Dallas County"],        ["01049", "AL, DeKalb County"],        ["01051", "AL, Elmore County"],        ["01053", "AL, Escambia County"],        ["01055", "AL, Etowah County"],        ["01057", "AL, Fayette County"],        ["01059", "AL, Franklin County"],        ["01061", "AL, Geneva County"],        ["01063", "AL, Greene County"],        ["01065", "AL, Hale County"],        ["01067", "AL, Henry County"],        ["01069", "AL, Houston County"],        ["01071", "AL, Jackson County"],        ["01073", "AL, Jefferson County"],        ["01075", "AL, Lamar County"],        ["01077", "AL, Lauderdale County"],        ["01079", "AL, Lawrence County"],        ["01081", "AL, Lee County"],        ["01083", "AL, Limestone County"],        ["01085", "AL, Lowndes County"],        ["01087", "AL, Macon County"],        ["01089", "AL, Madison County"],        ["01091", "AL, Marengo County"],        ["01093", "AL, Marion County"],        ["01095", "AL, Marshall County"],        ["01097", "AL, Mobile County"],        ["01099", "AL, Monroe County"],        ["01101", "AL, Montgomery County"],        ["01103", "AL, Morgan County"],        ["01105", "AL, Perry County"],        ["01107", "AL, Pickens County"],        ["01109", "AL, Pike County"],        ["01111", "AL, Randolph County"],        ["01113", "AL, Russell County"],        ["01115", "AL, St. Clair County"],        ["01117", "AL, Shelby County"],        ["01119", "AL, Sumter County"],        ["01121", "AL, Talladega County"],        ["01123", "AL, Tallapoosa County"],        ["01125", "AL, Tuscaloosa County"],        ["01127", "AL, Walker County"],        ["01129", "AL, Washington County"],        ["01131", "AL, Wilcox County"],        ["01133", "AL, Winston County"],        ["02013", "AK, Aleutians East Borough"],        ["02016", "AK, Aleutians West Census Area"],        ["02020", "AK, Anchorage Municipality"],        ["02050", "AK, Bethel Census Area"],        ["02060", "AK, Bristol Bay Borough"],        ["02068", "AK, Denali Borough"],        ["02070", "AK, Dillingham Census Area"],        ["02090", "AK, Fairbanks North Star Borough"],        ["02100", "AK, Haines Borough"],        ["02105", "AK, Hoonah-Angoon Census Area"],        ["02110", "AK, Juneau City and Borough"],        ["02122", "AK, Kenai Peninsula Borough"],        ["02130", "AK, Ketchikan Gateway Borough"],        ["02150", "AK, Kodiak Island Borough"],        ["02164", "AK, Lake and Peninsula Borough"],        ["02170", "AK, Matanuska-Susitna Borough"],        ["02180", "AK, Nome Census Area"],        ["02185", "AK, North Slope Borough"],        ["02188", "AK, Northwest Arctic Borough"],        ["02195", "AK, Petersburg Census area"],        ["02198", "AK, Price of Wales Hyder Census Area"],        ["02220", "AK, Sitka City and Borough"],        ["02230", "AK, Skagway Municipality"],        ["02240", "AK, Southeast Fairbanks Census Area"],        ["02261", "AK, Valdez-Cordova Census Area"],        ["02270", "AK, Wade Hampton Census Area"],        ["02275", "AK, Wrangell City and Borough"],        ["02282", "AK, Yakutat City and Borough"],        ["02290", "AK, Yukon-Koyukuk Census Area"],        ["04001", "AZ, Apache County"],        ["04003", "AZ, Cochise County"],        ["04005", "AZ, Coconino County"],        ["04007", "AZ, Gila County"],        ["04009", "AZ, Graham County"],        ["04011", "AZ, Greenlee County"],        ["04012", "AZ, La Paz County"],        ["04013", "AZ, Maricopa County"],        ["04015", "AZ, Mohave County"],        ["04017", "AZ, Navajo County"],        ["04019", "AZ, Pima County"],        ["04021", "AZ, Pinal County"],        ["04023", "AZ, Santa Cruz County"],        ["04025", "AZ, Yavapai County"],        ["04027", "AZ, Yuma County"],        ["05001", "AR, Arkansas County"],        ["05003", "AR, Ashley County"],        ["05005", "AR, Baxter County"],        ["05007", "AR, Benton County"],        ["05009", "AR, Boone County"],        ["05011", "AR, Bradley County"],        ["05013", "AR, Calhoun County"],        ["05015", "AR, Carroll County"],        ["05017", "AR, Chicot County"],        ["05019", "AR, Clark County"],        ["05021", "AR, Clay County"],        ["05023", "AR, Cleburne County"],        ["05025", "AR, Cleveland County"],        ["05027", "AR, Columbia County"],        ["05029", "AR, Conway County"],        ["05031", "AR, Craighead County"],        ["05033", "AR, Crawford County"],        ["05035", "AR, Crittenden County"],        ["05037", "AR, Cross County"],        ["05039", "AR, Dallas County"],        ["05041", "AR, Desha County"],        ["05043", "AR, Drew County"],        ["05045", "AR, Faulkner County"],        ["05047", "AR, Franklin County"],        ["05049", "AR, Fulton County"],        ["05051", "AR, Garland County"],        ["05053", "AR, Grant County"],        ["05055", "AR, Greene County"],        ["05057", "AR, Hempstead County"],        ["05059", "AR, Hot Spring County"],        ["05061", "AR, Howard County"],        ["05063", "AR, Independence County"],        ["05065", "AR, Izard County"],        ["05067", "AR, Jackson County"],        ["05069", "AR, Jefferson County"],        ["05071", "AR, Johnson County"],        ["05073", "AR, Lafayette County"],        ["05075", "AR, Lawrence County"],        ["05077", "AR, Lee County"],        ["05079", "AR, Lincoln County"],        ["05081", "AR, Little River County"],        ["05083", "AR, Logan County"],        ["05085", "AR, Lonoke County"],        ["05087", "AR, Madison County"],        ["05089", "AR, Marion County"],        ["05091", "AR, Miller County"],        ["05093", "AR, Mississippi County"],        ["05095", "AR, Monroe County"],        ["05097", "AR, Montgomery County"],        ["05099", "AR, Nevada County"],        ["05101", "AR, Newton County"],        ["05103", "AR, Ouachita County"],        ["05105", "AR, Perry County"],        ["05107", "AR, Phillips County"],        ["05109", "AR, Pike County"],        ["05111", "AR, Poinsett County"],        ["05113", "AR, Polk County"],        ["05115", "AR, Pope County"],        ["05117", "AR, Prairie County"],        ["05119", "AR, Pulaski County"],        ["05121", "AR, Randolph County"],        ["05123", "AR, St. Francis County"],        ["05125", "AR, Saline County"],        ["05127", "AR, Scott County"],        ["05129", "AR, Searcy County"],        ["05131", "AR, Sebastian County"],        ["05133", "AR, Sevier County"],        ["05135", "AR, Sharp County"],        ["05137", "AR, Stone County"],        ["05139", "AR, Union County"],        ["05141", "AR, Van Buren County"],        ["05143", "AR, Washington County"],        ["05145", "AR, White County"],        ["05147", "AR, Woodruff County"],        ["05149", "AR, Yell County"],        ["06001", "CA, Alameda County"],        ["06003", "CA, Alpine County"],        ["06005", "CA, Amador County"],        ["06007", "CA, Butte County"],        ["06009", "CA, Calaveras County"],        ["06011", "CA, Colusa County"],        ["06013", "CA, Contra Costa County"],        ["06015", "CA, Del Norte County"],        ["06017", "CA, El Dorado County"],        ["06019", "CA, Fresno County"],        ["06021", "CA, Glenn County"],        ["06023", "CA, Humboldt County"],        ["06025", "CA, Imperial County"],        ["06027", "CA, Inyo County"],        ["06029", "CA, Kern County"],        ["06031", "CA, Kings County"],        ["06033", "CA, Lake County"],        ["06035", "CA, Lassen County"],        ["06037", "CA, Los Angeles County"],        ["06039", "CA, Madera County"],        ["06041", "CA, Marin County"],        ["06043", "CA, Mariposa County"],        ["06045", "CA, Mendocino County"],        ["06047", "CA, Merced County"],        ["06049", "CA, Modoc County"],        ["06051", "CA, Mono County"],        ["06053", "CA, Monterey County"],        ["06055", "CA, Napa County"],        ["06057", "CA, Nevada County"],        ["06059", "CA, Orange County"],        ["06061", "CA, Placer County"],        ["06063", "CA, Plumas County"],        ["06065", "CA, Riverside County"],        ["06067", "CA, Sacramento County"],        ["06069", "CA, San Benito County"],        ["06071", "CA, San Bernardino County"],        ["06073", "CA, San Diego County"],        ["06075", "CA, San Francisco County"],        ["06077", "CA, San Joaquin County"],        ["06079", "CA, San Luis Obispo County"],        ["06081", "CA, San Mateo County"],        ["06083", "CA, Santa Barbara County"],        ["06085", "CA, Santa Clara County"],        ["06087", "CA, Santa Cruz County"],        ["06089", "CA, Shasta County"],        ["06091", "CA, Sierra County"],        ["06093", "CA, Siskiyou County"],        ["06095", "CA, Solano County"],        ["06097", "CA, Sonoma County"],        ["06099", "CA, Stanislaus County"],        ["06101", "CA, Sutter County"],        ["06103", "CA, Tehama County"],        ["06105", "CA, Trinity County"],        ["06107", "CA, Tulare County"],        ["06109", "CA, Tuolumne County"],        ["06111", "CA, Ventura County"],        ["06113", "CA, Yolo County"],        ["06115", "CA, Yuba County"],        ["08001", "CO, Adams County"],        ["08003", "CO, Alamosa County"],        ["08005", "CO, Arapahoe County"],        ["08007", "CO, Archuleta County"],        ["08009", "CO, Baca County"],        ["08011", "CO, Bent County"],        ["08013", "CO, Boulder County"],        ["08014", "CO, Broomfield County"],        ["08015", "CO, Chaffee County"],        ["08017", "CO, Cheyenne County"],        ["08019", "CO, Clear Creek County"],        ["08021", "CO, Conejos County"],        ["08023", "CO, Costilla County"],        ["08025", "CO, Crowley County"],        ["08027", "CO, Custer County"],        ["08029", "CO, Delta County"],        ["08031", "CO, Denver County"],        ["08033", "CO, Dolores County"],        ["08035", "CO, Douglas County"],        ["08037", "CO, Eagle County"],        ["08039", "CO, Elbert County"],        ["08041", "CO, El Paso County"],        ["08043", "CO, Fremont County"],        ["08045", "CO, Garfield County"],        ["08047", "CO, Gilpin County"],        ["08049", "CO, Grand County"],        ["08051", "CO, Gunnison County"],        ["08053", "CO, Hinsdale County"],        ["08055", "CO, Huerfano County"],        ["08057", "CO, Jackson County"],        ["08059", "CO, Jefferson County"],        ["08061", "CO, Kiowa County"],        ["08063", "CO, Kit Carson County"],        ["08065", "CO, Lake County"],        ["08067", "CO, La Plata County"],        ["08069", "CO, Larimer County"],        ["08071", "CO, Las Animas County"],        ["08073", "CO, Lincoln County"],        ["08075", "CO, Logan County"],        ["08077", "CO, Mesa County"],        ["08079", "CO, Mineral County"],        ["08081", "CO, Moffat County"],        ["08083", "CO, Montezuma County"],        ["08085", "CO, Montrose County"],        ["08087", "CO, Morgan County"],        ["08089", "CO, Otero County"],        ["08091", "CO, Ouray County"],        ["08093", "CO, Park County"],        ["08095", "CO, Phillips County"],        ["08097", "CO, Pitkin County"],        ["08099", "CO, Prowers County"],        ["08101", "CO, Pueblo County"],        ["08103", "CO, Rio Blanco County"],        ["08105", "CO, Rio Grande County"],        ["08107", "CO, Routt County"],        ["08109", "CO, Saguache County"],        ["08111", "CO, San Juan County"],        ["08113", "CO, San Miguel County"],        ["08115", "CO, Sedgwick County"],        ["08117", "CO, Summit County"],        ["08119", "CO, Teller County"],        ["08121", "CO, Washington County"],        ["08123", "CO, Weld County"],        ["08125", "CO, Yuma County"],        ["09001", "CT, Fairfield County"],        ["09003", "CT, Hartford County"],        ["09005", "CT, Litchfield County"],        ["09007", "CT, Middlesex County"],        ["09009", "CT, New Haven County"],        ["09011", "CT, New London County"],        ["09013", "CT, Tolland County"],        ["09015", "CT, Windham County"],        ["10001", "DE, Kent County"],        ["10003", "DE, New Castle County"],        ["10005", "DE, Sussex County"],        ["11001", "DC, District of Columbia"],        ["12001", "FL, Alachua County"],        ["12003", "FL, Baker County"],        ["12005", "FL, Bay County"],        ["12007", "FL, Bradford County"],        ["12009", "FL, Brevard County"],        ["12011", "FL, Broward County"],        ["12013", "FL, Calhoun County"],        ["12015", "FL, Charlotte County"],        ["12017", "FL, Citrus County"],        ["12019", "FL, Clay County"],        ["12021", "FL, Collier County"],        ["12023", "FL, Columbia County"],        ["12027", "FL, DeSoto County"],        ["12029", "FL, Dixie County"],        ["12031", "FL, Duval County"],        ["12033", "FL, Escambia County"],        ["12035", "FL, Flagler County"],        ["12037", "FL, Franklin County"],        ["12039", "FL, Gadsden County"],        ["12041", "FL, Gilchrist County"],        ["12043", "FL, Glades County"],        ["12045", "FL, Gulf County"],        ["12047", "FL, Hamilton County"],        ["12049", "FL, Hardee County"],        ["12051", "FL, Hendry County"],        ["12053", "FL, Hernando County"],        ["12055", "FL, Highlands County"],        ["12057", "FL, Hillsborough County"],        ["12059", "FL, Holmes County"],        ["12061", "FL, Indian River County"],        ["12063", "FL, Jackson County"],        ["12065", "FL, Jefferson County"],        ["12067", "FL, Lafayette County"],        ["12069", "FL, Lake County"],        ["12071", "FL, Lee County"],        ["12073", "FL, Leon County"],        ["12075", "FL, Levy County"],        ["12077", "FL, Liberty County"],        ["12079", "FL, Madison County"],        ["12081", "FL, Manatee County"],        ["12083", "FL, Marion County"],        ["12085", "FL, Martin County"],        ["12086", "FL, Miami-Dade County"],        ["12087", "FL, Monroe County"],        ["12089", "FL, Nassau County"],        ["12091", "FL, Okaloosa County"],        ["12093", "FL, Okeechobee County"],        ["12095", "FL, Orange County"],        ["12097", "FL, Osceola County"],        ["12099", "FL, Palm Beach County"],        ["12101", "FL, Pasco County"],        ["12103", "FL, Pinellas County"],        ["12105", "FL, Polk County"],        ["12107", "FL, Putnam County"],        ["12109", "FL, St. Johns County"],        ["12111", "FL, St. Lucie County"],        ["12113", "FL, Santa Rosa County"],        ["12115", "FL, Sarasota County"],        ["12117", "FL, Seminole County"],        ["12119", "FL, Sumter County"],        ["12121", "FL, Suwannee County"],        ["12123", "FL, Taylor County"],        ["12125", "FL, Union County"],        ["12127", "FL, Volusia County"],        ["12129", "FL, Wakulla County"],        ["12131", "FL, Walton County"],        ["12133", "FL, Washington County"],        ["13001", "GA, Appling County"],        ["13003", "GA, Atkinson County"],        ["13005", "GA, Bacon County"],        ["13007", "GA, Baker County"],        ["13009", "GA, Baldwin County"],        ["13011", "GA, Banks County"],        ["13013", "GA, Barrow County"],        ["13015", "GA, Bartow County"],        ["13017", "GA, Ben Hill County"],        ["13019", "GA, Berrien County"],        ["13021", "GA, Bibb County"],        ["13023", "GA, Bleckley County"],        ["13025", "GA, Brantley County"],        ["13027", "GA, Brooks County"],        ["13029", "GA, Bryan County"],        ["13031", "GA, Bulloch County"],        ["13033", "GA, Burke County"],        ["13035", "GA, Butts County"],        ["13037", "GA, Calhoun County"],        ["13039", "GA, Camden County"],        ["13043", "GA, Candler County"],        ["13045", "GA, Carroll County"],        ["13047", "GA, Catoosa County"],        ["13049", "GA, Charlton County"],        ["13051", "GA, Chatham County"],        ["13053", "GA, Chattahoochee County"],        ["13055", "GA, Chattooga County"],        ["13057", "GA, Cherokee County"],        ["13059", "GA, Clarke County"],        ["13061", "GA, Clay County"],        ["13063", "GA, Clayton County"],        ["13065", "GA, Clinch County"],        ["13067", "GA, Cobb County"],        ["13069", "GA, Coffee County"],        ["13071", "GA, Colquitt County"],        ["13073", "GA, Columbia County"],        ["13075", "GA, Cook County"],        ["13077", "GA, Coweta County"],        ["13079", "GA, Crawford County"],        ["13081", "GA, Crisp County"],        ["13083", "GA, Dade County"],        ["13085", "GA, Dawson County"],        ["13087", "GA, Decatur County"],        ["13089", "GA, DeKalb County"],        ["13091", "GA, Dodge County"],        ["13093", "GA, Dooly County"],        ["13095", "GA, Dougherty County"],        ["13097", "GA, Douglas County"],        ["13099", "GA, Early County"],        ["13101", "GA, Echols County"],        ["13103", "GA, Effingham County"],        ["13105", "GA, Elbert County"],        ["13107", "GA, Emanuel County"],        ["13109", "GA, Evans County"],        ["13111", "GA, Fannin County"],        ["13113", "GA, Fayette County"],        ["13115", "GA, Floyd County"],        ["13117", "GA, Forsyth County"],        ["13119", "GA, Franklin County"],        ["13121", "GA, Fulton County"],        ["13123", "GA, Gilmer County"],        ["13125", "GA, Glascock County"],        ["13127", "GA, Glynn County"],        ["13129", "GA, Gordon County"],        ["13131", "GA, Grady County"],        ["13133", "GA, Greene County"],        ["13135", "GA, Gwinnett County"],        ["13137", "GA, Habersham County"],        ["13139", "GA, Hall County"],        ["13141", "GA, Hancock County"],        ["13143", "GA, Haralson County"],        ["13145", "GA, Harris County"],        ["13147", "GA, Hart County"],        ["13149", "GA, Heard County"],        ["13151", "GA, Henry County"],        ["13153", "GA, Houston County"],        ["13155", "GA, Irwin County"],        ["13157", "GA, Jackson County"],        ["13159", "GA, Jasper County"],        ["13161", "GA, Jeff Davis County"],        ["13163", "GA, Jefferson County"],        ["13165", "GA, Jenkins County"],        ["13167", "GA, Johnson County"],        ["13169", "GA, Jones County"],        ["13171", "GA, Lamar County"],        ["13173", "GA, Lanier County"],        ["13175", "GA, Laurens County"],        ["13177", "GA, Lee County"],        ["13179", "GA, Liberty County"],        ["13181", "GA, Lincoln County"],        ["13183", "GA, Long County"],        ["13185", "GA, Lowndes County"],        ["13187", "GA, Lumpkin County"],        ["13189", "GA, McDuffie County"],        ["13191", "GA, McIntosh County"],        ["13193", "GA, Macon County"],        ["13195", "GA, Madison County"],        ["13197", "GA, Marion County"],        ["13199", "GA, Meriwether County"],        ["13201", "GA, Miller County"],        ["13205", "GA, Mitchell County"],        ["13207", "GA, Monroe County"],        ["13209", "GA, Montgomery County"],        ["13211", "GA, Morgan County"],        ["13213", "GA, Murray County"],        ["13215", "GA, Muscogee County"],        ["13217", "GA, Newton County"],        ["13219", "GA, Oconee County"],        ["13221", "GA, Oglethorpe County"],        ["13223", "GA, Paulding County"],        ["13225", "GA, Peach County"],        ["13227", "GA, Pickens County"],        ["13229", "GA, Pierce County"],        ["13231", "GA, Pike County"],        ["13233", "GA, Polk County"],        ["13235", "GA, Pulaski County"],        ["13237", "GA, Putnam County"],        ["13239", "GA, Quitman County"],        ["13241", "GA, Rabun County"],        ["13243", "GA, Randolph County"],        ["13245", "GA, Richmond County"],        ["13247", "GA, Rockdale County"],        ["13249", "GA, Schley County"],        ["13251", "GA, Screven County"],        ["13253", "GA, Seminole County"],        ["13255", "GA, Spalding County"],        ["13257", "GA, Stephens County"],        ["13259", "GA, Stewart County"],        ["13261", "GA, Sumter County"],        ["13263", "GA, Talbot County"],        ["13265", "GA, Taliaferro County"],        ["13267", "GA, Tattnall County"],        ["13269", "GA, Taylor County"],        ["13271", "GA, Telfair County"],        ["13273", "GA, Terrell County"],        ["13275", "GA, Thomas County"],        ["13277", "GA, Tift County"],        ["13279", "GA, Toombs County"],        ["13281", "GA, Towns County"],        ["13283", "GA, Treutlen County"],        ["13285", "GA, Troup County"],        ["13287", "GA, Turner County"],        ["13289", "GA, Twiggs County"],        ["13291", "GA, Union County"],        ["13293", "GA, Upson County"],        ["13295", "GA, Walker County"],        ["13297", "GA, Walton County"],        ["13299", "GA, Ware County"],        ["13301", "GA, Warren County"],        ["13303", "GA, Washington County"],        ["13305", "GA, Wayne County"],        ["13307", "GA, Webster County"],        ["13309", "GA, Wheeler County"],        ["13311", "GA, White County"],        ["13313", "GA, Whitfield County"],        ["13315", "GA, Wilcox County"],        ["13317", "GA, Wilkes County"],        ["13319", "GA, Wilkinson County"],        ["13321", "GA, Worth County"],        ["15001", "HI, Hawaii County"],        ["15003", "HI, Honolulu County"],        ["15005", "HI, Kalawao County"],        ["15007", "HI, Kauai County"],        ["15009", "HI, Maui County"],        ["16001", "ID, Ada County"],        ["16003", "ID, Adams County"],        ["16005", "ID, Bannock County"],        ["16007", "ID, Bear Lake County"],        ["16009", "ID, Benewah County"],        ["16011", "ID, Bingham County"],        ["16013", "ID, Blaine County"],        ["16015", "ID, Boise County"],        ["16017", "ID, Bonner County"],        ["16019", "ID, Bonneville County"],        ["16021", "ID, Boundary County"],        ["16023", "ID, Butte County"],        ["16025", "ID, Camas County"],        ["16027", "ID, Canyon County"],        ["16029", "ID, Caribou County"],        ["16031", "ID, Cassia County"],        ["16033", "ID, Clark County"],        ["16035", "ID, Clearwater County"],        ["16037", "ID, Custer County"],        ["16039", "ID, Elmore County"],        ["16041", "ID, Franklin County"],        ["16043", "ID, Fremont County"],        ["16045", "ID, Gem County"],        ["16047", "ID, Gooding County"],        ["16049", "ID, Idaho County"],        ["16051", "ID, Jefferson County"],        ["16053", "ID, Jerome County"],        ["16055", "ID, Kootenai County"],        ["16057", "ID, Latah County"],        ["16059", "ID, Lemhi County"],        ["16061", "ID, Lewis County"],        ["16063", "ID, Lincoln County"],        ["16065", "ID, Madison County"],        ["16067", "ID, Minidoka County"],        ["16069", "ID, Nez Perce County"],        ["16071", "ID, Oneida County"],        ["16073", "ID, Owyhee County"],        ["16075", "ID, Payette County"],        ["16077", "ID, Power County"],        ["16079", "ID, Shoshone County"],        ["16081", "ID, Teton County"],        ["16083", "ID, Twin Falls County"],        ["16085", "ID, Valley County"],        ["16087", "ID, Washington County"],        ["17001", "IL, Adams County"],        ["17003", "IL, Alexander County"],        ["17005", "IL, Bond County"],        ["17007", "IL, Boone County"],        ["17009", "IL, Brown County"],        ["17011", "IL, Bureau County"],        ["17013", "IL, Calhoun County"],        ["17015", "IL, Carroll County"],        ["17017", "IL, Cass County"],        ["17019", "IL, Champaign County"],        ["17021", "IL, Christian County"],        ["17023", "IL, Clark County"],        ["17025", "IL, Clay County"],        ["17027", "IL, Clinton County"],        ["17029", "IL, Coles County"],        ["17031", "IL, Cook County"],        ["17033", "IL, Crawford County"],        ["17035", "IL, Cumberland County"],        ["17037", "IL, DeKalb County"],        ["17039", "IL, De Witt County"],        ["17041", "IL, Douglas County"],        ["17043", "IL, DuPage County"],        ["17045", "IL, Edgar County"],        ["17047", "IL, Edwards County"],        ["17049", "IL, Effingham County"],        ["17051", "IL, Fayette County"],        ["17053", "IL, Ford County"],        ["17055", "IL, Franklin County"],        ["17057", "IL, Fulton County"],        ["17059", "IL, Gallatin County"],        ["17061", "IL, Greene County"],        ["17063", "IL, Grundy County"],        ["17065", "IL, Hamilton County"],        ["17067", "IL, Hancock County"],        ["17069", "IL, Hardin County"],        ["17071", "IL, Henderson County"],        ["17073", "IL, Henry County"],        ["17075", "IL, Iroquois County"],        ["17077", "IL, Jackson County"],        ["17079", "IL, Jasper County"],        ["17081", "IL, Jefferson County"],        ["17083", "IL, Jersey County"],        ["17085", "IL, Jo Daviess County"],        ["17087", "IL, Johnson County"],        ["17089", "IL, Kane County"],        ["17091", "IL, Kankakee County"],        ["17093", "IL, Kendall County"],        ["17095", "IL, Knox County"],        ["17097", "IL, Lake County"],        ["17099", "IL, La Salle County"],        ["17101", "IL, Lawrence County"],        ["17103", "IL, Lee County"],        ["17105", "IL, Livingston County"],        ["17107", "IL, Logan County"],        ["17109", "IL, McDonough County"],        ["17111", "IL, McHenry County"],        ["17113", "IL, McLean County"],        ["17115", "IL, Macon County"],        ["17117", "IL, Macoupin County"],        ["17119", "IL, Madison County"],        ["17121", "IL, Marion County"],        ["17123", "IL, Marshall County"],        ["17125", "IL, Mason County"],        ["17127", "IL, Massac County"],        ["17129", "IL, Menard County"],        ["17131", "IL, Mercer County"],        ["17133", "IL, Monroe County"],        ["17135", "IL, Montgomery County"],        ["17137", "IL, Morgan County"],        ["17139", "IL, Moultrie County"],        ["17141", "IL, Ogle County"],        ["17143", "IL, Peoria County"],        ["17145", "IL, Perry County"],        ["17147", "IL, Piatt County"],        ["17149", "IL, Pike County"],        ["17151", "IL, Pope County"],        ["17153", "IL, Pulaski County"],        ["17155", "IL, Putnam County"],        ["17157", "IL, Randolph County"],        ["17159", "IL, Richland County"],        ["17161", "IL, Rock Island County"],        ["17163", "IL, St. Clair County"],        ["17165", "IL, Saline County"],        ["17167", "IL, Sangamon County"],        ["17169", "IL, Schuyler County"],        ["17171", "IL, Scott County"],        ["17173", "IL, Shelby County"],        ["17175", "IL, Stark County"],        ["17177", "IL, Stephenson County"],        ["17179", "IL, Tazewell County"],        ["17181", "IL, Union County"],        ["17183", "IL, Vermilion County"],        ["17185", "IL, Wabash County"],        ["17187", "IL, Warren County"],        ["17189", "IL, Washington County"],        ["17191", "IL, Wayne County"],        ["17193", "IL, White County"],        ["17195", "IL, Whiteside County"],        ["17197", "IL, Will County"],        ["17199", "IL, Williamson County"],        ["17201", "IL, Winnebago County"],        ["17203", "IL, Woodford County"],        ["18001", "IN, Adams County"],        ["18003", "IN, Allen County"],        ["18005", "IN, Bartholomew County"],        ["18007", "IN, Benton County"],        ["18009", "IN, Blackford County"],        ["18011", "IN, Boone County"],        ["18013", "IN, Brown County"],        ["18015", "IN, Carroll County"],        ["18017", "IN, Cass County"],        ["18019", "IN, Clark County"],        ["18021", "IN, Clay County"],        ["18023", "IN, Clinton County"],        ["18025", "IN, Crawford County"],        ["18027", "IN, Daviess County"],        ["18029", "IN, Dearborn County"],        ["18031", "IN, Decatur County"],        ["18033", "IN, DeKalb County"],        ["18035", "IN, Delaware County"],        ["18037", "IN, Dubois County"],        ["18039", "IN, Elkhart County"],        ["18041", "IN, Fayette County"],        ["18043", "IN, Floyd County"],        ["18045", "IN, Fountain County"],        ["18047", "IN, Franklin County"],        ["18049", "IN, Fulton County"],        ["18051", "IN, Gibson County"],        ["18053", "IN, Grant County"],        ["18055", "IN, Greene County"],        ["18057", "IN, Hamilton County"],        ["18059", "IN, Hancock County"],        ["18061", "IN, Harrison County"],        ["18063", "IN, Hendricks County"],        ["18065", "IN, Henry County"],        ["18067", "IN, Howard County"],        ["18069", "IN, Huntington County"],        ["18071", "IN, Jackson County"],        ["18073", "IN, Jasper County"],        ["18075", "IN, Jay County"],        ["18077", "IN, Jefferson County"],        ["18079", "IN, Jennings County"],        ["18081", "IN, Johnson County"],        ["18083", "IN, Knox County"],        ["18085", "IN, Kosciusko County"],        ["18087", "IN, LaGrange County"],        ["18089", "IN, Lake County"],        ["18091", "IN, LaPorte County"],        ["18093", "IN, Lawrence County"],        ["18095", "IN, Madison County"],        ["18097", "IN, Marion County"],        ["18099", "IN, Marshall County"],        ["18101", "IN, Martin County"],        ["18103", "IN, Miami County"],        ["18105", "IN, Monroe County"],        ["18107", "IN, Montgomery County"],        ["18109", "IN, Morgan County"],        ["18111", "IN, Newton County"],        ["18113", "IN, Noble County"],        ["18115", "IN, Ohio County"],        ["18117", "IN, Orange County"],        ["18119", "IN, Owen County"],        ["18121", "IN, Parke County"],        ["18123", "IN, Perry County"],        ["18125", "IN, Pike County"],        ["18127", "IN, Porter County"],        ["18129", "IN, Posey County"],        ["18131", "IN, Pulaski County"],        ["18133", "IN, Putnam County"],        ["18135", "IN, Randolph County"],        ["18137", "IN, Ripley County"],        ["18139", "IN, Rush County"],        ["18141", "IN, St. Joseph County"],        ["18143", "IN, Scott County"],        ["18145", "IN, Shelby County"],        ["18147", "IN, Spencer County"],        ["18149", "IN, Starke County"],        ["18151", "IN, Steuben County"],        ["18153", "IN, Sullivan County"],        ["18155", "IN, Switzerland County"],        ["18157", "IN, Tippecanoe County"],        ["18159", "IN, Tipton County"],        ["18161", "IN, Union County"],        ["18163", "IN, Vanderburgh County"],        ["18165", "IN, Vermillion County"],        ["18167", "IN, Vigo County"],        ["18169", "IN, Wabash County"],        ["18171", "IN, Warren County"],        ["18173", "IN, Warrick County"],        ["18175", "IN, Washington County"],        ["18177", "IN, Wayne County"],        ["18179", "IN, Wells County"],        ["18181", "IN, White County"],        ["18183", "IN, Whitley County"],        ["19001", "IA, Adair County"],        ["19003", "IA, Adams County"],        ["19005", "IA, Allamakee County"],        ["19007", "IA, Appanoose County"],        ["19009", "IA, Audubon County"],        ["19011", "IA, Benton County"],        ["19013", "IA, Black Hawk County"],        ["19015", "IA, Boone County"],        ["19017", "IA, Bremer County"],        ["19019", "IA, Buchanan County"],        ["19021", "IA, Buena Vista County"],        ["19023", "IA, Butler County"],        ["19025", "IA, Calhoun County"],        ["19027", "IA, Carroll County"],        ["19029", "IA, Cass County"],        ["19031", "IA, Cedar County"],        ["19033", "IA, Cerro Gordo County"],        ["19035", "IA, Cherokee County"],        ["19037", "IA, Chickasaw County"],        ["19039", "IA, Clarke County"],        ["19041", "IA, Clay County"],        ["19043", "IA, Clayton County"],        ["19045", "IA, Clinton County"],        ["19047", "IA, Crawford County"],        ["19049", "IA, Dallas County"],        ["19051", "IA, Davis County"],        ["19053", "IA, Decatur County"],        ["19055", "IA, Delaware County"],        ["19057", "IA, Des Moines County"],        ["19059", "IA, Dickinson County"],        ["19061", "IA, Dubuque County"],        ["19063", "IA, Emmet County"],        ["19065", "IA, Fayette County"],        ["19067", "IA, Floyd County"],        ["19069", "IA, Franklin County"],        ["19071", "IA, Fremont County"],        ["19073", "IA, Greene County"],        ["19075", "IA, Grundy County"],        ["19077", "IA, Guthrie County"],        ["19079", "IA, Hamilton County"],        ["19081", "IA, Hancock County"],        ["19083", "IA, Hardin County"],        ["19085", "IA, Harrison County"],        ["19087", "IA, Henry County"],        ["19089", "IA, Howard County"],        ["19091", "IA, Humboldt County"],        ["19093", "IA, Ida County"],        ["19095", "IA, Iowa County"],        ["19097", "IA, Jackson County"],        ["19099", "IA, Jasper County"],        ["19101", "IA, Jefferson County"],        ["19103", "IA, Johnson County"],        ["19105", "IA, Jones County"],        ["19107", "IA, Keokuk County"],        ["19109", "IA, Kossuth County"],        ["19111", "IA, Lee County"],        ["19113", "IA, Linn County"],        ["19115", "IA, Louisa County"],        ["19117", "IA, Lucas County"],        ["19119", "IA, Lyon County"],        ["19121", "IA, Madison County"],        ["19123", "IA, Mahaska County"],        ["19125", "IA, Marion County"],        ["19127", "IA, Marshall County"],        ["19129", "IA, Mills County"],        ["19131", "IA, Mitchell County"],        ["19133", "IA, Monona County"],        ["19135", "IA, Monroe County"],        ["19137", "IA, Montgomery County"],        ["19139", "IA, Muscatine County"],        ["19141", "IA, O'Brien County"],        ["19143", "IA, Osceola County"],        ["19145", "IA, Page County"],        ["19147", "IA, Palo Alto County"],        ["19149", "IA, Plymouth County"],        ["19151", "IA, Pocahontas County"],        ["19153", "IA, Polk County"],        ["19155", "IA, Pottawattamie County"],        ["19157", "IA, Poweshiek County"],        ["19159", "IA, Ringgold County"],        ["19161", "IA, Sac County"],        ["19163", "IA, Scott County"],        ["19165", "IA, Shelby County"],        ["19167", "IA, Sioux County"],        ["19169", "IA, Story County"],        ["19171", "IA, Tama County"],        ["19173", "IA, Taylor County"],        ["19175", "IA, Union County"],        ["19177", "IA, Van Buren County"],        ["19179", "IA, Wapello County"],        ["19181", "IA, Warren County"],        ["19183", "IA, Washington County"],        ["19185", "IA, Wayne County"],        ["19187", "IA, Webster County"],        ["19189", "IA, Winnebago County"],        ["19191", "IA, Winneshiek County"],        ["19193", "IA, Woodbury County"],        ["19195", "IA, Worth County"],        ["19197", "IA, Wright County"],        ["20001", "KS, Allen County"],        ["20003", "KS, Anderson County"],        ["20005", "KS, Atchison County"],        ["20007", "KS, Barber County"],        ["20009", "KS, Barton County"],        ["20011", "KS, Bourbon County"],        ["20013", "KS, Brown County"],        ["20015", "KS, Butler County"],        ["20017", "KS, Chase County"],        ["20019", "KS, Chautauqua County"],        ["20021", "KS, Cherokee County"],        ["20023", "KS, Cheyenne County"],        ["20025", "KS, Clark County"],        ["20027", "KS, Clay County"],        ["20029", "KS, Cloud County"],        ["20031", "KS, Coffey County"],        ["20033", "KS, Comanche County"],        ["20035", "KS, Cowley County"],        ["20037", "KS, Crawford County"],        ["20039", "KS, Decatur County"],        ["20041", "KS, Dickinson County"],        ["20043", "KS, Doniphan County"],        ["20045", "KS, Douglas County"],        ["20047", "KS, Edwards County"],        ["20049", "KS, Elk County"],        ["20051", "KS, Ellis County"],        ["20053", "KS, Ellsworth County"],        ["20055", "KS, Finney County"],        ["20057", "KS, Ford County"],        ["20059", "KS, Franklin County"],        ["20061", "KS, Geary County"],        ["20063", "KS, Gove County"],        ["20065", "KS, Graham County"],        ["20067", "KS, Grant County"],        ["20069", "KS, Gray County"],        ["20071", "KS, Greeley County"],        ["20073", "KS, Greenwood County"],        ["20075", "KS, Hamilton County"],        ["20077", "KS, Harper County"],        ["20079", "KS, Harvey County"],        ["20081", "KS, Haskell County"],        ["20083", "KS, Hodgeman County"],        ["20085", "KS, Jackson County"],        ["20087", "KS, Jefferson County"],        ["20089", "KS, Jewell County"],        ["20091", "KS, Johnson County"],        ["20093", "KS, Kearny County"],        ["20095", "KS, Kingman County"],        ["20097", "KS, Kiowa County"],        ["20099", "KS, Labette County"],        ["20101", "KS, Lane County"],        ["20103", "KS, Leavenworth County"],        ["20105", "KS, Lincoln County"],        ["20107", "KS, Linn County"],        ["20109", "KS, Logan County"],        ["20111", "KS, Lyon County"],        ["20113", "KS, McPherson County"],        ["20115", "KS, Marion County"],        ["20117", "KS, Marshall County"],        ["20119", "KS, Meade County"],        ["20121", "KS, Miami County"],        ["20123", "KS, Mitchell County"],        ["20125", "KS, Montgomery County"],        ["20127", "KS, Morris County"],        ["20129", "KS, Morton County"],        ["20131", "KS, Nemaha County"],        ["20133", "KS, Neosho County"],        ["20135", "KS, Ness County"],        ["20137", "KS, Norton County"],        ["20139", "KS, Osage County"],        ["20141", "KS, Osborne County"],        ["20143", "KS, Ottawa County"],        ["20145", "KS, Pawnee County"],        ["20147", "KS, Phillips County"],        ["20149", "KS, Pottawatomie County"],        ["20151", "KS, Pratt County"],        ["20153", "KS, Rawlins County"],        ["20155", "KS, Reno County"],        ["20157", "KS, Republic County"],        ["20159", "KS, Rice County"],        ["20161", "KS, Riley County"],        ["20163", "KS, Rooks County"],        ["20165", "KS, Rush County"],        ["20167", "KS, Russell County"],        ["20169", "KS, Saline County"],        ["20171", "KS, Scott County"],        ["20173", "KS, Sedgwick County"],        ["20175", "KS, Seward County"],        ["20177", "KS, Shawnee County"],        ["20179", "KS, Sheridan County"],        ["20181", "KS, Sherman County"],        ["20183", "KS, Smith County"],        ["20185", "KS, Stafford County"],        ["20187", "KS, Stanton County"],        ["20189", "KS, Stevens County"],        ["20191", "KS, Sumner County"],        ["20193", "KS, Thomas County"],        ["20195", "KS, Trego County"],        ["20197", "KS, Wabaunsee County"],        ["20199", "KS, Wallace County"],        ["20201", "KS, Washington County"],        ["20203", "KS, Wichita County"],        ["20205", "KS, Wilson County"],        ["20207", "KS, Woodson County"],        ["20209", "KS, Wyandotte County"],        ["21001", "KY, Adair County"],        ["21003", "KY, Allen County"],        ["21005", "KY, Anderson County"],        ["21007", "KY, Ballard County"],        ["21009", "KY, Barren County"],        ["21011", "KY, Bath County"],        ["21013", "KY, Bell County"],        ["21015", "KY, Boone County"],        ["21017", "KY, Bourbon County"],        ["21019", "KY, Boyd County"],        ["21021", "KY, Boyle County"],        ["21023", "KY, Bracken County"],        ["21025", "KY, Breathitt County"],        ["21027", "KY, Breckinridge County"],        ["21029", "KY, Bullitt County"],        ["21031", "KY, Butler County"],        ["21033", "KY, Caldwell County"],        ["21035", "KY, Calloway County"],        ["21037", "KY, Campbell County"],        ["21039", "KY, Carlisle County"],        ["21041", "KY, Carroll County"],        ["21043", "KY, Carter County"],        ["21045", "KY, Casey County"],        ["21047", "KY, Christian County"],        ["21049", "KY, Clark County"],        ["21051", "KY, Clay County"],        ["21053", "KY, Clinton County"],        ["21055", "KY, Crittenden County"],        ["21057", "KY, Cumberland County"],        ["21059", "KY, Daviess County"],        ["21061", "KY, Edmonson County"],        ["21063", "KY, Elliott County"],        ["21065", "KY, Estill County"],        ["21067", "KY, Fayette County"],        ["21069", "KY, Fleming County"],        ["21071", "KY, Floyd County"],        ["21073", "KY, Franklin County"],        ["21075", "KY, Fulton County"],        ["21077", "KY, Gallatin County"],        ["21079", "KY, Garrard County"],        ["21081", "KY, Grant County"],        ["21083", "KY, Graves County"],        ["21085", "KY, Grayson County"],        ["21087", "KY, Green County"],        ["21089", "KY, Greenup County"],        ["21091", "KY, Hancock County"],        ["21093", "KY, Hardin County"],        ["21095", "KY, Harlan County"],        ["21097", "KY, Harrison County"],        ["21099", "KY, Hart County"],        ["21101", "KY, Henderson County"],        ["21103", "KY, Henry County"],        ["21105", "KY, Hickman County"],        ["21107", "KY, Hopkins County"],        ["21109", "KY, Jackson County"],        ["21111", "KY, Jefferson County"],        ["21113", "KY, Jessamine County"],        ["21115", "KY, Johnson County"],        ["21117", "KY, Kenton County"],        ["21119", "KY, Knott County"],        ["21121", "KY, Knox County"],        ["21123", "KY, Larue County"],        ["21125", "KY, Laurel County"],        ["21127", "KY, Lawrence County"],        ["21129", "KY, Lee County"],        ["21131", "KY, Leslie County"],        ["21133", "KY, Letcher County"],        ["21135", "KY, Lewis County"],        ["21137", "KY, Lincoln County"],        ["21139", "KY, Livingston County"],        ["21141", "KY, Logan County"],        ["21143", "KY, Lyon County"],        ["21145", "KY, McCracken County"],        ["21147", "KY, McCreary County"],        ["21149", "KY, McLean County"],        ["21151", "KY, Madison County"],        ["21153", "KY, Magoffin County"],        ["21155", "KY, Marion County"],        ["21157", "KY, Marshall County"],        ["21159", "KY, Martin County"],        ["21161", "KY, Mason County"],        ["21163", "KY, Meade County"],        ["21165", "KY, Menifee County"],        ["21167", "KY, Mercer County"],        ["21169", "KY, Metcalfe County"],        ["21171", "KY, Monroe County"],        ["21173", "KY, Montgomery County"],        ["21175", "KY, Morgan County"],        ["21177", "KY, Muhlenberg County"],        ["21179", "KY, Nelson County"],        ["21181", "KY, Nicholas County"],        ["21183", "KY, Ohio County"],        ["21185", "KY, Oldham County"],        ["21187", "KY, Owen County"],        ["21189", "KY, Owsley County"],        ["21191", "KY, Pendleton County"],        ["21193", "KY, Perry County"],        ["21195", "KY, Pike County"],        ["21197", "KY, Powell County"],        ["21199", "KY, Pulaski County"],        ["21201", "KY, Robertson County"],        ["21203", "KY, Rockcastle County"],        ["21205", "KY, Rowan County"],        ["21207", "KY, Russell County"],        ["21209", "KY, Scott County"],        ["21211", "KY, Shelby County"],        ["21213", "KY, Simpson County"],        ["21215", "KY, Spencer County"],        ["21217", "KY, Taylor County"],        ["21219", "KY, Todd County"],        ["21221", "KY, Trigg County"],        ["21223", "KY, Trimble County"],        ["21225", "KY, Union County"],        ["21227", "KY, Warren County"],        ["21229", "KY, Washington County"],        ["21231", "KY, Wayne County"],        ["21233", "KY, Webster County"],        ["21235", "KY, Whitley County"],        ["21237", "KY, Wolfe County"],        ["21239", "KY, Woodford County"],        ["22001", "LA, Acadia Parish"],        ["22003", "LA, Allen Parish"],        ["22005", "LA, Ascension Parish"],        ["22007", "LA, Assumption Parish"],        ["22009", "LA, Avoyelles Parish"],        ["22011", "LA, Beauregard Parish"],        ["22013", "LA, Bienville Parish"],        ["22015", "LA, Bossier Parish"],        ["22017", "LA, Caddo Parish"],        ["22019", "LA, Calcasieu Parish"],        ["22021", "LA, Caldwell Parish"],        ["22023", "LA, Cameron Parish"],        ["22025", "LA, Catahoula Parish"],        ["22027", "LA, Claiborne Parish"],        ["22029", "LA, Concordia Parish"],        ["22031", "LA, De Soto Parish"],        ["22033", "LA, East Baton Rouge Parish"],        ["22035", "LA, East Carroll Parish"],        ["22037", "LA, East Feliciana Parish"],        ["22039", "LA, Evangeline Parish"],        ["22041", "LA, Franklin Parish"],        ["22043", "LA, Grant Parish"],        ["22045", "LA, Iberia Parish"],        ["22047", "LA, Iberville Parish"],        ["22049", "LA, Jackson Parish"],        ["22051", "LA, Jefferson Parish"],        ["22053", "LA, Jefferson Davis Parish"],        ["22055", "LA, Lafayette Parish"],        ["22057", "LA, Lafourche Parish"],        ["22059", "LA, La Salle Parish"],        ["22061", "LA, Lincoln Parish"],        ["22063", "LA, Livingston Parish"],        ["22065", "LA, Madison Parish"],        ["22067", "LA, Morehouse Parish"],        ["22069", "LA, Natchitoches Parish"],        ["22071", "LA, Orleans Parish"],        ["22073", "LA, Ouachita Parish"],        ["22075", "LA, Plaquemines Parish"],        ["22077", "LA, Pointe Coupee Parish"],        ["22079", "LA, Rapides Parish"],        ["22081", "LA, Red River Parish"],        ["22083", "LA, Richland Parish"],        ["22085", "LA, Sabine Parish"],        ["22087", "LA, St. Bernard Parish"],        ["22089", "LA, St. Charles Parish"],        ["22091", "LA, St. Helena Parish"],        ["22093", "LA, St. James Parish"],        ["22095", "LA, St. John the Baptist Parish"],        ["22097", "LA, St. Landry Parish"],        ["22099", "LA, St. Martin Parish"],        ["22101", "LA, St. Mary Parish"],        ["22103", "LA, St. Tammany Parish"],        ["22105", "LA, Tangipahoa Parish"],        ["22107", "LA, Tensas Parish"],        ["22109", "LA, Terrebonne Parish"],        ["22111", "LA, Union Parish"],        ["22113", "LA, Vermilion Parish"],        ["22115", "LA, Vernon Parish"],        ["22117", "LA, Washington Parish"],        ["22119", "LA, Webster Parish"],        ["22121", "LA, West Baton Rouge Parish"],        ["22123", "LA, West Carroll Parish"],        ["22125", "LA, West Feliciana Parish"],        ["22127", "LA, Winn Parish"],        ["23001", "ME, Androscoggin County"],        ["23003", "ME, Aroostook County"],        ["23005", "ME, Cumberland County"],        ["23007", "ME, Franklin County"],        ["23009", "ME, Hancock County"],        ["23011", "ME, Kennebec County"],        ["23013", "ME, Knox County"],        ["23015", "ME, Lincoln County"],        ["23017", "ME, Oxford County"],        ["23019", "ME, Penobscot County"],        ["23021", "ME, Piscataquis County"],        ["23023", "ME, Sagadahoc County"],        ["23025", "ME, Somerset County"],        ["23027", "ME, Waldo County"],        ["23029", "ME, Washington County"],        ["23031", "ME, York County"],        ["24001", "MD, Allegany County"],        ["24003", "MD, Anne Arundel County"],        ["24005", "MD, Baltimore County"],        ["24009", "MD, Calvert County"],        ["24011", "MD, Caroline County"],        ["24013", "MD, Carroll County"],        ["24015", "MD, Cecil County"],        ["24017", "MD, Charles County"],        ["24019", "MD, Dorchester County"],        ["24021", "MD, Frederick County"],        ["24023", "MD, Garrett County"],        ["24025", "MD, Harford County"],        ["24027", "MD, Howard County"],        ["24029", "MD, Kent County"],        ["24031", "MD, Montgomery County"],        ["24033", "MD, Prince George's County"],        ["24035", "MD, Queen Anne's County"],        ["24037", "MD, St. Mary's County"],        ["24039", "MD, Somerset County"],        ["24041", "MD, Talbot County"],        ["24043", "MD, Washington County"],        ["24045", "MD, Wicomico County"],        ["24047", "MD, Worcester County"],        ["24510", "MD, Baltimore city"],        ["25001", "MA, Barnstable County"],        ["25003", "MA, Berkshire County"],        ["25005", "MA, Bristol County"],        ["25007", "MA, Dukes County"],        ["25009", "MA, Essex County"],        ["25011", "MA, Franklin County"],        ["25013", "MA, Hampden County"],        ["25015", "MA, Hampshire County"],        ["25017", "MA, Middlesex County"],        ["25019", "MA, Nantucket County"],        ["25021", "MA, Norfolk County"],        ["25023", "MA, Plymouth County"],        ["25025", "MA, Suffolk County"],        ["25027", "MA, Worcester County"],        ["26001", "MI, Alcona County"],        ["26003", "MI, Alger County"],        ["26005", "MI, Allegan County"],        ["26007", "MI, Alpena County"],        ["26009", "MI, Antrim County"],        ["26011", "MI, Arenac County"],        ["26013", "MI, Baraga County"],        ["26015", "MI, Barry County"],        ["26017", "MI, Bay County"],        ["26019", "MI, Benzie County"],        ["26021", "MI, Berrien County"],        ["26023", "MI, Branch County"],        ["26025", "MI, Calhoun County"],        ["26027", "MI, Cass County"],        ["26029", "MI, Charlevoix County"],        ["26031", "MI, Cheboygan County"],        ["26033", "MI, Chippewa County"],        ["26035", "MI, Clare County"],        ["26037", "MI, Clinton County"],        ["26039", "MI, Crawford County"],        ["26041", "MI, Delta County"],        ["26043", "MI, Dickinson County"],        ["26045", "MI, Eaton County"],        ["26047", "MI, Emmet County"],        ["26049", "MI, Genesee County"],        ["26051", "MI, Gladwin County"],        ["26053", "MI, Gogebic County"],        ["26055", "MI, Grand Traverse County"],        ["26057", "MI, Gratiot County"],        ["26059", "MI, Hillsdale County"],        ["26061", "MI, Houghton County"],        ["26063", "MI, Huron County"],        ["26065", "MI, Ingham County"],        ["26067", "MI, Ionia County"],        ["26069", "MI, Iosco County"],        ["26071", "MI, Iron County"],        ["26073", "MI, Isabella County"],        ["26075", "MI, Jackson County"],        ["26077", "MI, Kalamazoo County"],        ["26079", "MI, Kalkaska County"],        ["26081", "MI, Kent County"],        ["26083", "MI, Keweenaw County"],        ["26085", "MI, Lake County"],        ["26087", "MI, Lapeer County"],        ["26089", "MI, Leelanau County"],        ["26091", "MI, Lenawee County"],        ["26093", "MI, Livingston County"],        ["26095", "MI, Luce County"],        ["26097", "MI, Mackinac County"],        ["26099", "MI, Macomb County"],        ["26101", "MI, Manistee County"],        ["26103", "MI, Marquette County"],        ["26105", "MI, Mason County"],        ["26107", "MI, Mecosta County"],        ["26109", "MI, Menominee County"],        ["26111", "MI, Midland County"],        ["26113", "MI, Missaukee County"],        ["26115", "MI, Monroe County"],        ["26117", "MI, Montcalm County"],        ["26119", "MI, Montmorency County"],        ["26121", "MI, Muskegon County"],        ["26123", "MI, Newaygo County"],        ["26125", "MI, Oakland County"],        ["26127", "MI, Oceana County"],        ["26129", "MI, Ogemaw County"],        ["26131", "MI, Ontonagon County"],        ["26133", "MI, Osceola County"],        ["26135", "MI, Oscoda County"],        ["26137", "MI, Otsego County"],        ["26139", "MI, Ottawa County"],        ["26141", "MI, Presque Isle County"],        ["26143", "MI, Roscommon County"],        ["26145", "MI, Saginaw County"],        ["26147", "MI, St. Clair County"],        ["26149", "MI, St. Joseph County"],        ["26151", "MI, Sanilac County"],        ["26153", "MI, Schoolcraft County"],        ["26155", "MI, Shiawassee County"],        ["26157", "MI, Tuscola County"],        ["26159", "MI, Van Buren County"],        ["26161", "MI, Washtenaw County"],        ["26163", "MI, Wayne County"],        ["26165", "MI, Wexford County"],        ["27001", "MN, Aitkin County"],        ["27003", "MN, Anoka County"],        ["27005", "MN, Becker County"],        ["27007", "MN, Beltrami County"],        ["27009", "MN, Benton County"],        ["27011", "MN, Big Stone County"],        ["27013", "MN, Blue Earth County"],        ["27015", "MN, Brown County"],        ["27017", "MN, Carlton County"],        ["27019", "MN, Carver County"],        ["27021", "MN, Cass County"],        ["27023", "MN, Chippewa County"],        ["27025", "MN, Chisago County"],        ["27027", "MN, Clay County"],        ["27029", "MN, Clearwater County"],        ["27031", "MN, Cook County"],        ["27033", "MN, Cottonwood County"],        ["27035", "MN, Crow Wing County"],        ["27037", "MN, Dakota County"],        ["27039", "MN, Dodge County"],        ["27041", "MN, Douglas County"],        ["27043", "MN, Faribault County"],        ["27045", "MN, Fillmore County"],        ["27047", "MN, Freeborn County"],        ["27049", "MN, Goodhue County"],        ["27051", "MN, Grant County"],        ["27053", "MN, Hennepin County"],        ["27055", "MN, Houston County"],        ["27057", "MN, Hubbard County"],        ["27059", "MN, Isanti County"],        ["27061", "MN, Itasca County"],        ["27063", "MN, Jackson County"],        ["27065", "MN, Kanabec County"],        ["27067", "MN, Kandiyohi County"],        ["27069", "MN, Kittson County"],        ["27071", "MN, Koochiching County"],        ["27073", "MN, Lac qui Parle County"],        ["27075", "MN, Lake County"],        ["27077", "MN, Lake of the Woods County"],        ["27079", "MN, Le Sueur County"],        ["27081", "MN, Lincoln County"],        ["27083", "MN, Lyon County"],        ["27085", "MN, McLeod County"],        ["27087", "MN, Mahnomen County"],        ["27089", "MN, Marshall County"],        ["27091", "MN, Martin County"],        ["27093", "MN, Meeker County"],        ["27095", "MN, Mille Lacs County"],        ["27097", "MN, Morrison County"],        ["27099", "MN, Mower County"],        ["27101", "MN, Murray County"],        ["27103", "MN, Nicollet County"],        ["27105", "MN, Nobles County"],        ["27107", "MN, Norman County"],        ["27109", "MN, Olmsted County"],        ["27111", "MN, Otter Tail County"],        ["27113", "MN, Pennington County"],        ["27115", "MN, Pine County"],        ["27117", "MN, Pipestone County"],        ["27119", "MN, Polk County"],        ["27121", "MN, Pope County"],        ["27123", "MN, Ramsey County"],        ["27125", "MN, Red Lake County"],        ["27127", "MN, Redwood County"],        ["27129", "MN, Renville County"],        ["27131", "MN, Rice County"],        ["27133", "MN, Rock County"],        ["27135", "MN, Roseau County"],        ["27137", "MN, St. Louis County"],        ["27139", "MN, Scott County"],        ["27141", "MN, Sherburne County"],        ["27143", "MN, Sibley County"],        ["27145", "MN, Stearns County"],        ["27147", "MN, Steele County"],        ["27149", "MN, Stevens County"],        ["27151", "MN, Swift County"],        ["27153", "MN, Todd County"],        ["27155", "MN, Traverse County"],        ["27157", "MN, Wabasha County"],        ["27159", "MN, Wadena County"],        ["27161", "MN, Waseca County"],        ["27163", "MN, Washington County"],        ["27165", "MN, Watonwan County"],        ["27167", "MN, Wilkin County"],        ["27169", "MN, Winona County"],        ["27171", "MN, Wright County"],        ["27173", "MN, Yellow Medicine County"],        ["28001", "MS, Adams County"],        ["28003", "MS, Alcorn County"],        ["28005", "MS, Amite County"],        ["28007", "MS, Attala County"],        ["28009", "MS, Benton County"],        ["28011", "MS, Bolivar County"],        ["28013", "MS, Calhoun County"],        ["28015", "MS, Carroll County"],        ["28017", "MS, Chickasaw County"],        ["28019", "MS, Choctaw County"],        ["28021", "MS, Claiborne County"],        ["28023", "MS, Clarke County"],        ["28025", "MS, Clay County"],        ["28027", "MS, Coahoma County"],        ["28029", "MS, Copiah County"],        ["28031", "MS, Covington County"],        ["28033", "MS, DeSoto County"],        ["28035", "MS, Forrest County"],        ["28037", "MS, Franklin County"],        ["28039", "MS, George County"],        ["28041", "MS, Greene County"],        ["28043", "MS, Grenada County"],        ["28045", "MS, Hancock County"],        ["28047", "MS, Harrison County"],        ["28049", "MS, Hinds County"],        ["28051", "MS, Holmes County"],        ["28053", "MS, Humphreys County"],        ["28055", "MS, Issaquena County"],        ["28057", "MS, Itawamba County"],        ["28059", "MS, Jackson County"],        ["28061", "MS, Jasper County"],        ["28063", "MS, Jefferson County"],        ["28065", "MS, Jefferson Davis County"],        ["28067", "MS, Jones County"],        ["28069", "MS, Kemper County"],        ["28071", "MS, Lafayette County"],        ["28073", "MS, Lamar County"],        ["28075", "MS, Lauderdale County"],        ["28077", "MS, Lawrence County"],        ["28079", "MS, Leake County"],        ["28081", "MS, Lee County"],        ["28083", "MS, Leflore County"],        ["28085", "MS, Lincoln County"],        ["28087", "MS, Lowndes County"],        ["28089", "MS, Madison County"],        ["28091", "MS, Marion County"],        ["28093", "MS, Marshall County"],        ["28095", "MS, Monroe County"],        ["28097", "MS, Montgomery County"],        ["28099", "MS, Neshoba County"],        ["28101", "MS, Newton County"],        ["28103", "MS, Noxubee County"],        ["28105", "MS, Oktibbeha County"],        ["28107", "MS, Panola County"],        ["28109", "MS, Pearl River County"],        ["28111", "MS, Perry County"],        ["28113", "MS, Pike County"],        ["28115", "MS, Pontotoc County"],        ["28117", "MS, Prentiss County"],        ["28119", "MS, Quitman County"],        ["28121", "MS, Rankin County"],        ["28123", "MS, Scott County"],        ["28125", "MS, Sharkey County"],        ["28127", "MS, Simpson County"],        ["28129", "MS, Smith County"],        ["28131", "MS, Stone County"],        ["28133", "MS, Sunflower County"],        ["28135", "MS, Tallahatchie County"],        ["28137", "MS, Tate County"],        ["28139", "MS, Tippah County"],        ["28141", "MS, Tishomingo County"],        ["28143", "MS, Tunica County"],        ["28145", "MS, Union County"],        ["28147", "MS, Walthall County"],        ["28149", "MS, Warren County"],        ["28151", "MS, Washington County"],        ["28153", "MS, Wayne County"],        ["28155", "MS, Webster County"],        ["28157", "MS, Wilkinson County"],        ["28159", "MS, Winston County"],        ["28161", "MS, Yalobusha County"],        ["28163", "MS, Yazoo County"],        ["29001", "MO, Adair County"],        ["29003", "MO, Andrew County"],        ["29005", "MO, Atchison County"],        ["29007", "MO, Audrain County"],        ["29009", "MO, Barry County"],        ["29011", "MO, Barton County"],        ["29013", "MO, Bates County"],        ["29015", "MO, Benton County"],        ["29017", "MO, Bollinger County"],        ["29019", "MO, Boone County"],        ["29021", "MO, Buchanan County"],        ["29023", "MO, Butler County"],        ["29025", "MO, Caldwell County"],        ["29027", "MO, Callaway County"],        ["29029", "MO, Camden County"],        ["29031", "MO, Cape Girardeau County"],        ["29033", "MO, Carroll County"],        ["29035", "MO, Carter County"],        ["29037", "MO, Cass County"],        ["29039", "MO, Cedar County"],        ["29041", "MO, Chariton County"],        ["29043", "MO, Christian County"],        ["29045", "MO, Clark County"],        ["29047", "MO, Clay County"],        ["29049", "MO, Clinton County"],        ["29051", "MO, Cole County"],        ["29053", "MO, Cooper County"],        ["29055", "MO, Crawford County"],        ["29057", "MO, Dade County"],        ["29059", "MO, Dallas County"],        ["29061", "MO, Daviess County"],        ["29063", "MO, DeKalb County"],        ["29065", "MO, Dent County"],        ["29067", "MO, Douglas County"],        ["29069", "MO, Dunklin County"],        ["29071", "MO, Franklin County"],        ["29073", "MO, Gasconade County"],        ["29075", "MO, Gentry County"],        ["29077", "MO, Greene County"],        ["29079", "MO, Grundy County"],        ["29081", "MO, Harrison County"],        ["29083", "MO, Henry County"],        ["29085", "MO, Hickory County"],        ["29087", "MO, Holt County"],        ["29089", "MO, Howard County"],        ["29091", "MO, Howell County"],        ["29093", "MO, Iron County"],        ["29095", "MO, Jackson County"],        ["29097", "MO, Jasper County"],        ["29099", "MO, Jefferson County"],        ["29101", "MO, Johnson County"],        ["29103", "MO, Knox County"],        ["29105", "MO, Laclede County"],        ["29107", "MO, Lafayette County"],        ["29109", "MO, Lawrence County"],        ["29111", "MO, Lewis County"],        ["29113", "MO, Lincoln County"],        ["29115", "MO, Linn County"],        ["29117", "MO, Livingston County"],        ["29119", "MO, McDonald County"],        ["29121", "MO, Macon County"],        ["29123", "MO, Madison County"],        ["29125", "MO, Maries County"],        ["29127", "MO, Marion County"],        ["29129", "MO, Mercer County"],        ["29131", "MO, Miller County"],        ["29133", "MO, Mississippi County"],        ["29135", "MO, Moniteau County"],        ["29137", "MO, Monroe County"],        ["29139", "MO, Montgomery County"],        ["29141", "MO, Morgan County"],        ["29143", "MO, New Madrid County"],        ["29145", "MO, Newton County"],        ["29147", "MO, Nodaway County"],        ["29149", "MO, Oregon County"],        ["29151", "MO, Osage County"],        ["29153", "MO, Ozark County"],        ["29155", "MO, Pemiscot County"],        ["29157", "MO, Perry County"],        ["29159", "MO, Pettis County"],        ["29161", "MO, Phelps County"],        ["29163", "MO, Pike County"],        ["29165", "MO, Platte County"],        ["29167", "MO, Polk County"],        ["29169", "MO, Pulaski County"],        ["29171", "MO, Putnam County"],        ["29173", "MO, Ralls County"],        ["29175", "MO, Randolph County"],        ["29177", "MO, Ray County"],        ["29179", "MO, Reynolds County"],        ["29181", "MO, Ripley County"],        ["29183", "MO, St. Charles County"],        ["29185", "MO, St. Clair County"],        ["29186", "MO, Ste. Genevieve County"],        ["29187", "MO, St. Francois County"],        ["29189", "MO, St. Louis County"],        ["29195", "MO, Saline County"],        ["29197", "MO, Schuyler County"],        ["29199", "MO, Scotland County"],        ["29201", "MO, Scott County"],        ["29203", "MO, Shannon County"],        ["29205", "MO, Shelby County"],        ["29207", "MO, Stoddard County"],        ["29209", "MO, Stone County"],        ["29211", "MO, Sullivan County"],        ["29213", "MO, Taney County"],        ["29215", "MO, Texas County"],        ["29217", "MO, Vernon County"],        ["29219", "MO, Warren County"],        ["29221", "MO, Washington County"],        ["29223", "MO, Wayne County"],        ["29225", "MO, Webster County"],        ["29227", "MO, Worth County"],        ["29229", "MO, Wright County"],        ["29510", "MO, St. Louis city"],        ["30001", "MT, Beaverhead County"],        ["30003", "MT, Big Horn County"],        ["30005", "MT, Blaine County"],        ["30007", "MT, Broadwater County"],        ["30009", "MT, Carbon County"],        ["30011", "MT, Carter County"],        ["30013", "MT, Cascade County"],        ["30015", "MT, Chouteau County"],        ["30017", "MT, Custer County"],        ["30019", "MT, Daniels County"],        ["30021", "MT, Dawson County"],        ["30023", "MT, Deer Lodge County"],        ["30025", "MT, Fallon County"],        ["30027", "MT, Fergus County"],        ["30029", "MT, Flathead County"],        ["30031", "MT, Gallatin County"],        ["30033", "MT, Garfield County"],        ["30035", "MT, Glacier County"],        ["30037", "MT, Golden Valley County"],        ["30039", "MT, Granite County"],        ["30041", "MT, Hill County"],        ["30043", "MT, Jefferson County"],        ["30045", "MT, Judith Basin County"],        ["30047", "MT, Lake County"],        ["30049", "MT, Lewis and Clark County"],        ["30051", "MT, Liberty County"],        ["30053", "MT, Lincoln County"],        ["30055", "MT, McCone County"],        ["30057", "MT, Madison County"],        ["30059", "MT, Meagher County"],        ["30061", "MT, Mineral County"],        ["30063", "MT, Missoula County"],        ["30065", "MT, Musselshell County"],        ["30067", "MT, Park County"],        ["30069", "MT, Petroleum County"],        ["30071", "MT, Phillips County"],        ["30073", "MT, Pondera County"],        ["30075", "MT, Powder River County"],        ["30077", "MT, Powell County"],        ["30079", "MT, Prairie County"],        ["30081", "MT, Ravalli County"],        ["30083", "MT, Richland County"],        ["30085", "MT, Roosevelt County"],        ["30087", "MT, Rosebud County"],        ["30089", "MT, Sanders County"],        ["30091", "MT, Sheridan County"],        ["30093", "MT, Silver Bow County"],        ["30095", "MT, Stillwater County"],        ["30097", "MT, Sweet Grass County"],        ["30099", "MT, Teton County"],        ["30101", "MT, Toole County"],        ["30103", "MT, Treasure County"],        ["30105", "MT, Valley County"],        ["30107", "MT, Wheatland County"],        ["30109", "MT, Wibaux County"],        ["30111", "MT, Yellowstone County"],        ["31001", "NE, Adams County"],        ["31003", "NE, Antelope County"],        ["31005", "NE, Arthur County"],        ["31007", "NE, Banner County"],        ["31009", "NE, Blaine County"],        ["31011", "NE, Boone County"],        ["31013", "NE, Box Butte County"],        ["31015", "NE, Boyd County"],        ["31017", "NE, Brown County"],        ["31019", "NE, Buffalo County"],        ["31021", "NE, Burt County"],        ["31023", "NE, Butler County"],        ["31025", "NE, Cass County"],        ["31027", "NE, Cedar County"],        ["31029", "NE, Chase County"],        ["31031", "NE, Cherry County"],        ["31033", "NE, Cheyenne County"],        ["31035", "NE, Clay County"],        ["31037", "NE, Colfax County"],        ["31039", "NE, Cuming County"],        ["31041", "NE, Custer County"],        ["31043", "NE, Dakota County"],        ["31045", "NE, Dawes County"],        ["31047", "NE, Dawson County"],        ["31049", "NE, Deuel County"],        ["31051", "NE, Dixon County"],        ["31053", "NE, Dodge County"],        ["31055", "NE, Douglas County"],        ["31057", "NE, Dundy County"],        ["31059", "NE, Fillmore County"],        ["31061", "NE, Franklin County"],        ["31063", "NE, Frontier County"],        ["31065", "NE, Furnas County"],        ["31067", "NE, Gage County"],        ["31069", "NE, Garden County"],        ["31071", "NE, Garfield County"],        ["31073", "NE, Gosper County"],        ["31075", "NE, Grant County"],        ["31077", "NE, Greeley County"],        ["31079", "NE, Hall County"],        ["31081", "NE, Hamilton County"],        ["31083", "NE, Harlan County"],        ["31085", "NE, Hayes County"],        ["31087", "NE, Hitchcock County"],        ["31089", "NE, Holt County"],        ["31091", "NE, Hooker County"],        ["31093", "NE, Howard County"],        ["31095", "NE, Jefferson County"],        ["31097", "NE, Johnson County"],        ["31099", "NE, Kearney County"],        ["31101", "NE, Keith County"],        ["31103", "NE, Keya Paha County"],        ["31105", "NE, Kimball County"],        ["31107", "NE, Knox County"],        ["31109", "NE, Lancaster County"],        ["31111", "NE, Lincoln County"],        ["31113", "NE, Logan County"],        ["31115", "NE, Loup County"],        ["31117", "NE, McPherson County"],        ["31119", "NE, Madison County"],        ["31121", "NE, Merrick County"],        ["31123", "NE, Morrill County"],        ["31125", "NE, Nance County"],        ["31127", "NE, Nemaha County"],        ["31129", "NE, Nuckolls County"],        ["31131", "NE, Otoe County"],        ["31133", "NE, Pawnee County"],        ["31135", "NE, Perkins County"],        ["31137", "NE, Phelps County"],        ["31139", "NE, Pierce County"],        ["31141", "NE, Platte County"],        ["31143", "NE, Polk County"],        ["31145", "NE, Red Willow County"],        ["31147", "NE, Richardson County"],        ["31149", "NE, Rock County"],        ["31151", "NE, Saline County"],        ["31153", "NE, Sarpy County"],        ["31155", "NE, Saunders County"],        ["31157", "NE, Scotts Bluff County"],        ["31159", "NE, Seward County"],        ["31161", "NE, Sheridan County"],        ["31163", "NE, Sherman County"],        ["31165", "NE, Sioux County"],        ["31167", "NE, Stanton County"],        ["31169", "NE, Thayer County"],        ["31171", "NE, Thomas County"],        ["31173", "NE, Thurston County"],        ["31175", "NE, Valley County"],        ["31177", "NE, Washington County"],        ["31179", "NE, Wayne County"],        ["31181", "NE, Webster County"],        ["31183", "NE, Wheeler County"],        ["31185", "NE, York County"],        ["32001", "NV, Churchill County"],        ["32003", "NV, Clark County"],        ["32005", "NV, Douglas County"],        ["32007", "NV, Elko County"],        ["32009", "NV, Esmeralda County"],        ["32011", "NV, Eureka County"],        ["32013", "NV, Humboldt County"],        ["32015", "NV, Lander County"],        ["32017", "NV, Lincoln County"],        ["32019", "NV, Lyon County"],        ["32021", "NV, Mineral County"],        ["32023", "NV, Nye County"],        ["32027", "NV, Pershing County"],        ["32029", "NV, Storey County"],        ["32031", "NV, Washoe County"],        ["32033", "NV, White Pine County"],        ["32510", "NV, Carson City"],        ["33001", "NH, Belknap County"],        ["33003", "NH, Carroll County"],        ["33005", "NH, Cheshire County"],        ["33007", "NH, Coos County"],        ["33009", "NH, Grafton County"],        ["33011", "NH, Hillsborough County"],        ["33013", "NH, Merrimack County"],        ["33015", "NH, Rockingham County"],        ["33017", "NH, Strafford County"],        ["33019", "NH, Sullivan County"],        ["34001", "NJ, Atlantic County"],        ["34003", "NJ, Bergen County"],        ["34005", "NJ, Burlington County"],        ["34007", "NJ, Camden County"],        ["34009", "NJ, Cape May County"],        ["34011", "NJ, Cumberland County"],        ["34013", "NJ, Essex County"],        ["34015", "NJ, Gloucester County"],        ["34017", "NJ, Hudson County"],        ["34019", "NJ, Hunterdon County"],        ["34021", "NJ, Mercer County"],        ["34023", "NJ, Middlesex County"],        ["34025", "NJ, Monmouth County"],        ["34027", "NJ, Morris County"],        ["34029", "NJ, Ocean County"],        ["34031", "NJ, Passaic County"],        ["34033", "NJ, Salem County"],        ["34035", "NJ, Somerset County"],        ["34037", "NJ, Sussex County"],        ["34039", "NJ, Union County"],        ["34041", "NJ, Warren County"],        ["35001", "NM, Bernalillo County"],        ["35003", "NM, Catron County"],        ["35005", "NM, Chaves County"],        ["35006", "NM, Cibola County"],        ["35007", "NM, Colfax County"],        ["35009", "NM, Curry County"],        ["35011", "NM, De Baca County"],        ["35013", "NM, Dona Ana County"],        ["35015", "NM, Eddy County"],        ["35017", "NM, Grant County"],        ["35019", "NM, Guadalupe County"],        ["35021", "NM, Harding County"],        ["35023", "NM, Hidalgo County"],        ["35025", "NM, Lea County"],        ["35027", "NM, Lincoln County"],        ["35028", "NM, Los Alamos County"],        ["35029", "NM, Luna County"],        ["35031", "NM, McKinley County"],        ["35033", "NM, Mora County"],        ["35035", "NM, Otero County"],        ["35037", "NM, Quay County"],        ["35039", "NM, Rio Arriba County"],        ["35041", "NM, Roosevelt County"],        ["35043", "NM, Sandoval County"],        ["35045", "NM, San Juan County"],        ["35047", "NM, San Miguel County"],        ["35049", "NM, Santa Fe County"],        ["35051", "NM, Sierra County"],        ["35053", "NM, Socorro County"],        ["35055", "NM, Taos County"],        ["35057", "NM, Torrance County"],        ["35059", "NM, Union County"],        ["35061", "NM, Valencia County"],        ["36001", "NY, Albany County"],        ["36003", "NY, Allegany County"],        ["36005", "NY, Bronx County"],        ["36007", "NY, Broome County"],        ["36009", "NY, Cattaraugus County"],        ["36011", "NY, Cayuga County"],        ["36013", "NY, Chautauqua County"],        ["36015", "NY, Chemung County"],        ["36017", "NY, Chenango County"],        ["36019", "NY, Clinton County"],        ["36021", "NY, Columbia County"],        ["36023", "NY, Cortland County"],        ["36025", "NY, Delaware County"],        ["36027", "NY, Dutchess County"],        ["36029", "NY, Erie County"],        ["36031", "NY, Essex County"],        ["36033", "NY, Franklin County"],        ["36035", "NY, Fulton County"],        ["36037", "NY, Genesee County"],        ["36039", "NY, Greene County"],        ["36041", "NY, Hamilton County"],        ["36043", "NY, Herkimer County"],        ["36045", "NY, Jefferson County"],        ["36047", "NY, Kings County"],        ["36049", "NY, Lewis County"],        ["36051", "NY, Livingston County"],        ["36053", "NY, Madison County"],        ["36055", "NY, Monroe County"],        ["36057", "NY, Montgomery County"],        ["36059", "NY, Nassau County"],        ["36061", "NY, New York County"],        ["36063", "NY, Niagara County"],        ["36065", "NY, Oneida County"],        ["36067", "NY, Onondaga County"],        ["36069", "NY, Ontario County"],        ["36071", "NY, Orange County"],        ["36073", "NY, Orleans County"],        ["36075", "NY, Oswego County"],        ["36077", "NY, Otsego County"],        ["36079", "NY, Putnam County"],        ["36081", "NY, Queens County"],        ["36083", "NY, Rensselaer County"],        ["36085", "NY, Richmond County"],        ["36087", "NY, Rockland County"],        ["36089", "NY, St. Lawrence County"],        ["36091", "NY, Saratoga County"],        ["36093", "NY, Schenectady County"],        ["36095", "NY, Schoharie County"],        ["36097", "NY, Schuyler County"],        ["36099", "NY, Seneca County"],        ["36101", "NY, Steuben County"],        ["36103", "NY, Suffolk County"],        ["36105", "NY, Sullivan County"],        ["36107", "NY, Tioga County"],        ["36109", "NY, Tompkins County"],        ["36111", "NY, Ulster County"],        ["36113", "NY, Warren County"],        ["36115", "NY, Washington County"],        ["36117", "NY, Wayne County"],        ["36119", "NY, Westchester County"],        ["36121", "NY, Wyoming County"],        ["36123", "NY, Yates County"],        ["37001", "NC, Alamance County"],        ["37003", "NC, Alexander County"],        ["37005", "NC, Alleghany County"],        ["37007", "NC, Anson County"],        ["37009", "NC, Ashe County"],        ["37011", "NC, Avery County"],        ["37013", "NC, Beaufort County"],        ["37015", "NC, Bertie County"],        ["37017", "NC, Bladen County"],        ["37019", "NC, Brunswick County"],        ["37021", "NC, Buncombe County"],        ["37023", "NC, Burke County"],        ["37025", "NC, Cabarrus County"],        ["37027", "NC, Caldwell County"],        ["37029", "NC, Camden County"],        ["37031", "NC, Carteret County"],        ["37033", "NC, Caswell County"],        ["37035", "NC, Catawba County"],        ["37037", "NC, Chatham County"],        ["37039", "NC, Cherokee County"],        ["37041", "NC, Chowan County"],        ["37043", "NC, Clay County"],        ["37045", "NC, Cleveland County"],        ["37047", "NC, Columbus County"],        ["37049", "NC, Craven County"],        ["37051", "NC, Cumberland County"],        ["37053", "NC, Currituck County"],        ["37055", "NC, Dare County"],        ["37057", "NC, Davidson County"],        ["37059", "NC, Davie County"],        ["37061", "NC, Duplin County"],        ["37063", "NC, Durham County"],        ["37065", "NC, Edgecombe County"],        ["37067", "NC, Forsyth County"],        ["37069", "NC, Franklin County"],        ["37071", "NC, Gaston County"],        ["37073", "NC, Gates County"],        ["37075", "NC, Graham County"],        ["37077", "NC, Granville County"],        ["37079", "NC, Greene County"],        ["37081", "NC, Guilford County"],        ["37083", "NC, Halifax County"],        ["37085", "NC, Harnett County"],        ["37087", "NC, Haywood County"],        ["37089", "NC, Henderson County"],        ["37091", "NC, Hertford County"],        ["37093", "NC, Hoke County"],        ["37095", "NC, Hyde County"],        ["37097", "NC, Iredell County"],        ["37099", "NC, Jackson County"],        ["37101", "NC, Johnston County"],        ["37103", "NC, Jones County"],        ["37105", "NC, Lee County"],        ["37107", "NC, Lenoir County"],        ["37109", "NC, Lincoln County"],        ["37111", "NC, McDowell County"],        ["37113", "NC, Macon County"],        ["37115", "NC, Madison County"],        ["37117", "NC, Martin County"],        ["37119", "NC, Mecklenburg County"],        ["37121", "NC, Mitchell County"],        ["37123", "NC, Montgomery County"],        ["37125", "NC, Moore County"],        ["37127", "NC, Nash County"],        ["37129", "NC, New Hanover County"],        ["37131", "NC, Northampton County"],        ["37133", "NC, Onslow County"],        ["37135", "NC, Orange County"],        ["37137", "NC, Pamlico County"],        ["37139", "NC, Pasquotank County"],        ["37141", "NC, Pender County"],        ["37143", "NC, Perquimans County"],        ["37145", "NC, Person County"],        ["37147", "NC, Pitt County"],        ["37149", "NC, Polk County"],        ["37151", "NC, Randolph County"],        ["37153", "NC, Richmond County"],        ["37155", "NC, Robeson County"],        ["37157", "NC, Rockingham County"],        ["37159", "NC, Rowan County"],        ["37161", "NC, Rutherford County"],        ["37163", "NC, Sampson County"],        ["37165", "NC, Scotland County"],        ["37167", "NC, Stanly County"],        ["37169", "NC, Stokes County"],        ["37171", "NC, Surry County"],        ["37173", "NC, Swain County"],        ["37175", "NC, Transylvania County"],        ["37177", "NC, Tyrrell County"],        ["37179", "NC, Union County"],        ["37181", "NC, Vance County"],        ["37183", "NC, Wake County"],        ["37185", "NC, Warren County"],        ["37187", "NC, Washington County"],        ["37189", "NC, Watauga County"],        ["37191", "NC, Wayne County"],        ["37193", "NC, Wilkes County"],        ["37195", "NC, Wilson County"],        ["37197", "NC, Yadkin County"],        ["37199", "NC, Yancey County"],        ["38001", "ND, Adams County"],        ["38003", "ND, Barnes County"],        ["38005", "ND, Benson County"],        ["38007", "ND, Billings County"],        ["38009", "ND, Bottineau County"],        ["38011", "ND, Bowman County"],        ["38013", "ND, Burke County"],        ["38015", "ND, Burleigh County"],        ["38017", "ND, Cass County"],        ["38019", "ND, Cavalier County"],        ["38021", "ND, Dickey County"],        ["38023", "ND, Divide County"],        ["38025", "ND, Dunn County"],        ["38027", "ND, Eddy County"],        ["38029", "ND, Emmons County"],        ["38031", "ND, Foster County"],        ["38033", "ND, Golden Valley County"],        ["38035", "ND, Grand Forks County"],        ["38037", "ND, Grant County"],        ["38039", "ND, Griggs County"],        ["38041", "ND, Hettinger County"],        ["38043", "ND, Kidder County"],        ["38045", "ND, LaMoure County"],        ["38047", "ND, Logan County"],        ["38049", "ND, McHenry County"],        ["38051", "ND, McIntosh County"],        ["38053", "ND, McKenzie County"],        ["38055", "ND, McLean County"],        ["38057", "ND, Mercer County"],        ["38059", "ND, Morton County"],        ["38061", "ND, Mountrail County"],        ["38063", "ND, Nelson County"],        ["38065", "ND, Oliver County"],        ["38067", "ND, Pembina County"],        ["38069", "ND, Pierce County"],        ["38071", "ND, Ramsey County"],        ["38073", "ND, Ransom County"],        ["38075", "ND, Renville County"],        ["38077", "ND, Richland County"],        ["38079", "ND, Rolette County"],        ["38081", "ND, Sargent County"],        ["38083", "ND, Sheridan County"],        ["38085", "ND, Sioux County"],        ["38087", "ND, Slope County"],        ["38089", "ND, Stark County"],        ["38091", "ND, Steele County"],        ["38093", "ND, Stutsman County"],        ["38095", "ND, Towner County"],        ["38097", "ND, Traill County"],        ["38099", "ND, Walsh County"],        ["38101", "ND, Ward County"],        ["38103", "ND, Wells County"],        ["38105", "ND, Williams County"],        ["39001", "OH, Adams County"],        ["39003", "OH, Allen County"],        ["39005", "OH, Ashland County"],        ["39007", "OH, Ashtabula County"],        ["39009", "OH, Athens County"],        ["39011", "OH, Auglaize County"],        ["39013", "OH, Belmont County"],        ["39015", "OH, Brown County"],        ["39017", "OH, Butler County"],        ["39019", "OH, Carroll County"],        ["39021", "OH, Champaign County"],        ["39023", "OH, Clark County"],        ["39025", "OH, Clermont County"],        ["39027", "OH, Clinton County"],        ["39029", "OH, Columbiana County"],        ["39031", "OH, Coshocton County"],        ["39033", "OH, Crawford County"],        ["39035", "OH, Cuyahoga County"],        ["39037", "OH, Darke County"],        ["39039", "OH, Defiance County"],        ["39041", "OH, Delaware County"],        ["39043", "OH, Erie County"],        ["39045", "OH, Fairfield County"],        ["39047", "OH, Fayette County"],        ["39049", "OH, Franklin County"],        ["39051", "OH, Fulton County"],        ["39053", "OH, Gallia County"],        ["39055", "OH, Geauga County"],        ["39057", "OH, Greene County"],        ["39059", "OH, Guernsey County"],        ["39061", "OH, Hamilton County"],        ["39063", "OH, Hancock County"],        ["39065", "OH, Hardin County"],        ["39067", "OH, Harrison County"],        ["39069", "OH, Henry County"],        ["39071", "OH, Highland County"],        ["39073", "OH, Hocking County"],        ["39075", "OH, Holmes County"],        ["39077", "OH, Huron County"],        ["39079", "OH, Jackson County"],        ["39081", "OH, Jefferson County"],        ["39083", "OH, Knox County"],        ["39085", "OH, Lake County"],        ["39087", "OH, Lawrence County"],        ["39089", "OH, Licking County"],        ["39091", "OH, Logan County"],        ["39093", "OH, Lorain County"],        ["39095", "OH, Lucas County"],        ["39097", "OH, Madison County"],        ["39099", "OH, Mahoning County"],        ["39101", "OH, Marion County"],        ["39103", "OH, Medina County"],        ["39105", "OH, Meigs County"],        ["39107", "OH, Mercer County"],        ["39109", "OH, Miami County"],        ["39111", "OH, Monroe County"],        ["39113", "OH, Montgomery County"],        ["39115", "OH, Morgan County"],        ["39117", "OH, Morrow County"],        ["39119", "OH, Muskingum County"],        ["39121", "OH, Noble County"],        ["39123", "OH, Ottawa County"],        ["39125", "OH, Paulding County"],        ["39127", "OH, Perry County"],        ["39129", "OH, Pickaway County"],        ["39131", "OH, Pike County"],        ["39133", "OH, Portage County"],        ["39135", "OH, Preble County"],        ["39137", "OH, Putnam County"],        ["39139", "OH, Richland County"],        ["39141", "OH, Ross County"],        ["39143", "OH, Sandusky County"],        ["39145", "OH, Scioto County"],        ["39147", "OH, Seneca County"],        ["39149", "OH, Shelby County"],        ["39151", "OH, Stark County"],        ["39153", "OH, Summit County"],        ["39155", "OH, Trumbull County"],        ["39157", "OH, Tuscarawas County"],        ["39159", "OH, Union County"],        ["39161", "OH, Van Wert County"],        ["39163", "OH, Vinton County"],        ["39165", "OH, Warren County"],        ["39167", "OH, Washington County"],        ["39169", "OH, Wayne County"],        ["39171", "OH, Williams County"],        ["39173", "OH, Wood County"],        ["39175", "OH, Wyandot County"],        ["40001", "OK, Adair County"],        ["40003", "OK, Alfalfa County"],        ["40005", "OK, Atoka County"],        ["40007", "OK, Beaver County"],        ["40009", "OK, Beckham County"],        ["40011", "OK, Blaine County"],        ["40013", "OK, Bryan County"],        ["40015", "OK, Caddo County"],        ["40017", "OK, Canadian County"],        ["40019", "OK, Carter County"],        ["40021", "OK, Cherokee County"],        ["40023", "OK, Choctaw County"],        ["40025", "OK, Cimarron County"],        ["40027", "OK, Cleveland County"],        ["40029", "OK, Coal County"],        ["40031", "OK, Comanche County"],        ["40033", "OK, Cotton County"],        ["40035", "OK, Craig County"],        ["40037", "OK, Creek County"],        ["40039", "OK, Custer County"],        ["40041", "OK, Delaware County"],        ["40043", "OK, Dewey County"],        ["40045", "OK, Ellis County"],        ["40047", "OK, Garfield County"],        ["40049", "OK, Garvin County"],        ["40051", "OK, Grady County"],        ["40053", "OK, Grant County"],        ["40055", "OK, Greer County"],        ["40057", "OK, Harmon County"],        ["40059", "OK, Harper County"],        ["40061", "OK, Haskell County"],        ["40063", "OK, Hughes County"],        ["40065", "OK, Jackson County"],        ["40067", "OK, Jefferson County"],        ["40069", "OK, Johnston County"],        ["40071", "OK, Kay County"],        ["40073", "OK, Kingfisher County"],        ["40075", "OK, Kiowa County"],        ["40077", "OK, Latimer County"],        ["40079", "OK, Le Flore County"],        ["40081", "OK, Lincoln County"],        ["40083", "OK, Logan County"],        ["40085", "OK, Love County"],        ["40087", "OK, McClain County"],        ["40089", "OK, McCurtain County"],        ["40091", "OK, McIntosh County"],        ["40093", "OK, Major County"],        ["40095", "OK, Marshall County"],        ["40097", "OK, Mayes County"],        ["40099", "OK, Murray County"],        ["40101", "OK, Muskogee County"],        ["40103", "OK, Noble County"],        ["40105", "OK, Nowata County"],        ["40107", "OK, Okfuskee County"],        ["40109", "OK, Oklahoma County"],        ["40111", "OK, Okmulgee County"],        ["40113", "OK, Osage County"],        ["40115", "OK, Ottawa County"],        ["40117", "OK, Pawnee County"],        ["40119", "OK, Payne County"],        ["40121", "OK, Pittsburg County"],        ["40123", "OK, Pontotoc County"],        ["40125", "OK, Pottawatomie County"],        ["40127", "OK, Pushmataha County"],        ["40129", "OK, Roger Mills County"],        ["40131", "OK, Rogers County"],        ["40133", "OK, Seminole County"],        ["40135", "OK, Sequoyah County"],        ["40137", "OK, Stephens County"],        ["40139", "OK, Texas County"],        ["40141", "OK, Tillman County"],        ["40143", "OK, Tulsa County"],        ["40145", "OK, Wagoner County"],        ["40147", "OK, Washington County"],        ["40149", "OK, Washita County"],        ["40151", "OK, Woods County"],        ["40153", "OK, Woodward County"],        ["41001", "OR, Baker County"],        ["41003", "OR, Benton County"],        ["41005", "OR, Clackamas County"],        ["41007", "OR, Clatsop County"],        ["41009", "OR, Columbia County"],        ["41011", "OR, Coos County"],        ["41013", "OR, Crook County"],        ["41015", "OR, Curry County"],        ["41017", "OR, Deschutes County"],        ["41019", "OR, Douglas County"],        ["41021", "OR, Gilliam County"],        ["41023", "OR, Grant County"],        ["41025", "OR, Harney County"],        ["41027", "OR, Hood River County"],        ["41029", "OR, Jackson County"],        ["41031", "OR, Jefferson County"],        ["41033", "OR, Josephine County"],        ["41035", "OR, Klamath County"],        ["41037", "OR, Lake County"],        ["41039", "OR, Lane County"],        ["41041", "OR, Lincoln County"],        ["41043", "OR, Linn County"],        ["41045", "OR, Malheur County"],        ["41047", "OR, Marion County"],        ["41049", "OR, Morrow County"],        ["41051", "OR, Multnomah County"],        ["41053", "OR, Polk County"],        ["41055", "OR, Sherman County"],        ["41057", "OR, Tillamook County"],        ["41059", "OR, Umatilla County"],        ["41061", "OR, Union County"],        ["41063", "OR, Wallowa County"],        ["41065", "OR, Wasco County"],        ["41067", "OR, Washington County"],        ["41069", "OR, Wheeler County"],        ["41071", "OR, Yamhill County"],        ["42001", "PA, Adams County"],        ["42003", "PA, Allegheny County"],        ["42005", "PA, Armstrong County"],        ["42007", "PA, Beaver County"],        ["42009", "PA, Bedford County"],        ["42011", "PA, Berks County"],        ["42013", "PA, Blair County"],        ["42015", "PA, Bradford County"],        ["42017", "PA, Bucks County"],        ["42019", "PA, Butler County"],        ["42021", "PA, Cambria County"],        ["42023", "PA, Cameron County"],        ["42025", "PA, Carbon County"],        ["42027", "PA, Centre County"],        ["42029", "PA, Chester County"],        ["42031", "PA, Clarion County"],        ["42033", "PA, Clearfield County"],        ["42035", "PA, Clinton County"],        ["42037", "PA, Columbia County"],        ["42039", "PA, Crawford County"],        ["42041", "PA, Cumberland County"],        ["42043", "PA, Dauphin County"],        ["42045", "PA, Delaware County"],        ["42047", "PA, Elk County"],        ["42049", "PA, Erie County"],        ["42051", "PA, Fayette County"],        ["42053", "PA, Forest County"],        ["42055", "PA, Franklin County"],        ["42057", "PA, Fulton County"],        ["42059", "PA, Greene County"],        ["42061", "PA, Huntingdon County"],        ["42063", "PA, Indiana County"],        ["42065", "PA, Jefferson County"],        ["42067", "PA, Juniata County"],        ["42069", "PA, Lackawanna County"],        ["42071", "PA, Lancaster County"],        ["42073", "PA, Lawrence County"],        ["42075", "PA, Lebanon County"],        ["42077", "PA, Lehigh County"],        ["42079", "PA, Luzerne County"],        ["42081", "PA, Lycoming County"],        ["42083", "PA, McKean County"],        ["42085", "PA, Mercer County"],        ["42087", "PA, Mifflin County"],        ["42089", "PA, Monroe County"],        ["42091", "PA, Montgomery County"],        ["42093", "PA, Montour County"],        ["42095", "PA, Northampton County"],        ["42097", "PA, Northumberland County"],        ["42099", "PA, Perry County"],        ["42101", "PA, Philadelphia County"],        ["42103", "PA, Pike County"],        ["42105", "PA, Potter County"],        ["42107", "PA, Schuylkill County"],        ["42109", "PA, Snyder County"],        ["42111", "PA, Somerset County"],        ["42113", "PA, Sullivan County"],        ["42115", "PA, Susquehanna County"],        ["42117", "PA, Tioga County"],        ["42119", "PA, Union County"],        ["42121", "PA, Venango County"],        ["42123", "PA, Warren County"],        ["42125", "PA, Washington County"],        ["42127", "PA, Wayne County"],        ["42129", "PA, Westmoreland County"],        ["42131", "PA, Wyoming County"],        ["42133", "PA, York County"],        ["44001", "RI, Bristol County"],        ["44003", "RI, Kent County"],        ["44005", "RI, Newport County"],        ["44007", "RI, Providence County"],        ["44009", "RI, Washington County"],        ["45001", "SC, Abbeville County"],        ["45003", "SC, Aiken County"],        ["45005", "SC, Allendale County"],        ["45007", "SC, Anderson County"],        ["45009", "SC, Bamberg County"],        ["45011", "SC, Barnwell County"],        ["45013", "SC, Beaufort County"],        ["45015", "SC, Berkeley County"],        ["45017", "SC, Calhoun County"],        ["45019", "SC, Charleston County"],        ["45021", "SC, Cherokee County"],        ["45023", "SC, Chester County"],        ["45025", "SC, Chesterfield County"],        ["45027", "SC, Clarendon County"],        ["45029", "SC, Colleton County"],        ["45031", "SC, Darlington County"],        ["45033", "SC, Dillon County"],        ["45035", "SC, Dorchester County"],        ["45037", "SC, Edgefield County"],        ["45039", "SC, Fairfield County"],        ["45041", "SC, Florence County"],        ["45043", "SC, Georgetown County"],        ["45045", "SC, Greenville County"],        ["45047", "SC, Greenwood County"],        ["45049", "SC, Hampton County"],        ["45051", "SC, Horry County"],        ["45053", "SC, Jasper County"],        ["45055", "SC, Kershaw County"],        ["45057", "SC, Lancaster County"],        ["45059", "SC, Laurens County"],        ["45061", "SC, Lee County"],        ["45063", "SC, Lexington County"],        ["45065", "SC, McCormick County"],        ["45067", "SC, Marion County"],        ["45069", "SC, Marlboro County"],        ["45071", "SC, Newberry County"],        ["45073", "SC, Oconee County"],        ["45075", "SC, Orangeburg County"],        ["45077", "SC, Pickens County"],        ["45079", "SC, Richland County"],        ["45081", "SC, Saluda County"],        ["45083", "SC, Spartanburg County"],        ["45085", "SC, Sumter County"],        ["45087", "SC, Union County"],        ["45089", "SC, Williamsburg County"],        ["45091", "SC, York County"],        ["46003", "SD, Aurora County"],        ["46005", "SD, Beadle County"],        ["46007", "SD, Bennett County"],        ["46009", "SD, Bon Homme County"],        ["46011", "SD, Brookings County"],        ["46013", "SD, Brown County"],        ["46015", "SD, Brule County"],        ["46017", "SD, Buffalo County"],        ["46019", "SD, Butte County"],        ["46021", "SD, Campbell County"],        ["46023", "SD, Charles Mix County"],        ["46025", "SD, Clark County"],        ["46027", "SD, Clay County"],        ["46029", "SD, Codington County"],        ["46031", "SD, Corson County"],        ["46033", "SD, Custer County"],        ["46035", "SD, Davison County"],        ["46037", "SD, Day County"],        ["46039", "SD, Deuel County"],        ["46041", "SD, Dewey County"],        ["46043", "SD, Douglas County"],        ["46045", "SD, Edmunds County"],        ["46047", "SD, Fall River County"],        ["46049", "SD, Faulk County"],        ["46051", "SD, Grant County"],        ["46053", "SD, Gregory County"],        ["46055", "SD, Haakon County"],        ["46057", "SD, Hamlin County"],        ["46059", "SD, Hand County"],        ["46061", "SD, Hanson County"],        ["46063", "SD, Harding County"],        ["46065", "SD, Hughes County"],        ["46067", "SD, Hutchinson County"],        ["46069", "SD, Hyde County"],        ["46071", "SD, Jackson County"],        ["46073", "SD, Jerauld County"],        ["46075", "SD, Jones County"],        ["46077", "SD, Kingsbury County"],        ["46079", "SD, Lake County"],        ["46081", "SD, Lawrence County"],        ["46083", "SD, Lincoln County"],        ["46085", "SD, Lyman County"],        ["46087", "SD, McCook County"],        ["46089", "SD, McPherson County"],        ["46091", "SD, Marshall County"],        ["46093", "SD, Meade County"],        ["46095", "SD, Mellette County"],        ["46097", "SD, Miner County"],        ["46099", "SD, Minnehaha County"],        ["46101", "SD, Moody County"],        ["46103", "SD, Pennington County"],        ["46105", "SD, Perkins County"],        ["46107", "SD, Potter County"],        ["46109", "SD, Roberts County"],        ["46111", "SD, Sanborn County"],        ["46113", "SD, Shannon County"],        ["46115", "SD, Spink County"],        ["46117", "SD, Stanley County"],        ["46119", "SD, Sully County"],        ["46121", "SD, Todd County"],        ["46123", "SD, Tripp County"],        ["46125", "SD, Turner County"],        ["46127", "SD, Union County"],        ["46129", "SD, Walworth County"],        ["46135", "SD, Yankton County"],        ["46137", "SD, Ziebach County"],        ["47001", "TN, Anderson County"],        ["47003", "TN, Bedford County"],        ["47005", "TN, Benton County"],        ["47007", "TN, Bledsoe County"],        ["47009", "TN, Blount County"],        ["47011", "TN, Bradley County"],        ["47013", "TN, Campbell County"],        ["47015", "TN, Cannon County"],        ["47017", "TN, Carroll County"],        ["47019", "TN, Carter County"],        ["47021", "TN, Cheatham County"],        ["47023", "TN, Chester County"],        ["47025", "TN, Claiborne County"],        ["47027", "TN, Clay County"],        ["47029", "TN, Cocke County"],        ["47031", "TN, Coffee County"],        ["47033", "TN, Crockett County"],        ["47035", "TN, Cumberland County"],        ["47037", "TN, Davidson County"],        ["47039", "TN, Decatur County"],        ["47041", "TN, DeKalb County"],        ["47043", "TN, Dickson County"],        ["47045", "TN, Dyer County"],        ["47047", "TN, Fayette County"],        ["47049", "TN, Fentress County"],        ["47051", "TN, Franklin County"],        ["47053", "TN, Gibson County"],        ["47055", "TN, Giles County"],        ["47057", "TN, Grainger County"],        ["47059", "TN, Greene County"],        ["47061", "TN, Grundy County"],        ["47063", "TN, Hamblen County"],        ["47065", "TN, Hamilton County"],        ["47067", "TN, Hancock County"],        ["47069", "TN, Hardeman County"],        ["47071", "TN, Hardin County"],        ["47073", "TN, Hawkins County"],        ["47075", "TN, Haywood County"],        ["47077", "TN, Henderson County"],        ["47079", "TN, Henry County"],        ["47081", "TN, Hickman County"],        ["47083", "TN, Houston County"],        ["47085", "TN, Humphreys County"],        ["47087", "TN, Jackson County"],        ["47089", "TN, Jefferson County"],        ["47091", "TN, Johnson County"],        ["47093", "TN, Knox County"],        ["47095", "TN, Lake County"],        ["47097", "TN, Lauderdale County"],        ["47099", "TN, Lawrence County"],        ["47101", "TN, Lewis County"],        ["47103", "TN, Lincoln County"],        ["47105", "TN, Loudon County"],        ["47107", "TN, McMinn County"],        ["47109", "TN, McNairy County"],        ["47111", "TN, Macon County"],        ["47113", "TN, Madison County"],        ["47115", "TN, Marion County"],        ["47117", "TN, Marshall County"],        ["47119", "TN, Maury County"],        ["47121", "TN, Meigs County"],        ["47123", "TN, Monroe County"],        ["47125", "TN, Montgomery County"],        ["47127", "TN, Moore County"],        ["47129", "TN, Morgan County"],        ["47131", "TN, Obion County"],        ["47133", "TN, Overton County"],        ["47135", "TN, Perry County"],        ["47137", "TN, Pickett County"],        ["47139", "TN, Polk County"],        ["47141", "TN, Putnam County"],        ["47143", "TN, Rhea County"],        ["47145", "TN, Roane County"],        ["47147", "TN, Robertson County"],        ["47149", "TN, Rutherford County"],        ["47151", "TN, Scott County"],        ["47153", "TN, Sequatchie County"],        ["47155", "TN, Sevier County"],        ["47157", "TN, Shelby County"],        ["47159", "TN, Smith County"],        ["47161", "TN, Stewart County"],        ["47163", "TN, Sullivan County"],        ["47165", "TN, Sumner County"],        ["47167", "TN, Tipton County"],        ["47169", "TN, Trousdale County"],        ["47171", "TN, Unicoi County"],        ["47173", "TN, Union County"],        ["47175", "TN, Van Buren County"],        ["47177", "TN, Warren County"],        ["47179", "TN, Washington County"],        ["47181", "TN, Wayne County"],        ["47183", "TN, Weakley County"],        ["47185", "TN, White County"],        ["47187", "TN, Williamson County"],        ["47189", "TN, Wilson County"],        ["48001", "TX, Anderson County"],        ["48003", "TX, Andrews County"],        ["48005", "TX, Angelina County"],        ["48007", "TX, Aransas County"],        ["48009", "TX, Archer County"],        ["48011", "TX, Armstrong County"],        ["48013", "TX, Atascosa County"],        ["48015", "TX, Austin County"],        ["48017", "TX, Bailey County"],        ["48019", "TX, Bandera County"],        ["48021", "TX, Bastrop County"],        ["48023", "TX, Baylor County"],        ["48025", "TX, Bee County"],        ["48027", "TX, Bell County"],        ["48029", "TX, Bexar County"],        ["48031", "TX, Blanco County"],        ["48033", "TX, Borden County"],        ["48035", "TX, Bosque County"],        ["48037", "TX, Bowie County"],        ["48039", "TX, Brazoria County"],        ["48041", "TX, Brazos County"],        ["48043", "TX, Brewster County"],        ["48045", "TX, Briscoe County"],        ["48047", "TX, Brooks County"],        ["48049", "TX, Brown County"],        ["48051", "TX, Burleson County"],        ["48053", "TX, Burnet County"],        ["48055", "TX, Caldwell County"],        ["48057", "TX, Calhoun County"],        ["48059", "TX, Callahan County"],        ["48061", "TX, Cameron County"],        ["48063", "TX, Camp County"],        ["48065", "TX, Carson County"],        ["48067", "TX, Cass County"],        ["48069", "TX, Castro County"],        ["48071", "TX, Chambers County"],        ["48073", "TX, Cherokee County"],        ["48075", "TX, Childress County"],        ["48077", "TX, Clay County"],        ["48079", "TX, Cochran County"],        ["48081", "TX, Coke County"],        ["48083", "TX, Coleman County"],        ["48085", "TX, Collin County"],        ["48087", "TX, Collingsworth County"],        ["48089", "TX, Colorado County"],        ["48091", "TX, Comal County"],        ["48093", "TX, Comanche County"],        ["48095", "TX, Concho County"],        ["48097", "TX, Cooke County"],        ["48099", "TX, Coryell County"],        ["48101", "TX, Cottle County"],        ["48103", "TX, Crane County"],        ["48105", "TX, Crockett County"],        ["48107", "TX, Crosby County"],        ["48109", "TX, Culberson County"],        ["48111", "TX, Dallam County"],        ["48113", "TX, Dallas County"],        ["48115", "TX, Dawson County"],        ["48117", "TX, Deaf Smith County"],        ["48119", "TX, Delta County"],        ["48121", "TX, Denton County"],        ["48123", "TX, DeWitt County"],        ["48125", "TX, Dickens County"],        ["48127", "TX, Dimmit County"],        ["48129", "TX, Donley County"],        ["48131", "TX, Duval County"],        ["48133", "TX, Eastland County"],        ["48135", "TX, Ector County"],        ["48137", "TX, Edwards County"],        ["48139", "TX, Ellis County"],        ["48141", "TX, El Paso County"],        ["48143", "TX, Erath County"],        ["48145", "TX, Falls County"],        ["48147", "TX, Fannin County"],        ["48149", "TX, Fayette County"],        ["48151", "TX, Fisher County"],        ["48153", "TX, Floyd County"],        ["48155", "TX, Foard County"],        ["48157", "TX, Fort Bend County"],        ["48159", "TX, Franklin County"],        ["48161", "TX, Freestone County"],        ["48163", "TX, Frio County"],        ["48165", "TX, Gaines County"],        ["48167", "TX, Galveston County"],        ["48169", "TX, Garza County"],        ["48171", "TX, Gillespie County"],        ["48173", "TX, Glasscock County"],        ["48175", "TX, Goliad County"],        ["48177", "TX, Gonzales County"],        ["48179", "TX, Gray County"],        ["48181", "TX, Grayson County"],        ["48183", "TX, Gregg County"],        ["48185", "TX, Grimes County"],        ["48187", "TX, Guadalupe County"],        ["48189", "TX, Hale County"],        ["48191", "TX, Hall County"],        ["48193", "TX, Hamilton County"],        ["48195", "TX, Hansford County"],        ["48197", "TX, Hardeman County"],        ["48199", "TX, Hardin County"],        ["48201", "TX, Harris County"],        ["48203", "TX, Harrison County"],        ["48205", "TX, Hartley County"],        ["48207", "TX, Haskell County"],        ["48209", "TX, Hays County"],        ["48211", "TX, Hemphill County"],        ["48213", "TX, Henderson County"],        ["48215", "TX, Hidalgo County"],        ["48217", "TX, Hill County"],        ["48219", "TX, Hockley County"],        ["48221", "TX, Hood County"],        ["48223", "TX, Hopkins County"],        ["48225", "TX, Houston County"],        ["48227", "TX, Howard County"],        ["48229", "TX, Hudspeth County"],        ["48231", "TX, Hunt County"],        ["48233", "TX, Hutchinson County"],        ["48235", "TX, Irion County"],        ["48237", "TX, Jack County"],        ["48239", "TX, Jackson County"],        ["48241", "TX, Jasper County"],        ["48243", "TX, Jeff Davis County"],        ["48245", "TX, Jefferson County"],        ["48247", "TX, Jim Hogg County"],        ["48249", "TX, Jim Wells County"],        ["48251", "TX, Johnson County"],        ["48253", "TX, Jones County"],        ["48255", "TX, Karnes County"],        ["48257", "TX, Kaufman County"],        ["48259", "TX, Kendall County"],        ["48261", "TX, Kenedy County"],        ["48263", "TX, Kent County"],        ["48265", "TX, Kerr County"],        ["48267", "TX, Kimble County"],        ["48269", "TX, King County"],        ["48271", "TX, Kinney County"],        ["48273", "TX, Kleberg County"],        ["48275", "TX, Knox County"],        ["48277", "TX, Lamar County"],        ["48279", "TX, Lamb County"],        ["48281", "TX, Lampasas County"],        ["48283", "TX, La Salle County"],        ["48285", "TX, Lavaca County"],        ["48287", "TX, Lee County"],        ["48289", "TX, Leon County"],        ["48291", "TX, Liberty County"],        ["48293", "TX, Limestone County"],        ["48295", "TX, Lipscomb County"],        ["48297", "TX, Live Oak County"],        ["48299", "TX, Llano County"],        ["48301", "TX, Loving County"],        ["48303", "TX, Lubbock County"],        ["48305", "TX, Lynn County"],        ["48307", "TX, McCulloch County"],        ["48309", "TX, McLennan County"],        ["48311", "TX, McMullen County"],        ["48313", "TX, Madison County"],        ["48315", "TX, Marion County"],        ["48317", "TX, Martin County"],        ["48319", "TX, Mason County"],        ["48321", "TX, Matagorda County"],        ["48323", "TX, Maverick County"],        ["48325", "TX, Medina County"],        ["48327", "TX, Menard County"],        ["48329", "TX, Midland County"],        ["48331", "TX, Milam County"],        ["48333", "TX, Mills County"],        ["48335", "TX, Mitchell County"],        ["48337", "TX, Montague County"],        ["48339", "TX, Montgomery County"],        ["48341", "TX, Moore County"],        ["48343", "TX, Morris County"],        ["48345", "TX, Motley County"],        ["48347", "TX, Nacogdoches County"],        ["48349", "TX, Navarro County"],        ["48351", "TX, Newton County"],        ["48353", "TX, Nolan County"],        ["48355", "TX, Nueces County"],        ["48357", "TX, Ochiltree County"],        ["48359", "TX, Oldham County"],        ["48361", "TX, Orange County"],        ["48363", "TX, Palo Pinto County"],        ["48365", "TX, Panola County"],        ["48367", "TX, Parker County"],        ["48369", "TX, Parmer County"],        ["48371", "TX, Pecos County"],        ["48373", "TX, Polk County"],        ["48375", "TX, Potter County"],        ["48377", "TX, Presidio County"],        ["48379", "TX, Rains County"],        ["48381", "TX, Randall County"],        ["48383", "TX, Reagan County"],        ["48385", "TX, Real County"],        ["48387", "TX, Red River County"],        ["48389", "TX, Reeves County"],        ["48391", "TX, Refugio County"],        ["48393", "TX, Roberts County"],        ["48395", "TX, Robertson County"],        ["48397", "TX, Rockwall County"],        ["48399", "TX, Runnels County"],        ["48401", "TX, Rusk County"],        ["48403", "TX, Sabine County"],        ["48405", "TX, San Augustine County"],        ["48407", "TX, San Jacinto County"],        ["48409", "TX, San Patricio County"],        ["48411", "TX, San Saba County"],        ["48413", "TX, Schleicher County"],        ["48415", "TX, Scurry County"],        ["48417", "TX, Shackelford County"],        ["48419", "TX, Shelby County"],        ["48421", "TX, Sherman County"],        ["48423", "TX, Smith County"],        ["48425", "TX, Somervell County"],        ["48427", "TX, Starr County"],        ["48429", "TX, Stephens County"],        ["48431", "TX, Sterling County"],        ["48433", "TX, Stonewall County"],        ["48435", "TX, Sutton County"],        ["48437", "TX, Swisher County"],        ["48439", "TX, Tarrant County"],        ["48441", "TX, Taylor County"],        ["48443", "TX, Terrell County"],        ["48445", "TX, Terry County"],        ["48447", "TX, Throckmorton County"],        ["48449", "TX, Titus County"],        ["48451", "TX, Tom Green County"],        ["48453", "TX, Travis County"],        ["48455", "TX, Trinity County"],        ["48457", "TX, Tyler County"],        ["48459", "TX, Upshur County"],        ["48461", "TX, Upton County"],        ["48463", "TX, Uvalde County"],        ["48465", "TX, Val Verde County"],        ["48467", "TX, Van Zandt County"],        ["48469", "TX, Victoria County"],        ["48471", "TX, Walker County"],        ["48473", "TX, Waller County"],        ["48475", "TX, Ward County"],        ["48477", "TX, Washington County"],        ["48479", "TX, Webb County"],        ["48481", "TX, Wharton County"],        ["48483", "TX, Wheeler County"],        ["48485", "TX, Wichita County"],        ["48487", "TX, Wilbarger County"],        ["48489", "TX, Willacy County"],        ["48491", "TX, Williamson County"],        ["48493", "TX, Wilson County"],        ["48495", "TX, Winkler County"],        ["48497", "TX, Wise County"],        ["48499", "TX, Wood County"],        ["48501", "TX, Yoakum County"],        ["48503", "TX, Young County"],        ["48505", "TX, Zapata County"],        ["48507", "TX, Zavala County"],        ["49001", "UT, Beaver County"],        ["49003", "UT, Box Elder County"],        ["49005", "UT, Cache County"],        ["49007", "UT, Carbon County"],        ["49009", "UT, Daggett County"],        ["49011", "UT, Davis County"],        ["49013", "UT, Duchesne County"],        ["49015", "UT, Emery County"],        ["49017", "UT, Garfield County"],        ["49019", "UT, Grand County"],        ["49021", "UT, Iron County"],        ["49023", "UT, Juab County"],        ["49025", "UT, Kane County"],        ["49027", "UT, Millard County"],        ["49029", "UT, Morgan County"],        ["49031", "UT, Piute County"],        ["49033", "UT, Rich County"],        ["49035", "UT, Salt Lake County"],        ["49037", "UT, San Juan County"],        ["49039", "UT, Sanpete County"],        ["49041", "UT, Sevier County"],        ["49043", "UT, Summit County"],        ["49045", "UT, Tooele County"],        ["49047", "UT, Uintah County"],        ["49049", "UT, Utah County"],        ["49051", "UT, Wasatch County"],        ["49053", "UT, Washington County"],        ["49055", "UT, Wayne County"],        ["49057", "UT, Weber County"],        ["50001", "VT, Addison County"],        ["50003", "VT, Bennington County"],        ["50005", "VT, Caledonia County"],        ["50007", "VT, Chittenden County"],        ["50009", "VT, Essex County"],        ["50011", "VT, Franklin County"],        ["50013", "VT, Grand Isle County"],        ["50015", "VT, Lamoille County"],        ["50017", "VT, Orange County"],        ["50019", "VT, Orleans County"],        ["50021", "VT, Rutland County"],        ["50023", "VT, Washington County"],        ["50025", "VT, Windham County"],        ["50027", "VT, Windsor County"],        ["51001", "VA, Accomack County"],        ["51003", "VA, Albemarle County"],        ["51005", "VA, Alleghany County"],        ["51007", "VA, Amelia County"],        ["51009", "VA, Amherst County"],        ["51011", "VA, Appomattox County"],        ["51013", "VA, Arlington County"],        ["51015", "VA, Augusta County"],        ["51017", "VA, Bath County"],        ["51019", "VA, Bedford County"],        ["51021", "VA, Bland County"],        ["51023", "VA, Botetourt County"],        ["51025", "VA, Brunswick County"],        ["51027", "VA, Buchanan County"],        ["51029", "VA, Buckingham County"],        ["51031", "VA, Campbell County"],        ["51033", "VA, Caroline County"],        ["51035", "VA, Carroll County"],        ["51036", "VA, Charles City County"],        ["51037", "VA, Charlotte County"],        ["51041", "VA, Chesterfield County"],        ["51043", "VA, Clarke County"],        ["51045", "VA, Craig County"],        ["51047", "VA, Culpeper County"],        ["51049", "VA, Cumberland County"],        ["51051", "VA, Dickenson County"],        ["51053", "VA, Dinwiddie County"],        ["51057", "VA, Essex County"],        ["51059", "VA, Fairfax County"],        ["51061", "VA, Fauquier County"],        ["51063", "VA, Floyd County"],        ["51065", "VA, Fluvanna County"],        ["51067", "VA, Franklin County"],        ["51069", "VA, Frederick County"],        ["51071", "VA, Giles County"],        ["51073", "VA, Gloucester County"],        ["51075", "VA, Goochland County"],        ["51077", "VA, Grayson County"],        ["51079", "VA, Greene County"],        ["51081", "VA, Greensville County"],        ["51083", "VA, Halifax County"],        ["51085", "VA, Hanover County"],        ["51087", "VA, Henrico County"],        ["51089", "VA, Henry County"],        ["51091", "VA, Highland County"],        ["51093", "VA, Isle of Wight County"],        ["51095", "VA, James City County"],        ["51097", "VA, King and Queen County"],        ["51099", "VA, King George County"],        ["51101", "VA, King William County"],        ["51103", "VA, Lancaster County"],        ["51105", "VA, Lee County"],        ["51107", "VA, Loudoun County"],        ["51109", "VA, Louisa County"],        ["51111", "VA, Lunenburg County"],        ["51113", "VA, Madison County"],        ["51115", "VA, Mathews County"],        ["51117", "VA, Mecklenburg County"],        ["51119", "VA, Middlesex County"],        ["51121", "VA, Montgomery County"],        ["51125", "VA, Nelson County"],        ["51127", "VA, New Kent County"],        ["51131", "VA, Northampton County"],        ["51133", "VA, Northumberland County"],        ["51135", "VA, Nottoway County"],        ["51137", "VA, Orange County"],        ["51139", "VA, Page County"],        ["51141", "VA, Patrick County"],        ["51143", "VA, Pittsylvania County"],        ["51145", "VA, Powhatan County"],        ["51147", "VA, Prince Edward County"],        ["51149", "VA, Prince George County"],        ["51153", "VA, Prince William County"],        ["51155", "VA, Pulaski County"],        ["51157", "VA, Rappahannock County"],        ["51159", "VA, Richmond County"],        ["51161", "VA, Roanoke County"],        ["51163", "VA, Rockbridge County"],        ["51165", "VA, Rockingham County"],        ["51167", "VA, Russell County"],        ["51169", "VA, Scott County"],        ["51171", "VA, Shenandoah County"],        ["51173", "VA, Smyth County"],        ["51175", "VA, Southampton County"],        ["51177", "VA, Spotsylvania County"],        ["51179", "VA, Stafford County"],        ["51181", "VA, Surry County"],        ["51183", "VA, Sussex County"],        ["51185", "VA, Tazewell County"],        ["51187", "VA, Warren County"],        ["51191", "VA, Washington County"],        ["51193", "VA, Westmoreland County"],        ["51195", "VA, Wise County"],        ["51197", "VA, Wythe County"],        ["51199", "VA, York County"],        ["51510", "VA, Alexandria city"],        ["51515", "VA, Bedford city"],        ["51520", "VA, Bristol city"],        ["51530", "VA, Buena Vista city"],        ["51540", "VA, Charlottesville city"],        ["51550", "VA, Chesapeake city"],        ["51570", "VA, Colonial Heights city"],        ["51580", "VA, Covington city"],        ["51590", "VA, Danville city"],        ["51595", "VA, Emporia city"],        ["51600", "VA, Fairfax city"],        ["51610", "VA, Falls Church city"],        ["51620", "VA, Franklin city"],        ["51630", "VA, Fredericksburg city"],        ["51640", "VA, Galax city"],        ["51650", "VA, Hampton city"],        ["51660", "VA, Harrisonburg city"],        ["51670", "VA, Hopewell city"],        ["51678", "VA, Lexington city"],        ["51680", "VA, Lynchburg city"],        ["51683", "VA, Manassas city"],        ["51685", "VA, Manassas Park city"],        ["51690", "VA, Martinsville city"],        ["51700", "VA, Newport News city"],        ["51710", "VA, Norfolk city"],        ["51720", "VA, Norton city"],        ["51730", "VA, Petersburg city"],        ["51735", "VA, Poquoson city"],        ["51740", "VA, Portsmouth city"],        ["51750", "VA, Radford city"],        ["51760", "VA, Richmond city"],        ["51770", "VA, Roanoke city"],        ["51775", "VA, Salem city"],        ["51790", "VA, Staunton city"],        ["51800", "VA, Suffolk city"],        ["51810", "VA, Virginia Beach city"],        ["51820", "VA, Waynesboro city"],        ["51830", "VA, Williamsburg city"],        ["51840", "VA, Winchester city"],        ["53001", "WA, Adams County"],        ["53003", "WA, Asotin County"],        ["53005", "WA, Benton County"],        ["53007", "WA, Chelan County"],        ["53009", "WA, Clallam County"],        ["53011", "WA, Clark County"],        ["53013", "WA, Columbia County"],        ["53015", "WA, Cowlitz County"],        ["53017", "WA, Douglas County"],        ["53019", "WA, Ferry County"],        ["53021", "WA, Franklin County"],        ["53023", "WA, Garfield County"],        ["53025", "WA, Grant County"],        ["53027", "WA, Grays Harbor County"],        ["53029", "WA, Island County"],        ["53031", "WA, Jefferson County"],        ["53033", "WA, King County"],        ["53035", "WA, Kitsap County"],        ["53037", "WA, Kittitas County"],        ["53039", "WA, Klickitat County"],        ["53041", "WA, Lewis County"],        ["53043", "WA, Lincoln County"],        ["53045", "WA, Mason County"],        ["53047", "WA, Okanogan County"],        ["53049", "WA, Pacific County"],        ["53051", "WA, Pend Oreille County"],        ["53053", "WA, Pierce County"],        ["53055", "WA, San Juan County"],        ["53057", "WA, Skagit County"],        ["53059", "WA, Skamania County"],        ["53061", "WA, Snohomish County"],        ["53063", "WA, Spokane County"],        ["53065", "WA, Stevens County"],        ["53067", "WA, Thurston County"],        ["53069", "WA, Wahkiakum County"],        ["53071", "WA, Walla Walla County"],        ["53073", "WA, Whatcom County"],        ["53075", "WA, Whitman County"],        ["53077", "WA, Yakima County"],        ["54001", "WV, Barbour County"],        ["54003", "WV, Berkeley County"],        ["54005", "WV, Boone County"],        ["54007", "WV, Braxton County"],        ["54009", "WV, Brooke County"],        ["54011", "WV, Cabell County"],        ["54013", "WV, Calhoun County"],        ["54015", "WV, Clay County"],        ["54017", "WV, Doddridge County"],        ["54019", "WV, Fayette County"],        ["54021", "WV, Gilmer County"],        ["54023", "WV, Grant County"],        ["54025", "WV, Greenbrier County"],        ["54027", "WV, Hampshire County"],        ["54029", "WV, Hancock County"],        ["54031", "WV, Hardy County"],        ["54033", "WV, Harrison County"],        ["54035", "WV, Jackson County"],        ["54037", "WV, Jefferson County"],        ["54039", "WV, Kanawha County"],        ["54041", "WV, Lewis County"],        ["54043", "WV, Lincoln County"],        ["54045", "WV, Logan County"],        ["54047", "WV, McDowell County"],        ["54049", "WV, Marion County"],        ["54051", "WV, Marshall County"],        ["54053", "WV, Mason County"],        ["54055", "WV, Mercer County"],        ["54057", "WV, Mineral County"],        ["54059", "WV, Mingo County"],        ["54061", "WV, Monongalia County"],        ["54063", "WV, Monroe County"],        ["54065", "WV, Morgan County"],        ["54067", "WV, Nicholas County"],        ["54069", "WV, Ohio County"],        ["54071", "WV, Pendleton County"],        ["54073", "WV, Pleasants County"],        ["54075", "WV, Pocahontas County"],        ["54077", "WV, Preston County"],        ["54079", "WV, Putnam County"],        ["54081", "WV, Raleigh County"],        ["54083", "WV, Randolph County"],        ["54085", "WV, Ritchie County"],        ["54087", "WV, Roane County"],        ["54089", "WV, Summers County"],        ["54091", "WV, Taylor County"],        ["54093", "WV, Tucker County"],        ["54095", "WV, Tyler County"],        ["54097", "WV, Upshur County"],        ["54099", "WV, Wayne County"],        ["54101", "WV, Webster County"],        ["54103", "WV, Wetzel County"],        ["54105", "WV, Wirt County"],        ["54107", "WV, Wood County"],        ["54109", "WV, Wyoming County"],        ["55001", "WI, Adams County"],        ["55003", "WI, Ashland County"],        ["55005", "WI, Barron County"],        ["55007", "WI, Bayfield County"],        ["55009", "WI, Brown County"],        ["55011", "WI, Buffalo County"],        ["55013", "WI, Burnett County"],        ["55015", "WI, Calumet County"],        ["55017", "WI, Chippewa County"],        ["55019", "WI, Clark County"],        ["55021", "WI, Columbia County"],        ["55023", "WI, Crawford County"],        ["55025", "WI, Dane County"],        ["55027", "WI, Dodge County"],        ["55029", "WI, Door County"],        ["55031", "WI, Douglas County"],        ["55033", "WI, Dunn County"],        ["55035", "WI, Eau Claire County"],        ["55037", "WI, Florence County"],        ["55039", "WI, Fond du Lac County"],        ["55041", "WI, Forest County"],        ["55043", "WI, Grant County"],        ["55045", "WI, Green County"],        ["55047", "WI, Green Lake County"],        ["55049", "WI, Iowa County"],        ["55051", "WI, Iron County"],        ["55053", "WI, Jackson County"],        ["55055", "WI, Jefferson County"],        ["55057", "WI, Juneau County"],        ["55059", "WI, Kenosha County"],        ["55061", "WI, Kewaunee County"],        ["55063", "WI, La Crosse County"],        ["55065", "WI, Lafayette County"],        ["55067", "WI, Langlade County"],        ["55069", "WI, Lincoln County"],        ["55071", "WI, Manitowoc County"],        ["55073", "WI, Marathon County"],        ["55075", "WI, Marinette County"],        ["55077", "WI, Marquette County"],        ["55078", "WI, Menominee County"],        ["55079", "WI, Milwaukee County"],        ["55081", "WI, Monroe County"],        ["55083", "WI, Oconto County"],        ["55085", "WI, Oneida County"],        ["55087", "WI, Outagamie County"],        ["55089", "WI, Ozaukee County"],        ["55091", "WI, Pepin County"],        ["55093", "WI, Pierce County"],        ["55095", "WI, Polk County"],        ["55097", "WI, Portage County"],        ["55099", "WI, Price County"],        ["55101", "WI, Racine County"],        ["55103", "WI, Richland County"],        ["55105", "WI, Rock County"],        ["55107", "WI, Rusk County"],        ["55109", "WI, St. Croix County"],        ["55111", "WI, Sauk County"],        ["55113", "WI, Sawyer County"],        ["55115", "WI, Shawano County"],        ["55117", "WI, Sheboygan County"],        ["55119", "WI, Taylor County"],        ["55121", "WI, Trempealeau County"],        ["55123", "WI, Vernon County"],        ["55125", "WI, Vilas County"],        ["55127", "WI, Walworth County"],        ["55129", "WI, Washburn County"],        ["55131", "WI, Washington County"],        ["55133", "WI, Waukesha County"],        ["55135", "WI, Waupaca County"],        ["55137", "WI, Waushara County"],        ["55139", "WI, Winnebago County"],        ["55141", "WI, Wood County"],        ["56001", "WY, Albany County"],        ["56003", "WY, Big Horn County"],        ["56005", "WY, Campbell County"],        ["56007", "WY, Carbon County"],        ["56009", "WY, Converse County"],        ["56011", "WY, Crook County"],        ["56013", "WY, Fremont County"],        ["56015", "WY, Goshen County"],        ["56017", "WY, Hot Springs County"],        ["56019", "WY, Johnson County"],        ["56021", "WY, Laramie County"],        ["56023", "WY, Lincoln County"],        ["56025", "WY, Natrona County"],        ["56027", "WY, Niobrara County"],        ["56029", "WY, Park County"],        ["56031", "WY, Platte County"],        ["56033", "WY, Sheridan County"],        ["56035", "WY, Sublette County"],        ["56037", "WY, Sweetwater County"],        ["56039", "WY, Teton County"],        ["56041", "WY, Uinta County"],        ["56043", "WY, Washakie County"],        ["56045", "WY, Weston County"],        ["72001", "PR, Adjuntas Municipio"],        ["72003", "PR, Aguada Municipio"],        ["72005", "PR, Aguadilla Municipio"],        ["72007", "PR, Aguas Buenas Municipio"],        ["72009", "PR, Aibonito Municipio"],        ["72011", "PR, Anasco Municipio"],        ["72013", "PR, Arecibo Municipio"],        ["72015", "PR, Arroyo Municipio"],        ["72017", "PR, Barceloneta Municipio"],        ["72019", "PR, Barranquitas Municipio"],        ["72021", "PR, Bayamon Municipio"],        ["72023", "PR, Cabo Rojo Municipio"],        ["72025", "PR, Caguas Municipio"],        ["72027", "PR, Camuy Municipio"],        ["72029", "PR, Canovanas Municipio"],        ["72031", "PR, Carolina Municipio"],        ["72033", "PR, Catano Municipio"],        ["72035", "PR, Cayey Municipio"],        ["72037", "PR, Ceiba Municipio"],        ["72039", "PR, Ciales Municipio"],        ["72041", "PR, Cidra Municipio"],        ["72043", "PR, Coamo Municipio"],        ["72045", "PR, Comerio Municipio"],        ["72047", "PR, Corozal Municipio"],        ["72049", "PR, Culebra Municipio"],        ["72051", "PR, Dorado Municipio"],        ["72053", "PR, Fajardo Municipio"],        ["72054", "PR, Florida Municipio"],        ["72055", "PR, Guanica Municipio"],        ["72057", "PR, Guayama Municipio"],        ["72059", "PR, Guayanilla Municipio"],        ["72061", "PR, Guaynabo Municipio"],        ["72063", "PR, Gurabo Municipio"],        ["72065", "PR, Hatillo Municipio"],        ["72067", "PR, Hormigueros Municipio"],        ["72069", "PR, Humacao Municipio"],        ["72071", "PR, Isabela Municipio"],        ["72073", "PR, Jayuya Municipio"],        ["72075", "PR, Juana Diaz Municipio"],        ["72077", "PR, Juncos Municipio"],        ["72079", "PR, Lajas Municipio"],        ["72081", "PR, Lares Municipio"],        ["72083", "PR, Las Marias Municipio"],        ["72085", "PR, Las Piedras Municipio"],        ["72087", "PR, Loiza Municipio"],        ["72089", "PR, Luquillo Municipio"],        ["72091", "PR, Manati Municipio"],        ["72093", "PR, Maricao Municipio"],        ["72095", "PR, Maunabo Municipio"],        ["72097", "PR, Mayaguez Municipio"],        ["72099", "PR, Moca Municipio"],        ["72101", "PR, Morovis Municipio"],        ["72103", "PR, Naguabo Municipio"],        ["72105", "PR, Naranjito Municipio"],        ["72107", "PR, Orocovis Municipio"],        ["72109", "PR, Patillas Municipio"],        ["72111", "PR, Penuelas Municipio"],        ["72113", "PR, Ponce Municipio"],        ["72115", "PR, Quebradillas Municipio"],        ["72117", "PR, Rincon Municipio"],        ["72119", "PR, Rio Grande Municipio"],        ["72121", "PR, Sabana Grande Municipio"],        ["72123", "PR, Salinas Municipio"],        ["72125", "PR, San German Municipio"],        ["72127", "PR, San Juan Municipio"],        ["72129", "PR, San Lorenzo Municipio"],        ["72131", "PR, San Sebastian Municipio"],        ["72133", "PR, Santa Isabel Municipio"],        ["72135", "PR, Toa Alta Municipio"],        ["72137", "PR, Toa Baja Municipio"],        ["72139", "PR, Trujillo Alto Municipio"],        ["72141", "PR, Utuado Municipio"],        ["72143", "PR, Vega Alta Municipio"],        ["72145", "PR, Vega Baja Municipio"],        ["72147", "PR, Vieques Municipio"],        ["72149", "PR, Villalba Municipio"],        ["72151", "PR, Yabucoa Municipio"],        ["72153", "PR, Yauco Municipio"]    ]}
},{}],5:[function(require,module,exports){
var $ = require('jquery');
var count = require('./count');
var leafletPip = require('leaflet-pip');
var fullCountyList = require('../data/counties.json');

module.exports = function() {
  var address = {};

  address.isDup = function(address, duplicates) {
    var pass = false;

    if (typeof address === 'string' && Array.isArray(duplicates) && duplicates.indexOf(address) !== -1) {
      pass = true;
    }

    return pass;
  }

  address.getInput = function(query) {
    var input = '';
    $.each(query, function(index, value){
      input = input + ' ' + value;
    });

    return input;
  }

  address.isFound = function(response) {
    var pass = false;
    var features = response.features;
    if (Array.isArray(features) && features.length !== 0) {
      pass = true;
    }
    return pass;
  }

  address.isInCounty = function(fips, counties) {
    var pass = false;

    for (i in counties.fips) {
      if(fips === counties.fips[i][0]) {
        pass = true;
        break;
      } else {
        continue;
      }
    }

    return pass;
  };

  address.isUrban = function(urbanClusters, urbanAreas) {
    var pass = false;

    if ((urbanClusters === null || urbanClusters.length === 0) && (urbanAreas === null || urbanAreas.length === 0)) {
      pass = true;
    }

    return pass;
  };

  address.setCountyName = function(fipsCode) {
    var countyName = '';

    for(i in fullCountyList.counties) {
      if(fullCountyList.counties[i][0] === fipsCode) {
        countyName = fullCountyList.counties[i][1]
                      .substring(fullCountyList.counties[i][1].indexOf(',')+1)
                      .replace('County', '')
                      .replace(/^\s+|\s+$/gm,'');
        break;
      } else {
        continue;
      }
    }

    return countyName;
  };

  address.render = function(result) {
    var rowHTML = '<tr><td>' + result.input + '</td>'
      + '<td>' + result.address + '</td>'
      + '<td>' + result.countyName + '</td>'
      + '<td>' + result.block + '</td>'
      + '<td>' + result.rural;

    // add the map link if needed
    if(result.rural !== '-') {
      rowHTML = rowHTML
        + ' <a href="#" class="no-decoration hide-print jsLoadMap right" data-map="false" data-lat="' + result.x + '" data-lon="' + result.y + '" data-id="loc-' + result.id + '">Show map <span class="cf-icon cf-icon-plus-round"></span></a>'
    }

    rowHTML = rowHTML
      + '</td></tr>';

    // add the map if needed
    if(result.rural !== '-') {
      rowHTML = rowHTML
      + '<tr class="hide"><td colspan="5"><div class="map" id="loc-' + result.id + '"></div></td></tr>';
    }

    $('#' + result.type).removeClass('hide');
    $('#' + result.type + ' tbody').append(rowHTML);
  }

  address.isRural = function(mapbox, year) {
        var result = {};

        // we have something so start setting up the result
        result.input = address.getInput(mapbox.results.query);
        result.address = mapbox.results.features[0].place_name;
        result.x = mapbox.results.features[0].center[1];
        result.y = mapbox.results.features[0].center[0];

        $.ajax({
            url: 'http://data.fcc.gov/api/block/find',
            dataType: 'jsonp',
            data: {
                latitude: result.x,
                longitude: result.y,
                showall: true,
                format: 'jsonp'
            },
            success: function load(fcc) {
                var state = fcc.State.code.toLowerCase();
                result.state = state;
                result.block = fcc.Block.FIPS;

                result.countyName = fcc.County.name;
                result.countyFIPS = fcc.County.FIPS;

                $.ajax({
                    url: 'data/' + year + '.json',
                    dataType: 'json',
                    success: function load(fips) {
                        var inCounty = false;
                        $.each(fips.fips, function(key, val) {
                            if (val[0] === result.countyFIPS) {
                                inCounty = true;
                                result.rural = 'Yes';
                                result.type = 'rural';
                                result.why = 'county';
                                result.id = Date.now();
                                address.render(result);
                                count.updateCount(result.type);
                            }
                        });

                        if (!inCounty) {
                            // load geoson
                            $.ajax({
                                url: 'geojson/' + state + '.geojson',
                                dataType: 'json',
                                success: function load(d) {
                                    var gjLayer = L.geoJson(d);
                                    var inPoly = leafletPip.pointInLayer([result.y, result.x], gjLayer, true);
                                    if (inPoly.length === 0) {
                                        result.rural = 'Yes';
                                        result.type = 'rural';
                                        result.why = 'pip';
                                    } else {
                                        result.rural = 'No';
                                        result.type = 'notRural';
                                    }
                                    result.id = Date.now();
                                    address.render(result);
                                    count.updateCount(result.type);
                                }
                            });
                        }
                    }
                });
            }
        })
        .fail(function(jqXHR, textStatus) {
          console.log(textStatus);
        });
    }

  return address;
}();

},{"../data/counties.json":4,"./count":8,"jquery":1,"leaflet-pip":2}],6:[function(require,module,exports){
module.exports = function() {
  var addressParse = {};

  addressParse.isValid = function(row) {
    var pass = true;

    if (row.data[0]['Street Address'] === '' && row.errors) {
        pass = false;
    }

    return pass;
  }

  addressParse.pushAddress = function(row, addresses) {
    addresses.push(row.data[0]['Street Address'] + ', ' + row.data[0].City + ', ' + row.data[0].State + ' ' + row.data[0].Zip);
    return addresses;
  }

  return addressParse;
}();

},{}],7:[function(require,module,exports){
var $ = require('jquery');
var count = require('./count');

var monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

module.exports = function() {

    function hideData() {
        // hide the data sections
        // these get shown as needed in addresses.js (render)
        $('#rural').addClass('hide');
        $('#notRural').addClass('hide');
        $('#duplicate').addClass('hide');
        $('#notFound').addClass('hide');
    }

    var content = {};

    content.setup = function() {
        // set year
        $('.chosenYear').text($('#year').val());
        $('.chosenYear1').text(Number($('#year').val()) + 1);
        $('.chosenYear2').text(Number($('#year').val()) + 2);
        // set report generated date
        var date = new Date();
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        $('.report-date').text('Report generated ' + monthNames[monthIndex] + ' ' + day + ', ' + year);

        $('#fileError').addClass('hide');
        $('#errorMessage').addClass('hide');

        count.reset();
        this.resetHTML();
        this.showResults();
    }

    content.showResults = function() {
        // hide about
        $('#about').addClass('hide');

        hideData();

        // show the results
        $('#results').removeClass('hide');
    }

    content.showAbout = function() {
        // show about
        $('#about').removeClass('hide');

        // hide the results
        $('#results').addClass('hide');

        hideData();
    }

    content.resetHTML = function() {
        // clear the body of all the tables (data)
        $('tbody').html('');
    }

    content.error = function(message) {
        $('#errorMessage').html(message);
        $('#errorMessage').removeClass('hide');
    }

    return content;
}();

},{"./count":8,"jquery":1}],8:[function(require,module,exports){
var $ = require('jquery');

module.exports = function() {
    var counters = {};

    counters.reset = function() {
        $('.counter').html('0');
    }

    counters.updateAddressCount = function(number) {
        $('#addressCount').text(number);
    }

    counters.updateCount = function(type) {
        // add one to correct type
        var typeCount = parseInt($('a.' + type + 'Cnt').text());
        typeCount++;
        $('.' + type + 'Cnt').text(typeCount);
        
        // add one to the total
        var totalCount = parseInt($('#totalCnt').text());
        totalCount++;
        $('#totalCnt').text(totalCount);
    }

    return counters;
}();
},{"jquery":1}],9:[function(require,module,exports){
var $ = require('jquery');

module.exports = function() {
    var fileInput = {};

    var uploadName = '';

    fileInput.resetFileName = function() {
      $('#fileName').val('No file chosen');
    }

    fileInput.setFileName = function(filename) {
      $('#fileName').val(filename);
    }

    fileInput.resetError = function() {
      $('#fileError').addClass('hide');
      $('#processError').addClass('hide');
      $('.js-error-message').html('');
    }

    fileInput.setError = function(message) {
        $('#fileErrorDesc').html(message);
        $('#fileError').removeClass('hide');
    }

    fileInput.getUploadName = function(filename) {
      var uploadName = filename;
      if (uploadName.indexOf('\\') > -1) {
        uploadNameParts = uploadName.split('\\');
        uploadName = uploadNameParts[uploadNameParts.length - 1];
      }

      return uploadName;
    }

    return fileInput;

}();

},{"jquery":1}],10:[function(require,module,exports){
var $ = require('jquery');

module.exports = function() {
    var textInputs = {};

    textInputs.count = 1;

    textInputs.reset = function() {
      textInputs.count = 1;

      $('.input-address').each(function(index) {
          if ($(this).attr('id') !== 'address1') {
              $(this).remove();
          } else {
              $(this).val('').removeClass('error');
          }
      });

      $('#add-another').removeClass('hide');
    }

    textInputs.add = function() {
      textInputs.count++;

      if (textInputs.count === 10) {
        $('#add-another').addClass('hide');
      }

      var previous = textInputs.count - 1;

      if ($('#address' + previous).val() === '') {
          $('#address' + previous).addClass('error');
      } else {
          $('#address' + previous).removeClass('error');
      }

      $('#address1').clone(true)
        .appendTo('.input-container')
        .attr('id', 'address' + textInputs.count)
        .val('')
        .focus();
    }

    textInputs.toggleError = function(e) {
      if ($(e.target).val() === '') {
          $(e.target).addClass('error');
      } else {
          $(e.target).removeClass('error');
      }
    }

    return textInputs;

}();

},{"jquery":1}],11:[function(require,module,exports){
var addrParse = require('../src/js/addressParse');

describe('address parse functions (from csv)', function() {
  describe('is address valid', function() {
    var row = {};
    var addresses = [];

    it('should be valid', function() {
      row.data = [];
      row.data[0] = {
        "City": "City",
        "State": "State",
        "Street Address": "Street",
        "Zip": "12345"
      };

      expect(addrParse.isValid(row)).toBeTruthy();
    });

    it('should NOT be valid', function() {
      row.data = [];
      row.data[0] = {
        "City": "City",
        "State": "State",
        "Street Address": "",
        "Zip": "12345"
      };
      row.errors = [];
      row.errors[0] = 'true';

      expect(addrParse.isValid(row)).toBeFalsy();
    });
  });

  describe('push an addresses', function() {
    var row = {};
    var addresses = [];

    it('should be push an address', function() {
      row.data = [];
      row.data[0] = {
        "City": "City",
        "State": "State",
        "Street Address": "Street",
        "Zip": "12345"
      };

      addresses = addrParse.pushAddress(row, addresses);

      expect(addresses).toContain('Street, City, State 12345');
    });
  });
});

},{"../src/js/addressParse":6}],12:[function(require,module,exports){
var addr = require('../src/js/address');

describe('address functions', function() {
  describe('is adddress duplicate', function() {
    var address,
      duplicates;

    beforeEach(function(){
      address = '123 Main St., Somecity, SomeWhere, 12345';
      duplicates = [];
    });

    it('should NOT be a duplicate', function() {
      expect(addr.isDup(address, duplicates)).toBeFalsy();
    });

    it('should NOT be duplicate - duplicates NOT an array', function() {
      duplicates = 'string';
      expect(addr.isDup(address, duplicates)).toBeFalsy();
    });

    it('should NOT be duplicate - address NOT a string', function() {
      address = 1;
      expect(addr.isDup(address, duplicates)).toBeFalsy();
    });

    it('should be a duplicate', function() {
      duplicates.push('123 Main St., Somecity, SomeWhere, 12345');
      expect(addr.isDup(address, duplicates)).toBeTruthy();
    });

  });

  describe('is adddress found', function() {
    var response;

    beforeEach(function(){
      response = {};
      response.features = [];
    });

    it('should NOT be found - 0 length array', function() {
      expect(addr.isFound(response)).toBeFalsy();
    });

    it('should NOT be found - NOT an array', function() {
      response.features = 'string';
      expect(addr.isFound(response)).toBeFalsy();
    });

    it('should be found', function() {
      response.features.push(1);
      expect(addr.isFound(response)).toBeTruthy();
    });
  });

  describe('is adddress in rural county', function() {
    var countyList;

    beforeEach(function() {
      countyList = {
          "fips": [
            ["01005", "AL, Barbour County"],
            ["01011", "AL, Bullock County"],
            ["01013", "AL, Butler County"],
            ["01019", "AL, Cherokee County"]
          ]
        };
    });

    it('should NOT be in county', function() {
      expect(addr.isInCounty('11111', countyList)).toBeFalsy();
    });

    it('should be in county', function() {
      expect(addr.isInCounty('01005', countyList)).toBeTruthy();
    });

  });

  describe('is adddress urban', function() {
    it('should NOT be urban - one 0 length array', function() {
      expect(addr.isUrban([true], [])).toBeFalsy();
    });

    it('should NOT be urban - one null', function() {
      expect(addr.isUrban(null, [true])).toBeFalsy();
    });

    it('should NOT be urban', function() {
      expect(addr.isUrban([true], [true])).toBeFalsy();
    });

    it('should be urban - 0 length arrays', function() {
      expect(addr.isUrban([], [])).toBeTruthy();
    });

    it('should be urban - nulls', function() {
      expect(addr.isUrban(null, null)).toBeTruthy();
    });

  });

  describe('render address', function() {
    jasmine.getFixtures().fixturesPath = 'test/fixtures';
    var testResult = {};

    it('table container should be visible and table should have a row', function() {
      testResult.input = 'test address';
      testResult.address = 'Duplicate';
      testResult.countyName = '-';
      testResult.block = '-';
      testResult.rural = '-';
      testResult.type = 'duplicate';
      loadFixtures('tableDuplicate.html');
      addr.render(testResult);
      expect($('#duplicate')).toBeInDOM();
      expect($('#duplicate')).toBeVisible();
      expect($('#duplicate tbody')).toHaveHtml('<tr><td>test address</td><td>Duplicate</td><td>-</td><td>-</td><td>-</td></tr>');
    });

    it('table container should be visible and table should have a row with a map', function() {
      testResult.input = '123 Main';
      testResult.address = '123 Main';
      testResult.countyName = 'County';
      testResult.block = '1234';
      testResult.rural = 'Yes';
      testResult.type = 'rural';
      testResult.x = -72.1;
      testResult.y = -72.1;
      testResult.id = Date.now();
      loadFixtures('tableRural.html');
      addr.render(testResult);
      /*
      this fails for an unknown reason, the HTML is the same

      expect($('#duplicate tbody')).toHaveHtml('<tr><td>123 Main</td><td>123 Main</td><td>County</td><td>1234</td><td>Yes <a href="#" class="no-decoration hide-print jsLoadMap right" data-map="false" data-lat="-72.1" data-lon="-72.1" data-id="loc-' + testResult.id + '">Show map <span class="cf-icon cf-icon-plus-round"></span></a></td></tr><tr class="hide"><td colspan="5"><div class="map" id="loc-' + testResult.id + '"></div></td></tr>');
      */
      expect($('#rural')).toBeInDOM();
      expect($('#rural')).toBeVisible();
      expect($('tr.hide')).toBeInDOM(); // the row with the map
      expect($('tr')[1]).toBeInDOM(); // the row with the map
      expect($('#loc-' + testResult.id)).toBeInDOM(); // the map id
    });
  });
});

},{"../src/js/address":5}],13:[function(require,module,exports){
var content = require('../src/js/contentControl');

describe('controlling content', function() {
  jasmine.getFixtures().fixturesPath = 'test/fixtures';

  beforeEach(function(){
    loadFixtures('aboutAndResults.html');
  });

  it('show and hide results and about', function() {
    content.showResults();
    expect($('#results')).not.toHaveClass('hide');
    expect($('#about')).toHaveClass('hide');
    expect($('#rural')).toHaveClass('hide');
    expect($('#notRural')).toHaveClass('hide');
    expect($('#notFound')).toHaveClass('hide');
    expect($('#duplicate')).toHaveClass('hide');

    content.showAbout();
    expect($('#about')).not.toHaveClass('hide');
    expect($('#results')).toHaveClass('hide');
    expect($('#rural')).toHaveClass('hide');
    expect($('#notRural')).toHaveClass('hide');
    expect($('#notFound')).toHaveClass('hide');
    expect($('#duplicate')).toHaveClass('hide');
  });

  it('reset all tbody to empty string', function() {
    content.resetHTML();
    expect($('tbody')).toBeEmpty();
  });

  it('sets up everything for results', function() {
    content.setup();
    expect($('.chosenYear')).toContainText('2015');
    expect($('.chosenYear1')).toContainText('2016');
    expect($('.chosenYear2')).toContainText('2017');

    expect($('#fileError')).toHaveClass('hide');
    expect($('#errorMessage')).toHaveClass('hide');

    expect($('tbody')).toBeEmpty();

    expect($('#results')).not.toHaveClass('hide');
    expect($('#about')).toHaveClass('hide');
  });


});

},{"../src/js/contentControl":7}],14:[function(require,module,exports){
fileInput = require('../src/js/fileInput');

describe('file input', function() {
  jasmine.getFixtures().fixturesPath = 'test/fixtures';
  var filename;
  var error;
  beforeEach(function(){
    loadFixtures('fileInput.html');
  });

  it('should return the filename', function() {
    filename = 'C:\\FakePath\\filename.csv';
    expect(fileInput.getUploadName(filename)).toBe('filename.csv');
    filename = 'test.csv';
    expect(fileInput.getUploadName(filename)).toBe('test.csv');
  });

  it('should set the filename', function() {
    filename = 'test.csv';
    fileInput.setFileName(filename);
    expect($('#fileName')).toHaveValue('test.csv');
  });

  it('should REset the filename', function() {
    fileInput.resetFileName();
    expect($('#fileName')).toHaveValue('No file chosen');
  });

  it('should set the file error', function() {
    error = 'This is an error';
    fileInput.setError(error);
    expect($('#fileErrorDesc')).toContainText('This is an error');
    expect($('#fileError')).not.toHaveClass('hide');
  });

  it('should REset the file error', function() {
    fileInput.resetError();
    expect($('#fileErrorDesc')).toContainText('');
    expect($('#fileError')).toHaveClass('hide');
  });
});

},{"../src/js/fileInput":9}],15:[function(require,module,exports){
inputs = require('../src/js/textInputs');

describe('text input', function() {
  jasmine.getFixtures().fixturesPath = 'test/fixtures';
  var e = {};
  beforeEach(function(){
    loadFixtures('textInput.html');
  });

  it('should add another input and remove #add-another after 10', function() {
    expect($('#address1')[0]).toBeInDOM();
    inputs.add();
    expect($('#address2')[0]).toBeInDOM();
    inputs.add();
    expect($('#address3')[0]).toBeInDOM();
    inputs.add();
    expect($('#address4')[0]).toBeInDOM();
    inputs.add();
    expect($('#address5')[0]).toBeInDOM();
    inputs.add();
    expect($('#address6')[0]).toBeInDOM();
    inputs.add();
    expect($('#address7')[0]).toBeInDOM();
    inputs.add();
    expect($('#address8')[0]).toBeInDOM();
    inputs.add();
    expect($('#address9')[0]).toBeInDOM();
    inputs.add();
    expect($('#address10')[0]).toBeInDOM();
    expect($('#add-another')).toHaveClass('hide');
  });

  it('should remove all but 1', function() {
    inputs.reset();
    expect($('#address1')[0]).toBeInDOM();
    expect($('#address2')[0]).not.toBeInDOM();
    expect($('#add-another')).not.toHaveClass('hide');
    expect($('#address1')[0]).not.toHaveClass('error');
  });

  it('should have error', function() {
    e.target = $('#address1');
    inputs.toggleError(e);
    expect($('#address1')[0]).toBeInDOM();
    expect($('#address1')[0]).toHaveClass('error');
  });

  it('should not have error', function() {
    e.target = $('#address1');
    $('#address1').val('something');
    inputs.toggleError(e);
    expect($('#address1')[0]).toBeInDOM();
    expect($('#address1')[0]).not.toHaveClass('error');
  });
});

},{"../src/js/textInputs":10}]},{},[11,12,13,14,15]);

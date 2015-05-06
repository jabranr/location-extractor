/**
 * Location Extractor
 * Extract location from a string (primarily a tweet)
 *
 * @author: hello@jabran.me
 * @version: 1.0.0
 * @license: MIT License
 */


/**
 * Class constructor
 *
 * @param data String|Array
 * @return Object
 */

!(function(root)	{

	'use strict';

	function LocationExtractor(data) {
		this.data = data || null;
		this.stopWords = [];
		return this;
	};


	/**
	 * Setup global access
	 */
	root.LocationExtractor = root.LocationExtractor || LocationExtractor;

	/**
	 * Class prototype
	 */
	LocationExtractor.prototype.setStopWords = function(stopWords) {
		if ( typeof stopWords === 'string' )
			stopWords = stopWords.split(' ');
		this.stopWords = stopWords;
	};

	LocationExtractor.prototype.clean = function() {
		if ( typeof this.data !== 'string' )
			this.data = this.data.join(' ');

		this.stopWords = this.stopWords.concat( getStopWords() );
		this.data = cleanURL(this.data);
		this.data = cleanMention(this.data);
		this.data = cleanPunctuation(this.data);
		this.data = fetchPostCode(this.data) || cleanStopWords(this.data, this.stopWords);
		return this.data;
	}

	/**
	 * Clean URL
	 *
	 * @scope: private
	 * @param: data String
	 * @return: String
	 */
	function cleanURL(data) {
		var regex = /([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?/ig;
		return data.replace(regex, '');
	}

	/**
	 * Clean Mention
	 *
	 * @scope: private
	 * @param: data String
	 * @return: String
	 */
	function cleanMention(data) {
		var regex = /@[A-Z0-9_]+/ig;
		return data.replace(regex, '');
	}

	/**
	 * Clean panctuation
	 *
	 * @scope: private
	 * @param: data String
	 * @return: String
	 */
	function cleanPunctuation(data) {
		var regex = /[^A-Z 0-9@]+/ig;
		return data.replace(regex, '');
	}

	/**
	 * Fetch PostCode
	 *
	 * @scope: private
	 * @param: data String
	 * @return: String
	 */
	function fetchPostCode(data) {
		var regex = /(GIR 0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|[A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))|[0-9][A-HJKS-UW]) [0-9][ABD-HJLNP-UW-Z]{2})/ig;

		if ( typeof data === 'array' )
			data = data.join(' ');

		if ( data.match(regex) )
			return data.match(regex);

		return false;
	}

	/**
	 * Clean common/stop words
	 *
	 * @scope: private
	 * @param: data String
	 * @param: stopWords Array
	 * @return: String
	 */
	function cleanStopWords(data, stopWords) {
		var words = data.split(' ');
		cleanArray(words, '');
		for (var i = 0; i < stopWords.length; i++) {
			var stopWord = stopWords[i];
			var regexStr = '\\b(' + stopWord + ')\\b';
			var regex = new RegExp(regexStr, 'i');

			words = removeWord(words, regex);
		}
		cleanArray(words, '');
		return words.join(' ');
	}

	/**
	 * Emptry an index from array
	 * by matching the value
	 *
	 * @scope: private
	 * @param: arr Array
	 * @param: word String|RegExp
	 * @return: Array
	 */
	function removeWord(arr, word) {
		for(var i = 0; i < arr.length; i++) {
			arr[i] = arr[i].replace(word, '');
		}
		return arr;
	}

	/**
	 * Clean an array
	 *
	 * @scope: private
	 * @param: arr Array
	 * @param: toDelete String
	 * @return: Array
	 */
	function cleanArray(arr, toDelete) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == toDelete) {
				arr.splice(i, 1);
				i--;
			}
		}
		return arr;
	};

	/**
	 * Setup default stop/common words
	 *
	 * @scope: private
	 * @return: Array
	 */
	function getStopWords() {
		return ["a", "about", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also","although","always","am","among", "amongst", "amoungst", "amount",  "an", "and", "another", "any","anyhow","anyone","anything","anyway", "anywhere", "are", "around", "as",  "at", "back","be","became", "because","become","becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom","but", "by", "call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven","else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "know", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "near", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own","part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thickv", "thin", "third", "this", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves", "the"];
	}

})(this);

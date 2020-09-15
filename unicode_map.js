var c = {"1" : "\u0967","2" : "\u0968","3" : "\u0969","4" : "\u096A","5" : "\u096B","6" : "\u096C","7" : "\u096D","8" : "\u096E","9" : "\u096F","a" : "\u0905","aa" : "\u0906","i" : "\u0907","ee" : "\u0908","u" : "\u0909","oo" : "\u090A","k" : "\u0915","kh" : "\u0916","g" : "\u0917","gh" : "\u0918","c" : "\u091A","ch" : "\u091B","j" : "\u091C","jh" : "\u091D","T" : "\u091F","Th" : "\u0920","D" : "\u0921","Dh" : "\u0922","N" : "\u0923","t" : "\u0924","th" : "\u0925","d" : "\u0926","dh" : "\u0927","n" : "\u0928","p" : "\u092A","f" : "\u092B","b" : "\u092C","bh" : "\u092D","m" : "\u092E","y" : "\u092F","r" : "\u0930","l" : "\u0932","v" : "\u0935","sh" : "\u0936","Sh" : "\u0937","s" : "\u0938","h" : "\u0939","L" : "\u0933", 'e' : "\u090F", 'ai' : "\u0910", 'o' : '\u0913', 'ou' : '\u0914'};
var h = "\u094D";
var matra = {"a" : "","aa" : "\u093E","i" : "\u093F","ee" : "\u0940","u" : "\u0941","oo" : "\u0942","e" : "\u0947","ai" : "\u0948","o" : "\u094B","ou" : "\u094C"};

function getSandhi(cc){
	var textConverted = "";
	if(cc){
		for (let i = 0; i < cc.length; i++) {
			var temp = null;
			if(i>0)
				textConverted = textConverted + h;
			if(i+1<cc.length){
				temp = c[cc[i] + cc[i+1]];
				if(temp){
					textConverted = textConverted + temp;		
					i++;
				}
			}
			if(!temp){
				result = c[cc[i]];
				if(result)
					textConverted = textConverted + result;		
			}
		}
	}
	return textConverted;
}


function getVovel(vovel){
	var textConverted = "";
	if(vovel){
		textConverted = textConverted + matra[vovel];
	}
	return textConverted;
}

function p(text){
	var dText = "";
	var itr = text.matchAll('([bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]+)*([aeiouAEIOU]+)*');
	for(const match of itr){
		co = match[1];
		v = match[2];
		if(!co){
			co = v;
			v = null;
		}
		consonent = getSandhi(co);
		vovel = getVovel(v);
		dText = dText + consonent + vovel;
	}
	return dText;
}

function register(key){
	$(key).keyup(function( event ) {
		charecter = String.fromCharCode(event.which);
		if(" " === charecter){
			var fullText = $(key).val().trim();
			var alreadyConvertedString = "";
			var worldToBeProcessed = "";
			
			var lastIndex = fullText.lastIndexOf(" ");
			if(lastIndex > -1){
				alreadyConvertedString = fullText.substring(0, lastIndex);
				worldToBeProcessed = fullText.substring(lastIndex, fullText.length);
			}else{
				alreadyConvertedString = "";
				worldToBeProcessed = fullText;
			}
			s = p(worldToBeProcessed);
			$(key).val(alreadyConvertedString + " " + s + " ");
		}
	});
}

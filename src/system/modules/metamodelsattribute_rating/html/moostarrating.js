/*
description: A plugin that creates a non-obtrusive star rating control based on a set of radio input boxes. Based on Diego Alto's jQuery Star Rating Plugin.
license: MIT-style
authors: Lorenzo Stanco
*/
var MooStarRatingImages={defaultImageFolder:"",defaultImageEmpty:"star_empty.png",defaultImageFull:"star_full.png",defaultImageHover:null};var MooStarRating=new Class({Implements:[Options,Events],options:{form:null,radios:"rating",selector:"",linksClass:"star",imageFolder:MooStarRatingImages.defaultImageFolder,imageEmpty:MooStarRatingImages.defaultImageEmpty,imageFull:MooStarRatingImages.defaultImageFull,imageHover:MooStarRatingImages.defaultImageHover,width:16,height:16,half:false,tip:null,tipTarget:null,tipTargetType:"text",disabled:false},radios:[],stars:[],currentIndex:-1,initialize:function(m){this.setOptions({imageFolder:MooStarRatingImages.defaultImageFolder,imageEmpty:MooStarRatingImages.defaultImageEmpty,imageFull:MooStarRatingImages.defaultImageFull,imageHover:MooStarRatingImages.defaultImageHover});this.setOptions(m);if((this.options.imageFolder.length!=0)&&(this.options.imageFolder.substr(-1)!="/")){this.options.imageFolder+="/"}if(this.options.imageHover==null){this.options.imageHover=this.options.imageFull}try{Asset.images([this.options.imageFolder+this.options.imageEmpty,this.options.imageFolder+this.options.imageFull,this.options.imageFolder+this.options.imageHover])}catch(g){}var k=this.options.form;this.options.form=$(k);if(!this.options.form){this.options.form=$$("form[name="+k+"]")[0]}if(this.options.form){var h="star_"+String.uniqueID();this.options.form.addClass(h);this.options.selector+="form."+h+" "}this.options.selector+="input[type=radio][name="+this.options.radios+"]";var c=0;var j=this;var f=null;var d=$$(this.options.selector).length;var b=this.options.width.toInt();var a=b;var l=this.options.height.toInt();if(this.options.half){b=(b/2).toInt();a=a-b}$$(this.options.selector).each(function(e){this.radios[c]=e;if(e.get("checked")){this.currentIndex=c}if(e.get("disabled")){this.options.disabled=true}e.setStyle("display","none");this.stars[c]=new Element("a",{title:e.get("title")}).addClass(this.options.linksClass);this.stars[c].store("ratingIndex",c);this.stars[c].setStyles({"background-image":'url("'+this.options.imageFolder+this.options.imageEmpty+'")',"background-repeat":"no-repeat",display:"inline-block",width:((this.options.half&&(c%2))?a:b),height:l});if(this.options.half){this.stars[c].setStyle("background-position",((c%2)?"-"+b+"px 0":"0 0"))}this.stars[c].addEvents({mouseenter:function(){j.starEnter(this.retrieve("ratingIndex"))},mouseleave:function(){j.starLeave()}});if(this.options.tip){var i=this.options.tip;i=i.replace("[VALUE]",e.get("value"));i=i.replace("[COUNT]",d);if(this.options.tipTarget){this.stars[c].store("ratingTip",i)}else{this.stars[c].setProperty("title",i)}}this.stars[c].addEvent("click",function(){if(!j.options.disabled){j.setCurrentIndex(this.retrieve("ratingIndex"));j.fireEvent("click",j.getValue())}});f=e;c++},this);$$(this.stars).each(function(i,e){i.inject(f,"after");f=i},this);if(this.options.disabled){this.disable()}else{this.enable()}this.fillStars();return this},setValue:function(a){this.radios.each(function(c,b){if(c.get("value")==a){this.currentIndex=b}},this);this.refreshRadios();this.fillStars();return this},getValue:function(){if(!this.radios[this.currentIndex]){return null}return this.radios[this.currentIndex].get("value")},setCurrentIndex:function(a){this.currentIndex=a;this.refreshRadios();this.fillStars();return this},enable:function(){this.options.disabled=false;this.stars.each(function(a){a.setStyle("cursor","pointer")});this.refreshRadios();return this},disable:function(){this.options.disabled=true;this.stars.each(function(a){a.setStyle("cursor","default")});this.refreshRadios();return this},refresh:function(){this.fillStars();this.refreshRadios();return this},fillStars:function(a){$$(this.stars).each(function(c,b){var d=this.options.imageEmpty;if(a==null){if(b<=this.currentIndex){d=this.options.imageFull}}if(a!=null){if(b<=a){d=this.options.imageHover}}c.setStyle("background-image",'url("'+this.options.imageFolder+d+'")')},this);return this},starEnter:function(a){if(this.options.disabled){return}this.fillStars(a);if(this.options.tip&&this.options.tipTarget){$(this.options.tipTarget).set(this.options.tipTargetType,this.stars[a].retrieve("ratingTip"))}this.fireEvent("mouseenter",this.radios[a].get("value"));return this},starLeave:function(){if(this.options.disabled){return}this.fillStars();if(this.options.tip&&this.options.tipTarget){$(this.options.tipTarget).set(this.options.tipTargetType,"")}this.fireEvent("mouseleave");return this},setCurrentIndex:function(a){this.currentIndex=a;this.refreshRadios();this.fillStars();return this},refreshRadios:function(){this.radios.each(function(b,a){b.set("disabled",this.options.disabled);b.set("checked",a==this.currentIndex)},this);return this},debug:function(){radioStatus={};this.radios.each(function(radio){eval("radioStatus."+radio.get("value")+" = "+(radio.get("checked")?"true":"false")+";")});return({"Current value":this.currentIndex,"Hidden radios status":radioStatus})}});
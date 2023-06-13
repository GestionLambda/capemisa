/*!
 * imagesLoaded PACKAGED v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

 !function(global,factory){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",factory):"object"==typeof module&&module.exports?module.exports=factory():global.EvEmitter=factory()}(this,function(){function EvEmitter(){}var proto=EvEmitter.prototype;return proto.on=function(eventName,listener){if(eventName&&listener){var events=this._events=this._events||{},listeners=events[eventName]=events[eventName]||[];return listeners.indexOf(listener)==-1&&listeners.push(listener),this}},proto.once=function(eventName,listener){if(eventName&&listener){this.on(eventName,listener);var onceEvents=this._onceEvents=this._onceEvents||{},onceListeners=onceEvents[eventName]=onceEvents[eventName]||[];return onceListeners[listener]=!0,this}},proto.off=function(eventName,listener){var listeners=this._events&&this._events[eventName];if(listeners&&listeners.length){var index=listeners.indexOf(listener);return index!=-1&&listeners.splice(index,1),this}},proto.emitEvent=function(eventName,args){var listeners=this._events&&this._events[eventName];if(listeners&&listeners.length){var i=0,listener=listeners[i];args=args||[];for(var onceListeners=this._onceEvents&&this._onceEvents[eventName];listener;){var isOnce=onceListeners&&onceListeners[listener];isOnce&&(this.off(eventName,listener),delete onceListeners[listener]),listener.apply(this,args),i+=isOnce?0:1,listener=listeners[i]}return this}},EvEmitter}),function(window,factory){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(EvEmitter){return factory(window,EvEmitter)}):"object"==typeof module&&module.exports?module.exports=factory(window,require("ev-emitter")):window.imagesLoaded=factory(window,window.EvEmitter)}(window,function(window,EvEmitter){function extend(a,b){for(var prop in b)a[prop]=b[prop];return a}function makeArray(obj){var ary=[];if(Array.isArray(obj))ary=obj;else if("number"==typeof obj.length)for(var i=0;i<obj.length;i++)ary.push(obj[i]);else ary.push(obj);return ary}function ImagesLoaded(elem,options,onAlways){return this instanceof ImagesLoaded?("string"==typeof elem&&(elem=document.querySelectorAll(elem)),this.elements=makeArray(elem),this.options=extend({},this.options),"function"==typeof options?onAlways=options:extend(this.options,options),onAlways&&this.on("always",onAlways),this.getImages(),$&&(this.jqDeferred=new $.Deferred),void setTimeout(function(){this.check()}.bind(this))):new ImagesLoaded(elem,options,onAlways)}function LoadingImage(img){this.img=img}function Background(url,element){this.url=url,this.element=element,this.img=new Image}var $=window.jQuery,console=window.console;ImagesLoaded.prototype=Object.create(EvEmitter.prototype),ImagesLoaded.prototype.options={},ImagesLoaded.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},ImagesLoaded.prototype.addElementImages=function(elem){"IMG"==elem.nodeName&&this.addImage(elem),this.options.background===!0&&this.addElementBackgroundImages(elem);var nodeType=elem.nodeType;if(nodeType&&elementNodeTypes[nodeType]){for(var childImgs=elem.querySelectorAll("img"),i=0;i<childImgs.length;i++){var img=childImgs[i];this.addImage(img)}if("string"==typeof this.options.background){var children=elem.querySelectorAll(this.options.background);for(i=0;i<children.length;i++){var child=children[i];this.addElementBackgroundImages(child)}}}};var elementNodeTypes={1:!0,9:!0,11:!0};return ImagesLoaded.prototype.addElementBackgroundImages=function(elem){var style=getComputedStyle(elem);if(style)for(var reURL=/url\((['"])?(.*?)\1\)/gi,matches=reURL.exec(style.backgroundImage);null!==matches;){var url=matches&&matches[2];url&&this.addBackground(url,elem),matches=reURL.exec(style.backgroundImage)}},ImagesLoaded.prototype.addImage=function(img){var loadingImage=new LoadingImage(img);this.images.push(loadingImage)},ImagesLoaded.prototype.addBackground=function(url,elem){var background=new Background(url,elem);this.images.push(background)},ImagesLoaded.prototype.check=function(){function onProgress(image,elem,message){setTimeout(function(){_this.progress(image,elem,message)})}var _this=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(loadingImage){loadingImage.once("progress",onProgress),loadingImage.check()}):void this.complete()},ImagesLoaded.prototype.progress=function(image,elem,message){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!image.isLoaded,this.emitEvent("progress",[this,image,elem]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,image),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&console&&console.log("progress: "+message,image,elem)},ImagesLoaded.prototype.complete=function(){var eventName=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(eventName,[this]),this.emitEvent("always",[this]),this.jqDeferred){var jqMethod=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[jqMethod](this)}},LoadingImage.prototype=Object.create(EvEmitter.prototype),LoadingImage.prototype.check=function(){var isComplete=this.getIsImageComplete();return isComplete?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},LoadingImage.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},LoadingImage.prototype.confirm=function(isLoaded,message){this.isLoaded=isLoaded,this.emitEvent("progress",[this,this.img,message])},LoadingImage.prototype.handleEvent=function(event){var method="on"+event.type;this[method]&&this[method](event)},LoadingImage.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},LoadingImage.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},LoadingImage.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},Background.prototype=Object.create(LoadingImage.prototype),Background.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var isComplete=this.getIsImageComplete();isComplete&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},Background.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},Background.prototype.confirm=function(isLoaded,message){this.isLoaded=isLoaded,this.emitEvent("progress",[this,this.element,message])},ImagesLoaded.makeJQueryPlugin=function(jQuery){jQuery=jQuery||window.jQuery,jQuery&&($=jQuery,$.fn.imagesLoaded=function(options,callback){var instance=new ImagesLoaded(this,options,callback);return instance.jqDeferred.promise($(this))})},ImagesLoaded.makeJQueryPlugin(),ImagesLoaded});
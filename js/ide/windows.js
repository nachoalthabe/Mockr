var Window = Class.extend({
  _dom: null,
  _title: null,
  _container: null,
  _closeBtn: null,
  init: function(container){
    this._dom = $(container)
    this._title = $('<div>').attr('id','tspTitle')
    this._closeBtn = $('<div>').attr('id','tspClose').append($('<img>').attr({
		  src: 'images/close.png',
		  alt: 'Close tag list box'
		}).mousedown($.proxy(this.hide,this)))
		//Agrego el tag editor
    tagEditorContainer = $('<div>').attr('id','tspTagEditor').hide()
    this._tagEditor = new tagEditor(this,tagEditorContainer)
		//Creo un manejador de lista de tags...
		this._container = $('<div>').attr('id','tspContent')
		this._submitBtn = $('<div class="addTagBtn">').append($('<input>').attr({
	    type: 'button',
	    value: 'Ok'
	  }).mousedown($.proxy(this.submit,this)))
    this._dom.append(this._title,this._closeBtn,this._container,tagEditorContainer,this._submitBtn)
    //Seteando los accesors a widget
    this.__defineGetter__("widget",this.getWidget)
    this.__defineSetter__("widget",this.setWidget)
  },
})
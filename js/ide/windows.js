var Window = Class.extend({
  _dom: null,
  _title: null,
  _closeBtn: null,
  _container: null,
  init: function(){
    this._dom = $('<div class="Window">')
    this._title = $('<div class="title">')
    this._closeBtn = $('<div class="closeBtn">').append($('<img>').attr({
		  src: 'images/close.png',
		  alt: 'close'
		}).mousedown($.proxy(this.hide,this)))
		this._container = $('<div class="container">')
    this._dom.append(this._title,this._closeBtn,this._container)
    $(document).append(this._dom)
  },
  show: function(){
    this._dom.show()
  },
  hide: function(){
    this._dom.hide()
  }
})

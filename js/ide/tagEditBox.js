var tagEditor = Class.extend({
    init: function(container){
        this._dom = $(container)
        this._dom.css('position','absolute')
        this._title = $('<div>').attr('id','tspTitle')
        this._closeBtn = $('<div>').attr('id','tspClose').append($('<img>').attr({
			    src: 'images/close.png',
			    alt: 'Close tag edit box'
		    }).mousedown($.proxy(this.hide,this)))
		  //Creo un manejador de lista de tags...
		  tagListBoxItemsContainer = $('<div>').attr('id','tspContent')
      this._container = $('<div>').attr('id','tspContent').append($('<span>').text(''))
      this._dom.append(this._title,this._closeBtn,this._container)
      //Seteando los accesors al tag
      this.__defineGetter__("tag",this.getTag)
      this.__defineSetter__("tag",this.setTag)
    },
    show: function(tag,dom){
        this.tag = tag
        cOff = dom.offset()
        cPos = dom.position()
        //@TODO: Para mas adelante...
        //this._dom.css('top',this.fnPosition.top())
        //this._dom.css('left',this.fnPosition.left())
        this._dom.css('top',cPos.top)//TODO: Que tome el contexto
        this._dom.css('left',cPos.left)//TODO: Que tome el contexto
        this._title.text(tag.toString())
        console.log(tag.toString())
        this._dom.show()
        return false
    },
    getTag: function(){
        return this._tag
    },
    setTag: function(tag){
        this._tag = tag
    },
    hide: function(event){
        this._dom.hide()
    }
})
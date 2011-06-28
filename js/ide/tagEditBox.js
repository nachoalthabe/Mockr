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
      this._container = $('<div>').addClass('tspContent')
      this._submitBtn = $('<div class="addTagBtn">').append($('<input>').attr({
	      type: 'button',
	      value: 'Add'
	    }).mousedown($.proxy(this.addTag,this)))
      this._dom.append(this._title,this._closeBtn,this._container,this._submitBtn)
      //Seteando los accesors al tag
      this.__defineGetter__("tag",this.getTag)
      this.__defineSetter__("tag",this.setTag)
    },
    show: function(tag,dom){
        this._tag = tag
        cOff = dom.offset()
        cPos = dom.position()
        //@TODO: Para mas adelante...
        //this._dom.css('top',this.fnPosition.top())
        //this._dom.css('left',this.fnPosition.left())
        this._dom.css('top',cPos.top)//TODO: Que tome el contexto
        this._dom.css('left',cPos.left)//TODO: Que tome el contexto
        this._title.text(tag.toString())
        this.renderParams()
        this._dom.show()
        return true
    },
    getTag: function(){
        return this._tag
    },
    setTag: function(tag){
        this._tag = tag
    },
    hide: function(event){
        this._dom.hide()
    },
    renderParams: function(){
      this._container.html('')
      params = this._tag.getParams()
      console.log(params)
      for(var param in params){
        params[param].render(this._container)
      }
    },
    addTag: function(){
      
    }
})
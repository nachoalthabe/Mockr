var tagEditor = Class.extend({
  init: function(parent,container){
    this._parent = parent
    this._dom = $(container)
    this._dom.css('position','absolute')
    this._btnContainer = $('<div class="tspBtns">').append(
      $('<input type="button" value="Borrar" />').click($.proxy(this.delTag,this)),
      $('<input type="button" value="Aceptar">').click($.proxy(this.hide,this))
      )
    //Creo un manejador de lista de tags...
    this._container = $('<div>').addClass('tspContent')
    this._delBtn = $('<div class="tspDelBtn">').append(
      $('<input type="button" value="borrar" />').click($.proxy(this.delTag,this))
      )
    this._dom.append(this._container,this._btnContainer)
    //Seteando los accesors al tag
    this.__defineGetter__("tag",this.getTag)
    this.__defineSetter__("tag",this.setTag)
  },
  show: function(listItem,tag,dom){
    this._tag = tag
    this._listItem = listItem
    cPos = dom.position()
    //@TODO: Para mas adelante...
    //this._dom.css('top',this.fnPosition.top())
    //this._dom.css('left',this.fnPosition.left())
    this._dom.css('top',cPos.top)//TODO: Que tome el contexto
    this._dom.css('left',cPos.left)//TODO: Que tome el contexto
    this.renderParams()
    this._dom.show()
    return true
  },
  delTag: function(){
    if(!this._tag)
      return false
    var widget = this._tag.getWidget()
    widget.removeTag(this._tag)
    this._listItem.delTag()
    this.hide()
  },
  getTag: function(){
    return this._tag
  },
  setTag: function(tag){
    this._tag = tag
  },
  hide: function(event){
    if(this._tag){
      for(var param in params){
        params[param].persist()
      }
    }
    this._dom.hide()
    this._parent.showClose()
  },
  renderParams: function(){
    this._container.html('')
    params = this._tag.getParams()
    for(var param in params){
      params[param].render(this._container)
    }
  },
  addTag: function(){
    this.hide()
    this._parent._widget.addTag(this._tag)
  }
})

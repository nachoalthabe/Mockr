var tagEditor = Class.extend({
  init: function(parent,container){
    this._parent = parent
    this._dom = $(container)
    this._dom.css('position','absolute')
    this._btnContainer = $('<div class="tspBtns">').append(
      $('<input type="button" value="Borrar" />').click($.proxy(this.delTag,this)),
      $('<input type="button" value="Aceptar">').click($.proxy(this.addTag,this))
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
  show: function(listItem,tag,dom,widget){
    this._tag = tag
    this._listItem = listItem
    this._widget = widget
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
    console.log('delTag')
    this._listItem.delTag()
    console.log('Fin del delTag')
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
      params = this._tag.getParams()
      for(var param in params){
        params[param].persist()
      }
      this._tag.updateParams()
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
    this._widget.addTag(this._tag)
    this.hide()
  }
})

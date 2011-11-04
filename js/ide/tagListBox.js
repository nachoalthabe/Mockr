tagListBox = Class.extend({
  _dom: null,
  _container: null,
  _closeBtn: null,
  _tags: null,
  _tagEditor: null,
  _items: null,
  _widget: null,
  init: function(){
    this._dom = $('<div id="tagSelectionPanel">')
    this._btnContainer = $('<div class="tspBtns">').append(
      $('<input type="button" value="Aceptar">').click($.proxy(this.hide,this))
      )
    //Agrego el tag editor
    tagEditorContainer = $('<div>').attr('id','tspTagEditor').hide()
    this._tagEditor = new tagEditor(this,tagEditorContainer)
    //Creo un manejador de lista de tags...
    this._container = $('<div>').attr('id','tspContent')
    this._dom.append(this._container,tagEditorContainer,this._btnContainer)
    $(document.body).append(this._dom)
    //Seteando los accesors a widget
    this.__defineGetter__("widget",this.getWidget)
    this.__defineSetter__("widget",this.setWidget)
  },
  getWidget: function(){
    return this._widget
  },
  setWidget: function(widget){
    if(!widget instanceof Widget){
      throw("Debe especificar un objeto widget.")
    }
    this._widget = widget
    this._tags = widget.getValidTags()
    this._container.widget = widget;
  },
  showClose: function(){
    this._btnContainer.show()
  },
  hideClose: function(){
    this._btnContainer.hide()
  },
  drawItems: function(){
    auxItems = new Array()
    locWidget = this.widget
    locTagEditor = this._tagEditor
    this._tags.forEach(function(tag){
      console.log('Agregando tag:'+tag)
      item = new tagListBoxItems(this,locWidget,tag,locTagEditor)
      auxItems.push(item)
    })
    this._items = auxItems
    auxContainer = this._container.html('')
    auxItems.forEach(function(item){
      console.log('drawItems',item)
      item.draw(auxContainer)
    })
  },
  show: function(widget){
    this.hide()
    this.widget = widget;
    if(this._tags.length == 0){
      return
    }
    var offset = widget.dom.offset()
    $(document).width()
    $(document).height()
    var position = {
      top: offset.top+31,
      left: offset.left+widget.dom.width()+2
    }
    this.drawItems()
    this._dom.show()
    if($(document).height()<position.top+this._dom.height()){
      position.top = position.top-this._dom.height()-31
    }
    if($(document).width()<position.left+this._dom.width()){
      position.left = position.left-this._dom.width()
    }
    this._dom.css(position)
  },
  hide: function(event){
    if(this._tagEditor){
      this._tagEditor.hide()
    }
    this._dom.hide()
  },
  submit: function(){
    this.hide()
  }
})

tagListBoxItems = Class.extend({
  _widget: null,
  _dom: null,
  _tagName: null,
  _tag: null,
  init: function(parent,widget,tag,tagEditor){
    this._parent = parent
    this._tagName = tag
    this._widget = widget
    this._tagEditor = tagEditor
    this._dom = $('<div>').addClass('tlbiItem').append(
      $('<span>').addClass('tlbiTitle').text(tag)
      ).data('tagName',this._tagName).bind({
      click: $.proxy(this.addTag,this),
      mouseover: $.proxy(this.tagOver,this),
      mouseleave: $.proxy(this.tagLive,this)
    }).addClass(TagsDictionary[this._tagName].tagSet._name)
    if(this._widget.hasTag(tag)){
      this._dom.addClass('apply')
      this._tag = this._widget.getTag(tag)
    }
  },
  delTag: function(){
    console.log('reastreando delTag')
    this._widget.removeTag(this._tag)
    this._dom.removeClass('apply')
  //delete this._tag
  },
  addTag: function(event){
    if(!this._tag){
      this._tag = eval('new Tag_'+this._tagName+'()');
      console.log('tagSelectionChange',this)
    }
    console.log('addTag')
    if(this._tag._params == false)
      if(this._dom.hasClass('apply')){
        this._widget.removeTag(this._tag)
        this._dom.removeClass('apply')
      }else{
        this._widget.addTag(this._tag)
        this._dom.addClass('apply')
      }
    else {
      this._dom.addClass('apply')
      console.log('tagSelectionChange',this)
      this._tagEditor._parent.hideClose()
      this._tagEditor.show(this,this._tag,elem,this._widget)
    }
  },
  draw: function(container){
    container.append(this._dom)
  },
  tagEdit: function(){
    this._tagEditor.show(this,this._tag,this._dom)
  },
  tagOver: function(){
    elem = this._dom.addClass('over');
  },
  tagLive: function(){
    elem = this._dom.removeClass('over');
  }
})

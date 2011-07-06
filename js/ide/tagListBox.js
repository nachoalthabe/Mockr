tagListBox = Class.extend({
    _dom: null,
    _container: null,
    _closeBtn: null,
    _tags: null,
    _tagEditor: null,
    _items: null,
    _widget: null,
    init: function(container){
      this._dom = $(container)
      this._closeBtn = $('<div>').attr('id','tspClose').append($('<img>').attr({
			  src: 'images/close.png',
			  alt: 'Close tag list box'
		  }).mousedown($.proxy(this.hide,this)))
		  //Agrego el tag editor
      tagEditorContainer = $('<div>').attr('id','tspTagEditor').hide()
      this._tagEditor = new tagEditor(this,tagEditorContainer)
		  //Creo un manejador de lista de tags...
		  this._container = $('<div>').attr('id','tspContent')
      this._dom.append(this._closeBtn,this._container,tagEditorContainer)
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
    drawItems: function(){
        auxItems = new Array()
        locWidget = this.widget
        locTagEditor = this._tagEditor
        this._tags.forEach(function(tag){
          console.log('Agregando tag:'+tag)
          item = new tagListBoxItems(locWidget,tag,locTagEditor)
          auxItems.push(item)
        })
        this._items = auxItems
        auxContainer = this._container.html('')
        auxItems.forEach(function(item){
          item.draw(auxContainer)
        })
    },
    show: function(widget){
        this.widget = widget;
        this._dom.css('top',widget.y+31)
        this._dom.css('left',widget.x+widget.width+2)
        this.drawItems()
        this._dom.show()
    },
    hide: function(event){
        this._tagEditor.hide()
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
    init: function(widget,tag,tagEditor){
        this._tagName = tag
        this._widget = widget
        this._tagEditor = tagEditor
        this._dom = $('<div>').addClass('tlbiItem').append(
          $('<span>').addClass('tlbiTitle').text(tag)
        ).data('tagName',this._tagName).bind({
          click: $.proxy(this.tagSelectionChange,this),
          mouseover: $.proxy(this.tagOver,this),
          mouseleave: $.proxy(this.tagLive,this)
        }).addClass(TagsDictionary[this._tagName].tagSet._name)
        if(this._widget.hasTag(tag)){
          this._dom.addClass('edit')
          this._tag = this._widget.getTag(tag)
        }
    },
    tagSelectionChange: function(event){
        if(!this._tag){
            this._tag = eval('new Tag_'+this._tagName+'()');
        }
        this._dom.addClass('apply')
        this._tagEditor.show(this._tag,elem)
    },
    draw: function(container){
      container.append(this._dom)
    },
    tagEdit: function(){
      this._tagEditor.show(this._tag,this._dom)
    },
    tagOver: function(){
      elem = this._dom.addClass('over');
    },
    tagLive: function(){
      elem = this._dom.removeClass('over');
    }
})
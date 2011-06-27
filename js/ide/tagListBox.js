tagListBox = Class.extend({
    _dom: null,
    _title: null,
    _container: null,
    _closeBtn: null,
    _tags: null,
    _tagEditor: null,
    _items: null,
    _widget: null,
    init: function(container){
      this._dom = $(container)
      this._title = $('<div>').attr('id','tspTitle')
      this._closeBtn = $('<div>').attr('id','tspClose').append($('<img>').attr({
			  src: 'images/close.png',
			  alt: 'Close tag list box'
		  }).mousedown($.proxy(this.hide,this)))
		  //Agrego el tag editor
      tagEditorContainer = $('<div>').attr('id','tspTagEditor').hide()
      this._tagEditor = new tagEditor(tagEditorContainer)
		  //Creo un manejador de lista de tags...
		  this._container = $('<div>').attr('id','tspContent')
      this._dom.append(this._title,this._closeBtn,this._container,tagEditorContainer)
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
        console.log('drawItems:',this._tags)
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
        console.log(auxContainer)
    },
    show: function(widget){
        this.widget = widget;
        this._dom.css('top',widget.y+31)
        this._dom.css('left',widget.x+widget.width+2)
        this._title.text(widget.getId())
        this.drawItems()
        this._dom.show()
    },
    hide: function(event){
        this._dom.hide()
    }
})

tagListBoxItems = Class.extend({
    _widget: null,
    _dom: null,
    _tag: null,
    init: function(widget,tag,tagEditor){
        console.log('new tagListBoxItems',widget,',',tag)
        this._tag = tag
        this._widget = widget
        this._tagEditor = tagEditor
        this._item = $('<div>').addClass('tlbiItem')
        this._itemTitle = $('<div>').addClass('tlbiTitle').append(
          $('<div>').addClass(
            'tagSet '+TagsDictionary[tag].tagSet.name
          ),
          $('<span>').addClass('tlbiTitle').text(tag)
        )
        this._itemChkBox = $('<input>').attr({
          type: 'checkbox',
          class: 'tlbiChkBox'
        }).data('tagName',tag).change($.proxy(this.tagSelectionChange,this))
        this._dom = $('<div>').append(this._item,this._itemTitle,this._itemChkBox)
        if(this._widget.hasTag(tag)){
          this._itemChkBox.attr('checked',true)
      }else{
        this._itemChkBox.attr('checked',false)
      }
      console.log('new tagListBoxItems end')
    },
    tagSelectionChange: function(event){
        elem = this._itemChkBox;
        tagName = elem.data('tagName');
        if(elem.attr('checked')){
            this._tag = eval('new Tag_'+tagName+'()');
            if(this._tagEditor.show(this._tag,elem)){
                this._widget.addTag(this._tag)
                if(this.widget.addTag(tag)){
                    console.log("Tag agregado con exito.");
                }
            }
                elem.attr('checked',false)
        }else{
            //console.log('des-marcado!',elem.data('tagName'))
            if(!this._widget.removeTag(tagName))
                elem.attr('checked',true)
        }
    },
    draw: function(container){
      console.log('Draw:',container)
            container.append(this._dom)
    }
})
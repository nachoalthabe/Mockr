tagListBox = Class.extend({
    _dom: null,
    _title: null,
    _container: null,
    _closeBtn: null,
    _tags: null,
    _widget: null,
    init: function(container){
        this._dom = $(container)
        this._title = $('<div>').attr('id','tspTitle')
        this._closeBtn = $('<div>').attr('id','tspClose').append($('<img>').attr({
			src: 'images/close.png',
			alt: 'Close tag list box'
		}).mousedown($.proxy(this.hide,this)))
		//Creo un manejador de lista de tags...
		tagListBoxItemsContainer = $('<div>').attr('id','tspContent')
        this._container = new tagListBoxItems(tagListBoxItemsContainer)
        this._dom.append(this._title,this._closeBtn,tagListBoxItemsContainer)
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
       this._container.widget = widget;
    },
    show: function(widget){
        this.widget = widget;
        this._dom.css('top',widget.y+31)
        this._dom.css('left',widget.x+widget.width+2)
        this._title.text(widget.getTag('id').getId())
        this._dom.show()
    },
    hide: function(event){
        this._dom.hide()
    }
})

tagListBoxItems = Class.extend({
    _widget: null,
    _dom: null,
    init: function(container){
        this.__defineGetter__("widget",this.getWidget)
        this.__defineSetter__("widget",this.setWidget)
        this._dom = container;
    },
    setWidget: function(widget){
        this._dom.empty()
        if(!widget instanceof Widget){
            throw("Debe especificar un objeto widget.")
        }
        this._widget = widget
        tags = widget.getValidTags()
        len = tags.length
        for(var i=0; i<len; i++) {
            console.log(TagsDictionary[tags[i]].tagSet.name)
            item = $('<div>').addClass('tlbiItem')
            itemTitle = $('<div>').addClass('tlbiTitle').append(
                $('<div>').addClass(
                    'tagSet '+TagsDictionary[tags[i]].tagSet.name
                ),
                $('<span>').addClass('tlbiTitle').text(tags[i])
            )
            itemChkBox = $('<input>').attr({
                type: 'checkbox',
                class: 'tlbiChkBox'
            }).data('tagName',tags[i].toString()).change($.proxy(this.tagSelectionChange,this))
            if(widget.hasTag(tags[i])){
                itemChkBox.attr('checked',true)
            }else{
                itemChkBox.attr('checked',false)
            }
            item.append(itemTitle,itemChkBox)
            this._dom.append(item)
        }
    },
    getWidget: function(){
        return this._widget
    },
    tagSelectionChange: function(event){
        elem = $(event.target)
        tagName = elem.data('tagName');
        if(elem.attr('checked')){
            //console.log('marcado!',);
            if(!this._widget.addTag(eval('new Tag_'+tagName+'()')))
                elem.attr('checked',false)
        }else{
            //console.log('des-marcado!',elem.data('tagName'))
            if(!this._widget.removeTag(tagName))
                elem.attr('checked',true)
        }
    }
})
var TagSetClass = Class.extend({
  init: function(){
    this.__defineGetter__('name',this.getTagSetName)
  },
  toggleActive: function(){
    this._active = !this._active
  },
  getActive: function(){
    return this._active
  },
  getTagSetName: function(){
    return this._name
  }
})

var TagSet_Data = new (TagSetClass.extend({
  _name:'data',
  _color: 'FF0000',
  _active: true
}))()

var TagSet_Nav = new (TagSetClass.extend({
  _name: 'nav',
  _color: '00FF00',
  _active: true
}))()

var TagsDictionary = {
  'data': {
    applyTo: ['Widget'],
    tagSet: TagSet_Data
  },
  'node': {
    applyTo: ['Page'],
    tagSet: TagSet_Nav
  },
  'link': {
    applyTo: ['Link','Button'],
    tagSet: TagSet_Nav
  }
  ,
  'home': {
    applyTo: ['Page'],
    tagSet: TagSet_Nav
  },
  'select': {
    applyTo: ['CheckBox','RadioButton'],
    tagSet: TagSet_Nav
  },
  'sessionScoped': {
    applyTo: ['Widget'],
    tagSet: TagSet_Data
  },
  'delete': {
    applyTo: ['Link','Button'],
    tagSet: TagSet_Data
  },
  'save': {
    applyTo: ['Link','Button'],
    tagSet: TagSet_Data
  },
  'create': {
    applyTo: ['Link','Button'],
    tagSet: TagSet_Data
  },
  'associate': {
    applyTo: ['Link','Button'],
    tagSet: TagSet_Data
  },
  'dissociate': {
    applyTo: ['Link','Button'],
    tagSet: TagSet_Data
  }
}

var Tags = Class.extend({
  _tagName: 'tags',
  _params: null,
  _dom: null,
  _widget: null,
  init: function(widget){
    this._widget = widget
    this._params = {}
    this._init()
  },
  _init: function(){
      
  },
  getTagName: function(){
    return this._tagName
  },
  toString: function(){
    return this._tagName
  },
  getParams: function(){
    return this._params
  },
  getParamsArray: function(){
    console.log(this._params)
    var result = new Array()
    for(i in this._params){
      result.push(this._params[i].getValue())
    }
    return result
  },
  draw: function(){
    if(!this._dom){
      this._dom = $('<div>').addClass('tagApply ' + this._tagSet.name)
      this._widget.box.tagsContainer.append(this._dom)
    }
    if(this._params == false){
      this._dom.text(this._tagName)
    }else{
      this._dom.text(this._tagName+'('+this.getMainProperty()+')')
    }
  },
  setWidget: function(widget){
    this._widget = widget
  },
  getWidget: function(widget){
    return this._widget
  },
  update: function(){
    this.draw(this._dom.parent())
    this._widget.tagUpdated(this)
  },
  destroy: function(){
    this._dom.remove()
    delete this
  },
  getMainProperty: function(){
    return this._params.defaultP.getValue()
  }
});

var Tag_data = Tags.extend({
  _tagName: 'data',
  _tagSet: TagSet_Data,
  _params: null,
  _init: function(widget){
    this._params.typeName= new TextValue(this,10,'typeName')
    this._params.defaultP = this._params.typeName
  }
})

var Tag_node = Tags.extend({
  _tagName: 'node',
  _tagSet: TagSet_Nav,
  _params: null,
  _init: function(widget){
    this._params.nodeId = new TextValue(this,10,'nodeId')
    this._params.defaultP = this._params.nodeId
  }
})

var Tag_link = Tags.extend({
  _tagName: 'link',
  _tagSet: TagSet_Nav,
  _params: null,
  _init: function(widget){
    this._params.nodeId = new TextValue(this,10,'nodeId')
    this._params.defaultP = this._params.nodeId
  }
});

var Tag_home = Tags.extend({
  _tagName: 'home',
  _tagSet: TagSet_Nav,
  _params: null,
  _init: function(widget){
    this._params = false
  }
});

var Tag_select = Tags.extend({
  _tagName: 'select',
  _tagSet: TagSet_Nav,
  _params: null,
  _init: function(widget){
    this._params = false
  }
});

var Tag_sessionScope = Tags.extend({
  _tagName: 'sessionScope',
  _tagSet: TagSet_Data,
  _params: null,
  _init: function(widget){
    this._params = false
  }
});

var Tag_delete = Tags.extend({
  _tagName: 'delete',
  _tagSet: TagSet_Nav,
  _params: null,
  _init: function(widget){
    tthis._params.typeName= new TextValue(this,10,'typeName')
    this._params.defaultP = this._params.typeName
  }
});

var Tag_save = Tags.extend({
  _tagName: 'save',
  _tagSet: TagSet_Nav,
  _params: null,
  _init: function(widget){
    tthis._params.typeName= new TextValue(this,10,'typeName')
    this._params.defaultP = this._params.typeName
  }
});

var Tag_create = Tags.extend({
  _tagName: 'create',
  _tagSet: TagSet_Data,
  _params: null,
  _init: function(widget){
    tthis._params.typeName= new TextValue(this,10,'typeName')
    this._params.defaultP = this._params.typeName
  }
});

var Tag_associate = Tags.extend({
  _tagName: 'associate',
  _tagSet: TagSet_Data,
  _params: null,
  _init: function(widget){
    tthis._params.typeName= new TextValue(this,10,'typeName')
    this._params.defaultP = this._params.typeName
  }
});

var Tag_dissociate = Tags.extend({
  _tagName: 'dissociate',
  _tagSet: TagSet_Data,
  _params: null,
  _init: function(widget){
    tthis._params.typeName= new TextValue(this,10,'typeName')
    this._params.defaultP = this._params.typeName
  }
});
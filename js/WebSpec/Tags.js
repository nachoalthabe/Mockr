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
    'id': {
        applyTo: ['Widget'],
        tagSet: TagSet_Data
    },
    'data': {
        applyTo: ['CompositeWidget','ComboBox','Table'],
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
}

var Tags = Class.extend({
    _tagName: 'tags',
    _params: null,
    _dom: null,
    init: function(){
      this._params = {}
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
    draw: function(container){
      console.log('aca!',this._tagSet)
      this._dom = $('<div>').addClass('tagApply',this._tagSet.name).text(
        this._tagName+'('+this.getMainProperty()+')'
      )
      container.append(this._dom)
    },
    destroy: function(){
      this._dom.destroy()
    }
});

var Tag_id = Tags.extend({
  _tagName: 'id',
  _tagSet: TagSet_Data,
  init: function(id){
    this._super()
    this._params['id'] = new TextValue(20)
    this.setId(id)
  },
  getId: function(){
    return this._params['id'].getValue()
  },
  setId: function(id){
    this._params['id'].setValue(id)
  },
  getMainProperty: function(){
    return this._params.id.getValue()
  }
})

var Tag_data = Tags.extend({
    _tagName: 'data',
    _tagSet: TagSet_Data,
    _params: null,
    init: function(){
      this._super()
      this._params['id'] = new TextValue(20,'Id')
    },
    getMainProperty: function(){
      return this._params.id.getValue()
    }
})

var Tag_link = Tags.extend({
    _tagName: 'link',
    _tagSet: TagSet_Nav,
    _params: null,
    init: function(){
      this._super()
      this._params.dato1= new TextValue(10,'Dato1')
      this._params.dato2= new TextValue(20,'Dato2'),
      this._params.dato3= new TextValue(5,'Dato3')
    },
    getMainProperty: function(){
      return this._params.dato1.getValue()
    }
});

var Tag_node = Tags.extend({
    _tagName: 'node',
    _tagSet: TagSet_Nav,
    _params: null,
    init: function(){
      this._super()
      this._params.dato1 = new TextValue(10,'Dato1')
    },
    getMainProperty: function(){
      return this._params.dato1.getValue()
    }
});
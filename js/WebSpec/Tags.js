var TagSets= {
    data: {
        name: 'data',
        color: "FF0000",
        active: true
    },
    nav: {
        name: 'nav',
        color: "00FF00",
        active: true
    }
}

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

var test = new Array()
test[0] = TagSet_Data
test[1]= TagSet_Data
test[0].toggleActive()
console.log(test)





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
    getTagName: function(){
        return this._tagName
    },
    toString: function(){
        return this._tagName
    }
});

var Tag_id = Tags.extend({
    _tagName: 'id',
    _tagSet: TagSet_Data,
    _attr: null,
    init: function(id){
        this._attr = {
            id: {
                value: '',
                type: 'String'
            }
        };
        this.setId(id)
    },
    getId: function(){
        return this._attr['id']['value']
    },
    setId: function(id){
        if(typeof id != this._attr['id']['type']){
            this._attr['id']['value'] = id
        }
    }
})

var Tag_data = Tags.extend({
    _tagName: 'data',
    _tagSet: TagSet_Data
})

var Tag_link = Tags.extend({
    _tagName: 'link',
    _tagSet: TagSet_Nav
});

var Tag_node = Tags.extend({
    _tagName: 'node',
    _tagSet: TagSet_Nav
});
var TagsDictionary = {
    'id': ['Widget'],
    'data': ['CompositeWidget','ComboBox','Table'],
    'node': ['Page'],
    'link': ['Link','Button']
}

var Tags = Class.extend({
    _tagName: 'tags',
    getTagName: function(){
        return this._tagName;
    }
});


var TagSets= {
    data: {
        name: 'Data',
        color: "FF0000",
        active: true
    },
    nav: {
        name: 'Nav',
        color: "00FF00",
        active: true
    }
}

var Tag_id = Tags.extend({
    _tagName: 'id',
    _tagSet: TagSets.data,
    _id: null,
    init: function(id){
        this.setId(id)
    },
    getId: function(){
        return this._id
    },
    setId: function(id){
        this._id = id
    }
})

var Tag_data = Tags.extend({
    _tagName: 'data',
    _tagSet: TagSets.data
})

var Tag_link = Tags.extend({
    _tagName: 'link',
    _tagSet: TagSets.nav
});

var Tag_node = Tags.extend({
    _tagName: 'node',
    _tagSet: TagSets.nav
});
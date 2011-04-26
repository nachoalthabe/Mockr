var TagsDictionary = {
    'Id': ['UIControl'],
    'Layout': ['CompositeControl'],
    'Repetition': ['Panel'],
    'Template': ['Panel'],
    'TemplateInstantiation': ['Panel'],
    'Placeholder': ['Panel'],
    'PlaceholderContent': ['Panel']
}

var Tags = Class.extend({
    _tagName: 'Tags',
    _compatible:{},
    init: function(widget){
        if(!widget instanceof Widget){
            throw('El widget no es valido');
        }
    },
    validate: function(widget){

    },
    getTagName: function(){
        return this._tagName;
    }
});

var Tag_Id = Tags.extend({
    _tagName: 'id',
    _id: '',
    init: function(id){
        this.setId(id);
    },
    getId: function(){
        return this._id;
    },
    setId: function(id){
        this._id = id;
    }
});
var Tag_Position = Tags.extend({
    _tagName: 'position',
    _x: null,
    _y: null,
    _z: null,
    init: function(x,y,z){
        console.log(x,y,z);
    }
});
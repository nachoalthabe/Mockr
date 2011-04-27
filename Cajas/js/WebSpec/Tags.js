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
    _tagName: 'tags',
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

var Tag_Layout = Tags.extend({
    _tagName: 'layout',
    _validLayouts: null,
    _type: null,
    init: function(layoutType){
        this._validLayouts = ['gridBagLayout','verticalBoxLayout','horizontalBoxLayout','flowLayout'];
        if(!this._isValidType(layoutType)){
            throw('El tipo de layout '+layoutType+' no es soportado.');
        }
    },
    _isValidType: function(type){
        if(this._validLayouts.has(type)){
            return true;
        }else{
            return false;
        }
    }
})
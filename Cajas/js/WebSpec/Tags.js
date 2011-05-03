var TagsDictionary = {
    'id': ['UIControl'],
    'layout': ['CompositeControl'],
    'repetition': ['Panel'],
    'template': ['Panel'],
    'templateInstantiation': ['Panel'],
    'placeholder': ['Panel'],
    'placeholderContent': ['Panel']
}

var Tags = Class.extend({
    _tagName: 'tags',
    getTagName: function(){
        return this._tagName;
    }
});

var Tag_id = Tags.extend({
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

var Tag_layout = Tags.extend({
    _tagName: 'layout',
    _validLayouts: null,
    _type: null,
    init: function(layoutType){

        if(layoutType == undefined)
            layoutType = 'flowLayout';

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

var Tag_repetition = Tags.extend({
    _tagName: 'repetition'
});

var Tag_template = Tags.extend({
    _tagName: 'template'
});

var Tag_templateInstantiation = Tags.extend({
    _tagName: 'templateInstantiation'
});

var Tag_placeholder = Tags.extend({
    _tagName: 'placeholder'
});

var Tag_placeholderContent = Tags.extend({
    _tagName: 'placeholderContent'
});

var Tag_layoutInfo = Tags.extend({
    _tagName: 'layoutInfo'
});
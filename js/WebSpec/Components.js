var availableComponents = [
'TextBox',
'Label',
'Button',
'CheckBox',
'Panel',
'Form',
'UI',
'Layout'
]

var UIControl = Class.extend({
    _className : 'UIControl',
    _requiredTags : null,
    _validTags: null,
    _tags: null,
    _tagsArray: null,
    _domElem: null,
    init: function(id, x, y, width, height){
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this._tags = new Array();
        this._tagsArray = [];
        this._requireTags = [];
        this._validTags = [];
    },
    getId: function(){
        return this.id;
    },
    apply: function(options){
        var settings = jQuery.extend(true,{}, this._options, options);
        settings.forEach(function(opt,key){
            if(!jQuery.inArray(key,this._required)){
                throw('Falta parametro ['+key+'] para instanciar clase '+this._className);
            }
        });
    },
    visit: function(v){//Limpio el parametro y lo redirecciono a la subClase...
        if (!(v instanceof Visitor))
            throw('El visitor no es valido.');
        else
            this._visit(v);
    },
    _visit: function(v){
        throw('Una instancia de la clase '+typeof this+' no puede ser visitada.');
    },
    evalFunc: function(fnName, params){
        this[fnName](params);
    },
    isValidTag: function(tag){
        if(this._validTags.has(tag.getTagName())){
            return true;
        }else{
            return false;
        }
    },
    hasTag: function(tagName){
        return this._tags.some(function(element, index, array){
            if (element.getTagName() == tagName){
                return true;
            }else{
                return false;
            }
        });
    },
    addTag: function(tag){
        if(this.isValidTag(tag) && !this.hasTag(tag.getTagName())){
            this._tags.push(tag);
            return true;
        }else{
            return false;
        }
    },
    getTag: function(tagName){
        var len=this._tags.length;
        for(var i=0; i<len; i++) {
            if(this._tags[i].getTagName() == tagName){
                return this._tags[i];
            }
        }
        return false;
    },
    getTags: function(){
        return this._tags;
    },
    removeTag: function(tagName){
        //if(!this._requiredTags.has(tagName)){
        var len=this._tags.length;
        for(var i=0; i<len; i++) {
            if(this._tags[i].getTagName() == tagName){
                this._tags.splice(i,1);
                return true;
            }
        }
        return false;
    /*}else{
            return false;
        }*/
    },
    getValidTags: function(){
        return this._validTags;
    },
    setDomElem: function(elem){
        this._domElem = elem;
    },
    getDomElem: function(){
        return this._domElem;
    },
    getClassName: function(){
        return this._className;
    }
});
/**
 * Segundo nivel de herencia
 */
var SimpleControl = UIControl.extend({
    _className : 'SimpleControl',
    init: function(id, x, y, width, height){
        this._super(id, x, y, width, height);
    }
});
var CompositeControl = UIControl.extend({
    _className : 'CompositeControl',
    _subControls: null,
    _i: 0,
    init: function(id, x, y, width, height){
        this._super(id, x, y, width, height);
        this._subControls = new Array();
        this._validTags.push('Data');
    },
    addSubControl: function(subcontrol){
        if (!(subcontrol instanceof UIControl)){
            throw('El SubControl no es valido.');
        }
        else{
            this._subControls.push(subcontrol);
        }
    },
    evalFunc: function(fnName,params){
        this[fnName](params);
        this._subControls.forEach(function(elem,key){
            elem.evalFunc(fnName,params);
        })
    }
});
/**
 * Tercer nivel de herencia
 */

/**
 * Herederos de SimpleControl
 */
var TextBox = SimpleControl.extend({
    _className : 'TextBox',
    _visit: function(v){
        v.visitTextBox(this);
    }
});
var Label = SimpleControl.extend({
    _className : 'Label',
    label: '',
    init: function(id, x, y, width, height, label){
        this._super(id, x, y, width, height);
        this.label = label;
    },
    _visit: function(v){
        v.visitLabel(this);
    }
});
var Link = SimpleControl.extend({
    _className : 'Link',
    init: function(id, x, y, width, height, label){
        this._super(id, x, y, width, height);
        this._validTags.push('Link');
    },
    _visit: function(v){
        v.visitLabel(this);
    }
});
var Button = SimpleControl.extend({
    _className : 'Button',
    init: function(id, x, y, width, height){
        this._super(id, x, y, width, height);
        this._validTags.push('Link');
    },
    _visit: function(v){
        v.visitButton(this);
    }
});
var CheckBox = SimpleControl.extend({
    _className : 'CheckBox',
    _visit: function(v){
        v.visitCheckBox(this);
    }
});
/**
 * Herederos de CompositeControl
 */
var Panel = CompositeControl.extend({
    _className : 'Panel',
    init: function(id, x, y, width, height){
        this._super(id, x, y, width, height);
    },
    _visit: function(v){
        v.visitPanel(this);
    }
});
var Page = CompositeControl.extend({
    _className : 'Page',
    init: function(id, x, y, width, height){
        this._super(id, x, y, width, height);
        this._validTags.push('Node');
        this._action = action;
        this._method = method;
    },
    _visit: function(v){
        v.visitPanel(this);
    }
});
var Form = CompositeControl.extend({
    _className : 'Form',
    init: function(id, x, y, width, height, action, method){
        this._super(id, x, y, width, height);
        this._validTags.push();
        this._action = action;
        this._method = method;
    },
    _visit: function(v){
        v.visitPanel(this);
    }
});
var UI = CompositeControl.extend({
    _className : 'UI',
    _visit: function(v){
        v.visitUI(this);
    }
});
var Layout = CompositeControl.extend({
    _className : 'Layout',
    _visit: function(v){
        v.visitLayout(this);
    }
});
/**
 * Heredados de Layout
 */
var GridBagLayout = Layout.extend({
    _className : 'GridBagLayout',
    _visit: function(v){
        v.visitGridBagLayout(this);
    }
});
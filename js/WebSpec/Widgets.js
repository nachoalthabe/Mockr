var availableWidgets = [
'TextBox',
'Label',
'Button',
'CheckBox',
'Panel',
'Page',
'Form',
'UI',
'Layout'
]

var Widget = Class.extend({
    _className : 'Widget',
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
        this._requiredTags = [];
        this._validTags = [];
    },
    toString: function(){
        return this._className
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
            this._tags.push(tag)
            tag.setWidget(this)
            //this.sendTagToServer(tag)
            tag.draw(this._domElem.children('.tagsContainer'))
            this.sendTagToServer(tag)
            return true;
        }else{
            return false;
        }
    },
    sendTagToServer: function(tag,remove){
      if(!remove){
        remove = false
      }
      $.ajax({
        url: Config.serveUrl,
        data: {
          opt: remove?'delTag':'addTag',
          tag: {
            uiId: Context.uiId,
            widgetId: this.getId(),
            tag: tag.getTagName(),
            tagSet: tag._tagSet.name,
            params: tag.getParamsArray()
          }
        },
        success: function(){
          if(remove){
            tag.destroy()
          }
        }
      })
    },
    tagUpdated: function(tag){
      this.sendTagToServer(tag)
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
        if(!this._requiredTags.has(tagName)){
            var len=this._tags.length;
            for(var i=0; i<len; i++) {
                if(this._tags[i].getTagName() == tagName){
                    var tag = this._tags[i]
                    this._tags.splice(i,1);
                    this.sendTagToServer(tag,true)
                    return true;
                }
            }
            return false;
        }else{
            return false;
        }
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
var SimpleWidget = Widget.extend({
    _className : 'SimpleWidget',
    init: function(id, x, y, width, height){
        this._super(id, x, y, width, height);
    }
});
var CompositeWidget = Widget.extend({
    _className : 'CompositeWidget',
    _subControls: null,
    _i: 0,
    init: function(id, x, y, width, height){
        this._super(id, x, y, width, height);
        this._subControls = new Array();
        this._validTags.push('data');
    },
    addSubControl: function(subcontrol){
        if (!(subcontrol instanceof Widget)){
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
var TextBox = SimpleWidget.extend({
    _className : 'TextBox',
    _visit: function(v){
        v.visitTextBox(this);
    }
});
var Label = SimpleWidget.extend({
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
var Link = SimpleWidget.extend({
    _className : 'Link',
    init: function(id, x, y, width, height){
        this._super(id, x, y, width, height);
        this._validTags.push('link');
    },
    _visit: function(v){
        v.visitLabel(this);
    }
});
var Button = SimpleWidget.extend({
    _className : 'Button',
    init: function(id, x, y, width, height){
        this._super(id, x, y, width, height);
        this._validTags.push('link');
    },
    _visit: function(v){
        v.visitButton(this);
    }
});
var CheckBox = SimpleWidget.extend({
    _className : 'CheckBox',
    _visit: function(v){
        v.visitCheckBox(this);
    }
});
/**
 * Herederos de CompositeControl
 */
var Panel = CompositeWidget.extend({
    _className : 'Panel',
    init: function(id, x, y, width, height){
        this._super(id, x, y, width, height);
    },
    _visit: function(v){
        v.visitPanel(this);
    }
});
var Page = CompositeWidget.extend({
    _className : 'Page',
    init: function(id, x, y, width, height){
        this._super(id, x, y, width, height);
        this._validTags.push('node');
    },
    _visit: function(v){
        v.visitPage(this);
    }
});
var Form = CompositeWidget.extend({
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
var UI = CompositeWidget.extend({
    _className : 'UI',
    _visit: function(v){
        v.visitUI(this);
    }
});
var Layout = CompositeWidget.extend({
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
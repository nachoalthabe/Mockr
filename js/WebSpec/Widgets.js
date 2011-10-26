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
  /*id, x, y, width, height*/
  init: function(){
    $.extend(this,arguments[0])
    this._tags = new Array()
    this._tagsArray = []
    this._requiredTags = []
    this._validTags = []
    this._validTags.push('data','sessionScoped')
    this._init()
  },
  _init: function(){
      
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
    console.log('addTag')
    if(this.isValidTag(tag) && !this.hasTag(tag.getTagName())){
      this._tags.push(tag)
      tag.setWidget(this)
      //this.sendTagToServer(tag)
      tag.draw(this.box.tagsContainer.children('.tagsContainer'))
      this.sendTagToServer(tag,false)
      return true;
    }else{
      return false;
    }
  },
  sendTagToServer: function(tag,remove){
    var tagObj = {
      pageId: Context.uiId,
      widgetId: this.getId(),
      tagName: tag.getTagName(),
      tagSet: tag._tagSet.name,
      paramValues: tag.getParamsArray()
    }
    var scope = this
    /**
     *  Envio al servidor
     */
    if(!remove){
      if(suiRemoteManager){
        suiRemoteManager.applyTags(tagObj,function(result){
          if(!result.ok){
            tag.destroy();
            alert(message)
          }
        });
      }
    }else{
      if(suiRemoteManager){
        suiRemoteManager.removeTags(tagObj,function(result){
          if(!result.ok){
            alert(message)
          }
        });
      }
    }
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
          console.log('removeTag')
          var tag = this._tags[i]
          this._tags.splice(i,1);
          this.sendTagToServer(tag,true)
          tag.destroy()
          console.log('after destroy...',this)
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
  _className : 'SimpleWidget'
});
var CompositeWidget = Widget.extend({
  _className : 'CompositeWidget',
  _widgets: null,
  _i: 0,
  init: function(opts){
    this._widgets = new Array()
    this._super(opts)
  },
  addWidget: function(widget){
    if (!(widget instanceof Widget)){
      throw('El Widget no es valido.');
    }
    else{
      this._widgets.push(widget);
    }
  },
  evalFunc: function(fnName,params){
    this[fnName](params);
    this._widgets.forEach(function(elem,key){
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
  _init: function(){
    this.label = label;
  },
  _visit: function(v){
    v.visitLabel(this);
  }
});
var Link = SimpleWidget.extend({
  _className : 'Link',
  _init: function(){
    this._validTags.push('link','delete','save','create','associate','dissociate')
  },
  _visit: function(v){
    v.visitLabel(this);
  }
});
var Button = SimpleWidget.extend({
  _className : 'Button',
  _init: function(){
    this._validTags.push('link','delete','save','create','associate','dissociate')
  },
  _visit: function(v){
    v.visitButton(this);
  }
});
var CheckBox = SimpleWidget.extend({
  _className : 'CheckBox',
  _init: function(){
    this._validTags.push('select');
  },
  _visit: function(v){
    v.visitCheckBox(this);
  }
});
var RadioButton = SimpleWidget.extend({
  _className : 'RadioButton',
  _init: function(){
    this._validTags.push('select');
  },
  _visit: function(v){
    v.visitRadioButton(this);
  }
});
/**
 * Herederos de CompositeControl
 */
var Panel = CompositeWidget.extend({
  _className : 'Panel',
  _visit: function(v){
    v.visitPanel(this);
  }
});
var Page = CompositeWidget.extend({
  _className : 'Page',
  _init: function(){
    this._validTags.push('node');
  },
  _visit: function(v){
    v.visitPage(this);
  }
});
var Form = CompositeWidget.extend({
  _className : 'Form',
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
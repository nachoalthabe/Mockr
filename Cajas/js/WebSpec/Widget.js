var Widget = Class.extend({
    init: function(id, x, y, width, height){
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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
    }
});
/**
 * Segundo nivel de herencia
 */
var SimpleWidget = Widget.extend({
    init: function(id, x, y, width, height){
        this._super(id, x, y, width, height);
    }
});
var CompositeWidget = Widget.extend({
    subControls: new Array(),
    _i: 0,
    init: function(id, x, y, width, height){
        this._super(id, x, y, width, height);
    },
    addSubControl: function(subcontrol){
        if (!(subcontrol instanceof Widget)){
            throw('El SubControl no es valido.');
        }
        else{
            this.subControls.push(subcontrol);
        }
    },
    evalFunc: function(fnName,params){
        this[fnName](params);
        this.startIteration();
        var tmp;
        while((tmp = this.getNext())){
            tmp.evalFunc(fnName,params);
        }
    },
    startIteration: function(){
        //Con esto nos evitamos la cracion y asignacion de una variable.
        _i = -1;
    },
    hasNext: function(){
        if(this.subControls.length > _i){
            return true;
        }else{
            return false;
        }
    },
    getNext: function(){
        if(this.hasNext()){
            this._i = this._i + 1;
            return this.subControls[this._i];;
        }else{
            return false;
        }
    }
});
/**
 * Tercer nivel de herencia
 */

/**
 * Herederos de SimpleWidget
 */
var TextBox = SimpleWidget.extend({
    init: function(id, x, y, width, height){
        this._super(id, x, y, width, height);
    },
    _visit: function(v){
        v.visitTextBox(this);
    }
});
var Label = SimpleWidget.extend({
    label: '',
    init: function(id, x, y, width, height,label){
        this._super(id, x, y, width, height);
        this.label = label;
    },
    _visit: function(v){
        v.visitLabel(this);
    }
});
var Button = SimpleWidget.extend({
    init: function(id, x, y, width, height){
        this._super(id, x, y, width, height);
    },
    _visit: function(v){
        v.visitButton(this);
    }
});
var CheckBox = SimpleWidget.extend({
    init: function(id, x, y, width, height){
        this._super(id, x, y, width, height);
    },
    _visit: function(v){
        v.visitCheckBox(this);
    }
});
/**
 * Herederos de CompositeWidget
 */
var Panel = CompositeWidget.extend({
    init: function(id, x, y, width, height){
        this._super(id, x, y, width, height);
    },
    _visit: function(v){
        v.visitPanel(this);
    }
});
var UI = CompositeWidget.extend({
    init: function(id, x, y, width, height){
        this._super(id, x, y, width, height);
    },
    _visit: function(v){
        v.visitUI(this);
    }
});
var Layout = CompositeWidget.extend({
    init: function(id, x, y, width, height){
        this._super(id, x, y, width, height);
    },
    _visit: function(v){
        v.visitLayout(this);
    }
});
/**
 * Heredados de Layout
 */
var GridBagLayout = Layout.extend({
    init: function(id, x, y, width, height){
        this._super(id, x, y, width, height);
    },
    _visit: function(v){
        v.visitGridBagLayout(this);
    }
});
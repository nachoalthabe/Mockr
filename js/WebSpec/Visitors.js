debug = true;
var Visitor = Class.extend({
    _widget: null,
    _doit: null,
    /* doit, widget*/
    init: function(){
      $.extend(this,arguments[0])
    },
    doit: function(){
      this.widget.evalFunc('visit',this);
    },
    visitGridBagLayout: function(elem){
        if(debug)
            console.log('visitGridBagLayout',elem);
        this._do(elem);
    },
    visitLayout: function(elem){
        if(debug)
            console.log('visitLayout',elem);
        this._do(elem);
    },
    visitUI: function(elem){
        if(debug)
            console.log('visitUI',elem);
        this._do(elem);
    },
    visitPanel: function(elem){
        if(debug)
            console.log('visitPanel',elem);
        this._do(elem);
    },
    visitPage: function(elem){
        if(debug)
            console.log('visitPage',elem);
        this._do(elem);
    },
    visitCheckBox: function(elem){
        if(debug)
            console.log('visitCheckBox',elem);
        this._do(elem);
    },
    visitButton: function(elem){
        if(debug)
            console.log('visitButton',elem);
        this._do(elem);
    },
    visitLabel: function(elem){
        if(debug)
            console.log('visitLabel',elem);
        this._do(elem);
    },
    visitTextBox: function(elem){
        if(debug)
            console.log('visitTextBox',elem);
        this._do(elem);
    }
});

var Drawer = Visitor.extend({
    /* canvas */
    _do: function(elem){
        var box = new Boxes({
          widget: elem,
          controller: this.controller
        })
        box.draw(this.canvas)
    },
    visitUI: function(){
        //do nothing
        return;
    }
})
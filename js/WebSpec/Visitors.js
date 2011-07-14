debug = true;
var Visitor = Class.extend({
    _widget: null,
    _doit: null,
    init: function(widget,func){
        this._doit = func;
        this._widget = widget;
    },
    doit: function(){
      this._widget.evalFunc('visit',this);
    },
    visitGridBagLayout: function(elem){
        if(debug)
            console.log('visitGridBagLayout',elem);
        this._doit(elem);
    },
    visitLayout: function(elem){
        if(debug)
            console.log('visitLayout',elem);
        this._doit(elem);
    },
    visitUI: function(elem){
        if(debug)
            console.log('visitUI',elem);
        this._doit(elem);
    },
    visitPanel: function(elem){
        if(debug)
            console.log('visitPanel',elem);
        this._doit(elem);
    },
    visitPage: function(elem){
        if(debug)
            console.log('visitPage',elem);
        this._doit(elem);
    },
    visitCheckBox: function(elem){
        if(debug)
            console.log('visitCheckBox',elem);
        this._doit(elem);
    },
    visitButton: function(elem){
        if(debug)
            console.log('visitButton',elem);
        this._doit(elem);
    },
    visitLabel: function(elem){
        if(debug)
            console.log('visitLabel',elem);
        this._doit(elem);
    },
    visitTextBox: function(elem){
        if(debug)
            console.log('visitTextBox',elem);
        this._doit(elem);
    }
});

var Drawer = Visitor.extend({
    _canvas: '',
    init: function(ui,canvas){
        if(ui instanceof UI){
            this._ui = ui;
        }else{
            throw('El UI no es valido.');
        }
        this._canvas = canvas;
        this._super(ui,this.draw);
    },
    draw: function(elem){
        var div = $('<div>');
        div.addClass('box');
        div.css('width',elem.width+'px');
        div.css('height',elem.height+'px');
        div.css('position','absolute');
        div.css('top',elem.y+'px');
        div.css('left',elem.x+'px');
        div.css('float','left');
        //div.append($('<div>').addClass('addTagsButton').mousedown(boxMouseEvents.addTag));
        div.append($('<div>').addClass('tagsContainer'));
        this._canvas.append(div);
        div.mouseover(boxMouseEvents.over);
        div.mouseleave(boxMouseEvents.leave);
        div.mousedown(boxMouseEvents.down);
        elem.setDomElem(div);
        div.data('ws',elem);
        return div;
    },
    visitUI: function(){
        //do nothing
        return;
    }
})
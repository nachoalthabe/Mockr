var Visitor = Class.extend({
    init: function(){
    }
});

var Drawer = Visitor.extend({
    _ui: '',
    _canvas: '',
    init: function(ui,canvas){
        if(ui instanceof UI){
            this._ui = ui;
        }else{
            throw('El UI no es valido.');
        }
        this._canvas = canvas;
    },
    drawDiv: function(elem){
        var div = $('<div>');
        div.addClass('box');
        div.css('width',elem.width+'px');
        div.css('height',elem.height+'px');
        div.css('position','relative');
        div.css('top',elem.y+'px');
        div.css('left',elem.x+'px');
        div.css('float','left');
        div.append($('<div>').addClass('addTagButton'));
        div.append($('<div>').addClass('tagsContainer'));
        this._canvas.prepend(div);
        elem.setDomElem(div);
        div.data('ws',elem);
        return div;
    },
    draw: function(){
        this._ui.evalFunc('visit',this);
    },
    visitGridBagLayout: function(elem){
        this.drawDiv(elem);
    },
    visitLayout: function(elem){
        this.drawDiv(elem);
    },
    visitUI: function(elem){
        //this.drawDiv(elem);
    },
    visitPanel: function(elem){
        this.drawDiv(elem);
    },
    visitCheckBox: function(elem){
        this.drawDiv(elem);
    },
    visitButton: function(elem){
        this.drawDiv(elem);
    },
    visitLabel: function(elem){
        this.drawDiv(elem);
    },
    visitTextBox: function(elem){
        this.drawDiv(elem);
    }
})
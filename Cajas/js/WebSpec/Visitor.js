var Visitor = Class.extend({
    init: function(){
    }
});

var Drawer = Visitor.extend({
    _ui: '',
    _canvas: '',
    init: function(ui,canvas){
        console.log('New Drawer: ',ui);
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
        this._canvas.prepend(div);
        return div;
    },
    draw: function(){
        this._ui.evalFunc('visit',this);
    },
    visitGridBagLayout: function(elem){
        var tmp = this.drawDiv(elem);
        console.log("visitGridBagLayout: ",tmp);
    },
    visitLayout: function(elem){
        var tmp = this.drawDiv(elem);
        console.log("visitLayout: ",tmp);
    },
    visitUI: function(elem){
        var tmp = this.drawDiv(elem);
        console.log("visitUI: ",tmp);
    },
    visitPanel: function(elem){
        var tmp = this.drawDiv(elem);
        console.log("visitPanel: ",tmp);
    },
    visitCheckBox: function(elem){
        var tmp = this.drawDiv(elem);
        console.log("visitCheckBox: ",tmp);
    },
    visitButton: function(elem){
        var tmp = this.drawDiv(elem);
        console.log("visitButton: ",tmp);
    },
    visitLabel: function(elem){
        var tmp = this.drawDiv(elem);
        console.log("visitLabel: ",tmp);
    },
    visitTextBox: function(elem){
        var tmp = this.drawDiv(elem);
        console.log("visitTextBox: ",tmp);
    }
})
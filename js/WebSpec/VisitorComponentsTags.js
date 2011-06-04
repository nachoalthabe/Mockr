var TagDrawer = Visitor.extend({
    _ui: '',
    init: function(ui){
        if(ui != undefined && ui instanceof UI){
            this._ui = ui;
        }
    },
    drawTagDiv: function(elem){
        var div = null,
        tags = elem.getTags(),
        dom = elem.getDomElem().children('.tagsContainer').empty();
        
        tags.forEach(function(tag){
            div = $('<div>');
            div.text(tag.getTagName());
            div.addClass('tagLabel');
            div.data('tg',tag);
            dom.append(div);
        })
        return div;
    },
    draw: function(elem){
        if(elem != undefined){
            elem.evalFunc('visit',this);
        }else{
            this._ui.evalFunc('visit',this);
        }
    },
    visitGridBagLayout: function(elem){
        this.drawTagDiv(elem);
    },
    visitLayout: function(elem){
        this.drawTagDiv(elem);
    },
    visitUI: function(elem){
    //this.drawTagDiv(elem);
    },
    visitPanel: function(elem){
        this.drawTagDiv(elem);
    },
    visitCheckBox: function(elem){
        this.drawTagDiv(elem);
    },
    visitButton: function(elem){
        this.drawTagDiv(elem);
    },
    visitLabel: function(elem){
        this.drawTagDiv(elem);
    },
    visitTextBox: function(elem){
        this.drawTagDiv(elem);
    }
})
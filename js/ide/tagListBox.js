tagListBox = Class.extend({
    _dom: null,
    _title: null,
    _container: null,
    _closeBtn: null,
    _tags: null,
    _widget: null,
    init: function(container){
        this._dom = $(container)
        this._title = $('<div>').attr('id','tspTitle')
        this._closeBtn = $('<div>').attr('id','tspClose').append($('img').attr('src','images/close.png').attr('alt','Close tag list box')).mousedown(this.hide)
        this._container = $('<div>').attr('id','tspContent')
        this._dom.append(this._title,this._closeBtn,this._container)
    },
    show: function(widget){
        if(!widget instanceof Widget){
            throw('El contexto deve ser una instancia de Widget.',widget);
        }
        this._widget = widget;
        this._dom.css('top',widget.y+31)
        this._dom.css('left',widget.x+widget.width+2)
        this._title.text(widget.getTag('id').getId())
        this._dom.show()
    },
    hide: function(){
        this._dom.hide()
    }
})
var Mockr = Class.extend({
  init: function(opts){
    $.extend(this,opts)
    this.render()
        this.parseSchema()
  },
  initWeb: function(ev){
    this.closeLoader()
    this._web = $(ev.target).contents()
    this._canvas.height(this._web.find('body').height())
    this._iframe.attr('height',this._web.find('body').height())
    /*By:NaaL*/
    this._web.find('#hplogo > div').text('NaaL')
    this._ui = new UI()
    this.parseSchema()
  },
  parseSchema: function(widget,toParse){
    
  },
  closeLoader: function(){
    this._loader.remove();
    this._canvas.css('background','none')
  },
  renderLoader: function(){
    this._loader.css('margin-top',this._canvasHeight/2-this._loader.outerHeight()/2-50)
  },
  render: function(){
    this._iframe = $('<iframe src="/p?u='+this.url+'">')
    //this.container.addClass('mockr')
    this._canvasHeight = $(window).height()-30
    this._iframe.attr({
      width: '100%',
      height: this._canvasHeight,
      frameBorder: 0,
      style: 'border:none',
      scrolling: 'no'
    }).load($.proxy(this.initWeb,this))
    this._canvas = $('<div id="mkrBoxes">')
    this._canvas.height(this._canvasHeight)
    this._loader = $('<div class="loader">')
    this._loader.append(
      $('<img src="/images/loader_anim.gif">').load($.proxy(this.renderLoader,this)),
      $('<span>').text('cargando'))
    this._canvas.append(this._loader)
    this.container.append(this._iframe,this._canvas)
  }
})

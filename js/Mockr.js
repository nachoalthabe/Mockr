var Mockr = Class.extend({
  init: function(opts){
    $.extend(this,opts)
    this.render()
  },
  initWeb: function(ev){
    this.closeLoader()
    this._web = this._iframe.contents()
    this._canvas.height(this._web.find('body').height())
    this._iframe.attr('height',this._web.find('body').height())
    /*By:NaaL*/
    this._web.find('#hplogo > div').text('NaaL')
    this.parseSchema(this.schema)
    this.tagSelector = new tagListBox()
    this.boxDrawer = new Drawer({
       canvas: this._canvas,
       widget: this.ui,
       controller: this
    }).doit()
  },
  parseSchema: function(schema){
    opts = this.prepareOpts4Widget(schema[0].selector)
    this.ui = new UI(opts)
    this._parseSchema(this.ui,schema[0].items)
  },
  _parseSchema: function(widget,schema){
    for (i in schema){
      if(typeof schema[i] == 'function'){
        continue
      }
      var opts = this.prepareOpts4Widget(schema[i].selector)
      console.log(schema[i].type+':',opts)
      var wg = eval('new '+schema[i].type+'(opts)')
      widget.addWidget(wg)
      this._parseSchema(widget,schema[i].items)
    }
  },
  prepareOpts4Widget: function(selector){
    console.log(selector)
    var opts = {
      'dom': this._web.find(selector)
    }
    return opts
  },
  closeLoader: function(){
    this._loader.remove();
    this._canvas.css('background','none')
  },
  renderLoader: function(){
    this._loader.css('margin-top',this._canvas.outerHeight()/2-this._loader.outerHeight()/2)
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

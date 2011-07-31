var Boxes = Class.extend({
  init: function(){
    $.extend(this,arguments[0])
    this.wDom = this.widget.dom
    this.widget.box = this
  },
  draw: function(container){
    var div = $('<div class="mkrBox">');
    var offset = this.wDom.offset()
    div.css({
      'width': (this.wDom.outerWidth())+'px',
      'height': (this.wDom.outerHeight())+'px',
      'position': 'absolute',
      'top': (offset.top-2)+'px',
      'left': (offset.left-2)+'px',
      'float': 'left'
    })
    div.bind({
      'mouseover': $.proxy(this.over,this),
      'mouseleave': $.proxy(this.leave,this),
      'mousedown': $.proxy(this.down,this)
    })
    this.tagsContainer = $('<div class="tagsContainer">')
    div.append(this.tagsContainer)
    this.dom = div
    container.append(this.dom)
  },
  over: function(){
      this.dom.addClass('active')
  },
  leave: function(event){
      this.dom.removeClass('active')
  },
  down: function(event){
    this.controller.tagSelector.show(this.widget)
  },
  addTag: function(){      
      mkElem = thi.dom.data('ws')
      //this.tagSelector.show(mkElem)
  },
  editTag: function(event){
      elem = $(event.target)
  }
})
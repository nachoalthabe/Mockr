var DataType = Class.extend({
    _tag: null,
    init: function(tag){
      this._tag = tag
    }
})

var TextValue = DataType.extend({
  _value: '',
  init: function(tag,size,label){
    this._super(tag)
    this._size = size
    this._label = label
  },
  render: function(container){
    if(!this._dom){
      this._dom = $('<div>').addClass('dt_textValue')
      this._label = $('<div>').text(this._label+':')
      this._input = $('<input>').attr({
        type: 'text',
        maxlength: this._size,
        value: this._value
        }).change($.proxy(this.persist,this));
      this._dom.append(this._label,this._input)
    }
    container.append(this._dom)
  },
  setValue: function(value){
    if(typeof value != 'string'){
      throw('A TextValue only can recive a String value.')
      return
    }
    this._value = value
  },
  getValue: function(){
    return this._value
  },
  persist: function(){
    this.setValue(this._input.val())
  },
  width: function(){
	return this._label.width()+this._input.width()
  }
})

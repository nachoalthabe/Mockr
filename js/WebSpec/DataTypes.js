var DataType = Class.extend({
    
})

var TextValue = DataType.extend({
  _value: null,
  init: function(size,label){
    this._size = size
    this._label = label
  },
  render: function(container){
    this._dom = $('<div>').addClass('dt_textValue')
    this._labelDom = $('<label>').text(this._label+':')
    this._input = $('<input>').attr({
      type: 'text',
      maxlength: this._size,
      value: this._value
    }).change($.proxy(this._persist,this));
    this._dom.append(this._label,this._input)
    container.append(this._dom)
  },
  setValue: function(value){
    if(typeof value != 'string'){
      throw('A TextValue only can recive a String value.')
      return
    }
    console.log(value)
    this._value = value
  },
  getValue: function(){
    return this._value
  },
  _persist: function(){
    this.setValue(this._input.val())
  }
})
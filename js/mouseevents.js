boxMouseEvents = {
    over: function(event){
        elem = $(event.target)
        elem.addClass('activeBox')
        elem.find('.addTagsButton').show()
    },
    leave: function(event){
        elem = $(event.target)
        elem.removeClass('activeBox')
        elem.find('.addTagsButton').hide()
    },
    down: function(event){
        elem = $(event.target)
        boxMouseEvents.addTag(event)
    },
    addTag: function(event){
        elem = $(event.target)
        mkElem = elem.data('ws')
        tagSelector.show(mkElem)
    },
    editTag: function(event){
        elem = $(event.target)
    }
}
function loadAvailableTags(component){
    var validTags = component.getValidTags();
    //var container = $('#tagList');
    //var theme = $('#availableTagItem').eq(0);
    var items = new Array();
    validTags.forEach(function(e){
        items.push({
            'tagName':e,
            'tagActived':(component.getTag(e)==false)?false:true
        })
    });
    TagsGridStore.removeAll();
    TagsGridStore.add(items);
}
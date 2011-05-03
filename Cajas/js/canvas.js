//Canvas Section
var canvas,boxes,addTagButtons,file,cComp,tagDrawer;

$(document).ready(function(){
    canvas = $("#canvas");
    actBox = canvas.filter('div:first-child');
    prevBox = null;
    if(file != null){
        retriveFile(file);
    }
});

function retriveFile(file){
    $.ajax({
        url: '/srv/canvas.php',
        dataType: 'xml',
        data: {
            'opt'   :   1,
            'file'  :   file
        },
        'success' : loadData
    });
 
}

var mockup = new UI();

function loadData(data){
    data = $(data).children().children('ui');
    Parser(data,mockup);
    var drawer = new Drawer(mockup,$('#canvas')).draw();
    tagDrawer = new TagDrawer(mockup);
    tagDrawer.draw();
    boxes = $(".box");
    addTagButtons = $('.addTagButton')
    addLive();
}

function updateTagsOfComponent(comp){
    tagDrawer.draw(comp);
}

function addLive(){
    boxes.mousedown(activeBox);
    addTagButtons.mousedown(addTagWindow);
}

function activeBox(){
    boxes.filter('.active').removeClass('active');
    elem = $(this).addClass('active');
    component = elem.data('ws');
    cComp = component;
    $('#boxId').text(component.getTag('id').getId());
    $('#boxType').text(component.getClassName());
    loadAvailableTags(component);
}

function addTagWindow(){
    var elem = $(this),
    parent = elem.parent(),
    component = parent.data('ws'),
    offset = elem.offset();
    parent.mousedown();
    availableTagsWindow.setPosition(offset.left,offset.top);
    availableTagsWindow.setTitle(component.getTag('id').getId());
    availableTagsWindow.show();
}

//Menu Section
var menu,boxTitleSpan,boxTypeSpan,findTagInput,listOfTagsDiv,themeTag,lastTag;

$(document).ready(function(){
    menu = $("#menu");
    boxTitleSpan = $('#boxId');
    boxTypeSpan = $('#boxType');
    findTagInput = $('#findTag');
    themeTag = $('#themeTag');
    listOfTagsDiv = $('#listOfTags');
});

function addNewTag(event,ui){
    lastTag = themeTag.children().clone();
    lastTag.appendTo(listOfTagsDiv);
    test = lastTag.children('.name').text(ui.item.label);
}

function removeThisTag(tag){
    $(tag).parent().remove();
}

function clearInput(){
    findTagInput.unbind('focus', clearInput);
    findTagInput.val('');
}
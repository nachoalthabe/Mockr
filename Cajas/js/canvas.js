//Canvas Section
var canvas,boxes,actBox,prevBox,file;

$(document).ready(function(){
    boxes = $(".box");
    canvas = $("#canvas");
    actBox = canvas.filter('div:first-child');
    prevBox = null;
    addLive();
    if(file != null){
        retriveFile(file);
    }
});

function retriveFile(file){
    $.ajax({
        url: '/srv/canvas.php',
        dataType: 'json',
        data: {
            'opt'   :   1,
            'file'  :   file
        },
        'success' : loadData
    });
 
}

var mockup = new UI();

function loadData(data){
    xml = data;
    Parser(xml['mockups']['ui'],mockup);
    console.log('LoadData: ',mockup);
    var drawer = new Drawer(mockup,$('#canvas'));
    drawer.draw();
}

function addLive(){
    boxes.mousedown(activeBox);
}

function activeBox(){
    prevBox = actBox;
    actBox = $(this);
    prevBox.css('border-color','#000');
    actBox.css('border-color','#f00');
    loadInMenu(actBox);
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

    initFindTagInput();
});

function initFindTagInput(){
    findTagInput.autocomplete({
        source: ['id','Layout','Repetition','Template','TemplateInstantiation','Placeholder','PlaceholderContent'],
        select: addNewTag,
        close: clearInput,
        delay: 0
    });
    findTagInput.bind('focus',clearInput);
}

function addNewTag(event,ui){
    lastTag = themeTag.children().clone();
    lastTag.appendTo(listOfTagsDiv);
    test = lastTag.children('.name').text(ui.item.label);
}

function removeThisTag(tag){
    $(tag).parent().remove();
}

function loadInMenu(box){
    boxTitleSpan.text(box.attr('id'));
    boxTypeSpan.text(box.attr('type'));
}

function clearInput(){
    findTagInput.unbind('focus', clearInput);
    findTagInput.val('');
}
function loadExampleHtml(exampleName){
    var barrierVal = 2;//Cantidad de request
    var mHTML,mSchema;
    $.ajax({
        url: 'examples/'+exampleName+'.json',
        dataType: 'json',
        success: function(data){
            mSchema = data;
            barrier();
        }
    }); 
    $.ajax({
        url: 'examples/'+exampleName+'.html',
        dataType: 'html',
        success: function(data){
            mHTML = data;
            barrier();
        }
    });
    function barrier(){
        barrierVal = barrierVal - 1;
        if(barrierVal == 0){
            prepareIDE(mHTML,mSchema);
        }
    }
}

mockup = new UI();
canvas = $('#canvas');
tagSelector = new tagListBox('#tagSelectionPanel');

function prepareIDE(mHTML,mSchema){
    canvas.html(mHTML);
    mockup.addSubControl(parseHTML(mSchema[0]));
    var drawer = new Drawer(mockup,$('#boxes'),false).doit();
    tagDrawer = new TagDrawer(mockup).doit();
}

var currentId= 0;
function getNextId(){
    currentId = currentId + 1;
    return 'mkr_'+currentId;
}

function addTagWindowToRealBox(){
    jqDomElem = $(this);
    component = jqDomElem.data('ws'),
    offset = jqDomElem.offset();
    cComp = component;
    loadAvailableTags(component);
    availableTagsWindow.setPosition(offset.left,offset.top);
    availableTagsWindow.setTitle(component.getId()+' :: '+component.getClassName());
    availableTagsWindow.show();
}
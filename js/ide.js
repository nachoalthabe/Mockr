var exampleName = 'login'
function loadHtml(){
    var barrier = 2;//Cantidad de request
    var mHTML,mSchema;
    mSchema = [{
        type: 'Panel',
        id: 'panelLogin',
        items: [{
            type: 'Form',
            id: 'formLogin',
            items: [{
                type: 'Panel',
                id: 'panelLabelUser',
                items: [{
                    type: 'Label',
                    id: 'labelUser'
                }]
            },{
                type: 'TextBox',
                id: 'inputUser'
            },{
                type: 'Panel',
                id: 'panelLabelPassword',
                items: [{
                    type: 'Label',
                    id: 'labelPassword'
                }]
            },{
                type: 'TextBox',
                id: 'inputPassword'
            },{
                type: 'Button',
                id: 'submitLogin'
            }]
        }]
    }]
    $.ajax({
        url: 'examples/'+exampleName+'.html',
        dataType: 'html',
        success: function(data){
            mHTML = data;
            prepareIDE(mHTML,mSchema);
        }
    });
}

mockup = new UI();
canvas = $('#canvas');

function prepareIDE(mHTML,mSchema){
    canvas.html(mHTML);
    console.log(mSchema);
    mockup.addSubControl(parseHTML(mSchema[0]));
    console.log(mockup);
    var drawer = new Drawer(mockup,$('#boxes'),false).doit();
    tagDrawer = new TagDrawer(mockup).doit();
}

var currentId= 0;
function getNextId(){
    currentId = currentId + 1;
    return 'ewa_'+currentId;
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

boxMouseEvents = {
    over: function(){
        elem = $(this);
        elem.addClass('activeBox');
        elem.find('.addTagsButton').show();
    },
    leave: function(){
        elem = $(this);
        elem.removeClass('activeBox');
        elem.find('.addTagsButton').hide();
    },
    down: function(){
        elem = $(this);
    },
    addTag: function(){
        elem = $(this);
        console.log('show list of tags')
    },
    editTag: function(){
        elem = $(this);
    }
}
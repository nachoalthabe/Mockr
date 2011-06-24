function loadHTMLInCanvas(file,tree){
    $.get(file,function(data){
        canvas.html(data);
        mockup.addSubControl(parseHTML(tree));
        var drawer = new Drawer(mockup,$('#boxes'),false).draw();
        tagDrawer = new TagDrawer(mockup);
        tagDrawer.draw();
        boxes = $('.box');
        boxes.mousedown(addTagWindowToRealBox);
        boxes.mouseover(markRealBox);
        boxes.mouseleave(unmarkRealBox);
    });
}

function parseHTML(tree){
    if(availableWidgets.has(tree.type)){
        var elem = $('#'+tree.id),
        id = elem.attr('id'),
        x = elem.offset().left-1,
        y = elem.offset().top-31, //le resto el #title
        width = elem.outerWidth(),
        height = elem.outerHeight();
        id = '"'+id+'"'
        var component = null;
        switch (tree.type) {
            case 'Label'://id,x,y,width,height,label
                var label = elem.text();
                component = eval('new Label('+[id,x,y,width,height].join(',')+',"'+label+'")');
                break;
            case 'Form'://id,x,y,width,height,action,method
                var action = elem.attr('action'),
                method = elem.attr('method');
                component = eval('new Form('+[id,x,y,width,height].join(',')+',"'+action+'","'+method+'")');
                break;
            default://id,x,y,width,height
                component = eval('new '+tree.type+'('+[id,x,y,width,height].join(',')+')');
                break;
        }
        component.addTag(new Tag_id(id));
        if(tree.items != undefined){
            tree.items.forEach(function(item){
                component.addSubControl(parseHTML(item));
            })
        }
        return component;
    }else{
        throw('El Widget "'+tree.type+'" no esta implementado.');
    }
}

function markRealBox(){
    $(this).addClass('active');
}

function unmarkRealBox(){
    $(this).removeClass('active');
}
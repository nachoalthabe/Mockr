function loadHTMLInCanvas(file,tree){
    $.get(file,function(data){
        canvas.html(data);
        mockup = parseHTML(tree);
        console.log(mockup);
    });
}

function parseHTML(tree){
    if(availableComponents.has(tree.type)){
        var elem = $('#'+tree.id),
            id = elem.attr('id'),
            x = elem.offset().left,
            y = elem.offset().top-25, //le resto el #title
            width = elem.width(),
            height = elem.height();
        var component = null;
        switch (tree.type) {
            case 'Label'://id,x,y,width,height,label
                var label = elem.text();
                component = eval('new Label("'+getNextId()+'",'+[x,y,width,height].join(',')+',"'+label+'")');
                break;
            case 'Form'://id,x,y,width,height,action,method
                var action = elem.attr('action'),
                    method = elem.attr('method');
                component = eval('new Form("'+getNextId()+'",'+[x,y,width,height].join(',')+',"'+action+'","'+method+'")');
                break;
            default://id,x,y,width,height
                component = eval('new '+tree.type+'("'+getNextId()+'",'+[x,y,width,height].join(',')+')');
                break;
        }
        component.addTag(new Tag_id(id));
        if(tree.items != undefined){
            tree.items.forEach(function(item){
                component.addSubControl(parseHTML(item));
            })
        }
        component.setDomElem(elem);
        elem.data('ws',component);
        return component;
    }
}
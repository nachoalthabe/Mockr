var ignoredTags = {
    '@attributes':'',
    'comment':'',
    'originalPosition':''
};

var aux = 'nada';

function parseLabel(e,parent){
    var data,label;
    if(e instanceof Array){
        for (var i in e){
            data = e[i]['originalPosition']['@attributes'];
            label = new Label(e[i]['@attributes']['id'], data['x'], data['y'], data['width'], data['height'], e[i]['@attributes']['label']);
            parent.addSubControl(label);
        }
    }else{
        data = e['originalPosition']['@attributes'];
        label = new Label(e['@attributes']['id'], data['x'], data['y'], data['width'], data['height'], e['@attributes']['label']);
        parent.addSubControl(label);
    }
}

function parseTextBox(e,parent){
    var data,label;
    if(e instanceof Array){
        for (var i in e){
            data = e[i]['originalPosition']['@attributes'];
            label = new TextBox(e[i]['@attributes']['id'], data['x'], data['y'], data['width'], data['height']);
            parent.addSubControl(label);
        }
    }else{
        data = e['originalPosition']['@attributes'];
        label = new TextBox(e['@attributes']['id'], data['x'], data['y'], data['width'], data['height']);
        parent.addSubControl(label);
    }
}

var aux;

function parsePanel(e,parent){
    var data,label;
    data = e['originalPosition']['@attributes'];
    label = new Panel(e['@attributes']['id'], data['x'], data['y'], data['width'], data['height']);
    parent.addSubControl(label);
    //Parser(e,label);
}
function parseButton(e,parent){
    var data,label;
    if(e instanceof Array){
        for (var i in e){
            data = e[i]['originalPosition']['@attributes'];
            label = new Button(e[i]['@attributes']['id'], data['x'], data['y'], data['width'], data['height']);
            parent.addSubControl(label);
        }
    }else{
        data = e['originalPosition']['@attributes'];
        label = new Button(e['@attributes']['id'], data['x'], data['y'], data['width'], data['height']);
        parent.addSubControl(label);
    }
}
function parseCheckBox(e,parent){
    var data,label;
    if(e instanceof Array){
        for (var i in e){
            data = e[i]['originalPosition']['@attributes'];
            label = new CheckBox(e[i]['@attributes']['id'], data['x'], data['y'], data['width'], data['height']);
            mockup.addSubControl(label);
        }
    }else{
        data = e['originalPosition']['@attributes'];
        label = new CheckBox(e['@attributes']['id'], data['x'], data['y'], data['width'], data['height']);
        mockup.addSubControl(label);
    }
}
function parseLayout(e,parent){

}

var parsers = {
    'label': parseLabel,
    'textBox': parseTextBox,
    'panel': parsePanel,
    'button': parseButton,
    'checkbox': parseCheckBox,
    'layout': parseLayout
}

function Parser(json,parent){
    for ( key in (json)){
        if(!(key in ignoredTags)){
            try{
                parsers[key](json[key],parent);
            }catch(err){
                throw('El parser para '+key+' no funciona correctamente.');
            }
        }
    }
}
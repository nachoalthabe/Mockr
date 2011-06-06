var ignoredTags = {
    '@attributes':'',
    'comment':'',
    'originalPosition':'',
    'flowLayout':''
};

var domMap= {};

function parseLabel(elem,parent){
    position = elem.children('originalPosition');
    label = new Label(
        getNextId(),
        position.attr('x'),
        position.attr('y'),
        position.attr('width'),
        position.attr('height'),
        elem.attr('label')
    );
    label.addTag(new Tag_id(elem.attr('id')));
    parent.addSubControl(label);
}

function parseTextBox(elem,parent){
    position = elem.children('originalPosition');
    textBox = new TextBox(
        getNextId(),
        position.attr('x'),
        position.attr('y'),
        position.attr('width'),
        position.attr('height')
    );
    textBox.addTag(new Tag_id(elem.attr('id')));
    parent.addSubControl(textBox);
}

function parsePanel(elem,parent){
    position = elem.children('originalPosition');
    panel = new Panel(
        getNextId(),
        position.attr('x'),
        position.attr('y'),
        position.attr('width'),
        position.attr('height')
    );
    panel.addTag(new Tag_id(elem.attr('id')));
    panel.addTag(new Tag_layout(elem.children('layout').children().get(0).tagName));
    parent.addSubControl(panel);
    /**
     * Este error ahi que corregirlo en el schema...
     */
    elem.children('layout').remove();
    ParserXML(elem,panel);
}

function parseButton(elem,parent){
    position = elem.children('originalPosition');
    button = new Button(
        getNextId(),
        position.attr('x'),
        position.attr('y'),
        position.attr('width'),
        position.attr('height')
    );
    button.addTag(new Tag_id(elem.attr('id')));
    parent.addSubControl(button);
}

function parseCheckBox(elem,parent){
    position = elem.children('originalPosition');
    checkBox = new CheckBox(
        getNextId(),
        position.attr('x'),
        position.attr('y'),
        position.attr('width'),
        position.attr('height')
    );
    checkBox.addTag(new Tag_id(elem.attr('id')));
    parent.addSubControl(checkBox);
}
function parseLayout(elem,parent){

}

var parsers = {
    'label': parseLabel,
    'textBox': parseTextBox,
    'panel': parsePanel,
    'button': parseButton,
    'checkbox': parseCheckBox,
    'layout': parseLayout
}

function ParserXML(elem,parent){
    elem.children().each(function(key,elem){
        elem = $(elem);
        tagName = elem.get(0).tagName;
        if(!(tagName in ignoredTags)){
            parsers[tagName](elem,parent);
        }
    });
    return;
}

var currentId= 0;
function getNextId(){
    currentId = currentId + 1;
    return 'ewa_'+currentId;
}
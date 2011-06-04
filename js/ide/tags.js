var TagsGridStore;

function getAvailableTagsGrid() {
    
    return generateGridOfAvailableTags();
};

function getAvailableTagsWindow(_availableTagsPanel) {
    var window = Ext.create('widget.window', {
        closable: true,
        closeAction: 'hide',
        layout: 'fit',
        items: [generateGridOfAvailableTags(false)],
    });
    return window;
}

function generateGridOfAvailableTags(showTitle){
    if(showTitle == undefined)
        showTitle = true
    return Ext.create('Ext.grid.Panel', {
        store: TagsGridStore,
        columns: [{
            xtype: 'checkcolumn',
            dataIndex: 'tagActived',
            width: 27,
            listeners: {
                'checkchange': function(grid, rowIndex, checked) {
                    if(cComp == undefined){
                        return;
                    };
                    var record = TagsGridStore.getAt(rowIndex),
                    tagName = record.get('tagName');
                    if(checked){
                        cComp.addTag(eval('new Tag_'+tagName+'()'));
                    }else{
                        if(!cComp.removeTag(tagName)){
                            Ext.MessageBox.show({
                                title: 'Error al eliminar tag',
                                msg: 'No se puede eliminar el tag "'+tagName+'".',
                                buttons: Ext.MessageBox.OK,
                                animateTarget: this,
                                icon: Ext.MessageBox.ERROR
                            });
                            record.set('tagActived',true);
                        }
                    }
                    updateTagsOfComponent(cComp);
                }
            }
        },{
            text: "Tag",
            width: 150,
            dataIndex: 'tagName'
        },{
            xtype: 'actioncolumn',
            width: 20,
            items: [{
                icon   : 'images/ico_prop.png',  // Use a URL in the icon config
                tooltip: 'Properties',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore.getAt(rowIndex);
                    log("Tag:" + rec.get('tagName'));
                }
            }]
        }],
        columnLines: true,
        autoScroll: true,
        height: 212,
        title: (showTitle)?'Availabe Tags':undefined,
        iconCls: 'icon-grid',
        autoScroll: true
    });
}

function generateStructuresForAvailableTags(){
    Ext.define('Tags', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'tagName',
            type: 'string'
        },{
            name: 'tagActived',
            type: 'bool'
        }]
    });
    TagsGridStore = new Ext.data.Store({
        model: 'Tags',
        data : []
    });
}
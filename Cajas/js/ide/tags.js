var TagsGridStore = null;
var TagList = Class.extend({

    });

function getAvailableTagsGrid() {
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
    var grid = Ext.create('Ext.grid.Panel', {
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
                    var tagName = TagsGridStore.getAt(rowIndex).get('tagName');
                    if(checked){
                        cComp.addTag(eval('new Tag_'+tagName+'()'));
                    }else{
                        cComp.removeTag(tagName);
                    }
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
        width: 250,
        height: 218,
        title: 'Availabe Tags',
        iconCls: 'icon-grid',
        autoScroll: true
    });
    return grid;
};
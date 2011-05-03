Ext.Loader.setConfig({
    enabled: true
});
Ext.Loader.setPath('Ext.ux', '/js/ext/ux');
Ext.require(['*','Ext.ux.CheckColumn']);

var availableTagsPanel,availableTagsWindow;


Ext.onReady(function() {

    Ext.QuickTips.init();

    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    generateStructuresForAvailableTags();
    availableTagsPanel = getAvailableTagsGrid();
    availableTagsWindow = getAvailableTagsWindow(availableTagsPanel);

    var viewport = Ext.create('Ext.Viewport', {
        id: 'border-example',
        layout: 'border',
        items: [{
            region: 'north',
            contentEl: 'title'
        },{
            region: 'west',
            contentEl: 'menu',
            width: 200,
            items: [{
                contentEl: 'infoOfBox',
                border: 0
            },availableTagsPanel]
        },{
            region: 'center',
            contentEl: 'canvas'
        }]
    });
});
Ext.require(['*']);

Ext.onReady(function() {

    Ext.QuickTips.init();

    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

    var viewport = Ext.create('Ext.Viewport', {
        id: 'border-example',
        layout: 'border',
        items: [{
            region: 'north',
            contentEl: 'title'
        },{
            region: 'west',
            contentEl: 'menu',
            width: 200
        },{
            region: 'center',
            contentEl: 'canvas'
        }]
    });
});
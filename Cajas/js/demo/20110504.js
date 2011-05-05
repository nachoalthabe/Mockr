function loadDomDemo(){
    loadHTMLInCanvas('/test/login.html',{
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
    });
}
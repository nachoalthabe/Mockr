yepnope([{
    //Libs
    load: [
    'js/lib/jquery.js',
    'js/sJSi.js',
    'js/extend.js'
    ]
},{
    //WebSpects
    load: [
    'js/WebSpec/Widgets.js',
    'js/WebSpec/Tags.js',
    'js/WebSpec/Visitors.js',
    'js/WebSpec/ParserHTML.js',
    'js/ide/tagListBox.js',
    'js/ide.js'
    ],
    //Init general
    complete: function(){
        loadExampleHtml('login');
    }
}]);

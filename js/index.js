var mockr
var Config = {
  serveUrl: "/srv.php"
}
var Context = {
  uiId: 'Test'
}

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
    'js/WebSpec/DataTypes.js',
    'js/WebSpec/Visitors.js',
    'js/WebSpec/ParserHTML.js',
    'js/WebSpec/Boxes.js',
    'js/ide/tagListBox.js',
    'js/ide/tagEditBox.js',
    'js/Mockr.js'
    ],
    //Init general
    complete: function(){
      $.ajax({
          url: 'examples/google.js',
          dataType: 'json',
          success: function(data){
            mockr = new Mockr({
              container: $('#mockr'),
              url: 'http://google.com.ar/',
              schema: data
            })
          },
          error: function(ev){
          }
      })
    }
}])

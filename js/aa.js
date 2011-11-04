
window.fbAsyncInit = function() {
  FB.init({
    appId       : '256419281077051',
    status      : true,
    cookie      : true,
    xfbml       : true
  });
};

(function() {
  var e = document.createElement('script');
  e.src = document.location.protocol + '//connect.facebook.net/es_LA/all.js#xfbml=1&appId=256419281077051';
  e.async = true;
  document.getElementById('fb-root').appendChild(e);
}());
$(document).ready(function(){
  $('#btnLogin').click(function(){
    FB.login(function(response) {
      if (response.session) {
        if (response.perms) {
          FB.api("/me", function(res){
            withfb = true
            $('#fbHide').hide()
            $('#step1-username').val(res.email)
            $('#step1-submit').click()
            $('#fbuid').val(res.id)
            $('#step2b-username').val(res.email)
            $('#step2b-password1').val(response.session.access_token)
            $('#step2b-password2').val(response.session.access_token)
            $('#step2b-fullname').val(res.name)
            $('#step2b-submit').unbind();
            $('#step2b-submit').click(function(){
              if (FB.getSession()) {
                FB.ui({
                  method: 'feed',
                  name: 'Facebook Dialogs',
                  link: 'http://t.zippio.com',
                  action: 'Registrate',
                  picture: 'http://fbrell.com/f8.jpg',
                  caption: 'Reference Documentation',
                  description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
                },
                function(response) {
                  $('.step2b').hide();
                  $('.initializing').show();
                  var v1 = $('#step2b-username').val();
                  var v2 = $('#step2b-password1').val();
                  var v3 = $('#step2b-password2').val();
                  var v4 = $('#step2b-fullname').val();
                  var v5 = $('#step2b-mobile1').val();
                  var v6 = $('#step2b-mobile2').val();
                  if(v1 && v2 && v3 && v4 && v5 && v6 && v2==v3) {
                    console.log("all fields!");
                    $('#step2b-form').submit();
                  } else {
                    $('.initializing').hide();
                    $('#step2b-error').show();
                    $('.step2b').show();
                  }
                }
                )
              }
            })
          })
        }
      }
      return false;
    }, {
      perms: 'email'
    });
  })
})
  
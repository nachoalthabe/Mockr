$(document).ready(function() {
    $('#xml').uploadify({
        'uploader'  : '/swf/uploadify.swf',
        'script'    : '/srv/uploadify/uploadify.php',
        'cancelImg' : '/css/jquery/uploadify/cancel.png',
        'folder'    : '/xml',
        'auto'      : true,
        'onComplete': uploadFinish,
        'multi'     : false,
        'fileExt'   : '*.xml',
        'fileDesc'  : 'CajaMock',
        'expressInstall' : '/swf/expressInstall.swf'
    });
});

function uploadFinish(ev,id,file,response,data){
    $('#fileName').val(response);
    $('#gotoCanvas').submit();
}

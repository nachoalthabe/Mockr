<!--
To change this template, choose Tools | Templates
and open the template in the editor.
-->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Cajas!!</title>
        <script src="js/jq/jq.js" type="text/javascript"></script>
        <script src="js/lib/swfobject.js" type="text/javascript"></script>
        <script src="js/jq/jq.uploadify.js" type="text/javascript"></script>
        <script src="js/index.js" type="text/javascript"></script>
        <link rel="stylesheet" href="css/jquery/uploadify/uploadify.css" type="text/css" media="all" />
        <link rel="stylesheet" href="css/index.css" type="text/css" media="all" />
    </head>
    <body>
        <div id="body">
            <h1>Ingrese su XML</h1>
            <input type="file" id="xml" />
            <form id="gotoCanvas" method="post" action="canvas.php">
                <input type="text" name="fileToEdit" id="fileName" />
            </form>
        </div>
    </body>
</html>

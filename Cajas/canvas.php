<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Cajas!!</title>
    </head>
    <script src="js/jq/jq.js" type="text/javascript"></script>
    <script src="js/ext/bootstrap.js" type="text/javascript"></script>
    <script src="js/extend.js" type="text/javascript"></script>
    <script src="js/sJSi.js" type="text/javascript"></script>
    <script src="js/WebSpec/Components.js" type="text/javascript"></script>
    <script src="js/WebSpec/Tags.js" type="text/javascript"></script>
    <script src="js/WebSpec/VisitorComponents.js" type="text/javascript"></script>
    <script src="js/WebSpec/Parser.js" type="text/javascript"></script>
    <script src="js/canvas.js" type="text/javascript"></script>
    <script src="js/ide/tags.js" type="text/javascript"></script>
    <script src="js/ide/menu.js" type="text/javascript"></script>
    <script src="js/layout.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" />
    <link rel="stylesheet" href="css/canvas.css" type="text/css" media="all" />

    <script type="text/javascript">
        var file = <?php echo (isset($_POST['fileToEdit'])) ? '"' . $_POST['fileToEdit'] . '"' : 'null'; ?>
    </script>
    <body>
        <div id="title">
            <span>Cajas...</span>
        </div>
        <div id="canvas">
        </div>
        <div id="menu">
            <div id="infoOfBox">
                <span id="boxId">cajas</span>
                <br />
                <span id="boxType">locas</span>
            </div>
            <div id="tagsOfBox">
                <div id="tagList">
                </div>
            </div>
        </div>
        <div id="themes">
            <div id="availableTagItem">
                <div class="availableTagItem">
                    <input class="activateTag" type="checkbox" />
                    <span class="tagName"></span>
                    <img class="getTagForm" src="images/ico_prop.png" />
                </div>
            </div>
        </div>
    </body>
</html>

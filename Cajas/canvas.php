<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Cajas!!</title>
    </head>
    <script src="js/jq/jq.js" type="text/javascript"></script>
    <script src="js/jq/jq.ui.js" type="text/javascript"></script>
    <script src="js/sJSi.js" type="text/javascript"></script>
    <script src="js/WebSpec/Widget.js" type="text/javascript"></script>
    <script src="js/WebSpec/Visitor.js" type="text/javascript"></script>
    <script src="js/WebSpec/Parser.js" type="text/javascript"></script>
    <script src="js/canvas.js" type="text/javascript"></script>
    <link rel="stylesheet" href="css/canvas.css" type="text/css" media="all" />
    <script type="text/javascript">
        var file = <?php echo (isset($_POST['fileToEdit']))?'"'.$_POST['fileToEdit'].'"':'null'; ?>
    </script>
    <body>
        <div id="cajas">
            <div id="canvas">
                <div class="box" style="width:100px;height:100px;position:relative;top:10px;left:10px;float:left"></div>
            </div>
            <div id="menu">
                <div id="infoOfBox">
                    <span id="boxId">cajas</span>
                    <br />
                    <span id="boxType">locas</span>
                </div>
                <div id="tagsOfBox">
                    <input type="text" id="findTag" value="Inserta una nueva etiqueta."/>
                    <div id="listOfTags">
                    </div>
                </div>
            </div>
        </div>
        <div  id="themes">
            <div id="themeTag">
                <div class="tag"><span class="name"></span><div onclick="removeThisTag(this);" class="removeTag">x</div></div>
            </div>
        </div>
    </body>
</html>

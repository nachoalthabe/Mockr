<?php

function validGetParameter($parameter) {
    if (!isset($_GET[$parameter])) {
        header("HTTP/1.0 400 Bad Request");
        die(json_encode(array(
                    'error' => true,
                    'msj' => "Need parameter \"$parameter\""
                )));
    }else{
        return $_GET[$parameter];
    }
}

validGetParameter('opt');

switch ($_GET['opt']) {
    case '1':
        $response = getXML();
        break;
    default:
        break;
}

function getXML() {
    $file = validGetParameter('file');
    include '../inc/xml2json.php';
    return xml2json::transformXmlStringToJson('../'.$file);
}

echo $response;
?>

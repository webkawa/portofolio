<?php
/*
 *  send.php
 *  --------
 *  Action d'envoi d'un mail.
 */

$subject = $_POST["subject"];
$mail = $_POST["mail"];
$message = $_POST["message"];
$status = true;

if ($subject == null) {
    $status = false;
}
if ($message == null) {
    $status = false;
}
if ($mail == null) {
    $status = false;
}

if ($status == true) {
    /* Création du mail retour */
    $backheaders  = "MIME-Version: 1.0";
    $backheaders .= "Content-type: text/plain; charset=utf-8";
    $backheaders .= 'To: <' . $mail . '>' . "\r\n";
    $backheaders .= 'From: guillaume.zavan@gmail.com <guillaume.zavan@gmail.com>' . "\r\n";
    $backsubject = "Merci pour votre message";
    $backmessage =
        "Bonjour,\n" .
        "\n" .
        "Votre message sur www.kawasphere.com a bien été envoyé ; j'y répondrais dans les plus brefs délais.\n" .
        "\n" .
        "Cordialement," .
        "\n" .
        "Guillaume ZAVAN\n" .
        "guillaume.zavan@gmail.com";
    
    /* Création du mail principal */
    $mainheaders  = "MIME-Version: 1.0";
    $mainheaders .= "Content-type: text/plain; charset=utf-8";
    $mainheaders .= 'To: <' . $mail . '>' . "\r\n";
    $mainheaders .= 'From: ' . $mail . ' <' . $mail . '>' . "\r\n";
    $mainsubject = "www.kawasphere.net [" . $subject . "]";
    $mainmessage =
        "Message envoyé depuis www.kawasphere.net\n" .
        "Le " . date("d-m-Y") . " à " . date("H:i") . "\n" .
        "Expéditeur : " . $mail . "\n" .
        "\n" .
        $message;
    
    /* Envois */
    try {
        /* Exécution */
        mail($mail, $backsubject, $backmessage, $backheaders);
        mail("guillaume.zavan@gmail.com", $mainsubject, $mainmessage, $mainheaders);
        
        /* Retour */
        $result  = '<?xml version="1.0" encoding="UTF-8"?>';
        $result .= '<result>SUCCESS</result>';
    } catch (Exception $e) {
        /* Retour */
        $result  = '<?xml version="1.0" encoding="UTF-8"?>';
        $result .= '<result>SENDING_ERROR</result>';
    }
} else {
    /* Retour */
    $result  = '<?xml version="1.0" encoding="UTF-8"?>';
    $result .= '<result>PARAMETERS_ERROR [' . $mail . ';' . $subject . ';' . $message . ']</result>';
}
echo $result;
    
?>

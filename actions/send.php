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
    // Envoi du mail retour
    $backheaders  = "MIME-Version: 1.0";
    $backheaders .= "Content-type: text/plain; charset=iso-8859-1";
    $backheaders .= 'To: <' . $mail . '>' . "\r\n";
    $backheaders .= 'From: no-repy@gz.fr <anniversaire@example.com>' . "\r\n";
    
    
} else {
    $result  = '<?xml version="1.0" encoding="UTF-8"?>';
    $result .= '<result>false</result>';
}
?>

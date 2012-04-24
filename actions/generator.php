<?php

/*
 *  generator.php
 *  -------------
 *  Générateur pour la version statique du site.
 */

/* Générateur de l'emplacement */
function createEmplacement() {
    
}

/* Générateur pour un contenu */
function createContent($page) {
    
}

/* Générateur pour un média */
function createMedia($media) {
    
}

/* Générateur pour une page */
function createPage($page, $media) {
    /* Console */
    echo "<p>CREATE PAGE [" . $page->nodeValue . "] MEDIA [" . $media->nodeValue . "]</p>";
    echo "<blockquote>";
    
    
    
    /* Console */
    echo "</blockquote>";
}

/* Exécution */

$index = new DOMDocument();
$index->load("../data/site/index.xml");
$xpindex = new DOMXPath($index);

/* Parcours des pages */
$pages = $xpindex->query("/root/page");
foreach ($pages as $page) {
    /* Sélection des variables utiles */
    $id = $page->getAttribute("id");
    $data = $xpindex->query("/root/page[@id='" . $id . "']/data")->item(0);
    $medias = $xpindex->query("/root/page[@id='" . $id . "']/media");
    
    /* Création de la page */
    createPage($data, null);
    
    /* Création des médias */
    foreach ($medias as $media) {
        createPage($data, $media);
    }
}

?>

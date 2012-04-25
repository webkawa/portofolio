<?php

/*
 *  generator.php
 *  -------------
 *  Générateur pour la version statique du site.
 */

/* Générateur de l'emplacement */
function createTemplate($xppage, $xpmedia) {
    /* Sélection de la page */

    /* Sélection du dossier et du fichier à créer */
    $folder = "../site/" . $xppage->query("/root/id")->item(0)->nodeValue . "/";
    if ($xpmedia != null) {
        $folder .= $xpmedia->query("/root/id")->item(0)->nodeValue . "/";
    }

    /* Création de la page */
    if (!is_dir($folder)) {
        mkdir($folder);
    }
    copy("../data/site/templates/main.html", $folder . "index.html");
    
    /* Console */
    echo "<p>CREATE TEMPLATE [" . $folder . "index.html]</p>";
    echo "<blockquote>";
    echo "</blockquote>";
}

/* Générateur pour un contenu */

function createContent($page) {
    
}

/* Générateur pour un média */

function createMedia($media) {
    
}

/* Générateur pour une page */

function createPage($folder, $pge, $med) {
    /* Console */
    echo "<p>CREATE PAGE [" . $pge->nodeValue . "] MEDIA [" . $med->nodeValue . "]</p>";
    echo "<blockquote>";

    /* Sélection de la page */
    $page = new DOMDocument();
    $page->load("../" . $folder . $pge->nodeValue);
    $xppage = new DOMXPath($page);

    /* Sélection du média */
    if ($med != null) {
        $media = new DOMDocument();
        $media->load("../" . $folder . "/" . $med->nodeValue);
        $xpmedia = new DOMXPath($media);
    }

    /* Création du gabarit */
    createTemplate($xppage, $xpmedia);

    /* Console */
    echo "</blockquote>";
}

/* Nettoyage des contenus précédents */
echo "<p>REINITIALIZING ORIGINAL DIRECTORY</p>";
echo "<blockquote>";

function rrmdir($dir) {
    foreach (glob($dir . '/*') as $file) {
        echo "<p>" . $file . "</p>";
        if (is_dir($file))
            rrmdir($file);
        else
            unlink($file);
    }
    rmdir($dir);
}

echo "</blockquote>";
rrmdir("../site");
mkdir("../site");

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
    createPage($page->getAttribute("repertory"), $data, null);

    /* Création des médias */
    foreach ($medias as $media) {
        createPage($page->getAttribute("repertory"), $data, $media);
    }
}
?>

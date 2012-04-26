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
    
    /* Renvoi */
    return $folder . "index.html";
}

/* Générateur pour un contenu */

function createContent($path, $xppage, $hasmed) {
    /* Console */
    echo "<blockquote>";
    
    /* Sélection du fichier */
    $file = new DOMDocument();
    $file->loadHTMLFile($path);
    $xpfile = new DOMXPath($file);
    
    /* Remplissage du titre */
    echo "<p>CREATE TITLE</p>";
    $b1 = $file->createElement("h1");
    $xpfile->query("//div[@id='title']")->item(0)->appendChild($b1);
    $b1 = $file->createTextNode($xppage->query("/root/title")->item(0)->nodeValue);
    $xpfile->query("//div[@id='title']/h1")->item(0)->appendChild($b1);
    
    if($xppage->query("/root/subtitle")->length == 1) {
        echo "<p>CREATE SUBTITLE</p>";
        $b1 = $file->createElement("p");
        $xpfile->query("//div[@id='title']")->item(0)->appendChild($b1);
        $b1 = $file->createTextNode($xppage->query("/root/subtitle")->item(0)->nodeValue);
        $xpfile->query("//div[@id='title']/p")->item(0)->appendChild($b1);
    }
    
    /* Remplissage du contenu */
    echo "<p>CREATE CONTENT</p>";
    $b1 = new DOMDocument();
    $b1->loadXML($xppage->query("/root/core")->item(0)->nodeValue);
    foreach ($b1->getElementsByTagName("img") as $img) {
        $img->setAttribute("src", "/portofolio/" . $img->getAttribute("src"));      // [TEMP]
    }
    foreach ($b1->getElementsByTagName("a") as $a) {
        if($hasmed) {
            $a->setAttribute("href", "../" . substr($a->getAttribute("href"), 1, 200) . "/");
        } else {
            $a->setAttribute("href", substr($a->getAttribute("href"), 1, 200) . "/");
        }
    }
    $b2 = $file->importNode($b1->getElementsByTagName("div")->item(0), true);
    $xpfile->query("//div[@id='content']")->item(0)->appendChild($b2);
    
    /* Enregistrement */
    $file->saveHTMLFile($path);
    
    /* Console */
    echo "</blockquote>";
}

/* Générateur pour un média */

function createMedia($path, $xpmedia) {
    
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
    $file = createTemplate($xppage, $xpmedia);
    
    /* Remplissage */
    echo "<p>CREATE CONTENT</p>";
    createContent($file, $xppage, ($med != null));
    if($med != null) {
        echo "<p>CREATE MEDIA</p>";
        createMedia($file, $xpmedia);
    }

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

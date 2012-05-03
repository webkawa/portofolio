<?php

/*
 *  generator.php
 *  -------------
 *  Générateur pour la version statique du site.
 */

/* Générateur de l'emplacement */
function createTemplate($xppage, $xpmedia) {
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
        $img->setAttribute("src", "/" . $img->getAttribute("src"));
    }
    foreach ($b1->getElementsByTagName("a") as $a) {
        if (substr($a->getAttribute("href"), 0, 1) == "#") {
            if($hasmed) {
                $a->setAttribute("href", "../" . substr($a->getAttribute("href"), 1, 200) . "/");
            } else {
                $a->setAttribute("href", substr($a->getAttribute("href"), 1, 200) . "/");
            }
        }
    }
    $b2 = $file->importNode($b1->getElementsByTagName("div")->item(0), true);
    $xpfile->query("//div[@id='content']")->item(0)->appendChild($b2);
    
    /* Extension */
    if (!$hasmed) {
        $xpfile->query("//div[@id='content']")->item(0)->setAttribute("class", "large");
    }
    
    /* Identification de la page */
    $xpfile->query("//body")->item(0)->setAttribute("class", $xppage->query("/root/id")->item(0)->nodeValue);
    
    /* Enregistrement */
    $file->saveHTMLFile($path);
    
    /* Console */
    echo "</blockquote>";
}

/* Générateur pour un média */
function createMedia($path, $xpmedia) {
    /* Console */
    echo "<blockquote>";
    
    /* Sélection du fichier */
    $file = new DOMDocument();
    $file->loadHTMLFile($path);
    $xpfile = new DOMXPath($file);
    
    /* Parcours des médias */
    $views = $xpmedia->query("/root/view");
    $data = 
        "<div>" .
            '<div class="title">' .
                $xpmedia->query("/root/title")->item(0)->nodeValue .
            "</div>";
    foreach ($views as $view) {
        $id = $view->getAttribute("id");
        $type = $xpmedia->query("/root/view[@id='" . $id . "']/type")->item(0)->nodeValue;
        
        if ($type == "text") {
            echo "<p>CREATE VIEW [" . $id . "] TYPE TEXT</p>";
            $data .=
                "<div>" .
                    $xpmedia->query("/root/view[@id='" . $id . "']/core")->item(0)->nodeValue .
                "</div>";
        }
        if ($type == "gallery") {
            echo "<p>CREATE VIEW [" . $id . "] TYPE GALLERY</p>";
            $pictures = $xpmedia->query("/root/view[@id='" . $id . "']/picture");
            foreach ($pictures as $picture) {
                $pid = $picture->getAttribute("id");
                $data .=
                    '<div class="gallery">' .
                        '<a href="../../../data/medias/img/' . 
                            $xpmedia->query("/root/view[@id='" . $id . "']/picture[@id='" . $pid . "']/files/image")->item(0)->nodeValue . 
                        '" alt="Afficher en pleine largeur" target="_blank">' .
                            '<img src="../../../data/medias/img/' . 
                                $xpmedia->query("/root/view[@id='" . $id . "']/picture[@id='" . $pid . "']/files/image")->item(0)->nodeValue . 
                            '" alt="' .
                                $xpmedia->query("/root/view[@id='" . $id . "']/picture[@id='" . $pid . "']/alt")->item(0)->nodeValue .
                            '"></img>' .
                        '</a>' .
                        "<h5>" . 
                            $xpmedia->query("/root/view[@id='" . $id . "']/picture[@id='" . $pid . "']/legend")->item(0)->nodeValue .
                        "</h5>" .
                        "<p>" .
                            $xpmedia->query("/root/view[@id='" . $id . "']/picture[@id='" . $pid . "']/text")->item(0)->nodeValue .
                        "</p>" .
                    "</div>";
            }
        }
        if ($type == "map") {
            echo "<p>CREATE VIEW [" . $id . "] TYPE MAP</p>";
            $data .=
                '<div class="map">' .
                    '<h4>Carte</h4>' .
                    '<img src="' .
                        'https://maps.googleapis.com/maps/api/staticmap?center=' .
                            $xpmedia->query("/root/view[@id='" . $id . "']/latitude")->item(0)->nodeValue .
                            ',' .
                            $xpmedia->query("/root/view[@id='" . $id . "']/longitude")->item(0)->nodeValue .
                            '&amp;zoom=' .
                            $xpmedia->query("/root/view[@id='" . $id . "']/zoom")->item(0)->nodeValue .
                            '&amp;size=400x400' .
                            '&amp;sensor=false';
            
            $markers = $xpmedia->query("/root/view[@id='" . $id . "']/markers/marker");
            $i = 1;
            foreach ($markers as $marker) {
                $lng = $xpmedia->query("/root/view[@id='" . $id . "']/markers/marker[" . $i . "]/longitude")->item(0)->nodeValue;
                $lat = $xpmedia->query("/root/view[@id='" . $id . "']/markers/marker[" . $i . "]/latitude")->item(0)->nodeValue;
                $i++;
                
                $data .=
                    '&amp;markers=color:red%7C' . $lat . "," .$lng;
            }
            
            $data .=
                    '" alt="Carte"></img>' .
                "</div>" ;
        }
    }
    if ($xpmedia->query("/root/notes")->length != 0) {
        $data .= 
            '<div class="notes">' .
                $xpmedia->query("/root/notes")->item(0)->nodeValue .
            "</div>";
    }
    $data .= "</div>";
    
    /* Injection */
    $b1 = new DOMDocument();
    $b1->loadXML($data);
    $b2 = $file->importNode($b1->getElementsByTagName("div")->item(0), true);
    $xpfile->query("//div[@id='media']")->item(0)->appendChild($b2);
    
    /* Enregistrement */
    $file->saveHTMLFile($path);
    
    /* Console */
    echo "</blockquote>";
}

/* Générateur pour la navigation */
function createNavigation($path, $back, $next, $med) {
    /* Console */
    echo "<p>CREATE NAVIGATION</p>";
    
    /* Création du HTML */
    $prefix = "";
    if ($med) {
        $prefix = "../";
    }
    $data = "<root><ul>";
    if ($back != null) {
        $data .= '<li><a href="' . $prefix . '../' . $back . '/" title="Aller à la page précédente">Page précédente</a></li>';
    }
    if ($next != null) {
        $data .= '<li><a href="' . $prefix . '../' . $next . '/" title="Aller à la page suivante">Page suivante</a></li>';
    }
    $data .= 
                '<li class="right"><a href="/" title="Retour à la version normale">Version standard</a></li>' .
            "</ul>" .
        "</root>";
    
    /* Sélection du fichier */
    $file = new DOMDocument();
    $file->loadHTMLFile($path);
    $xpfile = new DOMXPath($file);
    
    /* Injection */
    $b1 = new DOMDocument();
    $b1->loadXML($data);
    $b2 = $file->importNode($b1->getElementsByTagName("root")->item(0), true);
    $xpfile->query("//div[@id='navigation']")->item(0)->appendChild($b2);
    
    /* Temporaire */
    $css = $xpfile->query("//link[@type='text/css']")->item(0);
    if ($med) {
        $css->setAttribute("href", "../../.." . $css->getAttribute("href"));
    } else {
        $css->setAttribute("href", "../.." . $css->getAttribute("href"));
    }
    
    /* Enregistrement */
    $file->saveHTMLFile($path);
}

/* Générateur pour une page */

function createPage($folder, $pge, $med, $pos, $nav) {
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
    
    /* Définition des informations de navigation */
    $backnav = null;
    if ($pos > 0) {
        $backnav = $nav[$pos -1];
    }
    $nextnav = null;
    if ($pos < sizeof($nav)) {
        $nextnav = $nav[$pos + 1];
    }
    
    /* Remplissage */
    echo "<p>CREATE CONTENT</p>";
    createContent($file, $xppage, ($med != null));
    if ($med != null) {
        echo "<p>CREATE MEDIA</p>";
        createMedia($file, $xpmedia);
    }
    createNavigation($file, $backnav, $nextnav, ($med != null));

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
$nav = null; 
$pos = 0;
foreach ($pages as $page) {
    /* Mise en cache de la page */
    $nav[$pos] = $page->getAttribute("id");
    $pos++;
}
$pos = 0;
foreach ($pages as $page) {
    /* Sélection des variables utiles */
    $id = $page->getAttribute("id");
    $data = $xpindex->query("/root/page[@id='" . $id . "']/data")->item(0);
    $medias = $xpindex->query("/root/page[@id='" . $id . "']/media");

    /* Création de la page */
    createPage($page->getAttribute("repertory"), $data, null, $pos, $nav);

    /* Création des médias */
    foreach ($medias as $media) {
        createPage($page->getAttribute("repertory"), $data, $media, $pos, $nav);
    }
    
    /* Mise à jour de la position */
    $pos++;
}

/* Création de la redirection principale */
echo "<p>CREATING MAIN REDIRECTION</p>";
copy("../data/site/templates/redirect.html", "../site/index.html");

$redirection = new DOMDocument();
$redirection->loadHTMLFile("../site/index.html");
$xpredirection = new DOMXPath($redirection);

$xpredirection->query("//body/div/p/a")->item(0)->setAttribute("href", $xpindex->query("/root/page[1]")->item(0)->getAttribute("id") . "/index.html");
$xpredirection->query("//head/link[@rel='canonical']")->item(0)->setAttribute("href", "/site/" . $xpindex->query("/root/page[1]")->item(0)->getAttribute("id") . "/index.html");
$xpredirection->query("//body")->item(0)->setAttribute("class", $xpindex->query("/root/page[1]")->item(0)->getAttribute("id"));

$redirection->save("../site/index.html");

?>

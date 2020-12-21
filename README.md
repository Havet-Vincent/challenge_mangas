# Challenge Javascript : Bibliothèque de mangas/animations japonaise

Vous êtes en train de créer une application web vous permettant d'enregistrer vos manga/animes préférés.

Vous n'avez pas de serveur pour rendre l'enregistrement de vos données persistantes, mais vous avez travaillé sur une interface pour vous permettre déjà de les afficher.

Après avoir fait la partie HTML et CSS, vous avez besoin maintenant de dynamiser la page avec javascript en permettant à l'utilisateur de rechercher et récupérer sur une API les informations nécéssaires.

> A noter qu'il n'y a pas de limite pour ceux qui veulent/peuvent aller plus loin que ce que l'énoncé propose. L'objectif et d'apprendre et de voir jusqu'où nos compétences actuelles peuvent nous emmener. Ne rester donc pas bloqué sur le cadre proposé de ce projet. Vous êtes libre d'y apporter votre propre interprétation et d'y ajouter toutes les fonctionnalités que vous souhaitez.
> 
> Prenez du plaisir !

# Planning prévisionnel du challenge (vérifier le discord si ça évolue)

* **21/12/2020** Annonce du challenge (+ explications en vocal)
* **31/12/2020** La chouille ! BONNE ANNEE
* **03/01/2021** Etat des lieux des progressions de chacun (vocal)
* **10/01/2021** Etat des lieux des progressions de chacun (vocal)
* **15/01/2021 00h00** FIN DU CHALLENGE => On laisse le temps à un ou plusieurs mentors de regarder ce qu'y a été fait
* **17/01/2021** Commentaires groupés, propositions d'axes d'améliorations sur les différents résultats du challenge par le ou les mentors :-)

# Où trouver les données des animes

On a trouvé une API nommée `Jikan` nous permettant de récupérer les informations d'anime du site `MyAnimeList` :
* Site MyAnimeList => https://myanimelist.net/
* Api JIKAN => https://jikan.docs.apiary.io

Nous allons utiliser Axios pour faciliter nos requêtes AJAX vers cette API

https://github.com/axios/axios

> _Si vous êtes confirmés, vous pouvez utiliser autre chose qu'Axios si vous le souhaitez_

# Fonctionnalités de l'application

> Je rappelle que je propose un cadre initial, surtout pour les novices. Rien ne vous empêche d'aller plus loin. (je ferais d'ailleurs quelques propositions ci-après)

> Pour les novices : Notez bien que pour répondre à cet énoncé, vous n'avez pas besoin de modifier la structure du code HTML (sauf pour enlever les contenus d'exemple). Juste en ajoutant des identifiants et des classes à vos balises, cela suffira amplement pour répondre à l'exercice avec uniquement du Javascript.

## A. Barre de recherche

Une barre de recherche est à notre disposition en haut à droite de la page :
* En tapant dans cette barre, à partir de 3 lettres tapées, cela lancera une recherche d'anime par son nom
* Une liste apparaît avec les résultats de recherches. En cliquant sur un des résultats, cela ajoutera une carte dans la liste des animes

### Remarques

* Nous devons utiliser la référence `Search` dans l'API
    * https://jikan.docs.apiary.io/#reference/0/search
* Il existe un évènement pour savoir quand la valeur d'un champ texte a changée
  * https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/input_event
* Pour permettre un meilleur découpage et éviter d'utiliser le système qui ajoute une carte en dépendance direct dans le code, on pourrait créer un évènement `onAnimeChoosed` sur lequel un autre élement pourrait écouter pour savoir si un anime a été choisi
  * https://developer.mozilla.org/fr/docs/Web/Guide/DOM/Events/Creating_and_triggering_events

## B. Liste de cartes

Nous avons une liste de cartes.
Chaque carte représente un anime qui a été choisi depuis la barre de recherche.

On y trouve :
* Une image
* Son titre
* Le score noté sur 10
* Le nombre d'épisode

Un bouton d'information est présent et ouvre une fenêtre modale quand vous cliquez dessus.

## C. Détail d'un anime

Dans la fenêtre ouverte lorsque l'on a cliqué sur le bouton `Info` d'une carte, nous pouvons trouver les informations suivantes :

* Dans l'entête de la fenêtre :
  * Le titre
  * Le lien pour regarder une bande-annonce
* Dans le tableau
  * Sa source
  * La durée des épisodes
  * Le genre
  * Le synopsis

### Remarques

* Nous devons récupérer les informations détaillées avec la référence `Anime` dans l'API
  * https://jikan.docs.apiary.io/#reference/0/anime

## Pour aller plus loin

Pour ceux qui sont assez avancés et ne se sentent pas challengé, nous pourrions imaginer :
* Rendre les données persistantes grâce au LocalStorage => https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage
  * Ajouter notre propre système de notation pour afficher notre note personnel
  * Pareil avec un commentaire personnel
* Pouvoir faire une recherche sur soit un manga, soit un anime
  * Avoir des filtres sur la liste de cartes pour visualiser les cartes représentant les mangas ou les animes
* Faire un système de pagination dans notre liste de cartes
* Réfléchir à l'UX et qu'est ce qui pourrait être améliorer pour augmenter la qualité de l'expérience utilisateur
  * Avoir des feedbacks cohérents pour l'utilisateur sur quand nos données chargent (afficher un loader par ex.), si il y a erreur, etc...
* Votre imagination est votre seule limite...

# Remarques complémentaires

Utilisez `querySelector` pour récupérer les éléments dont vous avez besoin
* https://developer.mozilla.org/fr/docs/Web/API/Document/querySelector

Ne copiez pas de code html dans un code JS. Dans le cas d'une carte par exemple, utilisez l'élément HTML `template` pour stocker un contenu HTML qui sera utilisé en javascript en tant qu'instance
* https://developer.mozilla.org/fr/docs/Web/HTML/Element/template

Le format JSON :
* https://developer.mozilla.org/fr/docs/Learn/JavaScript/Objects/JSON

Promesses, fonctions de rappels, fonctions fléchées (syntaxe moderne ES6) :
* https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Utiliser_les_promesses
* https://developer.mozilla.org/fr/docs/Glossaire/Fonction_de_rappel
* https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Fonctions/Fonctions_fl%C3%A9ch%C3%A9es

---

Vous trouverez dans `scripts/api` plusieurs fichiers pour créer une petite librairie d'API, vous pouvez partir dessus si vous le souhaitez.

Les classes vous permettent d'avoir une approche de ce que vous connaissez en orienté objet dans d'autres languages. Cela vous permettra de mieux découper chaque partie de code et d'y appliquer une logique spécifique.

Chaque classe est censée avoir un rôle et est censée se restreindre qu'à ce rôle uniquement.

Je ne vous oblige pas à utiliser les classes, vous pouvez faire sans si vous vous sentez absolument pas à l'aise. Mais ça risque de vous faire défaut dans le futur si vous n'essayez pas au moins de découper au maximum votre code de manière claire en différentes fonctions.

Vous pouvez très facilement créer des classes pour gérer votre DOM.

Imaginons par exemple :
* Vous pouvez créer une classe `Anime` qui contient les informations d'un anime
* Vous pouvez créer une classe `CardAnime`
  * Qui contient dans une propriété une instance de `Anime`
  * Qui gère la création de l'élément HTML à partir du template d'une carte
* Vous pouvez créer une classe `CardAnimeList`
  * Qui contient une liste de `CardAnime`
  * Qui s'occupe d'ajouter l'élément HTML `CardAnime` dans l'élément HTML qui est le conteneur des cartes
* etc...

---

**Si vous êtes en groupe :**
* Communiquez régulièrement et soutenez-vous si besoin
* Travaillez chacun sur votre branche
* Séparez bien vos tâches entre vous au maximum pour évitez de vous marcher sur les pieds
* Définissez vous bien vos points de jonction de code, lorsque vous fusionnerez vos branches, il y ai le moins de conflits possibles et seulement quelques ajustements à faire pour que votre système fonctionne.

> Par exemple : Un point de jonction possible pourrait êtres **les données au format JSON d'un anime**, que l'on récupère du système de recherche lors d'un clic dans les résultats, qui sera transmis au système qui ajoute une carte dans le DOM à partir de ses données

---

**ET SURTOUT :**
* Prenez l'habitude de savoir vous documenter et faire des recherches pour trouver la solution à vos problématiques
* Soyez critique sur ce que vous faites et sur ce que vous lisez sur Internet
* Osez demander de l'aide quand cela ne va vraiment pas
* Ne trainez pas sur un point particulier pendant trop longtemps, il y a pleins de choses sur lequel on peut avancer
* Prenez du plaisr !!!

---

## BON COURAGE A TOUS !
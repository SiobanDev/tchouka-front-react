This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


# Tchouka Spécifications
---
27-04-2020


## Objectif de l'application web TCHOUKA:
Permettre à l'utilisateur de se créer un support audio et visuel pour apprendre des enchaînements de  percussions corporelles.
Il est bien plus facile de réaliser et mémoriser l'enchaînement des percussions corporelles si l'on chante un mot à chaque percussion. Pour cette raison, ainsi que pour des contraintes techniques, le support d'apprentissage final ne sera pas une vidéo des gestes à effectuer, mais une bande-son des mots chantés, avec un prompt (texte karaoké) des-dits mots.

## Informations techniques:
- site web sous la forme d’une SPA
- utilisation d’une API pour générer le rendu final
- non responsive en V1

## ÉLÉMENTS :
### 1) les notes rytmiques (étapes 1 et 2 de TCHOUKA)
__Description__
- Permet de composer une partition rythmique à partir de durée de notes.
- les notes sont pour la V1 : la ronde (4 temps), la blanche (2 temps), la noire (1 temps), la croche (1/2 temps), la double-croche (1/4 temps), soit au total 5 notes (la hauteur des notes n'a pas d'importance).

> Une note est un objet qui a comme propriétés un id, une durée, une image.
> Les notes disponibles pour l'utilisateur viennent de la BDD.
> Les notes s'ajoutent à la "partition" lorsqu'on clique dessus;

### 2) la partition (étapes 1 et 2 de TCHOUKA)

___Description___
- désigne l'ensemble des notes rythmiques choisies par l'utilisateur
- fausse "partition", car partition rythmique, donc pas besoin de lignes pour la hauteur de notes

> La partition est un array qui se remplit avec les objets notes ;
> À chaque clic de l'utilisateur sur une des notes rythmiques disponibles (étape 1), l'array partition est envoyé actualisé à la BDD. Cela permettra de récupérer à l'étape 2 la partition créée par l'utilisateur.
> Il est possible d’effacer le contenu de la partition avec un bouton Reset ;
> Il est possible d’annuler la dernière note ajoutée grâce à un bouton Annuler ;
> Le stockage de la partition dans la BDD est liée à l'utilisation de session dans React (lorsque la session se réinitialise, les données de la partition aussi).
> Il n'est possible d'enregistrer qu'une seule partition à la fois.

### 3) les mots chantés (étapes 2 et 3 de TCHOUKA)
__Description__
- Mot associé à une partie du corps de Jean-Patricia.
- présent sur le dessin de JP, puis au-dessus de chaque note au fur et à mesure des clics de l'utilisateur (étape 2), et enfin sous la piste audio générée en étape 3, comme texte de karaoké.

> Les mots chantés sont là pour faciliter l'exécution et la mémorisation des percussions corporelles.
> Un mot chanté est un objet qui a pour propriétés un id, un mot (string) et un son (string).
> Les mots chantés sont stockés dans la BDD et récupérés par l'appli en étape 2.


### 4) Jean-Patricia pédagogique (étapes 2 et 3 de TCHOUKA)
__Description__
- JP est un dessin d'un humanoïde, avec des zones cliquables sur les membres du corps (celles qui seront à frapper). Les zones cliquables sont identifiées par un mot à chanter qui est écrit dessus.
À chaque clic sur une partie du corps, le mot chanté associé est automatiquement écrit au-dessus de la note rythmique disponible (maquette 2).
- 9 parties du corps qui correspondent chacune à un mot, de haut en bas et de gauche à droite :
*bou/bi : la poitrine,
*cla : le ventre,
*tchou/tchi : les doigts,
*dou/di : le haut des cuisses,
*pou/pi : les pieds.

> Les zones sont en position absolue définies proportionnellement par rapport à la taille de Jeanne-Pat ;
> Au clic sur Jean-Pat (maquette 3)  :
> -le mot associé à la partie du corps correspondante s'affiche au-dessus de la note rythmique sur la partition ;
> -le son du mot chanté est joué.
> À l'étape 2, dès le premier clic de l'utilisateur sur une partie du corps de JP, l'array composition se remplit (voir partie correspondante).
> Nécessité d'avoir les sources des images dans la BDD pour la création de composition, mais également en constante dans le front pour un affichage par défaut à l'étape 2 (avec le modèle JP).

### 5) les mouvements (étape 2 et 3 de TCHOUKA)
__Description__
- Un mouvement est un tableau d'une ou deux images

### 6) la composition (étape 2 de TCHOUKA)
__Description__
- La composition est la somme de la partition rythmique et des mots chantés.

> La composition est un array qui contient des objets qui ont comme propriétés un id, la durée de la note, le mot chanté et le son qui y est associé : [{id, durée,  images, mot, son}, {id, durée,  images, mot, son}, {id, durée,  images, mot, son},...]
> La composition est stockée dans la base de données et conservée jusqu'à la fin de la session de l'utilisateur.
> Pour la conserver, il faut créer un compte d'utilisateur (V2).
> La durée par défaut d'une note noire (1 temps) est de 1 seconde. Il n'est pas possible de changer le tempo dans la version 1 de l'application.

### 7) l'animation visuelle et sonore  (étape 3 de TCHOUKA)
__Description__
- animation de JP qui effectue la suite des mouvements associés à chaque note. Le son du mot chanté est joué à chaque nouveau mouvement. Chaque mouvement dure le temps de la note associée.

> La durée de chaque image est divisée par deux s'il y en a deux (pour l'étape 3 d'animation)

## BASE DE DONNÉES
- note {id, duration, noteImage}
- movementImage {id, src}
- movement {id, wordToSing, sound, MOVEMENTIMAGESLIST}
- percuElement : {id, NOTESLIST, MOVEMENTSLIST}
- compositon : {id, [percuElement, percuElement,...], user}
- user {id, pseudo, mail, password, COMPOSITIONSLIST}

## USER STORIES:

### Étape 1 (rythme) :
__US n°1__ - L’utilisateur veut créer une partition rythmique.
→ L'utilisateur clique sur les images des notes disponibles et ces dernières apparaissent sur une "partition" rythmique les unes à la suite des autres.
L'utilisateur ne peut ajouter une note qu’au début de la "partition" ou à la suite de la dernière note s’il y en a une.
L'utilisateur peut effacer la totalité de sa partition ou la dernière note ajoutée grâce à des boutons dédiés.

La quantité de notes que peut prendre une partition dépend de la résolution de l'écran (une note fait 5% de la portée en grand écran, 10% en petit écran).
Lorsque la portée est pleine, un message d’erreur indique que la portée n’a plus assez de place libre pour la note cliquée.

### Étape 2 (percussions) : 
__US n°2__ - L'utilisateur veut associer une partie du corps à une note (c'est-à-dire qu'il veut créer une composition à partir de sa partition rythmique)
 → L'utilisateur voit la partition rythmique qu'il a créée à l'étape 1 . Il voit aussi JP, sur qui il peut cliquer.
Lorsqu'il clique sur une partie du corps de JP (par exemple "Tchou"), et le mot va être ajouté au-dessus de la note de la partition rythmique.
 L'utilisateur peut effacer la totalité des mots ajoutés ou le dernier mot ajouté grâce à des boutons dédiés.
 Il ne peut pas modifier sa partition rythmique.
 Lorsque la portée est pleine, un message d’erreur indique que la portée n’a plus assez de place libre pour la note cliquée.
 
### Étape 3 (apprentissage) :
__US n°3__ - L’utilisateur veut apprendre sa composition .
→ L'utilisateur clique sur un bouton pour lancer l'animation de JP. Il peut relancer l'animation autant de fois qu'il le souhaite.

## Important
Quand on fait appel à plusieurs variables d'un contexte dans un même composant, il est nécessaire de les décomposer en plusieurs variables différentes pour que la référence pointe uniquement sur la variable et non sur le contexte global.
Si on ne décompose pas les variables du contexte et qu'on les utilise dans un useEffect, cela va créer une boucle infinie. En effet, la dépendance du useEffect sera le contexte global. Cela signifie qu'à chaque appel d'une des variables du contexte dans le useEffect, le contexte global sera actualisé, ce qui déclenchera le useEffect, et ceci sans fin.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

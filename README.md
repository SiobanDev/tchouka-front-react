This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


# README
---
## Objectif de l'application web TCHOUKA:
Permettre à l'utilisateur de se créer un support audio et visuel pour apprendre des enchaînements de  percussions corporelles.
Il est bien plus facile de réaliser et mémoriser l'enchaînement des percussions corporelles si l'on chante un mot à chaque percussion. Pour cette raison, ainsi que pour des contraintes techniques, le support d'apprentissage final ne sera pas une vidéo des gestes à effectuer, mais une bande-son des mots chantés, avec un prompt (texte karaoké) des-dits mots.

## Informations techniques:
- site web sous la forme d’une SPA
- utilisation de l'API Tchouka-back pour générer le rendu final
https://github.com/SiobanDev/tchouka-back-symfony
- non responsive en V1


 ## Problème de boucle infinie avec un contexte
 ---
  Quand on fait appel à plusieurs variables d'un contexte dans un même composant, il est nécessaire de les décomposer en plusieurs variables différentes pour que la référence pointe uniquement sur la variable et non sur le contexte global.
  Si on ne décompose pas les variables du contexte et qu'on les utilise dans un useEffect, cela va créer une boucle infinie. En effet, la dépendance du useEffect sera le contexte global.
  Cela signifie qu'à chaque appel d'une des variables du contexte dans le useEffect, le contexte global sera actualisé, ce qui déclenchera le useEffect, et ceci sans fin.
  
  __Exemple :__
  Je crée un contexte qui contient deux variables qui vont être associées au hook useState, parce que je veux pouvoir modifier ces variables durant l'utilisation de l'application et je veux que les composants se mettent à jour pour prendre la dernière valeur paramétrée :
  
  ```javascript
 const initialContextValues = {
      partition: [],
      setPartition: () => {},
};
const PartitionContext = React.createContext(initialContextValues);
```
  
```javascript
const [partition, setPartition] = useState([]);
return (
    <PartitionContext.Provider value={{ partition, setPartition }} >
        <div></div>
    </PartitionContext.Provider>
```
Je crée une variable globale pour mon contexte et je l'utilise pour appeler les variables partition, setPartition.
Je modifie la valeur de partition grâce à setPartition dans le useEffect :

```javascript
  const partitionContext = useContext(PartitionContext);

  useEffect(() => {
    partitionContext.setPartition(JSON.parse(localStorage.getItem("partition")));
  }, [partitionContext]);
```
>__Rappel__ :
Si le hook React useEffect a comme deuxième argument un tableau vide [], il est appelé à chaque montage du composant .
S'il a des variables indiquées dans un tableau comme deuxième argument, alors il est appelé à chaque fois qu'une de ces variables est modifiée (ce sont les "dépendances" du useEffect).
Enfin, si le useEffect n'a pas de deuxième argument, il s'exécute tout le temps.

Dans le cas présent, la variable setPartition modifie la valeur de la variable partition (car c'est le fonctionnement du useState). Donc cela modifie la variable globale partitionContexte.
Or comme celle-ci est en dépendance du useEffect, le useEffect est relancé. Il exécute donc la variable setPartition, qui modifie la valeur de la variable partition, etc.

## Solution
Il est donc conseillé de créer des variables spécifiques qui auront leur propre espace mémoire plutôt que de faire appel à des attributs de variables globales, qui partagent le même espace mémoire :

Exemple :
```diff javascript
-   const partitionContext = useContext(PartitionContext);
+    const { partition, setPartition } = useContext(PartitionContext);
    
    useEffect(() => {
-    partitionContext.setPartition(JSON.parse(localStorage.getItem("partition")));
+    setPartition(JSON.parse(localStorage.getItem("partition")));

-      }, [partitionContext]);
+    }, [setPartition]);
```
Ici, deux variables spécifiques sont créées : partition et setPartition, avec chacune leur espace mémoire.
Cela permet d'attribuer uniquement le setPartition comme dépendance au useEffect. Ainsi il ne relance pas le useEffect, car partition ne fait pas partie de ses dépendances.

## Précisions javascript
Lorsque l'on crée une variable, javascript enregistre en mémoire une référence, qui a une valeur.
__Lorsque cette variable est simple__ (une chaîne de caratère, un nombre ou un booléen), javascript écrase la référence précédemment enregistrée à chaque modification de cette variable.
__Lorsque cette variable est complexe__ (un objet, un hook...), javascript crée une nouvelle référence de la variable à chaque modification, au lieu de l'écraser.

&rarr; Il est plus difficile de mettre à jour correctement (sans effets de bord) une variable complexe qu'une variable simple. Il est donc conseillé de créer des variables spécifiques qui auront leur propre espace mémoire plutôt que de faire appel à des attributs de variables globales, qui partagent le même espace mémoire.

----

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

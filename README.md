# xtal-shell

$hell.js helps with debugging web components (and creating automated regression testing for applications built with them).

The JavaScript file $hell.js provides a static class $hell, which gets put into global scope.

From the dev tools / console tab of your (least) favorite browser, you can type certain "commands" to help you navigate and inspect the web components.

**$hell.ls** lists all the nodes in your current context.  When the page first loads, or is refreshed, the context will start out at document.body.

**$hell.cd(path)** allows you to move the context into children (or ancestors if you start the path with ..)

Paths look like directory paths (with the slash delimiter), and is limited to tag name, ID and/or index.  For example:

```JavaScript
$hell.cd('div/demo-snippet/iron-list#myID/div[7]')
```

**$hell.properties** lists the values of all the Polymer properties of the web component. 

**$hell.pwd** displays the current "directory" of your element context.

If you use the dread with statement, the syntax may look quite natural to command line enthusiasts:

```JavaScript
with($hell){
    cd('div');
    cd('demo-snippet/iron-list');
    pwd;
}
``` 

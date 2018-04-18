# xtal-shell

$hell.js helps with debugging web components, and for creating automated regression testing for applications built with them.

Although it may not appear this way at the moment, I believe the topic of automated regression tests will become an area where web components will shine quite brightly.  This library is intended to bring that day closer.  The reason I think this is that 1)  By relying on native features to create semantic markup, the path tests will be much less "random."  The ability to define ID's within a component, that doesn't need to be unique for other components, will allow developers to specify the functionality of common tags (***cough***div***cough***) in a uniform, consistent way.

The immediate stumbling block is that there is no standard selectors for piercing Shadow DOM.  

The approach we take is to define a syntax where there is one and only way to describe how to locate a node.  It should be easy to select a HTML Node with chrome dev tools (for example) and generate that unique path.

A noteworthy feature of the approach outlined here is that we will generate tests that err on the side of caution, i.e better to flag unexpected things, rather than assume everything is okay.   The path to elements will be very specific.  If the layout of a page changes in any significant way, unit tests built using these paths will need to be adjusted.

You will need to include a reference to the file $hell.js in your web site.  It is advisable to not include this file (at least unconditionally) in production, simply because it adds a few KB to the footprint.

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

If you right-click on an element in Chrome (or Edge outside any shadow dom), this puts the element into a varible $0 available from the console.  You can get the full path to the element by:

```JavaScript
$hell.getFullPath($0);
```

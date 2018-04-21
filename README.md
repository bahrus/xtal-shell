# xtal-shell

$hell.js helps with debugging web components, and for creating automated regression testing for applications built with them.

Although it may not appear this way at the moment, I believe the topic of automated regression tests will become an area where web components will shine quite brightly.  This library is intended to bring that day closer.  The reason I think this is that 1)  By relying on native features to create semantic markup, the path tests will be much less arbitrary, relying on less on class names used for styling, more on semantic tag names and id's that will likely  represent more of the stable business functionality.  The ability to define ID's within a component, that doesn't need to be unique for other components, will allow developers to specify the functionality of common tags (***cough***div***cough***) in a uniform, consistent way.

The immediate stumbling block is that there is no standard css selector for piercing Shadow DOM.  

The approach we take is to define a syntax where there is one and only way to describe how to locate a node.  It should be easy to select a HTML Node with chrome dev tools (for example) and generate that unique path.

A noteworthy feature of the approach outlined here is that we will generate tests that err on the side of caution, i.e better to flag unexpected things, rather than assume everything is okay.   The path to elements will be very specific.  If the layout of a page changes in any significant way, unit tests built using these paths will need to be adjusted.

But as we will see, you can make one query that is quite specific, with a long path, followed by navigating around in the context of the original query.  So if the layout changes, it could cause that single long query to change, leaving the relative navigation afterwards unaffected.

You will need to include a reference to the file $hell.js in your web site.  It is advisable to not include this file (at least unconditionally) in production, simply because it adds a few KB to the footprint.

The JavaScript file $hell.js provides a static class $hell, which gets put into global scope.

From the dev tools / console tab of your (least) favorite browser, you can type certain "commands" to help you navigate and inspect the web components.

**$hell.ls** lists all the nodes in your current context.  When the page first loads, or is refreshed, the context will start out at document.body.

**$hell.cd(path)** allows you to move the context into children (or ancestors if you start the path with ..)

Paths look like directory paths (with the slash delimiter), and is limited to tag name, ID and/or index.  For example:

```JavaScript
$hell.cd('div/demo-snippet/iron-list#myID/div[7]')
```

**$hell.properties** lists the values of all the Polymer properties of the web component. It also outputs the constructor, allowing you to right click and jump to the code behind the web componnt.

**$hell.pwd** displays the current "directory" of your element context.

If you use the dreaded with statement, the syntax may look quite natural to command line enthusiasts:

```JavaScript
with($hell){
    cd('div');
    cd('demo-snippet/iron-list');
    pwd;
}
```

If you right-click on an element in Chrome (or Edge outside any shadow dom), this puts the element into a variable $0 available from the console.  You can get then get the full path to the element thusly:

```JavaScript
$hell.getFullPath($0);
```

You can also set the context, bypassing any cd steps:

$hell.$0 = $0

## Instructions to load.

Open a web site, any site, just  open a site.

For example, you tube (https://youtube.com)

Open the dev tools, go to the console window and type:

import('https://cdn.jsdelivr.net/npm/xtal-shell/$hell.js')

Now you can inspect / navigate the site as described above.

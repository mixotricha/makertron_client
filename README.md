<h1>General Over View</h1>

The Makertron is a constructive solids engine that aims to fill the gap between traditional 'UI' driven cad tools and specification driven manufacturing environments. 

<h2>Makertron server</h2> 

The Makertron server supports its own internal geometry engine based on a brep representation. We have spent considerable time testing various alternate geometry engines and exploring the topology problems inherient in providing verifable water tight consistent meshes at scale and speed.

We have concluded that the <a href="https://www.opencascade.com/doc/occt-6.7.0/overview/html/occt_brep_format.html">BREP</a> representation 
provides just the right balance between speed and quality and is preferabble to the infinite precision solution provided by <a href="http://www.cgal.org/">CGAL</a>. 

One of the goals of the Makertron design philosphy is to have one clear clean rendering pipe line that produces consistent meshes all the way from the instanation of the BREP equations through to output to the requesting client.

This stands in contrast to OpenSCAD which features a plenthora of complex rendering tricks in order to try and manage the speed/quality challenge. 

The Makertron has been developed that we simply have not been able to find a solid platform for constructive geometry generation and we realize that others are also in the same boat :) 

<h2>Makertron Client</h2> 
 


 and a browser based client written in react using Three.js to front end generated geometry produced by the system. 
demonstration client is a browser based procedural parametric interface developed in react that provides access to the Makertron
servers constructive solid generation capabilites. 

<h2>Why Are We Developing This</h2>
As manufacturing workflows and processes look for tighter integration and specification driven design paths the notion of constructive solids design has again become worthy of serious consideration. Some excellent work has been towards achieving this goal but the balance between quality of mesh generation speed of generation and modualirsation has not yet been quite achieved. 

<h3>Desired Outcome</h3> 
The design goal is that with the Makertron client and server code you can develop  complex constructive geometry at ‘scale’ and at ‘speed’ in a formal language. This is a step towards specification driven cad design. 

It aims to improve on other existing constructive geometry tools such as OpenSCAD. 

As Makertron develops it will gain the ability to manage complex assembly and production tasks from the start of the design pipe lien all the way through to manufacturing. 



The Makertron engine supports a sophisticated transpiler that currently supports the default parse target of the <a href="http://www.openscad.org">OpenSCAD</a> language. 


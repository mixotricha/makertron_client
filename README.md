<h1>General Over View</h1>

The Makertron is a constructive solids engine that aims to fill the gap between traditional 'UI' driven cad tools and specification driven manufacturing environments. It features a decoupled philosophy where the constructive geometry server and the client are only loosely coupled. 

The constructive geometry server deals in stacks of geometrical operations and the client deals with the complex business of parsing and managing user interaction. 

This is in sharp contrast to the OpenSCAD project design where the interface and geometry engine are tightly coupled and issues of speed and scale are readily apparent. The Makertron aims to be OpenSCAD compatible while fixing some ambiguities in the OpenSCAD language itself and shifting the parsing of the language to what we deem to be a more 'solid' parsing core through the addition of a transpiler. 

The Makertron has been developed because we simply have not been able to find a solid platform for constructive geometry generation and we realize that others are also in the same boat :) 

<h2>Makertron Server</h2> 

The Makertron server supports its own internal geometry engine based on a brep representation. We have spent considerable time testing various alternate geometry engines and exploring the topology problems inherient in providing verifable water tight consistent meshes at scale and speed. 

We have concluded that the <a href="https://www.opencascade.com/doc/occt-6.7.0/overview/html/occt_brep_format.html">BREP</a> representation 
provides just the right balance between speed and quality and is preferabble to the infinite precision solution provided by <a href="http://www.cgal.org/">CGAL</a> 

One of the goals of the Makertron design philosphy is to have one clear clean rendering pipe line that produces consistent meshes all the way from the instanation of the BREP equations through to output to the requesting client while keeping the server and client loosely coupled.

This stands in contrast to OpenSCAD which features a plenthora of complex rendering tricks in order to try and manage the speed/quality challenge. It is our opinion that this effort has stalled and something new needed to be developed to push constructive geometry forwards. 

<h2>Makertron Client</h2> 

The Makertron Client is a demonstration interface written in react using Three.js to display generated geometry. One of the goals of the Makertron design philosophy was to 'decouple' the client interface from the geometry engine. 

The Makertron engine supports a sophisticated transpiler that currently supports the default parse target of the <a href="http://www.openscad.org">OpenSCAD</a> language. 

The demonstration client has been developed in react and uses three.js as the final geometry target. The Makertron architecture makes the following possible: 

<li>Clustering / Paralleisation of cosntructive geometry becomes possible</li> 
<li>Interaction with other parts of complex manufacturing pipeline becomes possible. Sensors. Databases. Physics systems.</li> 
<li>Addition / Custimisation of the client becomes possible. Specific interfaces for logistics manufacturing and assembly tasks can be developed.</li> 
<li>Procedural parametric interfaces that push back through UI elements can 'push' back to the target constructive geometry language</li>

<h3>What Are You Using It For?</h3>

As manufacturing workflows and processes look for tighter integration and specification driven design paths the notion of constructive solids design has again become worthy of serious consideration. Some excellent work has been towards achieving this goal but the balance between quality of mesh generation speed of generation and modualirsation has not yet been quite achieved. We have things in the real world we actually want to build. The computational Geometry problem is an annoying and frustrating obstruction in our way that we intend to solve. Rocket Engines. Bicycle Frames. Chess Pieces. Tobaggans. Pipe Flanges. All the things we want to build. 

<h3>Desired Outcome</h3> 

The design goal is that with the Makertron client and server code you can develop  complex constructive geometry at ‘scale’ and at ‘speed’ in a formal language. This is a step towards specification driven cad design. Because of the nature of this design multi core processing and paralleisation becomes possible. 

It aims to improve on other existing constructive geometry tools such as OpenSCAD. 

As Makertron develops it will gain the ability to manage complex assembly and production tasks from the start of the design pipe lien all the way through to manufacturing. This will include quality operations on geometry. Easy connecticity with the internet of things. All of the features that we should expect from any preformant 'modern' language. Because that is what the Makertron is. 

To qoute Keith Fenner, 'Git Er Done' ... :p 



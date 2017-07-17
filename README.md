
<h1>General Over View</h1>

The Makertron is a constructive solids engine that aims to fill the gap between traditional 'UI' driven cad tools and specification driven manufacturing environments. It features a decoupled philosophy where the constructive geometry server and the client are only loosely coupled. 

The constructive geometry server deals in stacks of geometrical operations and the client deals with the complex business of parsing and managing user interaction. 

This is in sharp contrast to the OpenSCAD project design where the interface and geometry engine are tightly coupled and issues of speed and scale are readily apparent. The Makertron aims to be OpenSCAD compatible while fixing some ambiguities in the OpenSCAD language itself and shifting the parsing of the language to what we deem to be a more 'solid' parsing core through the addition of a transpiler. 

The Makertron has been developed because we simply have not been able to find a solid platform for constructive geometry generation and we realize that others are also in the same boat :) 


<h2>Makertron Server</h2> 

The Makertron server supports its own internal geometry engine based on a brep representation. We have spent considerable time testing various alternate geometry engines and exploring the topology problems inherient in providing verifable water tight consistent meshes at scale and speed. 

We have concluded that the <a href="https://www.opencascade.com/doc/occt-6.7.0/overview/html/occt_brep_format.html">BREP</a> representation 
provides just the right balance between speed and quality and is preferabble to the infinite precision solution provided by <a href="http://www.cgal.org/">CGAL</a> 

One of the goals of the Makertron design philosphy is to have one clear clean rendering pipe line that produces consistent meshes all the way from the instanation of the BREP equations all the way through to the requesting client while keeping the server and client loosely coupled. You can run as many cores of the server as you want. Have as many different conversations with it as you want. Split your constructive geometry problems up how you want. 

This stands in contrast to OpenSCAD which features a plenthora of complex rendering tricks in order to try and manage the speed/quality challenge. The OpenSCAD parser while supporting an excellent though in some areas somewhat problematic CSG language is so glued to the interface and supporting code that it is hard for the language to evolve or move forwards. It is our opinion that this effort has stalled and something new needed to be developed to address these issues. A few good efforts are being made at this. 

<li>PLasM</li>
<li>ImplicitCAD</li>
<li>OpenJSCAD</li>
<li>TinkerCAD</li>

However none of them quite achieved what we needed. Though it is quite possible they may do so in the future.
 
<h2>Makertron Client</h2> 

The Makertron Client is a demonstration interface written in <a href="https://facebook.github.io/react/">ReactJS</a> using <a href="Three.js.org">Three.js</a> to display generated geometry. One of the goals of the Makertron design philosophy was to 'decouple' the client interface from the geometry engine leaving you free to build a platform that meets whatever specific specialised requirements you have. 

The Makertron engine supports a sophisticated transpiler that currently supports the default parse target of the <a href="http://www.openscad.org">OpenSCAD</a> language. At least 90% of the OpenSCAD language specification is now supported and we are in the robustnes and compatability testing phase. 

As stated above critical problems have been solved in all the core areas and we have satisfied ourselves that this was the right way to go. 

The demonstration client has been developed in react and uses three.js as the final geometry target. We are awaiting some new browser features that will improve the web based client considerably. 

The Makertron architecture makes the following possible: 

<li>Clustering / Paralleisation of cosntructive geometry.</li> 
<li>Interaction with other parts of complex manufacturing pipeline becomes possible. Sensors. Databases. Physics systems.</li> 
<li>Custimisation of the client becomes possible. Specific interfaces for logistics manufacturing and assembly tasks can be developed.</li> 
<li>Procedural parametric interfaces that push back through UI elements can 'push' back to the target constructive geometry language.</li>

<h2>What Are You Using It For?</h2>

We have things in the real world we actually want to build. The computational geometry problem is an annoying and frustrating obstruction in our way that we intend to solve so that we can move on to the business of building things for ourselves and others. Rocket Engines. Bicycle Frames. Chess Pieces. Tobaggans. Pipe Flanges. You name it. All the things we want to build. We need this tool! 

<i>If we had known how difficult it was and that no decent solutions existed we probably would have found something else to do with the past 5? years of our life.</i> 

<h2>Desired Outcome</h2> 

The design goal is that with the Makertron client and server code you can develop complex constructive geometry at ‘scale’ and at ‘speed’ in a formal language. This is a step towards specification driven cad design. Because of the nature of this design multi core processing and paralleisation becomes possible. 

As Makertron develops it will gain the ability to manage complex assembly and production tasks from the start of the design pipe lien all the way through to manufacturing. This will include quality operations on geometry. Easy connecticity with the internet of things. All of the features that we should expect from any preformant 'modern' language. Because that is what the Makertron is. 


<h2>How Do I Build It?</h2>
All of the core components are currently in docker images. 

This should give you a running server and client :

# To install the client 

1. git clone https://github.com/mixotricha/makertron_client/tree/master/makertron_5.0.0 
2. cd xxx/makertron_5.0.0/scripts 
3. 

	<editor> config.js
	Change "SERVER_ADDRESS" : "http://makertron.io" to point to your target server and "SERVER_PATH":"makertron.io/" to point to your target server + "/"
and change "PORT" : "3000" to point to the port on your target server. 

	*If you wish to just test the client you do not need to install the server or change the SERVER_ADDRESS,SERVER_PATH or PORT* 

3. sudo docker build -t client . 
4. sudo docker run -d --name client -p 80:80 client 

# To install the server 

1. 1. git clone https://github.com/mixotricha/makertron_client/tree/master/makertron_server
2. cd xxx/makertron_server_5.0.0 
3. sudo docker build -t server . 
4. sudo docker run -d --name server -p 3000:3000 server 

With both docker instances up and the config of the client set correctly you should now be able to access the server with the client. 

# Building the BREP binary 

More to come on this. Still writing the documentation for it. 

<h2>License</h2>
 Makertron is Free Software released under the <a href="http://www.gnu.org/licenses/gpl-2.0.html">General Public License version 2</a>. It in turn is based on other free software and it could not exist without the beautiful and brilliant contributions of others. Thank you for making so much possible. 

<li>OpenCascade<li>
<li>ReactJS</li>
<li>NodeJS</li> 


<h4>Lastly. To qoute Keith Fenner, 'Git Er Done' ... :p</h4>




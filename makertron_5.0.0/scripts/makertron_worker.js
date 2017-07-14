// ==========================================================
// MAKERTRON Procedural Cad System  
// Damien V Towning 
// 2016

// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL Damien Towning BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// 
// ==========================================================

var csgProcess = (function () {
  
	"use strict";

 /*global $,widgets,window,CSG,document,makertron*/
 /*jshint -W069 */
	
	
	importScripts('three/three.js');
	//importScripts('base64.js'); 
	//importScripts('binarystlwriter.js'); 
	//importScripts('blob_util.js'); 
	//importScripts('socket.io.js');
	importScripts('https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js')  
	importScripts('core/lodash.min.js') 
	//importScripts('async.js') 
	//importScripts('pako.min.js')

	 // Pull server address here because no dom for sessionKeys 
  importScripts("config.js"); 
  var SERVER_ADDRESS = CONFIG_DATA.SERVER_ADDRESS + ":" + CONFIG_DATA.PORT; 
	

	// ============================================================
	// Generate three cube 
	// ============================================================
	var cube = function() {
		var msh = new THREE.BoxGeometry( 10, 10, 10 );
		return new THREE.Mesh(msh,new THREE.MeshNormalMaterial());
	}

	var postResult = function(result) { 
			postLog("finished processing on server...") 
			postMessage({ type: 'result' , data: result })
	}

	var postLog = function(result) {
		postMessage( { type: 'log' , data: arguments[0] } )
	}

	var doNothing = function() {}

	var fetchStl = function(script) { 
			var socket = io(SERVER_ADDRESS)
			socket.emit( 'OPENSCAD',               {script:script} ) // send script
			socket.on  ( 'OPENSCADRES' ,           postResult      )  
			socket.on  ( 'OPENSCADLOG' ,           postLog         )  
			socket.on  ( 'ERR_CONNECTION_REFUSED', doNothing       ) 
	}

	// Output our scene to the renderer 
	onmessage = function(e) {
	  fetchStl(e['data'])  
	}
  
	return {
		onmessage: function(e) { 
			onmessage(e); 
		}
	};
 
}());

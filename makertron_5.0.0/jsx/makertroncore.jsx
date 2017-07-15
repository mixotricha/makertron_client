	// ===============================================================
	// Makertron Core 
	// ===============================================================

	'use strict'

	sessionStorage.server_address  = CONFIG_DATA.SERVER_ADDRESS + ":" + CONFIG_DATA.PORT
	sessionStorage.root_doc = CONFIG_DATA.SERVER_PATH
	
	var ee = new EventEmitter()

	import React from 'react'
	import ReactDOM from 'react-dom'	

	import { Cell , Grid , FABButton , Icon , IconButton , Button , Textfield , Slider} from 'react-mdl';	

	import SplitPane from 'react-split-pane' 

	import styles from '../resource/styles/style.js' 
	import shared from '../resource/styles/shared.js' 

	import ThreeComponent  from './three.jsx';  
	import EditorComponent from './editor.jsx'; 	
	import ConsoleComponent from './console.jsx'; 

	import 'react-mdl/extra/material.js';
	import 'react-mdl/extra/material.css';
	import '../resource/css/SplitPane.css';

	// --------------------------------------------------------
	// Generate a hashed string
	// --------------------------------------------------------
	var makeId = function() {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for( var i=0; i < 5; i++ )
		text += possible.charAt(Math.floor(Math.random() * possible.length));
		return text;
	};

	// ------------------------------------------------------
	// Handle user login and hook up editor if successful 
	// ------------------------------------------------------
	class Login extends React.Component	{
		constructor(props) {
    	super(props);
    	this.state = { username: '',password:'' };
  	}	
		onUsernameChange(event) {}
		onPasswordChange(event) {}
		error( err ) {} 
		rejected( data ) {}
		onLoginClick(event) {}
		onLogoutClick(event) {}
		onRegisterClick(event) {}
		componentWillMount() {}
		render() {
		  return (
				<div className="row">
					<div className="col-xs-5"><p>stuff</p></div>
					<div className="col-xs-2">
						<Textfield 
												style={styles.button} 
												label="" 
												id ="username" 
												type="text" 
												onChange={this.onUsernameChange} 
												placeholder="username"/>
						</div>
					<div className="col-xs-2">
						<Textfield 
												style={styles.button} 
												label="" id ="password" 
												type="password" 
												onChange={this.onPasswordChange} 
												placeholder="password"/>
						</div>
					<div className="col-xs-1"><button style={styles.button} type="button" id="login" onClick={this.onLoginClick}>Login</button></div>
					<div className="col-xs-1"><button style={styles.button} type="button" id="logout" onClick={this.onLogoutClick}>Logout</button></div>
					<div className="col-xs-1"><button style={styles.button} type="button" id="register" onClick={this.onRegisterClick}>Register</button></div>				
					</div>
    	);
  	}
	}
				

	// =========================================================
	// Tools 
	// =========================================================
	class Tools extends React.Component	{
		constructor(props) {
    	super(props);
    	this.state = {};
			this.editor_front = this.editor_front.bind(this);
			this.viewer_front = this.viewer_front.bind(this);	
  	}	
		componentWillMount() {}
		componentDidMount() { this.viewer_front() }

		editor_front(){	
			console.log("editor")

			//$("#editor").css('opacity'    , 0.8);
			//$("#widgets").css('opacity' , 0);
			//$("#console").css('opacity'   , 0);
			//$("#viewer").css('opacity'    ,  1);

			//$("#editor").css('z-index' ,  3)
			//$("#viewer").css('z-index' ,  2)
			//$("#console").css('z-index' , 1)
		}
		viewer_front(){
			console.log("viewer")
			//$("#editor").css('opacity' , 0)
			//$("#widgets").css('opacity', 0)
			//$("#console").css('opacity' ,0)
			//$("#viewer").css('opacity' , 1)
			//$("#viewer").css('z-index' , 3)
			//$("#editor").css('z-index' , 2)
			//$("#console").css('z-index' , 1)
		}
		widgets_front(){
			//console.log("widgets") 
			//$("#editor").css('opacity'  ,   0);
			//$("#widgets").css('opacity' , 0.8);
			//$("#console").css('opacity' ,   0);
			//$("#viewer" ).css('opacity' ,   1);
			//$("#widgets").css('z-index' ,   2);
		}

		console_front(){
			console.log("console") 
			$("#editor").css('opacity'  ,   0);
			$("#widgets").css('opacity' ,   0);
			$("#console").css('opacity' , 0.8);
			$("#viewer" ).css('opacity' ,   1);

			$("#console").css('z-index' , 3)
			$("#viewer").css('z-index'  , 2)
			$("#editor").css('z-index'  , 1)

		}

		render() {

			//<div className="col-xs-1"><button style={styles.button} type="button" id="Widgets" onClick={this.widgets_front}>Widgets</button></div>
		
    	return ( 
					<div className="row" >
						<div className="col-xs-1"><button style={styles.button} type="button" id="Edit" onClick={this.editor_front}>Edit</button></div>
						<div className="col-xs-1"><button style={styles.button} type="button" id="3D" onClick={this.viewer_front}>3D</button></div>
						<div className="col-xs-1"><button style={styles.button} type="button" id="Console" onClick={this.console_front}>Console</button></div> 
					</div>
    	);
  	}
	}

	
	// -----------------------------------------------
	// Will become ceanotype frame 
	//------------------------------------------------
			
	class Start extends React.Component {
		constructor(props) {
    	super(props);
    	this.state = { result: [] , log: "" , text: "" , component: false };
			this.updateScene = this.updateScene.bind(this);
			this.handleDrag = this.handleDrag.bind(this)	
  	}
 		updateScene(result,text) {
			var _this = this
			var myWorker = new Worker("scripts/makertron_worker.js?hash="+makeId()); 
			myWorker.postMessage( result );
			myWorker.onmessage = function(e) { 
				var data = e['data'] 
				if ( data['type'] === "result" ) {
					_this.setState({ result: data['data'] })
				}	
				if ( data['type'] === "log" ) _this.updateLog(data['data']+"\n")
			}			 
		}
		updateLog(string) { 
			var txt = this.state.log+=string
			this.setState({ log   : txt })
		}
		handleDrag(event) {
			this.setState({ component: true  })	  
		} 
		tools() { 
			return (<Tools patronus={this}/>)
		} 
		editor() { 
			return (<EditorComponent patronus={this} text={this.state.text}/>)
		}
		console() { 	 
			return (<ConsoleComponent patronus={this} data={this.state.log} />)		
		}
		viewer() { 	 
			return (<ThreeComponent patronus={this} data={this.state.result} />)		
		}
		componentWillMount() {
			console.log( "to here" ); 
			var _this = this 			
			if ( sessionStorage.text === undefined ) {
				$.get( "pipe.scad", function( data ) { 	
					_this.setState({text:data})
				});
			} 			 
		}
		componentDidMount() {}
  	componentWillUnmount() {
		}
		componentDidUpdate() {  
			console.log("Then it updated",this.state.text) 
			this.viewer()
			this.editor()  
			this.console() 
		}
  	render() {
    	return (
    		<div style={styles.whole_page}>
					<SplitPane split="vertical"  primary="first" defaultSize={$(window).width()-600}>
      	  	<div>{this.viewer()}</div>
      	  	<SplitPane split="horizontal" onDragFinished={this.handleDrag} primary="first" defaultSize={300}>
      	      <div>{this.editor()}</div>
      	      <div>{this.console()}c</div>
      	  	</SplitPane>
    			</SplitPane> 	 
				</div>
    	);
  	}
	}

	ReactDOM.render( <Start/>, document.getElementById('root') );


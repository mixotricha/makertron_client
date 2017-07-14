	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Editor module 
	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	'use strict'

	import React from 'react';
	import ReactDOM from 'react-dom';
	import { Cell , Grid , FABButton , Icon , IconButton , Button , Textfield , Slider,DataTable , TableHeader} from 'react-mdl';

	import styles from './style.js' 
	import shared from './shared.js' 
	import Parser from './parser.js' 

	import brace from 'brace' 
	import AceEditor from 'react-ace'
	import 'brace/mode/text'
	import 'brace/theme/eclipse'

	// --------------------------------------------------------
	// Fetch project data from server and load up editor 
	// --------------------------------------------------------

	module.exports =  class EditorComponent extends React.Component {
		constructor(props) {
    	super(props);
    	this.state = {text:""};
			this.refreshData = this.refreshData.bind(this);
  	}
		sendMessage(result) { this.props.patronus.updateScene(result)	  } 
		textArea() { 
			return <TextWidget  patronus={this}/>
		}
		refreshData() {	
			var parser = new Parser(this.props.patronus) 
			parser.load("module foo(){"+sessionStorage.text+"}")  
			if ( parser.start() === false ) { 
				this.sendMessage(false)
			}
		  else { 
				var result = parser.dump()
				this.sendMessage(result)	 
			}
		}
		componentDidUpdate() {
		}
		componentWillMount() {	
		}
		render() {
			if ( sessionStorage.text === undefined ) {
				$.get( "pipe.scad", function( data ) { sessionStorage.text=data });
			 console.log("yup") 
			} 
    	return (
				<div style={{height:'100%',width:'100%',position:'absolute'}}>
					<button style={styles.button} type="button" id="update" onClick={this.refreshData}>Update</button>
    			<div >{this.textArea()}</div>
				</div>
    	);
  	}
	}

	// -------------------------------------------------
	// Wrapper for react ace editor component 
	// -------------------------------------------------
	class TextWidget extends React.Component {	
		constructor(props) {
    	super(props);
    	this.state = { text: "" };
			this.onChange = this.onChange.bind(this);
			this.onFocusLeave = this.onFocusLeave.bind(this);
			this.onEnter = this.onEnter.bind(this);
  	}	
		onFocusLeave(event) {	// updata data
			console.log("We are leaving here!") 
		}
		onEnter(event) {	// updata data
			console.log("We are in here") 
		}
		onChange(text) {
			this.state.text = text;  
			sessionStorage.text = text
		}
		componentDidUpdate() { 
			//$("#texteditor").resize()
		}
		render() {
    	return (
				
				<AceEditor  
									key={shared.makeId()}
									id="texteditor"
    							setOptions={{vScrollBarAlwaysVisible:true}}
									value={sessionStorage.text}
									onChange={this.onChange}
									editorProps={{$blockScrolling:Infinity}}
									style={{height:'80%',position:'absolute',opacity:'0.5'}}
									mode="text"
        					theme="eclipse"
 							/>
				
    	);
  	}
	}




	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Editor module 
	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	'use strict'

	import React from 'react';
	import ReactDOM from 'react-dom';
	import { Cell , Grid , FABButton , Icon , IconButton , Button , Textfield , Slider,DataTable , TableHeader} from 'react-mdl';

	import styles from '../resource/styles/style.js' 
	import shared from '../resource/styles/shared.js' 

	import brace from 'brace' 
	import AceEditor from 'react-ace'
	import 'brace/mode/text'
	import 'brace/theme/eclipse'

	// --------------------------------------------------------
	// Fetch project data from server and load up editor 
	// --------------------------------------------------------
	module.exports =  class ConsoleComponent extends React.Component {
    	
		constructor(props) {
    	super(props);
    	this.state = {};
			this.refreshData = this.refreshData.bind(this);
  	}
		refreshData() {		 
		}
		componentWillMount() { 
		}
	
			render() {
    	return (
			<div>
					<div id="output" style={styles.scroller} ></div>
						<TextWidget  patronus={this} data={this.props.data}/>
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
									id="consolearea"
    							setOptions={{vScrollBarAlwaysVisible:true}}
									value={this.props.data}
									onChange={this.onChange}
									editorProps={{$blockScrolling:Infinity}}
									style={{height:'80%',position:'absolute',opacity:'0.5'}}
 									mode="text"
        					theme="eclipse"
 							/>
				
    	);
  	}
	}

	

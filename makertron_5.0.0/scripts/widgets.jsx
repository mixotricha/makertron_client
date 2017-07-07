	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	// Widgets module 
	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	'use strict'

	import React from 'react';
	import ReactDOM from 'react-dom';

	import { Cell , Grid , FABButton , Icon , IconButton , Button , Textfield , Slider} from 'react-mdl';
	import { SketchPicker } from 'react-color';

	import 'react-mdl/extra/material.js';
	import 'react-mdl/extra/material.css';
	//import 'react-mdl/extra/test.css';

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

	// Color picker Widget
	var ColorPicker = React.createClass({
		getInitialState: function() {
		  return { background: '#ff0000'};
		},
		handleChangeComplete(color) {
		  this.setState({ background: color.hex });
		},	
		componentWillMount() { 
		},
		componentDidMount() {
		},
		render() {
		  return ( 
				<div>
				 <SketchPicker
		      color={ this.state.background }
		      onChangeComplete={ this.handleChangeComplete }
		    />
				</div>
			);
		}	
	});	

	// ========================================================
	// Number Picker Widget 
	// ========================================================
	var NumberPicker = React.createClass({
		getInitialState: function() {
		  return {value:'0'};
		},
		fieldChanged(e) { 
			this.setState({value: e.target.value })
			this.props.patronus.updateField( "NumberPicker" , this.props.hash , e.target.value ) 
		},
		increment() { 
			var v = parseFloat(this.state.value)+1 
			var max = parseFloat(this.props.max) 
			if ( v <= max ) { 
				this.setState({value: v }) 
				this.props.patronus.updateField( "NumberPicker" , this.props.hash , v) 
			} 
		},
		decrement() { 
			var v = parseFloat(this.state.value)-1 
			var min = parseFloat(this.props.min) 
			if ( v >= min ) { 
				this.setState({value: v })
				this.props.patronus.updateField( "NumberPicker" , this.props.hash , v)
			} 
		},
		componentWillMount() { 
			this.setState({value: this.props.defaultValue })
		},
		render() {
		  return ( 
				<Grid noSpacing noPadding className="demo-grid-1" style={{'backgroundColor':'#FF0000'}}>
        	<Cell col={1} style={{'backgroundColor':'#FF00FF'}}><Button onMouseOver={this.test} onClick={this.decrement} mini>-</Button></Cell>
        	<Cell col={1} style={{'backgroundColor':'#0000FF'}}>
						<Textfield
							onChange={this.fieldChanged}
 					  	label="0"
							value={this.state.value}
						/>
					</Cell>
        	<Cell col={10} style={{'backgroundColor':'#00FF00'}}><Button onFocus={this.test} onClick={this.increment} mini>+</Button></Cell>
    		</Grid>
			);
		}	
	});	

	// =========================================================
	// RangeSlider widget 
	// =========================================================
	var RangeSlider = React.createClass({
		getInitialState: function() {
    	return {};
  	},	
		componentWillMount() { 
			// if min , max , value does not exist error 
		},
		componentDidMount() {
		},
		update(e) { 
			this.props.patronus.updateField( "RangeSlider" , this.props.hash , e.target.value) 
		},
		render() {
    	return ( 
				<div style={{width: '200px'}}>
					<div>{this.props.name}</div>
					<div>{this.props.min}</div>
						<Slider 
										min={parseFloat(this.props.min)} 
										max={parseFloat(this.props.max)} 
										defaultValue={parseFloat(this.props.default)} 
										onChange={this.update}
									/>
					<div>{this.props.max}</div>
				</div>
			);
		}	
	});	
	
	// =========================================================
	// Bezier widget 
	// =========================================================
	var Bezier = React.createClass({
		getInitialState: function() {
    	return {};
  	},	
		setBezier(name,default_path,init) { 
			// Getting control handles
			if ( init === true ) { 
				var x1 = default_path[0]; $("#"+name+"_1").css('left', x1);
				var y1 = default_path[1]; $("#"+name+"_1").css('top' , y1);	
				var x2 = default_path[2]; $("#"+name+"_2").css('left', x2);	
				var y2 = default_path[3]; $("#"+name+"_2").css('top' , y2);
				var x3 = default_path[4]; $("#"+name+"_3").css('left', x3);
				var y3 = default_path[5]; $("#"+name+"_3").css('top',  y3);				
				var x4 = default_path[6]; $("#"+name+"_4").css('left', x4);
				var y4 = default_path[7]; $("#"+name+"_4").css('top',  y4);				
			}
			else { 	
				var x1 = $("#"+name+"_1").position().left;		
				var y1 = $("#"+name+"_1").position().top;				
				var x2 = $("#"+name+"_2").position().left;		
				var y2 = $("#"+name+"_2").position().top;		
				var x3 = $("#"+name+"_3").position().left;		
				var y3 = $("#"+name+"_3").position().top;		
				var x4 = $("#"+name+"_4").position().left;		
				var y4 = $("#"+name+"_4").position().top;		
			}
			if ( default_path.length === 0 ) { 
				// Setting these control handles to new default 
				this.props.patronus.updateField( "Bezier" , this.props.hash , [ x1 , y1 , x2 , y2 , x3 , y3 , x4 , y4 ] ); 
			}
			//Generating curve		
			var curve = new THREE.CubicBezierCurve(
				new THREE.Vector2( x1, y1 ),
				new THREE.Vector2( x2, y2 ),
				new THREE.Vector2( x3, y3 ),
				new THREE.Vector2( x4, y4 )
			);
			var path = new THREE.Path( curve.getPoints(10) );
			var geometry = path.createPointsGeometry(10);
			var ax , ay , old_x , old_y; 
			var vert_length = geometry.vertices.length-1; 
			old_x = geometry.vertices[0].x; 
			old_y = geometry.vertices[0].y; 
			
			if ( $("#canvas_"+name).length !== 0 ) { 			
				var c = document.getElementById("canvas_" + name);				 
				var ctx = c.getContext("2d");				
				ctx.clearRect(0, 0, 200 , 200 );
				ctx.beginPath();		
				for ( var i = 1; i < vert_length; i++ ) { 
					ax = geometry.vertices[i].x; 
					ay = geometry.vertices[i].y; 
					ctx.moveTo( Math.round(old_x)+5 , Math.round(old_y)+5 ); // offset by 5 so line up with center of handles 
					ctx.lineTo( Math.round(ax)+5 , Math.round(ay)+5 ); 
					old_x = ax; old_y = ay; 
				}
				ctx.stroke();		
				// Drawing the control handles 
				ctx.beginPath();		
				ctx.strokeStyle = "#999";		
				ctx.lineWidth = 1;		
				ctx.moveTo(x1+5,y1+5);		
				ctx.lineTo(x2+5,y2+5);		
				ctx.stroke();		
				ctx.beginPath();		
				ctx.strokeStyle = "#999";		
				ctx.lineWidth = 1;		
				ctx.moveTo(x3+5,y3+5); 		
				ctx.lineTo(x4+5,y4+5);		
				ctx.stroke(); 
			}
		
		},
		componentDidMount() {
				var _this = this 
				if ( _this.props.init === true ) { _this.setBezier(_this.props.name,_this.props.default_path,true); } 
				$( "#"+_this.props.name+"_1" ).draggable( 
						{ drag: function() {  
							_this.setBezier(_this.props.name,[],false); 
						} , 
						containment: "parent" , 
						cursor: "crosshair",  
						cursorAt: { top: 0, left: 0 } 
				}); 
				$( "#"+_this.props.name+"_2" ).draggable( 
						{ drag: function() {  
							_this.setBezier(_this.props.name,[],false); 
						} , 
						containment: "parent" , 
						cursor: "crosshair",  
						cursorAt: { top: 0, left: 0 } 
				}); 
				$( "#"+_this.props.name+"_3" ).draggable( 
						{ drag: function() {  
							_this.setBezier(_this.props.name,[],false); 
						} , 
						containment: "parent" , 
						cursor: "crosshair",  
						cursorAt: { top: 0, left: 0 } 
				}); 
				$( "#"+_this.props.name+"_4" ).draggable( 
						{ drag: function() {  
							_this.setBezier(_this.props.name,[],false); 
						} , 
						containment: "parent" , 
						cursor: "crosshair",  
						cursorAt: { top: 0, left: 0 } 
				}); 
		},
		componentWillMount() { 
			// if name , default_path wrong error 
		},
		render() {
    	return ( 
				<div style={{'width':'200px', 'height':'200px','position':'relative','border':'5px solid red'}}>
					<canvas id={'canvas_'+this.props.name} width="200" height="200" style={{'position':'absolute'}}></canvas>
					<div style={{'width':'10px','height':'10px','position':'absolute'}} id={this.props.name+'_1'}>
						<img style={{'display':'block', 'margin': '0 auto' , 'draggable':true }} src="resource/imgs/circle_1.jpg"/>
					</div>
					<div style={{'width':'10px','height':'10px','position':'absolute'}} id={this.props.name+'_2'} >
						<img style={{'display':'block', 'margin': '0 auto' , 'draggable':true }} src="resource/imgs/circle_2.jpg"/>
					</div>
					<div style={{'width':'10px','height':'10px','position':'absolute'}} id={this.props.name+'_3'} >
						<img style={{'display':'block', 'margin': '0 auto' , 'draggable':true }} src="resource/imgs/circle_3.jpg"/>
					</div>
					<div style={{'width':'10px','height':'10px','position':'absolute'}} id={this.props.name+'_4'}>
						<img style={{'display':'block', 'margin': '0 auto' , 'draggable':true }} src="resource/imgs/circle_4.jpg"/>
					</div>
				</div>
			);
		}		
	});

	// -------------------------------------------------------
	// Panel widgets
	// -------------------------------------------------------
	module.exports = React.createClass({
		getInitialState: function() {
    	return {data:''};
  	},	
		updateField( type , hash , value) { 
			this.props.patronus.updateData( type , hash , value ) 
		}, 
		build_widgets(collection) { 
			var i = 0; 
			var rows = []
			var collection_length = collection.length; 
			for ( i = 0; i < collection_length; i++ ) { 
				var operation = collection[i].operation.split("|");
				if ( operation[0] === 'range' ) { 
					// should have a length of four else error
					rows.push(<RangeSlider 
																	key={collection[i].hash}			
																	hash={collection[i].hash}
																	patronus={this} 
																	name={'slider_'+collection[i].value} 
																	min={operation[1]} 
																	max={operation[2]} 
																	default={operation[3]} />) 		
				}					
				if ( operation[0] === 'spinner' ) { 
					// should have a length of four else error
					rows.push(<NumberPicker 
																	key={collection[i].hash}
																	hash={collection[i].hash}
																	patronus={this} 
																	name={'spinner_'+collection[i].value} 
																	step={1} 
																	min={operation[1]} 
																	max={operation[2]} 
																	defaultValue={operation[3]} />)	
				
				}	
				if ( operation[0] === 'bezier' ) { 
					// should have a length of four else error 
					rows.push( <Bezier  
															key={collection[i].hash}
															hash={collection[i].hash}
															patronus={this} 
															name={collection[i].value} 
															default_path={JSON.parse(operation[1])} 
															init={true} />)
				}	

			}
			
			return rows
		},
		componentWillMount() {
			//var _this = this
			var i = 0 
			var keys = []
			var pages = [] 
			var panel_rows = [] 
			this.props.data[1].forEach(function(jsn){
				jsn.object.forEach(function(obj){
					if ( obj.type === "set" ) panel_rows.push( obj ) // build up set list 					
				}); 				
			});				 	
			panel_rows = _.map(_.sortBy(panel_rows,'panel'))
			var obj_length = panel_rows.length
			for ( i = 0; i < obj_length; i++ ) { 
				keys.push( panel_rows[i].panel ) 
			} 
			keys = _.sortedUniq(keys); // remove duplicates from panel list  
			var keys_length = keys.length
			for ( i = 0; i < keys_length; i++ ) {  
	 			var value = keys[i] 
				var collection = _.filter(panel_rows, this.value , function(o,value) { return o.panel===value; } ); // all widgets who belong to specific panel 				
				pages.push( 
										<div key={makeId()}>
											<div>{value}</div>
											<div>{this.build_widgets(collection)}</div>
										</div>
									)
			}
			this.setState({page: pages});
		},
		render() {
    	return ( 
				
  					<div>{this.state.page}</div>
			);
		}	
	});	


import React, { Component } from 'react';
import './App.css';
import ReactFileReader from 'react-file-reader';
import LineChart from 'react-linechart';
import '../node_modules/react-linechart/dist/styles.css';

class App extends Component {
	constructor(props){
		super(props);
		this.state={
			data:"",
		}
	}
	handleFiles = files => {
		var reader = new FileReader();
		reader.readAsText(files[0]);
		reader.onload = ()=>{this.setState({ data: reader.result })};
	}


	render() {
		var csvData=this.state.data;
		if(csvData.length===0)
		{
			csvData="2,2\n3,3\n4,4\n5,6\n10,4\n20,5\n";
		}
		console.log(csvData);
		var arr=[];
		arr = csvData.split('\n');
		var graphArray = [];
		var avg=0;
		for (var i = 0; i < arr.length-1; i++) {
			var str = arr[i];
			var res=str.split(",");
			graphArray.push({x: parseInt(res[0],10),y: parseInt(res[1],10)});
			avg=avg+parseInt(res[1],10);
		}
		const graphData = [
			{
				color: "steelblue",
				points: graphArray,

			}
		];
		var a1c= ((2.59 + (avg/arr.length)) / 1.59);
		a1c=a1c.toFixed(2);
		return (
			<div className="App">
			<div className="App-header">
			<h2>Diabetes Graphing Test</h2>
			</div>
			<br/>
			Please upload your CSV for your own results
			<br/>
			<br/>
			<ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
			<button className='btn'>Upload</button>
			</ReactFileReader>
			{csvData.length > 0 &&
				<div className="csvData">
				Projected A1C:<br/>
				{a1c}%
				</div>

			}
			{csvData.length > 0 &&
				<div>
				<h1>Blood Glucose Chart</h1>
				<LineChart
				width={600}
				height={400}
				xLabel="Date"
				yLabel="mmol/L"
				data={graphData}/>
				</div>
			}

			</div>
		);
	}
}

export default App;

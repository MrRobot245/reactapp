import React,{ Component} from 'react';
import './App.css';
import ReactFileReader from 'react-file-reader';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import "../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,LineChart,Line, Legend } from 'recharts';
import PropTypes from 'prop-types'; // ES6
var createReactClass = require('create-react-class');
const CustomTooltip  = createReactClass({
	propTypes: {
		type: PropTypes.string,
		payload: PropTypes.array,
		label: PropTypes.number,
	},
	render() {
		const { active } = this.props;
		if (active) {
			const { payload,label } = this.props;
			console.log(payload[0].value);
			return (

				<div className="custom-tooltip">
					<p className="intro">{payload[0].value} mmol/L</p>
					<p className="intro">Date: {label}</p>
				</div>
			);
		}

		return null;
	}
});
class App extends Component {
	constructor(props){
		super(props);
		this.state={
			data:"",
			cho:0,
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleFiles = files => {
		var reader = new FileReader();
		reader.readAsText(files[0]);
		reader.onload = ()=>{this.setState({ data: reader.result })};
	}
	handleChange(event) {
		this.setState({cho: event.target.value});
	}
	handleSubmit(event) {
		console.log('Submitted: ' + this.state.cho);
		event.preventDefault();
	}
	render() {
		var csvData=this.state.data;
		if(csvData.length===0)
		{
			csvData="2,2\n3,3\n4,4\n5,6\n10,4\n20,5\n22,6\n24,8\n25,5\n";
		}
		// console.log(csvData);
		var arr=[];
		arr = csvData.split('\n');
		var graphArray = [];
		var avg=0;
		var products = [{}];


		for (var i = 0; i < arr.length-1; i++) {
			var str = arr[i];
			var res=str.split(",");
			graphArray.push({x: parseInt(res[0],10),y: parseInt(res[1],10)});
			products.push({index: i, x: parseInt(res[0],10),y: parseInt(res[1],10)});
			avg=avg+parseInt(res[1],10);
		}

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
				<br/>
				Please enter your CHO:
				<br/>
				<form onSubmit={this.handleSubmit}>
					<label>
						<input type="text" onChange={this.handleChange} />
					</label>
					<input type="submit" value="Submit" />
				</form>
				<br/>
				{csvData.length > 0 &&
					<div className="csvData">
						Projected A1C:<br/>
					{a1c}%
				</div>


			}
			{csvData.length > 0 &&

				<div className="mainContent">
					<div className="row">
						<div className="col-sm-12 col-md-12 graphContent">
							<h1>Blood Glucose Chart</h1>
							<ResponsiveContainer height={300} width='100%'>
								<LineChart data={graphArray}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="x" padding={{left: 30, right: 30}} />
									<YAxis padding={{top: 30}}/>
									<Tooltip content={<CustomTooltip/>}/>
									<Line type="monotone" dataKey="y" stroke="#CC0000" activeDot={{r: 8}}/>
									<Legend
										payload={
											[
												{ id: 'y', value: 'mmol/L', type: 'line', color: '#CC0000'}
											]
										}  layout="horizontal" verticalAlign="bottom" align="center"
										/>
								</LineChart>
							</ResponsiveContainer>

						</div>
						<div className="col-sm-12 col-md-6 col-md-offset-3">
							<br/>
							<br/>
							<BootstrapTable data={ products } striped={true} hover={true}>
								<TableHeaderColumn dataField='x' isKey ={true} >Day</TableHeaderColumn>
								<TableHeaderColumn dataField='y'>Sugar</TableHeaderColumn>
							</BootstrapTable>
						</div>
					</div>
				</div>
			}

		</div>
	);
}
}

export default App;

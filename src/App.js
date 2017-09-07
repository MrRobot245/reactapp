import React,{ Component} from 'react';
import './App.css';
import ReactFileReader from 'react-file-reader';
import "../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,LineChart,Line, Legend } from 'recharts';
import PropTypes from 'prop-types'; // ES6
import moment from 'moment';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';


var createReactClass = require('create-react-class');
const CustomTooltip  = createReactClass({
	propTypes: {
		type: PropTypes.string,
		payload: PropTypes.array,
		label: PropTypes.string,
	},
	render() {
		const { active } = this.props;
		if (active) {
			const { payload,label } = this.props;
			return (
				<div className="custom-tooltip">
					<p className="intro">{payload[0].value} mmol/L</p>

				</div>
			);
		}

		return null;
	}
});

const CustomizedActiveDot=createReactClass({render(){const{cx,cy,value}=this.props;if(value<4){return(<svg x={cx-5}y={cy-5}width={10}height={10}fill="red" viewBox="0 0 1024 1024"><path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z"/></svg>)}
if(value>7){return(<svg x={cx-5}y={cy-5}width={10}height={10}fill="red" viewBox="0 0 1024 1024"><path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z"/></svg>)}
return(<svg x={cx-5}y={cy-5}width={10}height={10}fill="green" viewBox="0 0 1024 1024"><path d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z"/></svg>)}});const CustomizedDot=createReactClass({render(){const{cx,cy,value}=this.props;if(value<4){return(<svg x={cx-2.5}y={cy-2.5}width={5}height={5}fill="red" viewBox="0 0 1024 1024"><path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z"/></svg>)}
if(value>7){return(<svg x={cx-2.5}y={cy-2.5}width={5}height={5}fill="red" viewBox="0 0 1024 1024"><path d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z"/></svg>)}
return(<svg x={cx-2.5}y={cy-2.5}width={5}height={5}fill="green" viewBox="0 0 1024 1024"><path d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z"/></svg>)}})


class App extends Component {


	constructor(props){
		super(props);
		this.state={
			data:"",
			loading:false,
			cho:0,
			importName:"",
			startDate:moment("01/01/1999","DD/MM/YYYY"),
			endDate:moment("01/01/2100","DD/MM/YYYY"),
			days:0,
			testCount:0,
			totalInsulin:0,
			totalCarb:0,
			corF:0,
			avg:0,
			a1c:0,
			graphArray:[],
		};
		this.handleChangeStart = this.handleChangeStart.bind(this);
		this.handleChangeEnd = this.handleChangeEnd.bind(this);

	}
	handleChangeStart(date) {
		this.setState({
			startDate: date
		});
	}
	handleChangeEnd(date) {
		this.setState({
			endDate: date
		});

		console.log(this.state.graphArray);
	}

	handleFiles = files => {
		var reader = new FileReader();
		var input="";
		reader.readAsText(files[0]);
		reader.onload = ()=>{input=reader.result;
			this.setState({ data: reader.result });
			this.setState({ loading:true });
			var arr=[];
			arr = input.split('\n');
			var avg=0;
			var graphArray = [];
			var testCount=0;
			var totalInsulin=0;
			var importName="";
			var importStartDate="";
			var importEndDate="";

			var corF=0.0;
			var totalCarb=0.0;

			for(var pre=0; pre < 11 ; pre++)
			{
				var preStr = arr[pre];
				var preRes=preStr.split(",");
				if(pre===2)
				importName=preRes[1];
				this.setState({
					importName:importName,
				});

				if(pre===3)
				{
					importStartDate=preRes[1];
					var realStartDate= moment(importStartDate,"DD/MM/YYYY");
					var startObject= realStartDate.format("MMM Do YYYY");

					importEndDate=preRes[3];
					var realEndDate= moment(importEndDate,"DD/MM/YYYY");
					var endObject= realEndDate.format("MMM Do YYYY");
					var days = realEndDate.diff(realStartDate, 'days');
					this.setState({
						startDate:realStartDate,
						endDate: realEndDate,
						days:days,
						endObject:endObject,
						startObject:startObject,
					});

				}
			}

			for (var i = 0; i < arr.length-1; i++) {
				var str = arr[i];
				var res=str.split(",");
				if(!isNaN(parseFloat(res[32],10))){
					totalInsulin=totalInsulin+parseFloat(res[32],10);
				}
				if(!isNaN(parseFloat(res[23],10)))
				{
					totalCarb=totalCarb+ parseFloat(res[23],10);
					this.setState({
						totalCarb:totalCarb,
					});
				}
				if(!isNaN(parseFloat(res[22],10)))
				{
					corF=parseFloat(res[22],10);
					this.setState({
						corF:corF,
					});
				}
				if(!isNaN(parseFloat(res[5],10)))
				{
					var graphDate= moment(res[1],"DD/MM/YYYY");
					var graphObject= graphDate.format("MMM Do YYYY");
					graphArray.push({date: graphObject,y: parseFloat(res[5],10)});
					testCount++;
					avg=avg+parseFloat(res[5],10);
					this.setState({
						avg:avg,
						testCount:testCount,
					});
					i++;
				}

			}

			var a1c= ((2.59 + (avg/testCount)) / 1.59);
			a1c=a1c.toFixed(2);
			totalInsulin=totalInsulin.toFixed(2);
			this.setState({
				a1c:a1c,
				totalInsulin:totalInsulin,
				graphArray:graphArray,

			});
				this.setState({ loading:false });
		};

	}

	render() {
		var csvData=this.state.data;
		return (
			<div className="App">
				<div className="App-header">
					<h2>Diabetes Graphing Example</h2>
				</div>
				<br/>
				Please upload your CSV for your results
				<br/>
				<br/>
				<ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
					<button className='btn'>Upload</button>
				</ReactFileReader>
				<br/>
				<a href="/csvExample.csv" download> Download Link to Example Data</a>
				<br/>
				{csvData.length > 0 &&
					<div className="csvData">
						<DatePicker
							selected={this.state.startDate}
							selectsStart
							startDate={this.state.startDate}
							endDate={this.state.endDate}
							onChange={this.handleChangeStart}
							/>

						<DatePicker
							selected={this.state.endDate}
							selectsEnd
							startDate={this.state.startDate}
							endDate={this.state.endDate}
							onChange={this.handleChangeEnd}
							/>

							Name: {this.state.importName}<br/>
							Projected A1C: {this.state.a1c}%<br/><br/>


							Correction Factor: {this.state.corF}<br/>
							Days Measured: {this.state.days}<br/>

							Blood Sugar Tests: {this.state.testCount}<br/>
							Average Tests Per Day: {(this.state.testCount/this.state.days).toFixed(0)}<br/>
							Total Carbs: {this.state.totalCarb}<br/>
							Average Carbs: {(this.state.totalCarb/this.state.days).toFixed(2)}<br/>

							Insulin Given: {this.state.totalInsulin} Units<br/>
							Average Insulin Per Day: {(this.state.totalInsulin/this.state.days).toFixed(2)} Units <br/>

						</div>


					}
					{csvData.length > 0 &&

							<div className="mainContent">
								<div className="row">
									<div className="col-sm-12 col-md-12 graphContent">
										<h1>Blood Glucose Chart</h1>
										<ResponsiveContainer height={300} width='100%'>
											<LineChart data={this.state.graphArray}>
												<CartesianGrid strokeDasharray="3 3" />
												<XAxis dataKey="date" padding={{left: 30, right: 30}} />
												<YAxis padding={{top: 30}}/>
												<Tooltip content={<CustomTooltip/>}/>
												<Line type="monotone" dataKey="y" stroke="#CC0000" dot={<CustomizedDot />} activeDot={<CustomizedActiveDot />} />
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
								</div>
							</div>
						}

					</div>
				);
			}
		}

		export default App;

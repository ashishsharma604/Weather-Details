import React, { Component } from "react";
import { Line } from "react-chartjs-2";


export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      data: []
    };
  }
  componentDidMount() {
   fetch(
       `http://api.openweathermap.org/data/2.5/forecast?q=Pune&appid=7f19fa18be9313ee23fbf1ee29da7201`
   )
      .then(res => res.json())
      .then(
        (res)=>{
        const x = res.list;
        let chartData = [];
        x.forEach(element => {
          chartData.push({
            labels: element.dt_txt,
            datasets: [{ data: element.main.temp}]
          });
        });
        this.setState({ chartData });
      });
  }

  render() {
    return (
      <div className="chart">
        {this.state.chartData.map((n, index) => {
          return <Line key={index} data={n} />;
        })}
      </div>
    );
  }
}
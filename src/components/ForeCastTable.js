import React, { Component, useState } from "react";
import {
Input,
FormGroup,
Label
} from "reactstrap";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import City from './City'

class ForeCastTable extends React.Component {
    constructor(props) {
        super(props);
      }
      state = {
        forecastUpdatedData: null,
      };

      componentDidMount = () => {
          fetch(
              `http://api.openweathermap.org/data/2.5/forecast?q=Pune&appid=7f19fa18be9313ee23fbf1ee29da7201`
          ).then((data) => {
            data.json().then((forecastData) => {
                this.setState({
                    forecastUpdatedData : forecastData
                })
                
            })
        })
      }
      render() {
      
    let forecast_table_pagination = null;
    if(this.state.forecastUpdatedData !== null) {
        const columns = [
            {
              Header: "Temperature",
              accessor: "main.temp",
              filterable: true,
              rowClassName: "table-style",
              sortable: true,
              headerStyle: {
                fontSize: "16px",
              },
              getProps: (state, rowInfo, column) => {
                return {
                  style: {},
                };
              },
              Filter: ({ filter, onChange }) => (
                <div>
                  <i
                    class="fa fa-search"
                    style={{ background: "", color: "black", fontSize: "20px" }}
                    aria-hidden="true"
                  ></i>
                  <input
                    onChange={(event) => onChange(event.target.value)}
                    value={filter ? filter.value : ""}
                    placeholder={"Filter By Temperature"}
                    style={{
                      width: "100%",
                      fontSize: "bold",
                    }}
                  ></input>
                </div>
              ),
              style: {
                textAlign: "center",
                fontSize: "13px",
                cursor: "pointer",
              },
            },
            {
              Header: "Maximum Temperature",
              id: "temp_max",
              filterable: false,
              accessor: "main.temp_max",
              headerStyle: {
                fontSize: "16px",
              },
              getProps: (state, rowInfo, column) => {
                return {
                  style: {},
                };
              },
              style: {
                textAlign: "center",
                fontSize: "13px",
                cursor: "pointer",
              },
            },
            {
              Header: "Minimum Temperature",
              accessor: "main.temp_min",
              filterable: false,
              headerStyle: {
                fontSize: "16px",
              },
              getProps: (state, rowInfo, column) => {
                return {
                  style: {},
                };
              },
              style: {
                textAlign: "center",
                fontSize: "13px",
                cursor: "pointer",
              },
            },
            {
              Header: "Pressure",
              filterable: false,
              accessor: "main.pressure",
              headerStyle: {
                fontSize: "16px",
              },
              getProps: (state, rowInfo, column) => {
                return {
                  style: {},
                };
              },
              style: {
                textAlign: "center",
                fontSize: "13px",
                cursor: "pointer",
              },
            },
            {
                Header: "Humidity",
                filterable: false,
                accessor: "main.humidity",
                headerStyle: {
                  fontSize: "16px",
                },
                getProps: (state, rowInfo, column) => {
                  return {
                    style: {},
                  };
                },
                style: {
                  textAlign: "center",
                  fontSize: "13px",
                  cursor: "pointer",
                },
              },
              {
                Header: "Date",
                filterable: false,
                accessor: "dt_txt",
                headerStyle: {
                  fontSize: "16px",
                },
                getProps: (state, rowInfo, column) => {
                  return {
                    style: {},
                  };
                },
                style: {
                  textAlign: "center",
                  fontSize: "13px",
                  cursor: "pointer",
                },
              },
          ];

          forecast_table_pagination = <ReactTable
   
          className="-striped -highlight"
          data={this.state.forecastUpdatedData.list}
          filterable
          columns={columns}
          defaultPageSize={4}
          showPaginationTop="true"
          showPaginationBottom="false"
          sortable="true"
          noDataText={"No Data Exist"}
          nextText={"next page"}
          previousText={"previous page"}
          defaultFiltering={[
            {
              id: "age",
              placeholder: "Search for age",
            },
          ]}
        ></ReactTable>
    } 
    const handleCity = (city_name) => {
        this.setState({
            city : city_name
        })
        fetch(
            `http://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=7f19fa18be9313ee23fbf1ee29da7201`
        ).then((data) => {
            data.json().then((res) => {
                this.setState({
                    forecastUpdatedData: res
                })
            })
        })   
    }
  return (
    <div>
      ForeCast Table
      <City style={{float:"left"}} handleCity={handleCity}/>
      {forecast_table_pagination}
    </div>
  );
}; }

export default ForeCastTable;

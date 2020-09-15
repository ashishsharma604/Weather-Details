import React, { Component, useState } from "react";
import {
Input,
FormGroup,
Label
} from "reactstrap";
import {CITY_LIST} from '../constants'


class CityDropDown extends React.Component {
    constructor(props) {
        super(props);
      }
      state = {
          weatherDetails : null,
          city : "Pune",
          app_key : ""
      };
      render() {
        let citylist = null;
        const updateCity = (e) => {
            this.props.handleCity(e.target.value)
        }
        if(CITY_LIST.length > 0) {
            citylist = <FormGroup>
            <Label for="exampleSelect">Select a City</Label>
            <Input onChange={updateCity} type="select" name="select" id="exampleSelect">
            {CITY_LIST.map((item,index) => {
              return <option>{item}</option>
            })}
            </Input>
          </FormGroup>
        }
     
  return (
    <div>
      <br/>
      {citylist}
    </div>
  );
}; }

export default CityDropDown;

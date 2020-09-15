import React, { useState } from "react";
import City from "./City";
import { APP_KEY } from "../constants";
import {
  Card,
  CardBody,
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  ModalFooter,
} from "reactstrap";
import "./../styles.css";
class WeatherInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    weatherDetails: null,
    city: "Pune",
    app_key: "",
    isOtherDetailsModalOpen: false,
  };
  componentWillReceiveProps(nextProps) {}

  componentDidMount = async () => {
    await this.setState({
      app_key: APP_KEY,
    });
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${this.state.app_key}`
    ).then((data) => {
      data.json().then((res) => {
        this.setState({
          weatherDetails: res,
        });
      });
    });
  };

  render() {
    const handleCity = (city_name) => {
      this.setState({
        city: city_name,
      });
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${this.state.app_key}`
      ).then((data) => {
        data.json().then((res) => {
          this.setState({
            weatherDetails: res,
          });
        });
      });
    };
    let current_weather = null;
    if (this.state.weatherDetails !== null) {
      current_weather = (
        <Table
          bordered
          style={{
            border: "solid green",
            maxWidth: "30%",
            width: "400px",
            marginLeft: "25%",
          }}
        >
          <thead>
            <tr>
              <th>description</th>
              <th>Main</th>
            </tr>
          </thead>

          {this.state.weatherDetails.weather.map((item, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <th>{item.description}</th>
                  <th>{item.main}</th>
                </tr>
              </tbody>
            );
          })}
        </Table>
      );
    }
    const openMoreWeatherDetails = () => {
      this.setState({
        isOtherDetailsModalOpen: !this.state.isOtherDetailsModalOpen,
      });
    };
    return (
      <div>
        <Card>
          <i class="fas fa-bullseye"></i>
          <CardBody
            style={{
              textAlign: "center",
              backgroundColor: "transparent",
              width: "50%",
              marginLeft: "28%",
            }}
          >
            <h3>Weather Information of Indian Cities</h3>
            <div
              className="toggle-style"
              onClick={() => openMoreWeatherDetails()}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
            <City style={{ float: "left" }} handleCity={handleCity} />
            {this.state.weatherDetails !== null ? (
              <div>
                <h5>Location : {this.state.city}</h5>
                <h5>
                  Current Temperature : {" "}
                  {this.state.weatherDetails.main.temp - 273.15}
                </h5>
                <h5>
                  Maximum Temperature : {" "}
                  {this.state.weatherDetails.main.temp_max - 273.15}
                </h5>
                <h5>
                  Minimum Temperature : {" "}
                  {this.state.weatherDetails.main.temp_min - 273.15}
                </h5>
              </div>
            ) : (
              <></>
            )}
            {current_weather}
            {this.state.isOtherDetailsModalOpen ? (
              <Modal style={{
                textAlign: "center",
                backgroundColor: "transparent",
                width: "50%",
                marginLeft: "28%",
              }}
                className="Extra-info-Modal"
                isOpen={this.state.isOtherDetailsModalOpen}
                toggle={openMoreWeatherDetails}
              >
                <ModalBody  >
                  <h5>Wind Speed : {this.state.weatherDetails.wind.speed}</h5>
                  <h5>Humidity : {this.state.weatherDetails.main.humidity}</h5>
                  <h5>Pressure : {this.state.weatherDetails.main.pressure}</h5>
                  <h5>Sunrise time: {this.state.weatherDetails.sys.sunrise}</h5>
                  <h5>SunsetTime : {this.state.weatherDetails.sys.sunset}</h5>
                </ModalBody>
                <ModalFooter>
                  <Button color="success" onClick={openMoreWeatherDetails}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            ) : (
              <></>
            )}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default WeatherInfo;

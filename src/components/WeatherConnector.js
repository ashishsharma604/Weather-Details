
import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Container } from 'reactstrap';
import "./../styles.css"
import classnames from 'classnames';
import WeatherInfo from './WeatherInfo'
import ForecastChar from './ForeCastChart'
import ForeCastTable from './ForeCastTable'

const KeyVaultDetails = () => {
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    return (<>
        <Nav className="NavItems" horizontal="true" tabs style={{ color: "white", paddingBottom: "5px" }}>
            <NavLink style={{float:"left",margin:"10px"}}
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggle('1'); }}
            >
                {'Current Condition'}
            </NavLink>
            <NavLink style={{float:"left",margin:"10px"}}
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggle('2'); }}
            >
                {'Fore-Cast Table'}
            </NavLink>
            <NavLink style={{float:"left",margin:"10px"}}
                className={classnames({ active: activeTab === '3' })}
                onClick={() => { toggle('3'); }}
            >
                {'Fore-Cast Chart'}
            </NavLink>
        </Nav>
        <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
                <Row>
                    <Col sm="12">
                       {activeTab === '1' ? <WeatherInfo /> : <></>}
                    </Col>
                </Row>
            </TabPane>
            <TabPane tabId="2">
                <Row>
                    <Col sm="12">
                       {activeTab === '2' ? <ForeCastTable /> : <></>}
                    </Col>
                </Row>
            </TabPane>
            <TabPane tabId="3">
                <Row>
                    <Col sm="12">
                        {activeTab === '3' ?<ForecastChar /> : <></>}
                    </Col>
                </Row>
            </TabPane>

        </TabContent>
       
    </>
    );
}

export default KeyVaultDetails;
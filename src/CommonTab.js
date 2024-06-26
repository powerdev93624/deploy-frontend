import Table from "./Table";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Spinner from 'react-bootstrap/Spinner';
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import GoogleSubTab from "./GoogleSubTab";
import FacebookSubTab from "./FacebookSubTab";

const CommonTab = ({ 
    setStartDate, 
    setEndDate, 
    startDate, 
    endDate, 
    setActiveTab, 
    userData, 
    activeTab, 
    handleSelect, 
    tableData, 
    columns, 
    fetchFacebookData, 
    fetchGoogleData,
    googleAuth,
    facebookAuth,
    isUserGoogleDataLoad,
    isGoogleTableDataLoad,
    facebookDataList,
    isUserFacebookDataLoad
}) => {

    const [selectedDropdownValue, setSelectedDropdownValue] = useState('');
    const [selectedManagerId, setSelectedManagerId] = useState('');

    const location = useLocation();

    const {pathname} = location;

    const handleUserAuthenticate = () => {

        if (pathname == "/google") {
            let url = process.env.REACT_APP_SERVER + "/oauth2callbackurl"
            window.location.href = url
        }else {
            let url = process.env.REACT_APP_SERVER + "/fb/oauth2callback"
            window.location.href = url
        }
    }

    const handleSelectChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const mId = selectedOption.getAttribute('data-mid');
        const value = e.target.value;
    
        if (mId !== null) {
            setSelectedManagerId(mId);
        }
        setSelectedDropdownValue(value);
    }

    const buttonValue = googleAuth == "null" || googleAuth == null && pathname == "/google" || facebookAuth == "null" || facebookAuth == null && pathname == "/facebook" ?  'Connect' : "Reconnect"


    const handleReconnect = (value) => {
      if (value === "Reconnect") {
        if (pathname == "/google") {
          localStorage.removeItem("urlToken");
          window.location.href = "/google"
        }else {
          localStorage.removeItem("facebook_access_token");
          window.location.href = "/facebook"
        }
      }
    }

  return (
    <Container>
      <Tab.Container
        defaultActiveKey="first"
        activeKey={activeTab}
        id="left-tabs-example"
        onSelect={handleSelect}
      >
        <Row>
          <Col sm={12}>
            <NavTabs>
              <Nav variant="pills" className="">
                <Nav.Item>
                  <Nav.Link eventKey="first" className="nav_link_tab">
                    <NavLink>
                      <span className="tab1">1</span> Connect
                    </NavLink>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second" className="nav_link_tab">
                    <NavLink>
                      <span className="tab2">2</span> Select ad account
                    </NavLink>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third" className="nav_link_tab">
                    <NavLink>
                      <span className="tab3">
                        {pathname == "/google" ? "3" : "2"}
                      </span>{" "}
                      Results
                    </NavLink>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </NavTabs>
          </Col>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <OuterDiv>
                  <div
                    onClick={() => handleReconnect(buttonValue)}
                    className="login_btn text-center"
                  >
                    <Button onClick={handleUserAuthenticate} variant="primary">
                      {buttonValue}
                    </Button>{" "}
                  </div>
                </OuterDiv>
              </Tab.Pane>

              {pathname == "/google" && (
                <GoogleSubTab
                  handleSelectChange={handleSelectChange}
                  userData={userData}
                  isUserGoogleDataLoad={isUserGoogleDataLoad}
                  setActiveTab={setActiveTab}
                  selectedDropdownValue={selectedDropdownValue}
                />
              )}

              {pathname == "/facebook" && (
                <FacebookSubTab
                  handleSelectChange={handleSelectChange}
                  facebookDataList={facebookDataList}
                  isUserFacebookDataLoad={isUserFacebookDataLoad}
                  setActiveTab={setActiveTab}
                  selectedDropdownValue={selectedDropdownValue}
                />
              )}

              <Tab.Pane eventKey="third">
                <OuterDiv>
                  <Table
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    startDate={startDate}
                    endDate={endDate}
                    selectedDropdownValue={selectedDropdownValue}
                    selectedManagerId={selectedManagerId}
                    tableData={tableData}
                    columns={columns}
                    pathname={pathname}
                    fetchFacebookData={fetchFacebookData}
                    fetchGoogleData={fetchGoogleData}
                    googleAuth={googleAuth}
                    facebookAuth={facebookAuth}
                    isGoogleTableDataLoad={isGoogleTableDataLoad}
                  />
                </OuterDiv>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};


export default CommonTab;



const Container = styled.div`
  background-color: #f4f4f4;
  padding: 20px 50px;
  width: 60%;
  margin: auto;
`;
const NavTabs = styled.div`
  .nav_link_tab {
    color: #7c7c7c;
  }

  .nav_link_tab.active {
    background-color: transparent;
    color: #7c7c7c;
  }
  .nav_link_tab.active span {
    background-color: #0d6efd;
    color: #fff;
  }
`;
const NavLink = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  span {
    background-color: #0d6efd3b;
    border-radius: 50%;
    height: 20px;
    width: 20px;
    position: relative;
    display: flex;
    justify-content: center;
    color: #0d6efd;
    font-size: 14px;
  }
`;

const OuterDiv = styled.div`
  background-color: #fff;
  padding: 20px 20px;
  margin: 20px 0px 0px;
  border-radius: 5px;
  
  button {
    padding: 10px 30px;
  }

  h5 {
    color: #4c4949;
    font-size: 16px;
    font-weight: 400;
    padding-bottom: 10px;
  }
 
`;
/* eslint-disable react/no-unescaped-entities */

import React from 'react';
import DashboardSharedLayout from '../pagelayout/DashboardSharedLayout';
import { Card, Nav} from 'react-bootstrap';
import RightSidebar from '../components/RightSidebar/RightSidebar';


export default function ResourceList() {
  return (
    <div style={{display: "flex", flexDirection: "row"}}>

      <div className="page-content" style={{marginLeft: 30}}>
        <Card style={{width: "100%"}}>
        <Card.Img variant="top" src="https://library-virid-three.vercel.app/_next/image?url=%2Fstatic%2Fimg%2Fresource%2FCOMPUTER-SS-3-300x409.jpg&w=384&q=75" height="400px"/>
        <Card.Body>
          <Card.Text>
           Computer Science Text Book For JSS3
          </Card.Text>
        </Card.Body>
      </Card>
    <Card>
    <Card.Header>
        <Nav variant="tabs" defaultActiveKey="#first">
          <Nav.Item>
            <Nav.Link href="#first">Description</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#link">Reviews</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#link">
              Viewers Also Read
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
        Doing well with money isn’t necessarily about what you know. It’s about how you behave. And behavior is hard to teach, even to really smart people. Money investing', personal finance, and business decisions is typically taught as a math-based field, where data and formulas tell us exactly what to do. But in the real world people don’t make financial decisions on a spreadsheet. They make them at the dinner table, or in a meeting room, where personal history, your own unique view of the world, ego, pride, marketing', and odd incentives are scrambled together. In The Psychology of Money, award-winning author Morgan Housel shares 19 short stories exploring the strange ways people think about money and teaches you how to make better sense of one of life’s most important topics.
        </Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
    </div>
    <RightSidebar/>
      </div>
  );
}

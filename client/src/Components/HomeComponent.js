import React, { Component } from 'react';
import { Col, Row, Container } from "reactstrap";

function RenderCard(props) {
    return (
        <div className="score-details-card">
            <Row className="college">
                <Col offset={1} xs={2}>{props.icon}</Col>
                <Col xs={9}>{props.name}</Col>
            </Row>
            <Row className="main-score-details">
                <Col>
                    <div className="exams">GRE</div>
                    <div className="scores">{props.gre_score}</div>
                </Col>
                <Col>
                    <div className="exams">GMAT</div>
                    <div className="scores">{props.gmat_score}</div>
                </Col>
                <Col>
                    <div className="exams">SAT</div>
                    <div className="scores">{props.sat_score}</div>
                </Col>
            </Row>

            <Row className="score-details">
                <Col xs={9}>
                    <div className="exams">TOEFL</div>
                </Col>
                <Col xs={3}>
                    <div className="scores">{props.toefl}</div>
                </Col>
            </Row>
            <Row className="score-details">
                <Col xs={9}>
                    <div className="exams">IELTS</div>
                </Col>
                <Col xs={3}>
                    <div className="scores">{props.ielts}</div>
                </Col>
            </Row>
            <Row className="score-details">
                <Col xs={9}>
                    <div className="exams">GRE Quantitative</div>
                </Col>
                <Col xs={3}>
                    <div className="scores">{props.gre_quant}</div>
                </Col>
            </Row>
        </div>
    )
}

class Home extends Component {
    render() {
        return (
            <>
                <h1 className="home-heading">Higher Education Details</h1>
                <Container>
                    <Row>
                        <RenderCard
                            icon=".."
                            name="University of Kansas"
                            gre_score="300"
                            gmat_score="550"
                            sat_score="234"
                            gre_quant="150"
                            ielts="6.5"
                            toefl="79"
                        />
                    </Row>
                </Container>
            </>
        )
    }
}

export default Home;
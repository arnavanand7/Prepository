
import React, { Component } from 'react';
import { Col, Row, Container } from "reactstrap";

function RenderCard(props) {
    return (
        <Col md={6} xl={4}>
            <div className="score-details-card">
                <Row>
                    <Col>
                        <img className="university-icon" src={props.icon}></img>
                    </Col>
                </Row>
                <Row className="college">

                    <Col xs={12}>{props.name}</Col>
                </Row>
                <Row className="main-score-details">
                    <Col>
                        <div className="exams">GRE</div>
                        <div className="scores">{props.gre_score}</div>
                    </Col>
                    <Col>
                        <div className="exams">GMAT</div>
                        <div className="scores">{props.gmat_score !== 0 ? props.gmat_score : '-'}</div>
                    </Col>
                    <Col>
                        <div className="exams">SAT</div>
                        <div className="scores">{props.sat_score !== 0 ? props.sat_score : '-'}</div>
                    </Col>
                </Row>

                <Row className="score-details">
                    <Col xs={9}>
                        <div className="exams">GRE Quantitative</div>
                    </Col>
                    <Col xs={3}>
                        <div className="scores">{props.gre_quant !== 0 ? props.gre_quant : '-'}</div>
                    </Col>
                </Row>
                <Row className="score-details">
                    <Col xs={9}>
                        <div className="exams">GRE Verbal</div>
                    </Col>
                    <Col xs={3}>
                        <div className="scores">{props.gre_verbal !== 0 ? props.gre_verbal : '-'}</div>
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
                        <div className="exams">ACT</div>
                    </Col>
                    <Col xs={3}>
                        <div className="scores">{props.act_score !== 0 ? props.act_score : '-'}</div>
                    </Col>
                </Row>
            </div>
        </Col>
    )
}


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            universities: [],
            selected: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const searchGre = {
            keyword: this.state.search
        }
        if (this.state.selected === 'university') {
            fetch('http://localhost:4000/getuniversities', {
                method: 'post',
                body: JSON.stringify(searchGre),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(data => data.json())
                .then(data => {
                    this.setState({
                        universities: data
                    });
                })
        }
        else if (this.state.selected === 'gre') {
            fetch('http://localhost:4000/getgre', {
                method: 'post',
                body: JSON.stringify(searchGre),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(data => data.json())
                .then(data => {
                    this.setState({
                        universities: data
                    });
                })
        }
    }

    handleClick = (e) => {
        this.setState({
            selected: e.target.value
        }, () => {
            console.log(this.state.selected)
        })

    }
    render() {
        const Cards = () => {
            return (
                this.state.universities.map((university, index) => {
                    return (
                        <RenderCard
                            key={index}
                            icon={university.logo}
                            name={university.name}
                            gre_score={university.gre}
                            gmat_score={university.gmat}
                            ielts={university.ielts}
                            toefl={university.toefl}
                            gre_quant={university.greq}
                            sat_score={university.sat}
                            act_score={university.act}
                            gre_verbal={university.grev}
                        />
                    )
                })
            )
        }

        return (
            <>
                <h1 className="home-heading">Higher Education Details</h1>
                <Container>
                    <div className="search-score">
                        <form onSubmit={this.handleSubmit}>
                            <input className='select-options' id='university' name='option' type='radio' value='university' onClick={this.handleClick} />
                            <label htmlFor="university">University Name</label>
                            <input className='select-options' id='gre' type='radio' name='option' value='gre' onClick={this.handleClick} />
                            <label htmlFor="gre">GRE Score</label>
                            <input type="text" name="search" placeholder="Search" onChange={this.handleChange}></input>
                            <button className="submit-button" type='submit' >Submit</button>
                        </form>

                    </div>
                </Container>
                <Container>
                    <Row>
                        <Cards />
                    </Row>
                </Container>
            </>
        )
    }
}

export default Home;
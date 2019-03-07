import React, { Component } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import {ListGroup} from 'react-bootstrap'

const axios = require('axios');

class Reckon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ranges: {
                lower: '',
                upper: ''
            },
            outputDetails: [
                {
                    divisor: '',
                    output: ''
                }
            ],
            finalOutput: [],
            loading: true
        }
    }

    componentWillMount() {
        this.getRanges();
    }

    //API Request to get rangeInfo
    async getRanges() {
        await axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://join.reckon.com/test1/rangeInfo`,
            {
                method: "GET",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(resp => {
                this.setState({ ranges: resp.data })
                this.getDivisorInfo();
            }).catch((err) => {
                console.log(err)
            })

    }

    //API request to get divisorInfo
    async getDivisorInfo() {
        await axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://join.reckon.com/test1/divisorInfo`,
            {
                method: "GET",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then(resp => {
                this.setState({ outputDetails: resp.data })
                console.log('get divisor')
                this.produceOutput()

            }).catch((err) => {
                console.log(err)
            })
    }

    //Get all the divisor
    //Loop through each index of the range from lower to upper
    //If the index of the range is divisible by all divisor, then set both divisor output finalOutput state
    //or, set one divisor
    //otherwise, set space
    produceOutput() {
        console.log(this.state.outputDetails.outputDetails)
        let divisors = this.getAllDivisors()
        for (let i = this.state.ranges.lower; i <= this.state.ranges.upper; i++) {
            let output = ' '
            if (this.comparingDivisor(i, divisors)) {
                output = this.createCombinedOutput(i)
                this.setState({ finalOutput: [...this.state.finalOutput, (<p className='finalOutput' key={i}>{i + ': ' + this.createCombinedOutput(i)}</p>)] })
            } else {
                output = this.getMatchingOutput(i)
                this.setState({ finalOutput: [...this.state.finalOutput, (<p className='finalOutput' key={i}>{i + ': ' + this.getMatchingOutput(i)}</p>)] })

            }
            console.log(i, output)
        }
        this.setState({loading:false})
    }
 
    //Loop through outputDetails array
    //Push divisors to allDivisor array
    getAllDivisors() {
        let allDivisors = []
        for (let i = 0; i < this.state.outputDetails.length; i++) {
            allDivisors.push(this.state.outputDetails[i].divisor)
        }
        return allDivisors;
    }

    //Loop through outputDetail array
    //If, inputted value divides by divisor is equals to 0
    //then, returns output of outputDetails in that index
    //else, return space
    getMatchingOutput(val) {
        for (let i = 0; i < this.state.outputDetails.outputDetails.length; i++) {
            if (val % this.state.outputDetails.outputDetails[i].divisor === 0) {
                return this.state.outputDetails.outputDetails[i].output
            } else {
                return ' '
            }
        }
        return val
    }

    //Loop through outputDetail array
    //If, inputted value divides by divisor is equals to 0
    //then, returns concatinating of outputs of outputDetails in that index
    createCombinedOutput(val) {
        let output = ""
        for (let i = 0; i !== this.state.outputDetails.outputDetails.length; i++) {
            if (val % this.state.outputDetails.outputDetails[i].divisor === 0) {
                output += this.state.outputDetails.outputDetails[i].output
            }
        }
        return output
    }

    //Loop through the divisor array
    //If the range is not divisible, return false
    //Else. return true
    comparingDivisor(range, divisors) {
        for (let i = 0; i !== divisors.length; i++) {
            if (range % divisors[i] !== 0) {
                return false;
            }
        }
        return true;
    }


    render() {
        return (
            <div>
                <h1 className="display-3">Reckon Code</h1>
                <ClipLoader
                    className="override"
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={this.state.loading}
                ></ClipLoader>
                <ListGroup><ListGroup.Item>{this.state.finalOutput}</ListGroup.Item></ListGroup>
                

            </div>
        );
    }
}

export default Reckon;
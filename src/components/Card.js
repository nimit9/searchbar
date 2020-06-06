import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

class Example extends Component {
    constructor(props) {
        super(props)
        this.toggleKey = this.toggleKey.bind(this);
        this.state = {
            hover: false,
            hoverID: "",
            trigger: false

        }
    }

    componentDidUpdate(prevState) {
        if (prevState.data != this.props.data) {
            if (prevState.hasTriggered != this.props.hasTriggered) {
                const data = this.props.data.map((element) =>
                    element.id
                )[0]

                this.toggleState(data);

            }
            else {
                this.toggleKey()
            }


        }
    }

    toggleState = (data) => {
        this.setState({
            trigger: true,
            hoverID: data
        })
        this.toggleKey();
    }

    toggleHover = (dataID) => {

        if (dataID != this.props.cursor) {
            this.setState({
                hover: true,
                hoverID: dataID

            })
        }
        if (dataID == this.props.cursor) {
            this.setState({
                hover: true,
                hoverID: dataID

            })

        }

    }



    toggleKey = () => {
        const data = this.props.data.filter((element) =>
            element.id === this.state.hoverID
        )[0]
        const index = this.props.data.indexOf(data)

        if (index < this.props.data.length - 1) {
            const hoverID = this.props.data.map(element => {
                return (
                    element.id
                );
            })[index + 1]


            this.setState({

                hover: true,
                hoverID: hoverID
            })

        }
        if (index > 0) {
            const hoverID = this.props.data.map(element => {
                return (
                    element.id
                );
            })[index - 1]


            this.setState({

                hover: true,
                hoverID: hoverID
            })

        }

    }

    toggleHoverOut = () => {
        this.setState({
            hover: false
        })
    }



    render() {





        if (this.props.data.length === 0) {
            return (
                <Card>
                    <CardBody>
                        No User Found
                    </CardBody>
                </Card>
            );
        } else {


            return (

                this.props.data.map(data => {
                    return (
                        <div key={data.id} onMouseOver={() => this.toggleHover(data.id)} onMouseOut={this.toggleHoverOut}
                            onKeyDown={this.toggleKey} tabIndex="-1">

                            <Card className={
                                (this.state.hover) && (data.id === this.state.hoverID) ?
                                    'active' : null
                            }>
                                <CardBody >
                                    <CardTitle >{data.id}</CardTitle>
                                    <CardSubtitle>{data.name}</CardSubtitle>
                                    <CardText>{data.address}</CardText>
                                </CardBody>
                            </Card>
                        </div>
                    );
                })


            );
        }



    }
}

export default Example;
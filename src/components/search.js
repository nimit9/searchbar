import React from 'react';
import Card from './Card.js';




class Numbers extends React.Component {
    state = {
        query: "",
        data: [],
        filteredData: [],
        keyboard: false


    };

    handleInputChange = event => {
        const query = event.target.value;

        this.setState(prevState => {
            const filteredData = prevState.data.filter(element => {
                const id = element.id.toLowerCase().includes(query.toLowerCase())

                const name = element.name.toLowerCase().includes(query.toLowerCase())
                const address = element.address.toLowerCase().includes(query.toLowerCase())
                const items2 = Object.keys(element.items).map(key => element.items[key].toLowerCase().includes(query.toLowerCase())).includes(true)
                const pincode = element.pincode.toLowerCase().includes(query.toLowerCase())

                if (id || name || address || pincode || items2) {
                    return (
                        true
                    );
                }
                else {
                    return (false);
                }
            }


            );
            return {
                query,
                filteredData,



            };
        });


    };



    toggleKey = (event) => {
        if (event.key === "ArrowDown") {

            this.setState({
                keyboard: true
            }
            )
        }

    }


    getData = () => {
        fetch(`http://www.mocky.io/v2/5ba8efb23100007200c2750c`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    data
                });
            });
    };

    componentWillMount() {
        this.getData();
    }

    render() {

        console.log(this.state.keyboard)
        console.log(111)
        return (
            <div className="container">
                <div className="searchForm">
                    <form>
                        <input
                            placeholder="Search for..."
                            value={this.state.query}
                            onChange={this.handleInputChange} onKeyDown={this.toggleKey}

                        />
                    </form>

                    <div className="drop-down">
                        <Card data={this.state.filteredData} hasTriggered={this.state.keyboard} />
                    </div>
                </div>
            </div>

        );


    }
}

export default Numbers
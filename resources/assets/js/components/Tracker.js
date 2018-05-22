import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

export default class Tracker extends Component {
    constructor() {
        super();
        // console.log(super());
        this.state = {
            lapse: 0,
            running: false,
            trackers: []
        };
    }

    HandleRunClick() {
        if (this.state.running) {
            clearInterval(this.timer);
            this.setState({ running: false });
        } else {
            const startTime = Date.now() - this.state.lapse;
            this.timer = setInterval(() => {
                this.setState({ lapse: Date.now() - startTime });
            });
            this.setState({ running: true });
        }
    }

    HandleClearClick() {
        clearInterval(this.timer);
        this.setState({ lapse: 0, running: false });
    }

    functioncomponentWillUnmount() {
        clearInterval(this.timer);
    }
    componentWillMount() {
        axios
            .get("/api/tracker")
            .then(response => {
                this.setState({
                    trackers: response.data
                });
            })
            .catch(errors => {
                console.log(errors);
            });
    }
    render() {
        const { lapse, running } = this.state;
        return (
            <div>
                <label htmlFor="">{this.state.lapse}ms</label>
                <br />
                <button onClick={this.HandleRunClick.bind(this)}>
                    {this.state.running ? "Stop" : "Start"}
                </button>
                <button onClick={this.HandleClearClick.bind(this)}>
                    CLEAR
                </button>
            </div>
            // <div className="container">
            //     {this.state.trackers.map(tracker => (
            //         <li>{tracker.description} </li>
            //     ))}
            // </div>
        );
    }
}

if (document.getElementById("time-tracker")) {
    ReactDOM.render(<Tracker />, document.getElementById("time-tracker"));
}

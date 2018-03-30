import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Text
} from 'react-native';

export default class CountDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countDown: {},
            status: true,
            time: props.time
        }
        this.computedTime.bind(this);
        this.renderCountDown.bind(this);
    }

    static propTypes = {
        time: PropTypes.number.isRequired,
        endFunc: PropTypes.func,
        endTitle: PropTypes.string,
        renderCountDown: PropTypes.func
    }

    static defaultProps = {
        endTitle: '已结束'
    }

    componentWillReceiveProps(props) {
        this.setState({
            time: props.time
        })
        if (!this.state.status && props.time > Date.now()) {
            this.setState({
                status: true
            }, () => {
                this.start()
            })
        }
    }

    componentWillMount() {
        this.start();
    }

    computedTime() {
        let time = this.state.time;
        let timeNow = Date.now();
        let timeDiff = time - timeNow;
        const totalSeconds = Math.floor(timeDiff / 1000);

        let seconds = parseInt(totalSeconds % 60);
        let minutes = parseInt(totalSeconds / 60) % 60;
        let hours = parseInt(totalSeconds / 3600);
        let days = parseInt(totalSeconds / 86400);

        if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
            this.setState({
                status: false
            });
            this.props.endFunc && this.props.endFunc();
        }

        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        hours = hours < 10 ? '0' + hours : hours;
        days = days < 10 ? '0' + days : days;
        this.setState({
            countDown: {
                days,
                hours,
                minutes,
                seconds
            }
        });
        if(this.state.status) {
            this.start();
        }
    }

    start() {
        requestAnimationFrame(() => {
            this.computedTime()
        });
    }
    
    renderCountDown() {
        if(this.state.status) {
            return this.props.renderCountDown ?
                this.props.renderCountDown(this.state.countDown) :(
                <Text {...this.props}>
                    {this.state.countDown.days}:
                    {this.state.countDown.hours}:
                    {this.state.countDown.minutes}:
                    {this.state.countDown.seconds}
                </Text>
            )
        } else {
            return (
                <Text {...this.props}>{this.props.endTitle}</Text>
            )
        }
    }

    render() {
        return this.renderCountDown();
    }
}

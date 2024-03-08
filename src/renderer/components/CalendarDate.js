import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FadeProps from '../class/Fade';

export default class CalendarDate extends Component {
  static propTypes = {
    locale: PropTypes.shape({
      ui_months_names: PropTypes.string
    })
  }

  static defaultProps = {
    locale: {}
  }

  constructor(props) {
    super(props);

    this.state = {
      date: new Date()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ date: new Date() });
  }

  renderMonthDay() {
    return this.state.date.getDate();
  }

  renderMonthName() {
    const monthNames = JSON.parse(this.props.locale.ui_months_names);
    const monthNumber = this.state.date.getMonth();

    return monthNames !== undefined ? monthNames[monthNumber] : monthNumber;
  }

  renderYear() {
    return this.state.date.getFullYear();
  }

  render() {
    const monthName = this.renderMonthName();

    return (
      <div className="date" >
        <div className="date__img">
          <i className="i-calendar date__icon" />
        </div>
        <div className="date__body">
          <div className="date__number">{this.renderMonthDay()}</div>
          <div className="date__number">
            <FadeProps animationLength={450}>
              <span key={monthName}>
                {monthName}
              </span>
            </FadeProps>
          </div>
          <div className="date__number">{this.renderYear()}</div>
        </div>
      </div >
    );
  }
}

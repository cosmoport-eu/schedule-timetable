import React, { Component } from 'react';

import Trapeze from './Trapeze';
import Locale from '../class/Locale';
import FadeProps from '../class/Fade';
import _Date from '../class/_Date';

// если прошло 10 минут с начала мероприятия - true
const isEnded = (date, startTimeInMinutes) => {
  const waitPeriod = 10;

  return startTimeInMinutes <= waitPeriod + date.getHours() * 60 + date.getMinutes();
};

export default class TableRow extends Component {
  constructor(props) {
    super(props);

    this.state = { fade: true, fadeTime: 500 };
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    // Changes fade in/out state on each locale change
    if (this.props.locale !== newProps.locale) {
      this.setState({ fade: !this.state.fade });
    }
  }

  getLocaleProp(prop) {
    return Locale.getLocaleProp(prop, this.props.locale);
  }

  mapStatus = (statusId, date, startTimeInMinutes) => {
    const map = {
      1: 'cancel',
      2: 'landing',
      4: 'finish',
      5: 'finish',
      6: 'pre-order',
    };

    const ended = isEnded(date, startTimeInMinutes);

    return ended
      ? ' voyage--finish'
      : map[statusId]
      ? ' voyage--' + map[statusId]
      : '';
  };

  renderIcon = (typeId) => (
    <FadeProps animationLength={500}>
      <i
        key={this.state.fade}
        className={`i-${{ 1: 'man', 2: 'radar' }[typeId] || 'space-small'}`}
      ></i>
    </FadeProps>
  );

  renderDepartion = (minutes) => this.fade(_Date.minutesToHm(minutes));

  renderTypeTitle(val, refs) {
    const type = refs.types.filter((t) => t.id === val);
    const category = refs.typeCategories.filter((c) => c.id === type[0].categoryId);

    return this.renderPropAnimated(this.props.locale[category[0].code], ':');
  }

  renderTypeName(val, refs) {
    const type = refs.types.filter((t) => t.id === val);

    return this.renderPropAnimated(this.props.locale[type[0].nameCode]);
  }

  renderDuration = (m) =>
    this.fade(
      `${_Date.fullHours(m)} ${this.getLocaleProp(
        'ui_caption_hours',
      )} ${_Date.minutesApartHours(m)} ${this.getLocaleProp(
        'ui_caption_minutes',
      )}`,
    );

  renderStatus(val, refs) {
    if (val === 0) {
      return '';
    }

    const status = refs.statuses.filter((s) => s.id === val);

    const result = this.renderPropAnimated(this.props.locale[status[0].code]);

    return <span>{result}</span>;
  }

  // иконка не отображается
  renderState(state) {
    if (state === 2) {
      return <span
        className="bp5-icon-lock"
        style={{ fontSize: '.8em', color: '#5c7080' }}
      />
    }

    return '';
  }

  renderPropAnimated(name, postfix) {
    let value = name;
    if (postfix) {
      value = value + postfix;
    }

    return (
      <FadeProps animationLength={500}>
        <span key={value}>{value}</span>
      </FadeProps>
    );
  }

  renderCost(cost) {
    return (
      <FadeProps animationLength={500}>
        <span key={this.state.fade}>
          {cost}
          <i className="i-sing voyage__price-icon"></i>
        </span>
      </FadeProps>
    );
  }

  fade = (children) => (
    <FadeProps animationLength={500}>
      <span key={this.state.fade}>{children}</span>
    </FadeProps>
  );

  render() {
    const event = this.props.event;
    const date = new Date();

    return (
      <div
        className={
          'voyage' + this.mapStatus(event.eventStatusId, date, event.startTime)
        }
        key={event.id}
      >
        <Trapeze />

        <div className="voyage__wrapper">
          <div className="voyage__time">
            {this.renderDepartion(event.startTime)}
          </div>
          <div className="voyage__type">
            <Trapeze />

            <div className="voyage__type-wrap">
              <div className="voyage__type-icon">
                {this.renderIcon(event.eventTypeId)}
              </div>
              <div className="voyage__type-body">
                <div className="voyage__type-miss">
                  {this.renderTypeTitle(event.eventTypeId, this.props.refs)}
                </div>
                <div className="voyage__type-title">
                  {this.renderTypeName(event.eventTypeId, this.props.refs)}
                </div>
              </div>
            </div>

            <Trapeze position="_right" />
          </div>
          <div className="voyage__price">{this.renderCost(event.cost)}</div>
          <div className="voyage__duration">
            {this.renderDuration(event.durationTime)}
          </div>
          <div className="voyage__status">
            {this.renderStatus(event.eventStatusId, this.props.refs)}
          </div>
          <div className="voyage__tickets">
            <span>
              {`${event.contestants}/${event.peopleLimit} `}
              {this.renderState(event.eventStateId)}
            </span>
          </div>
        </div>

        <Trapeze position="_right" />
      </div>
    );
  }
}

import React from 'react';

class DateDifferenceComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      specificDate: new Date(props.specificDate),
      differenceDays: null
    };
  }

  componentDidMount() {
    this.calculateDifference();
  }

  calculateDifference() {
    const { currentDate, specificDate } = this.state;

    const timeDifference = specificDate.getTime() - currentDate.getTime();
    const differenceDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    this.setState({ differenceDays });
  }

  render() {
    const { differenceDays } = this.state;

    return (
      <div>
        <p>Sự chênh lệch giữa ngày hiện tại và ngày cụ thể là: {differenceDays !== null ? differenceDays : 'Đang tính...' } ngày.</p>
      </div>
    );
  }
}

export default DateDifferenceComponent;

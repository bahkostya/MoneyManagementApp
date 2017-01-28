import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

import ReactHighcharts from 'react-highcharts';

export default class Statistics extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    handleRequestClose() {
        this.props.onRequestClose();
    }

    getCategoriesStaticticsData() {
        const series = [{
            colorByPoint: true,
            data: [{
                name: 'Другое',
                y: this.getAmountTotalByCategory('other')
            }, {
                name: 'Еда',
                y: this.getAmountTotalByCategory('food')
            }, {
                name: 'Покупки',
                y: this.getAmountTotalByCategory('goods')
            }, {
                name: 'Развлечения',
                y: this.getAmountTotalByCategory('fun')
            }]
        }];
        
        const title = {
            text: 'Статистика по категориям расходов'
        }

        return {...CONFIG, series, title};
    }

    getTypesStaticticsData() {
        const series = [];
        series.push({
            colorByPoint: true,
            data: [{
                name: 'Доходы',
                y: this.getAmountTotalByType('plus')
            }, {
                name: 'Расходы',
                y: this.getAmountTotalByType('minus')
            }]
        });
        const title = {
            text: 'Сотношение расходов и доходов'
        }

        return {...CONFIG, series, title};
    }

    getAmountTotalByCategory(category) {
        const categoriedTransactions = this.props.transactions
            .filter(transaction =>
                transaction.type === 'minus' && transaction.category === category
            )

        return categoriedTransactions.reduce((a,b) =>
            +a + Math.abs(+b.amount), 0
        );
    }

    getAmountTotalByType(type) {
        const typedTransactions = this.props.transactions
            .filter(transaction =>
                transaction.type === type
            )

        return typedTransactions.reduce((a,b) =>
            +a + Math.abs(+b.amount), 0
        );
    }

    render() {
        const standardActions = (
          <RaisedButton
            label="Спасибо"
            primary={true}
            onTouchTap={this.handleRequestClose}
          />
        );

        return (
            <Dialog
              open={this.props.opened}
              actions={standardActions}
              onRequestClose={this.handleRequestClose}
              autoScrollBodyContent={true}
            >
                <ReactHighcharts config={this.getCategoriesStaticticsData()}></ReactHighcharts>
                <ReactHighcharts config={this.getTypesStaticticsData()}></ReactHighcharts>
            </Dialog>
        );
    }
}

const CONFIG = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    tooltip: {
        pointFormat: '<b>{point.y} грн</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: 'black'
                }
            }
        }
    }
};

import React, {Component} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HeaderControls from './HeaderControls';
import FooterControls from './FooterControls';
import TransactionsList from './TransactionsList';

import ReactHighcharts from 'react-highcharts';

import './MoneyPalApp.scss';

export default class MoneyPalApp extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleTransactionAdd = this.handleTransactionAdd.bind(this);
        this.handleFilterSelect = this.handleFilterSelect.bind(this);

        this.state = {
            transactions: [],
            filter: '',
            balance: 0
        }
    }

    componentDidMount() {
        const savedTransactions = JSON.parse(localStorage.getItem('transactions'));
        const savedBalance  = JSON.parse(localStorage.getItem('balance'));

        if (savedTransactions) {
            this.setState({
                transactions: savedTransactions,
                filter: '',
                balance: savedBalance
            });
        }
    }

    componentDidUpdate() {
        const savedTransactions = JSON.stringify(this.state.transactions);
        const savedBalance = JSON.stringify(this.state.balance);

        localStorage.setItem('transactions', savedTransactions);
        localStorage.setItem('balance', savedBalance);
    }

    getBalance(newTransaction) {
        return this.state.transactions.reduce((a,b) =>
                +a + +b.amount, 0
            ) + +newTransaction.amount;
    }

    handleTransactionAdd(newTransaction) {
        this.setState({
            transactions: [newTransaction, ...this.state.transactions],
            balance: this.getBalance(newTransaction)
        });
    }

    handleFilterSelect(filterQuery) {
        this.setState({
            filter: filterQuery
        });
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div className="app">
                        <HeaderControls
                            onTransactionAdd={this.handleTransactionAdd}
                            balance={this.state.balance}
                        />
                        <TransactionsList
                            transactions={this.state.transactions}
                            filterByType={this.state.filter}
                        />
                        <FooterControls
                            onFilterSelect={this.handleFilterSelect}
                            transactions={this.state.transactions}
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

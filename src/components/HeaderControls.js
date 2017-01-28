import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ContentAddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import ContentRemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline';

import TransactionMaker from './TransactionsMaker';

import './TransactionControls.scss';

export default class HeaderControls extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleTransactionOutgoing = this.handleTransactionOutgoing.bind(this);
        this.handleTransactionIncoming = this.handleTransactionIncoming.bind(this);
        this.hendleDialogClose = this.hendleDialogClose.bind(this);
        this.handleTransactionAdd = this.handleTransactionAdd.bind(this);

        this.state = {
            dialogOpened: false,
            dialogType: '',
        }
    }

    handleTransactionOutgoing() {
        this.setState({
            dialogOpened: true,
            dialogType: 'minus'
        });
    }

    handleTransactionIncoming() {
        this.setState({
            dialogOpened: true,
            dialogType: 'plus'
        });
    }

    hendleDialogClose() {
        this.setState({
            dialogOpened: false,
            dialogType: ''
        });
    }

    handleTransactionAdd(newTransaction) {
        this.props.onTransactionAdd(newTransaction);
    }

    render() {
        return (
            <div>
                <AppBar
                    className="navigation"
                    title={this.props.balance}
                    titleStyle={{
                        fontWeight: 700,
                        fontSize: 30
                    }}
                    iconElementLeft={<IconButton><ContentRemoveCircleOutline /></IconButton>}
                    iconElementRight={<IconButton><ContentAddCircleOutline /></IconButton>}
                    onLeftIconButtonTouchTap={this.handleTransactionOutgoing}
                    onRightIconButtonTouchTap={this.handleTransactionIncoming}
                />
                <TransactionMaker
                    opened={this.state.dialogOpened}
                    type={this.state.dialogType}
                    onRequestClose={this.hendleDialogClose}
                    onTransactionAdd={this.handleTransactionAdd}
                />
            </div>
        );
    }
}

import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class TransactionMaker extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleNameEnter = this.handleNameEnter.bind(this);
        this.handleAmountEnter = this.handleAmountEnter.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleTransactionAdd = this.handleTransactionAdd.bind(this);
        this.resetState = this.resetState.bind(this);

        this.state = {
            name: '',
            amount: 0,
            category: 'other',
            errorText: {
                name: '',
                amount: ''
            }
        }
    }

    resetState() {
        this.setState({
            name: '',
            amount: 0,
            category: 'other',
            errorText: {
                name: '',
                amount: ''
            }
        });
    }

    handleRequestClose() {
        this.props.onRequestClose();

        this.resetState();
    }

    handleNameEnter(event) {
        this.setState({
            name: event.target.value,
            errorTextName: ''
        });
    }

    handleAmountEnter(event) {
        const absAmount = Math.abs(event.target.value);
        this.setState({
            amount: this.props.type === 'plus' ? absAmount : -absAmount,
            errorTextAmount: ''
        });
    }

    handleCategoryChange(event, index, value) {
         this.setState({
             category: this.props.type === 'minus' ? value : ''
         });
     }

    getDialogText() {
        return this.props.type === 'plus' ? 'Доход ☺️' : 'Расход 😣';
    }

    getDialogBody(type) {
        const textFieldLabel = `Введите наименование ${type === 'plus' ? "дохода" : "расхода"}`;

        return (
            <div>
                <TextField
                    floatingLabelText={textFieldLabel}
                    onChange={this.handleNameEnter}
                    errorText={this.state.errorText.name}
                />
                <br />
                <TextField
                    floatingLabelText="Введите сумму"
                    type="number"
                    onChange={this.handleAmountEnter}
                    errorText={this.state.errorText.amount}
                />
                <br />
                {
                    type === 'minus' &&
                    <SelectField
                        floatingLabelText="Введите категорию"
                        value={this.state.category}
                        onChange={this.handleCategoryChange}
                    >
                        <MenuItem value="other" primaryText="Другое" />
                        <MenuItem value="food" primaryText="Еда" />
                        <MenuItem value="goods" primaryText="Покупки" />
                        <MenuItem value="fun" primaryText="Развлечения" />
                    </SelectField>
                }
            </div>
        );
    }

    handleTransactionAdd() {
        const newTransaction = {
            type: this.props.type,
            date: new Date().toString(),
            ...this.state
        };
        if (this.state.name === '' || !+this.state.amount) {
            this.setState({
                errorText: {
                    name: this.state.name === '' && 'Введите пожалуйста наименование',
                    amount:  !this.state.amount && 'Введите пожалуйста сумму'
                }
            });
            return;
        }

        this.props.onRequestClose()
        this.props.onTransactionAdd(newTransaction);

        this.resetState();
    }

    render() {
        const standardActions = (
          <RaisedButton
            label="Ok"
            primary={true}
            onTouchTap={this.handleTransactionAdd}
          />
        );

        return (
            <Dialog
              open={this.props.opened}
              title={this.getDialogText()}
              actions={standardActions}
              onRequestClose={this.handleRequestClose}
            >
                {
                    this.getDialogBody(this.props.type)
                }
            </Dialog>
        );
    }
}

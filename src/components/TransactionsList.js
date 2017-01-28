import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import NavigationMoreHoriz from 'material-ui/svg-icons/navigation/more-horiz';
import MapsRestaurant from 'material-ui/svg-icons/maps/restaurant';
import MapsLocalMall from 'material-ui/svg-icons/maps/local-mall';
import PlacesCasino from 'material-ui/svg-icons/places/casino';
import {
        blue500,
        lightGreen500,
        red600,
        tealA700,
        deepOrange500,
        deepPurpleA100
    } from 'material-ui/styles/colors';

import moment from 'moment';

moment.locale("ru");

export default class TransactionsList extends Component {
    getTransactionStyles(transaction) {
        const color = transaction.type === 'plus' ? lightGreen500 : red600;
        const avatar = {};

        if (transaction.type === 'plus') {
            avatar.icon = <NavigationArrowDownward />;
            avatar.bgColor = lightGreen500;
        };
        if (transaction.type === 'minus' && transaction.category === 'fun') {
            avatar.icon = <PlacesCasino />;
            avatar.bgColor = deepOrange500;
        };
        if (transaction.type === 'minus' && transaction.category === 'food') {
            avatar.icon = <MapsRestaurant />;
            avatar.bgColor = tealA700;
        };
        if (transaction.type === 'minus' && transaction.category === 'other') {
            avatar.icon = <NavigationMoreHoriz />;
            avatar.bgColor = blue500;
        };
        if (transaction.type === 'minus' && transaction.category === 'goods') {
            avatar.icon = <MapsLocalMall />;
            avatar.bgColor = deepPurpleA100;
        };

        return {
            color,
            avatar
        }
    }

    getTransactionSignedAmount(transaction) {
        const absoluteAmount = Math.abs(transaction.amount);
        return `${transaction.type === 'plus' ? '+' : '-'} ${absoluteAmount}`;
    }

    render() {
        const transactions = this.props.transactions;
        const filteredTransactions = transactions.filter(transaction =>
            transaction.type.indexOf(this.props.filterByType) !== -1
        );
        const styles = transaction => this.getTransactionStyles(transaction);

        return (
            <List className="app__body">
                {
                    filteredTransactions.map(transaction =>
                        <div key={transaction.date} >
                            <ListItem
                                leftAvatar={
                                    <Avatar
                                        icon={styles(transaction).avatar.icon}
                                        backgroundColor={styles(transaction).avatar.bgColor}
                                    />
                                }
                                rightIcon={
                                    <span
                                        style={{
                                            color: styles(transaction).color,
                                            width: "auto"
                                        }}
                                    >
                                        {this.getTransactionSignedAmount(transaction)}
                                    </span>
                                }
                                primaryText={transaction.name}
                                secondaryText={moment(new Date(transaction.date)).fromNow()}
                            />
                            <Divider />
                        </div>
                    )
                }
            </List>
        );
    }
}

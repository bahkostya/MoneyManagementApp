import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import NavigationArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import AvLoop from 'material-ui/svg-icons/av/loop';
import RaisedButton from 'material-ui/RaisedButton';
import EditorShowChart from 'material-ui/svg-icons/editor/show-chart';

import Statistics from './Statistics';

export default class FooterControls extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);

        this.state = {
            selectedIndex: 0,
            filterQuery: '',
            dialogOpen: false
        }
    }

    handleSelect(index, type) {
        this.setState({
            selectedIndex: index,
            filterQuery: type
        })

        this.props.onFilterSelect(type);
    }

    handleDialogOpen() {
        this.setState({
            dialogOpen: true
        })
    }

    handleDialogClose() {
        this.setState({
            dialogOpen: false
        })
    }

    render() {
        return (
            <div>
                <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem
                        label="Все"
                        icon={<AvLoop />}
                        onTouchTap={() => this.handleSelect(0, '')}
                    />
                    <BottomNavigationItem
                        label="Доходы"
                        icon={<NavigationArrowDownward />}
                        onTouchTap={() => this.handleSelect(1, 'plus')}
                    />
                    <BottomNavigationItem
                        label="Расходы"
                        icon={<NavigationArrowUpward />}
                        onTouchTap={() => this.handleSelect(2, 'minus')}
                    />
                    <RaisedButton
                        icon={<EditorShowChart />}
                        label="Статистика"
                        secondary
                        style={{
                            height: 36,
                            flexBasis: 30,
                            alignSelf: 'center',
                            margin: '0 10px'
                        }}
                        onTouchTap={this.handleDialogOpen}
                    />
                </BottomNavigation>
                <Statistics
                    opened={this.state.dialogOpen}
                    onRequestClose={this.handleDialogClose}
                    transactions={this.props.transactions}
                />
            </div>
        );
    }
}

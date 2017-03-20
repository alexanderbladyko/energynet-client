import * as React from 'react'
import {
    connect,
} from 'react-redux'
import * as classNames from 'classnames'

import {
    selectTab,
    toggleTab,
} from 'actions/mainPanel'
import Auction from 'components/Auction/Auction'
import AuctionAction from 'components/AuctionAction/AuctionAction'
import Resources from 'components/Resources/Resources'
import * as constants from 'constants'
import * as State from 'state'

import './MainPanel.scss'


interface IMainPanelProps {
    game: State.IGameState
    mainPanel: State.IMainPanelState
    selectTab: typeof selectTab
    toggleTab: typeof toggleTab
}


class MainPanel extends React.Component<IMainPanelProps, {}> {
    public render(): React.ReactElement<{}> {
        const selectedTab: State.MainPanelTabs = this.props.mainPanel.selectedTab

        return (
            <div className='main-panel'>
                {
                    this.renderMainPanelTabs()
                }
                <div className='main-panel_container'>
                    {
                        selectedTab === State.MainPanelTabs.Auction
                        && <Auction />
                    }
                    {
                        selectedTab === State.MainPanelTabs.Resources
                        && <Resources />
                    }
                    {
                        selectedTab === State.MainPanelTabs.Action
                        && this.renderActionComponent()
                    }
                </div>
            </div>
        )
    }
    private renderMainPanelTabs(): React.ReactElement<{}> {
        const selectedTab: State.MainPanelTabs = this.props.mainPanel.selectedTab
        const auctionSelected: boolean = selectedTab === State.MainPanelTabs.Auction
        const resourcesSelected: boolean = selectedTab === State.MainPanelTabs.Resources
        const actionSelected: boolean = selectedTab === State.MainPanelTabs.Action
        return (
            <div className='main-panel_tabs'>
                <div
                    className={
                        classNames('main-panel_tab', {
                            'main-panel_tab__selected': auctionSelected,
                        })
                    }
                    onClick={() => this.handleTabClick(State.MainPanelTabs.Auction)}
                >
                    {'Auction'}
                </div>
                <div
                    className={
                        classNames('main-panel_tab', 'main-panel_tab__right', {
                            'main-panel_tab__selected': resourcesSelected,
                        })
                    }
                    onClick={() => this.handleTabClick(State.MainPanelTabs.Resources)}
                >
                    {'Resources'}
                </div>
                {
                    !this.props.mainPanel.showActionTab
                    &&
                    <div
                        className={
                            classNames('main-panel_tab', 'main-panel_tab__center', {
                                'main-panel_tab__selected': actionSelected,
                            })
                        }
                        onClick={() => this.handleTabClick(State.MainPanelTabs.Action)}
                    >
                        {'Action'}
                    </div>
                }
            </div>
        )
    }
    private renderActionComponent(): React.ReactElement<{}> {
        switch(this.props.game.meta.step) {
            case constants.StepTypes.AUCTION:
                return <AuctionAction />
            case constants.StepTypes.AUCTION_STATIONS:
                return null  // TODO: change to real component
            case constants.StepTypes.RESOURCES:
                return null  // TODO: change to real component
            case constants.StepTypes.BUILDING:
                return null  // TODO: change to real component
            default:
                return null
        }
    }
    private handleTabClick(tab: State.MainPanelTabs): void {
        this.props.selectTab(tab)
    }

}

export default connect(
    (state: State.IState): any => {
        return {
            game: state.game,
            mainPanel: state.mainPanel,
        }
    },
    {
        selectTab,
        toggleTab,
    }
)(MainPanel)

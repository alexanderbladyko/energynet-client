import * as React from 'react'
import {
    connect,
} from 'react-redux'
import * as classNames from 'classnames'

import {
    selectTab,
    toggleTab,
    togglePanels,
} from 'actions/mainPanel'
import Auction from 'containers/Auction/Auction'
import AuctionAction from 'containers/AuctionAction/AuctionAction'
import CitiesBuy from 'containers/CitiesBuy/CitiesBuy'
import ExcludeStation from 'containers/ExcludeStation/ExcludeStation'
import Resources from 'containers/Resources/Resources'
import ResourcesBuy from 'containers/ResourcesBuy/ResourcesBuy'
import * as constants from 'constants'
import * as State from 'state'

import './MainPanel.scss'


interface IMainPanelProps {
    game: State.IGameState
    mainPanel: State.IMainPanelState
    selectTab: typeof selectTab
    toggleTab: typeof toggleTab
    togglePanels: typeof togglePanels
}


class MainPanel extends React.Component<IMainPanelProps, {}> {
    public render(): React.ReactElement<{}> {
        const selectedTab: State.MainPanelTabs = this.props.mainPanel.selectedTab

        return (
            <div className={
                classNames('main-panel', {
                    'main-panel__collapsed': !this.props.mainPanel.expanded,
                })
            }>

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
                <div className='main-panel_toggle' onClick={() => this.props.togglePanels()}>
                    Toggle
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
                {
                    !this.props.mainPanel.showActionTab
                    &&
                    <div
                        className={
                            classNames('main-panel_tab', {
                                'main-panel_tab__selected': actionSelected,
                            })
                        }
                        onClick={() => this.handleTabClick(State.MainPanelTabs.Action)}
                    >
                        {'Action'}
                    </div>
                }
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
                        classNames('main-panel_tab', {
                            'main-panel_tab__selected': resourcesSelected,
                        })
                    }
                    onClick={() => this.handleTabClick(State.MainPanelTabs.Resources)}
                >
                    {'Resources'}
                </div>
            </div>
        )
    }
    private renderActionComponent(): React.ReactElement<{}> {
        switch (this.props.game.meta.step) {
            case constants.StepTypes.AUCTION:
                return <AuctionAction />
            case constants.StepTypes.EXCLUDE_STATION:
                return <ExcludeStation />
            case constants.StepTypes.RESOURCES_BUY:
                return <ResourcesBuy />
            case constants.StepTypes.CITIES_BUY:
                return <CitiesBuy />
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
        togglePanels,
    }
)(MainPanel)

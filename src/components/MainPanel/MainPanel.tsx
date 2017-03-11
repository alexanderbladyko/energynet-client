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
import Resources from 'components/Resources/Resources'
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
        const auctionSelected: boolean = this.props.mainPanel.selectedTab === State.MainPanelTabs.Auction
        const resourcesSelected: boolean = this.props.mainPanel.selectedTab === State.MainPanelTabs.Resources
        return (
            <div className='main-panel'>
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
                    && <div className='main-panel_tab main-panel_tab__center'>{'Action'}</div>
                }
                {
                    this.props.mainPanel.selectedTab === State.MainPanelTabs.Auction
                    && <Auction />
                }
                {
                    this.props.mainPanel.selectedTab === State.MainPanelTabs.Resources
                    && <Resources />
                }
            </div>
        )
    }
    private handleTabClick(tab: State.MainPanelTabs): void {
        // if (this.props.mainPanel.selectedTab === tab) {
        //     this.props.toggleTab()
        // }
        // if (this.props.mainPanel.locked) {
        //     return
        // }
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

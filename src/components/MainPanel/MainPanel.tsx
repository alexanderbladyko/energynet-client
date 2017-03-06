import * as React from 'react'
import {
    connect,
} from 'react-redux'

import Auction from 'components/Auction/Auction'
import Resources from 'components/Resources/Resources'
import * as State from 'state'

import './MainPanel.scss'


interface IMainPanelProps {
    game: State.IGameState
    mainPanel: State.IMainPanelState
}


class MainPanel extends React.Component<IMainPanelProps, {}> {
    public render(): React.ReactElement<{}> {
        return (
            <div className='main-panel'>
                <div className='main-panel_tab'>{'Auction'}</div>
                <div className='main-panel_tab main-panel_tab__right'>{'Resources'}</div>
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
}

export default connect(
    (state: State.IState): any => {
        return {
            game: state.game,
            mainPanel: state.mainPanel,
        }
    },
    {
    }
)(MainPanel)

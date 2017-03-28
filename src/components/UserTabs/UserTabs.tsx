import * as React from 'react'
import {
    connect,
} from 'react-redux'
import * as classNames from 'classnames'

import {
    selectTab,
    toggleTab,
} from 'actions/userTabs'
import Currency from 'components/Currency/Currency'
import Buildings from 'components/Buildings/Buildings'
import Resource from 'components/Resource/Resource'
import Station from 'components/Station/Station'
import * as constants from 'constants'
import * as State from 'state'

import './UserTabs.scss'


interface IUserTabsProps {
    game: State.IGameState
    userTabs: State.IUserTabsState
    selectTab: typeof selectTab
    toggleTab: typeof toggleTab
}


class UserTabs extends React.Component<IUserTabsProps, {}> {
    public render(): React.ReactElement<{}> {
        return (
            <div className='users'>
                {this.renderUserTabs()}
                {this.renderUserInfo()}
            </div>
        )
    }
    public renderUserTabs(): React.ReactElement<{}> {
        return (
            <div
                className={
                    classNames({
                        'users-tabs': true,
                        'users-tabs__selectable': !this.props.userTabs.locked,
                    })
                }
            >
                {
                    this.props.game.data.map(user => {
                        const isSelected: boolean = this.props.userTabs.selectedUserId === user.id
                        const locked: boolean = this.props.userTabs.locked
                        return (
                            <div
                                key={user.id}
                                className={
                                    classNames({
                                        'users-tabs_item': true,
                                        'users-tabs_item__selected': isSelected,
                                        'users-tabs_item__locked': isSelected && locked,
                                    })
                                }
                                style={{
                                    backgroundColor: user.color,
                                }}
                                onClick={() => this.handleTabClick(user.id)}
                            >
                                <div className='users-tabs_value'>
                                    <Currency
                                        value={user.cash}
                                        size={Currency.IconSize.SMALL}
                                    />
                                </div>
                                <div className='users-tabs_value'>
                                    <Buildings
                                        value={user.cities.length}
                                        size={Buildings.IconSize.SMALL}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    public renderUserInfo(): React.ReactElement<{}> {
        const userInfo: State.IGamePlayer = this.props.game.data.find(
            game => game.id === this.props.userTabs.selectedUserId
        )
        return (
            <div className='users-info'>
                <div className='users-info_stations'>
                    {
                        userInfo.stations.map(station => {
                            return (
                                <Station key={station} stationId={station} />
                            )
                        })
                    }
                </div>
                <div className='users-info_resources'>
                    <div className='users-info_resources_item'>
                        <span className='users-info_resources_text'>
                            {userInfo.resources.coal}
                        </span>
                        <Resource
                        resources={[constants.ResourceTypes.COAL, ]}
                        size={Resource.IconSize.SMALL}
                        />
                    </div>
                    <div className='users-info_resources_item'>
                        <span className='users-info_resources_text'>
                            {userInfo.resources.oil}
                        </span>
                        <Resource
                        resources={[constants.ResourceTypes.OIL, ]}
                        size={Resource.IconSize.SMALL}
                        />
                    </div>
                    <div className='users-info_resources_item'>
                        <span className='users-info_resources_text'>
                            {userInfo.resources.waste}
                        </span>
                        <Resource
                        resources={[constants.ResourceTypes.WASTE, ]}
                        size={Resource.IconSize.SMALL}
                        />
                    </div>
                    <div className='users-info_resources_item'>
                        <span className='users-info_resources_text'>
                            {userInfo.resources.uranium}
                        </span>
                        <Resource
                        resources={[constants.ResourceTypes.URANIUM, ]}
                        size={Resource.IconSize.SMALL}
                        />
                    </div>
                </div>
            </div>
        )
    }
    private handleTabClick(userId: number): void {
        if (this.props.userTabs.selectedUserId === userId) {
            this.props.toggleTab()
        }
        if (this.props.userTabs.locked) {
            return
        }
        this.props.selectTab(userId)
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            game: state.game,
            userTabs: state.userTabs,
        }
    },
    {
        selectTab,
        toggleTab,
    }
)(UserTabs)

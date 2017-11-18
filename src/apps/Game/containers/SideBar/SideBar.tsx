import * as React from 'react'
import {
    connect,
} from 'react-redux'
import * as classNames from 'classnames'

import * as State from 'state'

import './SideBar.scss'


interface ISideBarProps {
    mapDragging: boolean
}


class SideBar extends React.Component<ISideBarProps, {}> {
    public render(): React.ReactElement<{}> {
        return (
            <div className={
                classNames('side-bar', {
                    'side-bar__collapsed': this.props.mapDragging,
                })
            }>
            </div>
        )
    }
}

export default connect<any, any, { mapDragging: boolean }>(
    (state: State.IState): any => {
        return {
        }
    },
    {
    }
)(SideBar)

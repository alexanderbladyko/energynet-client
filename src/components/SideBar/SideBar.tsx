import * as React from 'react'

import './SideBar.scss'

export interface ISideBarButtonProps {
    type: string
    text?: string
    onClick?: Function
}

export class SideBarIcon {
    public static APPLY: string = 'apply'
    public static CANCEL: string = 'cancel'
}

export class SideBarButton extends React.Component<ISideBarButtonProps, {}> {
    public render(): React.ReactElement<{}> {
        return (
            <div
                className={`side-bar_button side-bar_button__${this.props.type}`}
                onClick={() => this.props.onClick && this.props.onClick()}
            >
            {this.props.text}
            </div>
        )
    }
}

export function SideBarExpander(): React.ReactElement<{}> {
    return (
        <div className='side-bar_expander'>
        </div>
    )
}


export class SideBar extends React.Component<{}, {}> {
    public render(): React.ReactElement<{}> {
        return (
            <div className='side-bar'>
                {this.props.children}
            </div>
        )
    }
}

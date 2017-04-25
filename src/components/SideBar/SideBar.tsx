import * as React from 'react'

import './SideBar.scss'

export function SideBarButton(): React.ReactElement<{}> {
    return (
        <div className='side-bar_button'>
        </div>
    )
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

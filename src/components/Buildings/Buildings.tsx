import * as React from 'react'
import * as classNames from 'classnames'

import './Buildings.scss'


interface IBuildingsProps {
    value: number
    size?: IconSize
}

enum IconSize {
    SMALL,
    BIG,
}


export default class Buildings extends React.Component<IBuildingsProps, {}> {
    public static IconSize: typeof IconSize = IconSize

    public render(): React.ReactElement<{}> {
        return (
            <div
                className={
                    classNames('buildings', {
                        'buildings__big': this.props.size === IconSize.BIG,
                        'buildings__small': this.props.size === IconSize.SMALL,
                    })
                }
            >
                {this.props.value}
            </div>
        )
    }
}

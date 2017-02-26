import * as React from 'react'
import * as classNames from 'classnames'

import './Currency.scss'


interface ICurrencyProps {
    value: number
    size?: IconSize
}


enum IconSize {
    SMALL,
    BIG,
}


export default class Currency extends React.Component<ICurrencyProps, {}> {
    public static IconSize: typeof IconSize = IconSize

    public render(): React.ReactElement<{}> {
        return (
            <span
                className={
                    classNames('currency', {
                        'currency__big': this.props.size === IconSize.BIG,
                        'currency__small': this.props.size === IconSize.SMALL,
                    })
                }
            >
                {this.props.value}
            </span>
        )
    }
}

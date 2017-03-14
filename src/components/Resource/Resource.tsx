import * as React from 'react'
import * as classNames from 'classnames'

import './Resource.scss'


interface IResourceProps {
    resources: string[]
    width?: number
    height?: number
    size?: IconSize
    disabled?: boolean
}


enum IconSize {
    SMALL,
    BIG,
}


export default class Resource extends React.Component<IResourceProps, {}> {
    public static IconSize: typeof IconSize = IconSize

    public render(): React.ReactElement<{}> {
        return (
            <div
                className={
                    classNames('resource', {
                        'resource__big': this.props.size === IconSize.BIG,
                        'resource__small': this.props.size === IconSize.SMALL,
                        'resource__disabled': this.props.disabled,
                    })
                }
                style={{
                    width: this.props.width,
                    height: this.props.height,
                }}
            >
                {
                    this.props.resources.map(resource => {
                        return (
                            <div
                                key={resource}
                                className={`resource_item resource_item__${resource}`}
                            ></div>
                        )
                    })
                }
            </div>
        )
    }
}

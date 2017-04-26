import * as React from 'react'

import './Button.scss'


interface IButtonProps {
    text: string
    onClick: Function
    disabled?: boolean
}


export default class Button extends React.Component<IButtonProps, {}> {
    public static defaultProps: Partial<IButtonProps> = {
        disabled: false,
    }

    public render(): React.ReactElement<{}> {
        return (
            <button
                className={
                    classNames('button', {
                        'button__disabled': this.props.disabled,
                    })
                }
                onClick={() => this.props.onClick()}
            >
                {this.props.text}
            </button>
        )
    }
}

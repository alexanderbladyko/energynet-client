import * as React from 'react'


export default class  extends React.Component<{}, {}> {
    public render(): React.ReactElement<{}> {
        return (
            <div>
                <div>
                {'Header'}
                </div>
                <div>
                {'Body'}
                </div>
                <div>
                {'Footer'}
                </div>
            </div>
        )
    }
}

import * as React from 'react'


export default class Loading extends React.Component<{}, {}> {
    public render(): React.ReactElement<{}> {
        return (
            <div>
                {'Loading...'}
            </div>
        )
    }
}

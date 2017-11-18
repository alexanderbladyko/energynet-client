import * as React from 'react'


export default class Error extends React.Component<{}, {}> {
    public render(): React.ReactElement<{}> {
        return (
            <div>
                {'Sorry, error happened. Try to refresh...'}
            </div>
        )
    }
}

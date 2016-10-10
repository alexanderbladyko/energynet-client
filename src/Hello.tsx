import * as React from 'react'

interface IHelloProps {
    name: string;
}

class Hello extends React.Component<IHelloProps, {}> {
    public render(): any {
        return <div>Hello, {this.props.name}</div>
    }
}

export default Hello

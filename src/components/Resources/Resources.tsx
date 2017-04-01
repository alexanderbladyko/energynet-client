import * as React from 'react'
import {
    connect,
} from 'react-redux'
// hotfix for scrollbar module
declare function require(arg: string): any;
const ReactScrollbarModule: any = require('react-scrollbar')
const ScrollArea: any = ReactScrollbarModule.default


import * as constants from 'constants'
import Currency from 'components/Currency/Currency'
import Resource from 'components/Resource/Resource'
import * as State from 'state'
import { fixContainerWidth, } from 'utils/react'

import './Resources.scss'


interface IResourcesProps {
    game: State.IGameState
    userInfo: State.IUserInfoState
    resources: State.IResourcesState
    map: State.IMapState
}


class Resources extends React.Component<IResourcesProps, {}> {
    public componentDidMount(): void {
        fixContainerWidth('.js-resources')
    }
    public render(): React.ReactElement<{}> {
        if (!this.props.resources.data || !this.props.map.data) {
            return null
        }
        const minCost: number = this.getMinCost()
        const limitCost: number = this.getLimitCost()

        const blocks: any[] = []
        for (let i: number = minCost; i <= limitCost; i++) {
            blocks.push(this.renderResourceBlock(i))
        }
        return (
            <ScrollArea
                horizontal={true}
                vertical={false}
                contentClassName={`resources js-resources`}
            >
                {blocks}
            </ScrollArea>
        )
    }
    private renderResourceBlock(cost: number): React.ReactElement<{}> {
        return (
            <div className='resources_block' key={cost}>
                <div className='resources_block-cost'>
                    <Currency value={cost} size={Currency.IconSize.SMALL} />
                </div>
                {
                    constants.ResourceTypes.ALL.map(resource => {
                        return this.renderResourceLine(resource, cost)
                    })
                }
            </div>
        )
    }
    private renderResourceLine(resource: string, cost: number): React.ReactElement<{}> {
        const resourceGroupCount: number = this.props.map.data.resourceGroup[resource]
        const resourceLimit: number = this.props.map.data.resourceLimits[resource]
        const resourceCount: number = this.props.resources.data[resource]
        const minFullCost: number = Math.ceil((resourceLimit - resourceCount) / resourceGroupCount)
        let after: number = (minFullCost - cost) * resourceGroupCount
        if (minFullCost === cost) {
            after = (resourceLimit - resourceCount) % resourceGroupCount - 1
            if (resourceGroupCount === 1) {
                after++
            }
        }
        const resources: any[] = []
        for (let i: number = 0; i < resourceGroupCount; i++) {
            resources.push(
                <Resource
                    key={i}
                    resources={[resource, ]}
                    size={Resource.IconSize.SMALL}
                    disabled={i <= after}
                />
            )
        }
        return (
            <div key={resource} className='resources_items'>
                {resources}
            </div>
        )
    }
    private getMinCost(): number {
        const minPrices: number[] = constants.ResourceTypes.ALL.map(resource => {
            const resourceGroupCount: number = this.props.map.data.resourceGroup[resource]
            const resourceLimit: number = this.props.map.data.resourceLimits[resource]
            const resourceCount: number = this.props.resources.data[resource]
            return Math.ceil((resourceLimit - resourceCount) / resourceGroupCount)
        })
        return Math.min(...minPrices)
    }
    private getLimitCost(): number {
        const maxPrices: number[] = constants.ResourceTypes.ALL.map(resource => {
            const resourceGroupCount: number = this.props.map.data.resourceGroup[resource]
            const resourceLimit: number = this.props.map.data.resourceLimits[resource]
            return Math.ceil(resourceLimit / resourceGroupCount)
        })
        return Math.min(...maxPrices)
    }
}

export default connect(
    (state: State.IState): any => {
        return {
            game: state.game,
            map: state.map,
            userInfo: state.userInfo,
            resources: state.resources,
        }
    },
)(Resources)

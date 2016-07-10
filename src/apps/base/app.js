import { bindActionCreators } from 'redux'


export default class BaseApp {
    start(store) {
        this._store = store
        this._initActionCreators()
        this.setup()
    }

    _initActionCreators() {
        const actions = this.actions()
        this.dispatch = bindActionCreators(actions, this._store.dispatch)
        const actionCreators = this.actionCreators()
        for (let key in actionCreators) {
            this.dispatch[key] = () => {
                const actionCreator = actionCreators[key].apply(undefined, arguments)
                return actionCreator(this._store.dispatch)
            }
        }
    }

    setup() {}

    getState() {
        return this.stateLens(this._store.getState())
    }

    actions() {
        return {}
    }

    actionCreators() {
        return {}
    }

    stateLens(state) {
        return state
    }
}

import { bindActionCreators } from 'redux'


export default class BaseApp {
    init(store) {
        this._initActionCreators(store)
        this.setup(store)
    }

    start(store) {
        this.onStart(store)
    }

    _initActionCreators(store) {
        const actions = this.actions(store.dispatch)
        this.dispatch = bindActionCreators(actions, store.dispatch)
    }

    setup() {}

    onStart() {}

    actions() {
        return {}
    }

    connect() {}
}

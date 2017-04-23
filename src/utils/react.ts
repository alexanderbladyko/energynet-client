export function fixContainerWidth(selector: string): void {
    requestAnimationFrame(() => {
        const container: any = document.querySelector(selector)
        if (!container) {
            return
        }
        let width: number = 0
        for (let i: number = 0; i < container.children.length; i++) {
            width += container.children[i].clientWidth
        }
        container.style.width = width + 'px'
    })
}


export function fixWrappedFlexbox(selector: string): void {
    const container: any = document.querySelector(selector)
    if (!container) {
        return
    }
    if (container.children.length === 0) {
        return
    }
    const lastChild: any = container.children[container.children.length - 1]
    container.style.width = (
        lastChild.offsetLeft - container.offsetLeft + lastChild.clientWidth + 20
    ) + 'px'
}

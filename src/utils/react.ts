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

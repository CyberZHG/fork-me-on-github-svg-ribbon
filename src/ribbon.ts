// @ts-ignore
import { SVGDiagram, SVGNode } from 'sp-svg-diagram';

export function setupRibbonInputOnChange(element: HTMLInputElement, ribbonForm: HTMLFormElement) {
    element.addEventListener('change', () => {
        ribbonForm.requestSubmit()
    })
}

export function setupSubmitForm(element: HTMLFormElement, ribbonContainers: HTMLDivElement[]) {
    element.addEventListener('submit', (e) => {
        e.preventDefault()
        const formElement = e.currentTarget as HTMLFormElement
        const formData = new FormData(formElement)!
        const data = Object.fromEntries(formData.entries())
        const results = generateRibbons(data)
        for (let i = 0; i < 4; ++i) {
            ribbonContainers[i].innerHTML = results[i];
            const svg = ribbonContainers[i].querySelector<SVGSVGElement>('svg')
            svg?.classList.add("w-full", "h-full", "object-cover")
            if (data["text-bold"] == "on") {
                const text = ribbonContainers[i].querySelector<SVGSVGElement>('text')
                text?.setAttribute("font-weight", "bold")
            }
        }
    })
    element.requestSubmit()
}

export function setupDownloadButton(element: HTMLButtonElement, ribbonContainer: HTMLDivElement) {
    element.addEventListener('click', () => {
        const svgElement = ribbonContainer.querySelector<SVGSVGElement>('svg')
        svgElement?.classList.remove("w-full", "h-full", "object-cover");
        const svg = ribbonContainer.innerHTML
        const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'fork-me-ribbon.svg'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        svgElement?.classList.add("w-full", "h-full", "object-cover");
    })
}

export function generateRibbons(data: { [k: string]: FormDataEntryValue; }) : string[] {
    let svgs : string[] = []
    const ribbonText = data["ribbon-text"]
    const ribbonColor = data["ribbon-color"]
    const textColor = data["text-color"]
    const threadColor = data["thread-color"]
    const imageSize = parseFloat(data["image-size"] as string)
    const halfDiagonalLength = imageSize * Math.sqrt(2.0) / 2.0
    const ribbonShift = parseFloat(data["ribbon-shift"] as string) / 100 * halfDiagonalLength
    const ribbonHeight = parseFloat(data["ribbon-height"] as string) / 100 * imageSize
    const threadMargin = parseFloat(data["thread-margin"] as string) / 100 * ribbonHeight
    const shadowHeight = parseFloat(data["shadow-height"] as string) / 100 * ribbonHeight
    const drawShadow = data["draw-shadow"]
    const fontFamily = data["font-family"]
    const fontSize = parseFloat(data["font-size"] as string) / 100 * ribbonHeight
    for (let i = 0; i < 4; ++i) {
        const diagram = new SVGDiagram()
        diagram.setFixedViewBox(0, 0, imageSize, imageSize)
        if (i == 0 || i == 3) {
            diagram.setRotation(-45)
        } else {
            diagram.setRotation(45)
        }
        let centerY = imageSize / 2
        if (i == 0 || i == 1){
            centerY -= ribbonShift;
        } else {
            centerY += ribbonShift;
        }
        if (drawShadow == "on") {
            const shadow = diagram.addNode("shadow")
            shadow.setShape(SVGNode.SHAPE_RECT)
            shadow.setColor("none")
            shadow.setCenter(imageSize / 2, centerY)
            shadow.setFixedSize(1000, shadowHeight)
            shadow.setGradientAngle(90)
            shadow.setFillColor("#00000000:#000000A8:#00000000")
            shadow.delete()
        }
        const ribbon = diagram.addNode("ribbon")
        ribbon.setShape(SVGNode.SHAPE_RECT)
        ribbon.setCenter(imageSize / 2, centerY)
        ribbon.setLabel(ribbonText)
        ribbon.setColor("none")
        ribbon.setFillColor(ribbonColor)
        ribbon.setFixedSize(1000, ribbonHeight)
        ribbon.setFontColor(textColor)
        ribbon.setFontName(fontFamily)
        ribbon.setFontSize(fontSize)
        ribbon.delete()
        const thread = diagram.addNode("thread")
        thread.setShape(SVGNode.SHAPE_RECT)
        thread.setCenter(imageSize / 2, centerY)
        thread.setColor(threadColor)
        thread.setFillColor("none")
        thread.setStyle("dashed")
        thread.setFixedSize(1000, ribbonHeight - threadMargin * 2)
        thread.delete()
        let svg = diagram.render()
        svg = svg.replaceAll('stroke-dasharray="5,2"', 'stroke-dasharray="2,2"')
        svgs.push(svg)
    }
    return svgs
}

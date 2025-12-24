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
    const length = 150
    const ribbonText = data["ribbon-text"]
    const ribbonColor = data["ribbon-color"]
    const ribbonShift = parseFloat(data["ribbon-shift"] as string) / 100 * length * 0.7071
    for (let i = 0; i < 4; ++i) {
        const diagram = new SVGDiagram()
        diagram.setFixedViewBox(0, 0, length, length)
        if (i == 0 || i == 3) {
            diagram.setRotation(-45)
        } else {
            diagram.setRotation(45)
        }
        let centerY = length / 2
        if (i == 0 || i == 1){
            centerY -= ribbonShift;
        } else {
            centerY += ribbonShift;
        }
        const shadow = diagram.addNode("shadow")
        shadow.setShape(SVGNode.SHAPE_RECT)
        shadow.setColor("none")
        shadow.setCenter(75, centerY)
        shadow.setFixedSize(400, 38)
        shadow.setGradientAngle(90)
        shadow.setFillColor("#00000000:#000000A8:#00000000")
        shadow.delete()
        const ribbon = diagram.addNode("ribbon")
        ribbon.setShape(SVGNode.SHAPE_RECT)
        ribbon.setCenter(75, centerY)
        ribbon.setLabel(ribbonText)
        ribbon.setColor("none")
        ribbon.setFillColor(ribbonColor)
        ribbon.setFixedSize(400, 30)
        ribbon.setFontColor("white")
        ribbon.setFontName("Helvetica Neue, Arial, sans-serif")
        ribbon.delete()
        const stitching = diagram.addNode("stitching")
        stitching.setShape(SVGNode.SHAPE_RECT)
        stitching.setCenter(75, centerY)
        stitching.setColor("gray")
        stitching.setFillColor("none")
        stitching.setStyle("dashed")
        stitching.setFixedSize(400, 25)
        stitching.delete()
        let svg = diagram.render()
        svg = svg.replaceAll('stroke-dasharray="5,2"', 'stroke-dasharray="2,2"')
        svgs.push(svg)
    }
    return svgs
}

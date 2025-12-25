import { SVGDiagram, SVGNode } from 'sp-svg-diagram'

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
            ribbonContainers[i].innerHTML = results[i]
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

export function setupDownloadButton(element: HTMLButtonElement, ribbonContainer: HTMLDivElement, suffix: string = "", toPng: boolean = false) {
    element.addEventListener('click', () => {
        const svgElement = ribbonContainer.querySelector<SVGSVGElement>('svg')!
        let svg = ribbonContainer.innerHTML
        svg = svg.replaceAll(" class=\"w-full h-full object-cover\"", "")
        const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
        let url = URL.createObjectURL(blob)

        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => {
            let fileName = `fork-me-ribbon${suffix}.svg`
            if (toPng) {
                fileName = `fork-me-ribbon${suffix}.png`
                const scale = window.devicePixelRatio
                const bbox = svgElement.getBoundingClientRect()
                const canvas = document.createElement("canvas")!
                canvas.width = bbox.width * scale
                canvas.height = bbox.height * scale
                const ctx = canvas.getContext("2d")!
                ctx.scale(scale, scale)
                ctx.drawImage(img, 0, 0, bbox.width, bbox.height)
                url = canvas.toDataURL("image/png")
            }

            const a = document.createElement('a')
            a.href = url
            a.download = fileName
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
        }
        img.src = url
    })
}

export function generateRibbons(data: { [k: string]: FormDataEntryValue; }) : string[] {
    let svgs : string[] = []
    const ribbonText = data["ribbon-text"] as string
    const ribbonColor = data["ribbon-color"] as string
    const textColor = data["text-color"] as string
    const threadColor = data["thread-color"] as string
    const imageSize = parseFloat(data["image-size"] as string)
    const halfDiagonalLength = imageSize * Math.sqrt(2.0) / 2.0
    const ribbonShift = parseFloat(data["ribbon-shift"] as string) / 100 * halfDiagonalLength
    const ribbonHeight = parseFloat(data["ribbon-height"] as string) / 100 * imageSize
    const threadMargin = parseFloat(data["thread-margin"] as string) / 100 * ribbonHeight
    const shadowHeight = parseFloat(data["shadow-height"] as string) / 100 * ribbonHeight
    const drawShadow = data["draw-shadow"] as string
    const fontFamily = data["font-family"] as string
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
            centerY -= ribbonShift
        } else {
            centerY += ribbonShift
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

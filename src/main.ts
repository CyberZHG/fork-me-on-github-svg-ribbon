import './style.css'
import {setupRibbonInputOnChange, setupSubmitForm, setupDownloadButton} from './ribbon.ts'

const ribbonForm = document.querySelector<HTMLFormElement>('#ribbon-form')!
const ribbonContainers = [
    document.querySelector<HTMLDivElement>('#ribbon-container-top-left')!,
    document.querySelector<HTMLDivElement>('#ribbon-container-top-right')!,
    document.querySelector<HTMLDivElement>('#ribbon-container-bottom-left')!,
    document.querySelector<HTMLDivElement>('#ribbon-container-bottom-right')!,
]
const downloadButtons = [
    document.querySelector<HTMLButtonElement>('#download-top-left-svg')!,
    document.querySelector<HTMLButtonElement>('#download-top-right-svg')!,
    document.querySelector<HTMLButtonElement>('#download-bottom-left-svg')!,
    document.querySelector<HTMLButtonElement>('#download-bottom-right-svg')!,
    document.querySelector<HTMLButtonElement>('#download-top-left-png')!,
    document.querySelector<HTMLButtonElement>('#download-top-right-png')!,
    document.querySelector<HTMLButtonElement>('#download-bottom-left-png')!,
    document.querySelector<HTMLButtonElement>('#download-bottom-right-png')!,
]
const ribbonShift = document.querySelector<HTMLInputElement>('#ribbon-shift')!
const imageSize = document.querySelector<HTMLInputElement>('#image-size')!
const ribbonHeight = document.querySelector<HTMLInputElement>('#ribbon-height')!
const threadMargin = document.querySelector<HTMLInputElement>('#thread-margin')!
const shadowHeight = document.querySelector<HTMLInputElement>('#shadow-height')!
const fontSize = document.querySelector<HTMLInputElement>('#font-size')!

setupRibbonInputOnChange(document.querySelector<HTMLInputElement>('#ribbon-text')!, ribbonForm)
setupRibbonInputOnChange(document.querySelector<HTMLInputElement>('#ribbon-color')!, ribbonForm)
setupRibbonInputOnChange(document.querySelector<HTMLInputElement>('#text-color')!, ribbonForm)
setupRibbonInputOnChange(document.querySelector<HTMLInputElement>('#thread-color')!, ribbonForm)
setupRibbonInputOnChange(ribbonShift, ribbonForm)
setupRibbonInputOnChange(imageSize, ribbonForm)
setupRibbonInputOnChange(ribbonHeight, ribbonForm)
setupRibbonInputOnChange(threadMargin, ribbonForm)
setupRibbonInputOnChange(shadowHeight, ribbonForm)
setupRibbonInputOnChange(fontSize, ribbonForm)
setupRibbonInputOnChange(document.querySelector<HTMLInputElement>('#draw-shadow')!, ribbonForm)
setupRibbonInputOnChange(document.querySelector<HTMLInputElement>('#text-bold')!, ribbonForm)
setupRibbonInputOnChange(document.querySelector<HTMLInputElement>('#font-family')!, ribbonForm)
setupSubmitForm(ribbonForm, ribbonContainers)

setupDownloadButton(downloadButtons[0], ribbonContainers[0], "-top-left")
setupDownloadButton(downloadButtons[1], ribbonContainers[1], "-top-right")
setupDownloadButton(downloadButtons[2], ribbonContainers[2], "-bottom-left")
setupDownloadButton(downloadButtons[3], ribbonContainers[3], "-bottom-right")
setupDownloadButton(downloadButtons[4], ribbonContainers[0], "-top-left", true)
setupDownloadButton(downloadButtons[5], ribbonContainers[1], "-top-right", true)
setupDownloadButton(downloadButtons[6], ribbonContainers[2], "-bottom-left", true)
setupDownloadButton(downloadButtons[7], ribbonContainers[3], "-bottom-right", true)

function setupRangeValueDisplay(rangeInput: HTMLInputElement, valueID: string) {
    rangeInput.addEventListener('input', () => {
        const valueElement = document.querySelector<HTMLSpanElement>(valueID)
        if (valueElement) {
            valueElement.textContent = rangeInput.value
        }
    })
}
setupRangeValueDisplay(ribbonShift, '#ribbon-shift-value')
setupRangeValueDisplay(imageSize, '#image-size-value')
setupRangeValueDisplay(ribbonHeight, '#ribbon-height-value')
setupRangeValueDisplay(threadMargin, '#thread-margin-value')
setupRangeValueDisplay(shadowHeight, '#shadow-height-value')
setupRangeValueDisplay(fontSize, '#font-size-value')

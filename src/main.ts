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
    document.querySelector<HTMLButtonElement>('#download-top-left')!,
    document.querySelector<HTMLButtonElement>('#download-top-right')!,
    document.querySelector<HTMLButtonElement>('#download-bottom-left')!,
    document.querySelector<HTMLButtonElement>('#download-bottom-right')!,
]
const ribbonShift = document.querySelector<HTMLInputElement>('#ribbon-shift')!
const imageSize = document.querySelector<HTMLInputElement>('#image-size')!
setupRibbonInputOnChange(document.querySelector<HTMLInputElement>('#ribbon-text')!, ribbonForm)
setupRibbonInputOnChange(document.querySelector<HTMLInputElement>('#ribbon-color')!, ribbonForm)
setupRibbonInputOnChange(document.querySelector<HTMLInputElement>('#text-color')!, ribbonForm)
setupRibbonInputOnChange(document.querySelector<HTMLInputElement>('#thread-color')!, ribbonForm)
setupRibbonInputOnChange(ribbonShift, ribbonForm)
setupRibbonInputOnChange(imageSize, ribbonForm)
setupSubmitForm(ribbonForm, ribbonContainers)

for (let i = 0; i < 4; ++i) {
    setupDownloadButton(downloadButtons[i], ribbonContainers[i])
}

ribbonShift.addEventListener('input', () => {
    const valueElement = document.querySelector<HTMLSpanElement>('#ribbon-shift-value')
    if (valueElement) {
        valueElement.textContent = ribbonShift.value
    }
})

imageSize.addEventListener('input', () => {
    const valueElement = document.querySelector<HTMLSpanElement>('#image-size-value')
    if (valueElement) {
        valueElement.textContent = imageSize.value
    }
})

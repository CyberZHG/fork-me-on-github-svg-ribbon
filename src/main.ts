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
setupRibbonInputOnChange(document.querySelector<HTMLInputElement>('#ribbon-text')!, ribbonForm)
setupRibbonInputOnChange(document.querySelector<HTMLInputElement>('#ribbon-color')!, ribbonForm)
setupRibbonInputOnChange(document.querySelector<HTMLInputElement>('#ribbon-shift')!, ribbonForm)
setupSubmitForm(ribbonForm, ribbonContainers)

for (let i = 0; i < 4; ++i) {
    setupDownloadButton(downloadButtons[i], ribbonContainers[i])
}
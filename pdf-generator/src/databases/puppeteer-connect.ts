import puppeteer, { Browser, executablePath } from 'puppeteer';
import { logger } from '../helpers/logging'


export const PuppeteerConnect  = async(): Promise<Browser | undefined> => {
    try {        
        const browser = await puppeteer.launch({
            executablePath: executablePath(),
            headless: true
        });
        
        logger.info('Connect to puppeteer');
        
        return browser;
    } catch (error) {
        logger.error('Error puppeteer', { error: error instanceof Error ? error.message : error })
        return undefined;
    }
}
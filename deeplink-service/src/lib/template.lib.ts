import * as handlebars from 'handlebars'
import * as utils from '../utils'

export class TemplateClass {
    private fs = require('fs');
    constructor() {
    }
    compileFile(template, complieData: Object) {
        return new Promise((resolve, reject) => {
            this.fs.readFile(template, 'utf8', (error, content) => {
                if (error)
                    reject(error);
                try {
                    const template = handlebars.compile(content)
                    let html = template(complieData)
                    resolve(html)
                } catch (error) {
                    reject(error)
                }
            })
        });
    }
}

export const templateLib = new TemplateClass()

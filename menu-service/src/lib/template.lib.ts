import * as handlebars from 'handlebars'
import * as utils from '../utils'

export class TemplateClass {
    private fs = require('fs');
    constructor() {
    }
    compileFile(template, complieData: Object) {
        return new Promise((resolve, reject) => {
            this.fs.readFile(template, 'utf8', (err, content) => {
                if (err)
                    reject(err);
                try {
                    const template = handlebars.compile(content)
                    let html = template(complieData)
                    resolve(html)
                } catch (err) {
                    reject(err)
                }
            })
        });
    }
}

export const templateLib = new TemplateClass()

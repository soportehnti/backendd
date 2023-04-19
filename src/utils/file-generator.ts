import * as fs from 'fs';
import * as Mustache from 'mustache';
import * as path from 'path';

const templatesNameList = {
    'general-report-english': 'report/general-report-english.mustache',
    'general-report-spanish': 'report/general-report-spanish.mustache',
    'ticket-english': 'ticket/ticket-english.mustache',
    'ticket-spanish': 'ticket/ticket-spanish.mustache',
} as const;

export type Templates = keyof typeof templatesNameList;

interface IFileInput {
    template: Templates;
    data: any;
}

interface IFileOutput {
    format: 'pdf' | 'html' | 'png';
    name?: string;
}

export class FileGenerator {
    protected templateDirectory: string;
    protected outputDirectory: string;

    constructor() {
        this.templateDirectory = '../../templates';
        this.outputDirectory = '../../public/files';
    }

    public async generateFromTemplate(config: { input: IFileInput, output: IFileOutput }): Promise<any> {
        const templateContent = fs.readFileSync(path.join(__dirname, this.templateDirectory, templatesNameList[config.input.template]), 'utf8');
        const outputContent = Mustache.render(templateContent, config.input.data);

        const fileNameFormatted = Date.now() + "_" + config.input.data?.name?.replace(/ /g, '_').toLowerCase() // Con esto generamos el nombre del archivo sin extensión
        const fileName = `${fileNameFormatted}.${config.output.format}`; // Con esto obtenemos el nombre completo del archivo con extensión
        const outputPath = path.join(__dirname, this.outputDirectory, fileName); // Con esto obtenemos el path completo del archivo

        if (config.output.format === 'html') {
            // Con esto guardamos el archivo en el path indicado
            fs.writeFile(outputPath, outputContent, { flag: 'w' }, (err: any) => {
                if (err) throw err;
                console.log(`The file has been saved as "${fileName}"`);
            })
        }

        if (config.output.format === 'pdf') {
            const pdf = await this.convertToPdf(outputContent);

            // Con esto guardamos el archivo en el path indicado
            fs.writeFile(outputPath, pdf, { flag: 'w' }, (err: any) => {
                if (err) throw err;
                console.log('The file has been saved!', fileName);
            })
        }

        return {
            name: fileName,
            // size: fs.statSync(outputPath).size,
            type: config.output.format,
        };
    }

    public async convertToPdf(html: string): Promise<any> {
        // const browser = await puppeteer.launch({
        //     args: [
        //         '--disable-gpu',
        //         '--disable-dev-shm-usage',
        //         '--disable-setuid-sandbox',
        //         '--no-first-run',
        //         '--no-sandbox',
        //         '--no-zygote',
        //         '--single-process',
        //     ]
        // });
        // const page = await browser.newPage();
        // await page.setContent(html);
        // const pdf = await page.pdf({ format: 'A4' });
        // await browser.close();

        // return pdf;
    }
}

// https://medium.com/@abshakekumar/html-pdf-example-using-mustache-js-9b17a93a068a
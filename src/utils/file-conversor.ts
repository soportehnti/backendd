import pdf from 'html-pdf';

class FileConversor {
    constructor() { }

    public htmlToPDF(html: string, options: any): Promise<any> {
        return new Promise((resolve, reject) => {
            pdf.create(html, options).toBuffer((err, buffer) => {
                if (err) reject(err);
                resolve(buffer);
            });
        });
    }

}
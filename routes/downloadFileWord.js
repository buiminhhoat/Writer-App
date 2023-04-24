const path = require('path');
const request = require('request');
const Buffer = require('buffer').Buffer;
const officegen = require('officegen');
const fs = require('fs');
const fileSaver = require('file-saver');
const http = require('http');
const https = require('https');
const { createConnection } = require('net');
const sharp = require('sharp');
const imageSize = require('image-size');


const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');

module.exports = async function downloadFileWord(req, res) {
    let title = req.body.title;
    let content = req.body.content;
    let nameFile = title + ".docx";
    // Tạo một đối tượng Word mới
    const docx = officegen('docx');

    // Chuyển đổi HTML thành đối tượng DOM
    const DOMParser = require('xmldom').DOMParser;
    const doc = new DOMParser().parseFromString(content, 'text/html');

    // Duyệt qua tất cả các thẻ và chuyển đổi chúng thành các phần tử Word tương ứng
    const tags = doc.getElementsByTagName('*');

    for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        let text = tag.textContent;

        // Xử lý định dạng đối với các thẻ khác nhau
        if (tag.tagName === 'h1') {
            // const para = docx.createP({ align: 'center' });
            const para = docx.createP();
            para.addText(text, {bold: true, font_size: 24});
        } else if (tag.tagName === 'h2') {
            const para = docx.createP();
            para.addText(text, {bold: true, font_size: 18});
        } else if (tag.tagName === 'h3') {
            const para = docx.createP();
            para.addText(text, {bold: true, font_size: 14});
        } else if (tag.tagName === 'p') {
            const para = docx.createP();
            para.addText(text);
        } else if (tag.tagName === 'ul') {
            const ul = docx.createListOfDots();
            const lis = tag.getElementsByTagName('li');
            for (let j = 0; j < lis.length; j++) {
                const li = lis[j];
                ul.addText(li.textContent);
            }
        } else if (tag.tagName === 'ol') {
            const ol = docx.createListOfNumbers();
            const lis = tag.getElementsByTagName('li');
            for (let j = 0; j < lis.length; j++) {
                const li = lis[j];
                ol.addText(li.textContent);
            }
        } else if (tag.tagName === 'br') {
            docx.createP();
        } else if (tag.tagName === 'img') {
            const url = tag.getAttribute('src');
            const httpOrHttps = url.startsWith('https') ? https : http;

            // Sử dụng Promise để đợi cho việc tải ảnh hoàn thành
            const data = await new Promise((resolve, reject) => {
                httpOrHttps.get(url, (response) => {
                    const chunks = [];
                    response.on('data', (chunk) => chunks.push(chunk));
                    response.on('end', () => resolve(Buffer.concat(chunks)));
                }).on('error', reject);
            }).catch((error) => {
                console.error(`Failed to download image from ${url}: ${error}`);
                return null;
            });

            if (data) {
                const dimensions = imageSize(data);
                let cx = dimensions.width;
                let cy = dimensions.height;
                let maxc = 0;
                if (cx > cy) maxc = cx; else maxc = cy;
                let rate = 1;
                if (maxc > 400) rate = maxc / 400;
                cx /= rate;
                cy /= rate;

                const para = docx.createP({align: 'center'});
                para.addImage(data, {
                    cx: cx,
                    cy: cy,
                });
            }
        } else {
            const pObj = docx.createP();
            pObj.addText(text);
        }
    }

    // Ghi tệp Word ra đĩa
    const out = fs.createWriteStream('./public/output.docx');
    // docx.generate(out);
    res.writeHead ( 200, {
        "Content-Type": "application/vnd.openxmlformats-officedocument.documentml.document",
        'Content-disposition': 'attachment; filename=testdoc.docx'
    });
    docx.generate(res);
};
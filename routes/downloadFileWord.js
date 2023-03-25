const path = require('path');
const officegen = require('officegen');
const fs = require('fs');
const fileSaver = require('file-saver');

const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');

  
module.exports = function downloadFileWord(req, res) {
    let content = req.body.contentfileword;
    
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
            para.addText(text, { bold: true, font_size: 24 });
        } else if (tag.tagName === 'h2') {
            const para = docx.createP();
            para.addText(text, { bold: true, font_size: 18 });
        } else if (tag.tagName === 'h3') {
            const para = docx.createP();
            para.addText(text, { bold: true, font_size: 14 });
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
            request({ url, encoding: null }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const data = Buffer.from(body, 'binary');
                const para = docx.createP();
                para.addImage(data);
            }
            });
        }
        else {
            const pObj = docx.createP();
            pObj.addText(text);        
        }
    }
    
    // // Đặt nội dung vào tệp Word
    // const pObj = docx.createP();
    // pObj.addText(content);
    
    // Ghi tệp Word ra đĩa
    const out = fs.createWriteStream('./public/output.docx');
    docx.generate(out);
    // res.download(filePath, './public/output.docx');

    res.status(200).send('OK');
    // console.log(content);

    // fs.writeFile(filePath, content, err => {
    //     if (err) {
    //         console.error(err);
    //         res.status(500).send('Lỗi khi lưu tệp tin');
    //     } else {
    //         // Trả về tệp tin cho người dùng để tải xuống
    //         res.download(filePath, 'file.html');
    //     }
    // });

    // fileSaver.saveAs(content, "file.html");
};
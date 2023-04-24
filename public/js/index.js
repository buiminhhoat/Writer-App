function submitForm() {
    document.getElementById("upload-form").submit();
}

function updateTitle() {
    document.getElementById("titlesave").value = document.getElementById("title").value;
}

async function load() {
    const textareaTitle = document.getElementById("title");

    textareaTitle.addEventListener("input", updateTitle);
    textareaTitle.addEventListener("change", updateTitle);
    textareaTitle.addEventListener("paste", updateTitle);

    updateTitle();

    const token = localStorage.getItem('token');
    const urlParams = new URLSearchParams(window.location.search);
    const post_id = urlParams.get('post_id');

    const response = await fetch('/api/create?post_id=' + post_id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token})
    });

    const data = await response.json();

    let content = data.content;
    let title = data.title;
    document.getElementById("title").value = title;

    var editor = tinymce.init({
        selector: 'textarea[name="editor"]',
        height: 400,
        content_css: '/styles.css',
        plugins:[
            'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'prewiew', 'anchor', 'pagebreak',
            'searchreplace', 'wordcount', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media',
            'table', 'emoticons', 'template', 'codesample'],
        toolbar: 'undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify |' +
            'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
            'forecolor backcolor emoticons',
        setup: function (editor) {
            function updateContent() {
                var content = editor.getContent();
                document.getElementById('content').value = content;
                document.getElementById('contentfileword').value = content;
                document.getElementById('contentsave').value = content;
                updateTitle();
            }

            editor.on('input', updateContent);
            editor.on('change', updateContent);
            editor.on('paste', updateContent);
        },
        init_instance_callback: function (editor) {
            editor.setContent(content);
            document.getElementById('content').value = editor.getContent();
            document.getElementById('contentfileword').value = editor.getContent();
            document.getElementById('contentsave').value = editor.getContent();
            updateTitle();
        }
    });
}


document.addEventListener('DOMContentLoaded', (req, res) => {
    const downloadForm = document.querySelector('#download');
    downloadForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const content = tinymce.get('editor').getContent();

        const response = await fetch('/api/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, content})
        });

        response.blob().then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = title + '.html';
            document.body.appendChild(a);
            a.click();
            a.remove();
        });
    });

    const downloadFileWordForm = document.querySelector('#downloadFileWord');
    downloadFileWordForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const content = tinymce.get('editor').getContent();
        const response = await fetch('/api/downloadFileWord', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, content})
        });

        response.blob().then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = title + '.docx';
            document.body.appendChild(a);
            a.click();
            a.remove();
        });
    });
});
load();
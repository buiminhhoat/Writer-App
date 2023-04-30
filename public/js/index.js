function submitForm() {
    document.getElementById("upload-form").submit();
}

async function load() {
    const urlParams = new URLSearchParams(window.location.search);
    const post_id = urlParams.get('post_id');

    const response = await fetch('/api/create?post_id=' + post_id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
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
                // document.getElementById('content').value = editor.getContent();
                var contentElement = document.getElementById('editor');
                if (contentElement) {
                    contentElement.value = editor.getContent();
                }
            }

            editor.on('input', updateContent);
            editor.on('change', updateContent);
            editor.on('paste', updateContent);
        },
        init_instance_callback: function (editor) {
            var contentElement = document.getElementById('editor');
            if (contentElement) {
                editor.setContent(content);
                contentElement.value = editor.getContent();
            }
            // editor.setContent(content);
            // document.getElementById('content').value = editor.getContent();
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

    const savesql = document.querySelector('#savesql');
    savesql.addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const content = tinymce.get('editor').getContent();
        const response = await fetch('/api/savesql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, content})
        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {
            alert(data.message);
            window.location.href = '/';
        } else {
            alert(data.message);
        }
    })
});

load();
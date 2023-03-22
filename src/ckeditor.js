function createCKEditor() {
    ClassicEditor
        .create(document.querySelector('#editor'), {
            toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote']
        })
        .then(editor => {
            const editorData = editor.getData();
            console.log(editorData);
        })
        .catch(error => {
            console.error(error);
        });
}

function downloadData() {
    const editorData = document.querySelector('#editor').value;
    console.log('Editor data:', editorData);
    // Code to save editorData to server/database
}
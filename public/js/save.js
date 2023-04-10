const save = document.getElementById("save");

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
// const axios = require('axios');

save.addEventListener("submit", (event) => {
    event.preventDefault();

    let title = document.getElementById("titlesave").value;
    let content = document.getElementById("contentsave").value;

    let curPost = {
        title: title,
        content: content,
        date_modified: new Date()
            .toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit' })
    }

    let postList = localStorage.getItem("postList");
    if (id !== null && postList) {
        let posts = JSON.parse(postList);
        posts[id] = curPost;
        posts.sort((a, b) => {
            const aTime = a.date_modified.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit' });
            const bTime = b.date_modified.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit' });
            return aTime.localeCompare(bTime);
        });
        localStorage.setItem("postList", JSON.stringify(posts));
        window.location.href = "/";
        return;
    }

    if (postList) {
        console.log(3);
        let posts = JSON.parse(postList);
        posts.push(curPost);
        localStorage.setItem("postList", JSON.stringify(posts));
    }
    else {
        console.log(4);
        localStorage.setItem("postList", JSON.stringify([curPost]));
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/savesql', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() { // callback
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {

            } else {
                console.error(xhr.status);
            }
        }
    };

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    xhr.send(new URLSearchParams(formData));

    // window.location.href = "/savesql?title=" + encodeURIComponent(title) + "&content=" + encodeURIComponent(content);
})


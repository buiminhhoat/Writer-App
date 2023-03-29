const save = document.getElementById("save");

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

console.log(id);

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
        let posts = JSON.parse(postList);
        posts.push(curPost);
        localStorage.setItem("postList", JSON.stringify(posts));
    }
    else {
        localStorage.setItem("postList", JSON.stringify([curPost]));
    }

    window.location.href = "/";
})


const save = document.getElementById("save");

save.addEventListener("submit", (event) => {
    event.preventDefault();
    let title = document.getElementById("titlesave").value;
    let content = document.getElementById("contentsave").value;

    let post = {
        title: title,
        content: content,
        date_modified: new Date()
    }

    let postList = localStorage.getItem("postList");
    if (postList) {
        let list = JSON.parse(postList);
        list.push(post);
        localStorage.setItem("postList", JSON.stringify(list));
    }
    else {
        localStorage.setItem("postList", JSON.stringify([post]));
    }
    console.log(postList);
    window.location.href = "/";
})


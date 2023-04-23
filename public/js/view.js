// let posts = JSON.parse(localStorage.getItem("postList"));

async function loadPosts() {
    const token = localStorage.getItem('token');

    console.log(token);

    const response = await fetch('/api/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token})
    });


    const data = await response.json();
    let posts = [];
    console.log(data);
    if (response.ok) {
        posts = data.posts;
        let postList = document.getElementById("postList");

        console.log(posts);

        for (let i = posts.length - 1; i >= 0; --i) {
            let item = posts[i];
            console.log("*" + item.title + " " + item.date_modified);
            let divElement = document.createElement("div");
            divElement.classList.add("box_list");

            let titleElement = document.createElement("div");
            titleElement.classList.add("title");
            titleElement.textContent = item.title;
            divElement.appendChild(titleElement);

            /*    let contentElement = document.createElement("div");
                contentElement.classList.add("content");
                contentElement.textContent = item.content.substring(0, 150);
                divElement.appendChild(contentElement);*/

            let dateModifiedElement = document.createElement("div");
            dateModifiedElement.classList.add("date-modified");
            dateModifiedElement.textContent = item.date_modified;
            divElement.appendChild(dateModifiedElement);

            let viewButton = document.createElement("button");
            viewButton.classList.add("btn-view");
            viewButton.textContent = "View";
            viewButton.href = `/create?id=${i}`;
            viewButton.addEventListener('click', (event) => {
                event.preventDefault();
                window.location.href = viewButton.href;
            });

            divElement.appendChild(viewButton);

            let deleteButton = document.createElement("button");
            deleteButton.classList.add("btn-delete");
            deleteButton.textContent = "Delete";

            deleteButton.href = `/`;
            deleteButton.addEventListener('click', (event) => {
                console.log(i);
                event.preventDefault();
                posts.splice(i, 1);
                localStorage.setItem("postList", JSON.stringify(posts));
                window.location.href = deleteButton.href;
            });
            divElement.appendChild(deleteButton);

            postList.appendChild(divElement);
        }
        // window.location.href = '/';
    }
}

loadPosts();
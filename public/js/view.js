async function loadPosts() {
    try {
        const response = await fetch('/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        let posts = [];
        if (response.ok) {
            if (data.message !== undefined) {
                alert(data.message);
                window.location.href = "/login";
                return;
            }
            let loginStatus = document.getElementById("loginstatus");
            loginStatus.innerHTML = '<a href="/api/logout"> Logout </a>';
            // console.log(getCookie("token"));
            // console.log(document.cookie);
            posts = data.posts;
            let postList = document.getElementById("postList");

            for (let i = posts.length - 1; i >= 0; --i) {
                let item = posts[i];
                let divElement = document.createElement("div");
                divElement.classList.add("box_list");

                let titleElement = document.createElement("div");
                titleElement.classList.add("title");
                titleElement.textContent = item.title;
                divElement.appendChild(titleElement);

                let dateModifiedElement = document.createElement("div");
                dateModifiedElement.classList.add("date-modified");
                dateModifiedElement.textContent = item.date_modified;
                divElement.appendChild(dateModifiedElement);

                let viewButton = document.createElement("button");
                viewButton.classList.add("btn-view");
                viewButton.textContent = "View";
                viewButton.href = `/create?post_id=${item.post_id}`;
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

        const responseRefreshToken = await fetch('/api/refresh_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    catch (error) {
        console.log(error);
    }

}

loadPosts();
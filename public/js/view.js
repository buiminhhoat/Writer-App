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

            for (let i = 0; i < posts.length; ++i) {
                let item = posts[i];
                let divElement = document.createElement("div");
                divElement.classList.add("box_list");

                let titleElement = document.createElement("div");
                titleElement.classList.add("title");
                titleElement.textContent = item.title;
                divElement.appendChild(titleElement);

                let dateModifiedElement = document.createElement("div");
                dateModifiedElement.classList.add("date-modified");
                let date = new Date(item.date_modified);
                let formattedDate = ('0' + date.getDate()).slice(-2) + '/ ' + ('0' + (date.getMonth()+1)).slice(-2) + '/ ' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
                dateModifiedElement.textContent = formattedDate;
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
                deleteButton.addEventListener('click', async (event) => {
                    event.preventDefault();
                    console.log(i);
                    console.log(posts[i]);
                    const post_id = posts[i].post_id;
                    const response = await fetch('/api/delete_post', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({post_id})
                    });
                    const data = await response.json();

                    alert(data.message);

                    if (response.ok) {
                        window.location.href = '/';
                    }
                });
                divElement.appendChild(deleteButton);

                postList.appendChild(divElement);
            }
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
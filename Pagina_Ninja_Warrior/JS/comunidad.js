document.addEventListener("DOMContentLoaded", () => {
    const contenedorPosts = document.getElementById("contenedorPosts");
  
    const fetchRedditPosts = async () => {
      const subreddit = "ANW";
      const url = `https://www.reddit.com/r/${subreddit}/new.json?limit=10`;
  
      try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
  
        displayPosts(datos.data.children);
      } catch (error) {
        console.error("Error al obtener las publicaciones de Reddit:", error);
        contenedorPosts.innerHTML = `<p>Ocurrió un error al cargar las publicaciones. Intenta nuevamente más tarde.</p>`;
      }
    };
  
    const displayPosts = (posts) => {
      contenedorPosts.innerHTML = "";
  
      posts.forEach((post) => {
        const { title, url, author, created_utc } = post.data;
  
        const date = new Date(created_utc * 1000).toLocaleDateString();
  
        const postElement = document.createElement("article");
        postElement.className = "reddit-post";
        postElement.innerHTML = `
          <h3><a href="${url}" target="_blank">${title}</a></h3>
          <p>Publicado por <strong>${author}</strong> el ${date}</p>
        `;
  
        contenedorPosts.appendChild(postElement);
      });
    };
  
    fetchRedditPosts();
  });  
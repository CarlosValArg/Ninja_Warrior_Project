document.addEventListener("DOMContentLoaded", () => {
    const postsContainer = document.getElementById("posts-container");
  
    const fetchRedditPosts = async () => {
      const subreddit = "ANW";
      const url = `https://www.reddit.com/r/${subreddit}/new.json?limit=10`;
  
      try {
        const response = await fetch(url);
        const data = await response.json();
  
        displayPosts(data.data.children);
      } catch (error) {
        console.error("Error al obtener las publicaciones de Reddit:", error);
        postsContainer.innerHTML = `<p>Ocurrió un error al cargar las publicaciones. Intenta nuevamente más tarde.</p>`;
      }
    };
  
    // Función para mostrar las publicaciones en el HTML
    const displayPosts = (posts) => {
      postsContainer.innerHTML = ""; // Limpiar contenedor
  
      posts.forEach((post) => {
        const { title, url, author, created_utc } = post.data;
  
        // Formatear la fecha
        const date = new Date(created_utc * 1000).toLocaleDateString();
  
        // Crear estructura HTML para cada publicación
        const postElement = document.createElement("article");
        postElement.className = "reddit-post";
        postElement.innerHTML = `
          <h3><a href="${url}" target="_blank">${title}</a></h3>
          <p>Publicado por <strong>${author}</strong> el ${date}</p>
        `;
  
        postsContainer.appendChild(postElement);
      });
    };
  
    // Llamar a la función para cargar las publicaciones
    fetchRedditPosts();
  });  
$(document).ready(function () {
    let currentPage = 1;
    const perPage = 4; // Terserah, biar tidak terlalu panjang
  
    function fetchArticles(page) {
      $.ajax({
        url: 'http://localhost:3000/api/article/status/publish',
        method: 'GET',
        success: function (data) {
          const publishedArticles = data.data.filter(article => article.status === 'publish');
          const totalPages = Math.ceil(publishedArticles.length / perPage);
  
          const start = (page - 1) * perPage;
          const end = start + perPage;
          const paginatedArticles = publishedArticles.slice(start, end);
  
          $('#articles').empty();
  
          paginatedArticles.forEach(article => {
            $('#articles').append(`
              <div class="col-md-6">
                <div class="card h-100">
                  <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${article.category}</h6>
                    <p class="card-text">${article.content}</p>
                  </div>
                </div>
              </div>
            `);
          });
  
          // Disable pagination if necessary
          $('#prev').prop('disabled', page === 1);
          $('#next').prop('disabled', page === totalPages || totalPages === 0);
        },
        error: function (error) {
          console.error('Error fetching articles:', error);
        }
      });
    }
  
    // Initial load
    fetchArticles(currentPage);
  
    // Pagination controls
    $('#prev').click(function () {
      if (currentPage > 1) {
        currentPage--;
        fetchArticles(currentPage);
      }
    });
  
    $('#next').click(function () {
      currentPage++;
      fetchArticles(currentPage);
    });
  });
  
$(document).ready(function () {
    // Ambil parameter id dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
  
    // Ambil data artikel berdasarkan ID
    function getArticleById(id) {
      $.ajax({
        url: `http://localhost:3000/api/article/${id}`,
        method: 'GET',
        success: function (response) {
          $('#title').val(response.data.title);
          $('#content').val(response.data.content);
          $('#category').val(response.data.category);
        },
        error: function (error) {
          console.error('Error fetching article:', error);
          alert('Gagal mengambil data artikel.');
        }
      });
    }
  
    // Panggil function getArticleById saat halaman dimuat
    if (articleId) {
      getArticleById(articleId);
    }
  
    // Fungsi untuk update artikel
    function updateArticle(status) {
      const updatedData = {
        title: $('#title').val(),
        content: $('#content').val(),
        category: $('#category').val(),
        status: status // "published" atau "draft"
      };
  
      $.ajax({
        url: `http://localhost:3000/api/article/${articleId}`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(updatedData),
        success: function () {
          alert('Artikel berhasil diperbarui!');
          window.location.href = 'index.html';
        },
        error: function (error) {
          console.error('Error updating article:', error);
          alert('Gagal memperbarui artikel.');
        }
      });
    }
  
    // Klik tombol Publish
    $('#publishBtn').click(function () {
      updateArticle('publish');
    });
  
    // Klik tombol Draft
    $('#draftBtn').click(function () {
      updateArticle('draft');
    });
  });
  
$(document).ready(function () {
    // Fungsi untuk menambah artikel
    function addArticle(status) {
      const newArticle = {
        title: $('#title').val(),
        content: $('#content').val(),
        category: $('#category').val(),
        status: status // "published" atau "draft"
      };
  
      $.ajax({
        url: 'http://localhost:3000/api/article', // sesuaikan endpoint backend untuk create article
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(newArticle),
        success: function () {
          alert('Artikel berhasil ditambahkan!');
          window.location.href = 'index.html'; // redirect ke halaman utama
        },
        error: function (error) {
          console.error('Error adding article:', error);
          alert('Gagal menambahkan artikel.');
        }
      });
    }
  
    // Klik tombol Publish
    $('#publishBtn').click(function () {
      addArticle('publish');
    });
  
    // Klik tombol Draft
    $('#draftBtn').click(function () {
      addArticle('draft');
    });
  });
  
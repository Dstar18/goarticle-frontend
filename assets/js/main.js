$(document).ready(function() {
    const baseAPIUrl = 'http://localhost:3000/api/article/status';

    function fetchData(status) {
        $.ajax({
            url: `${baseAPIUrl}/${status}`,
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                if (response.code === 200) {
                    if (response.data && response.data.length > 0) {
                        let rows = '';
                        response.data.forEach((item, index) => {
                            rows += `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${item.title}</td>
                                    <td>${item.category}</td>
                                    <td>${item.status}</td>
                                    <td>
                                        <a href="edit.html?id=${item.id}" class="btn btn-warning btn-sm">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                        <button class="btn btn-danger btn-sm delete" data-id="${item.id}">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            `;
                        });
                        $('#data-body').html(rows);
                    } else {
                        $('#data-body').html('<tr><td colspan="5" class="text-center text-warning">Tidak ada artikel yang tersedia.</td></tr>');
                    }
                } else {
                    $('#data-body').html('<tr><td colspan="5">Error: ' + response.message + '</td></tr>');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', status, error);
                $('#data-body').html('<tr><td colspan="5">There was an error retrieving the data.</td></tr>');
            }
        });
    }

    fetchData('publish');

    $('#add-new').on('click', function() {
        alert('Add New Article button clicked!');
    });

    $('#status-tabs a').on('click', function(e) {
        e.preventDefault();
        const status = $(this).data('status');
        fetchData(status);
        $('#status-tabs .nav-link').removeClass('active');
        $(this).addClass('active');
    });

    $(document).on('click', '.edit', function() {
        const id = $(this).data('id');
        alert('Edit Article ID: ' + id);
    });

    // get to trash
    $(document).on('click', '.delete', function() {
        const id = $(this).data('id');
    
        if (confirm('Apakah kamu yakin ingin memindahkan artikel ini ke Trash?')) {
            // Step 1: Ambil data artikel by ID
            $.ajax({
                url: `http://localhost:3000/api/article/${id}`,
                method: 'GET',
                success: function(response) {
                    const article = response.data;
    
                    // Step 2: Kirim POST untuk update status jadi 'trash'
                    $.ajax({
                        url: `http://localhost:3000/api/article/${id}`,
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            title: article.title,
                            content: article.content,
                            category: article.category,
                            status: 'thrash'
                        }),
                        success: function(response) {
                            if (response.code === 200) {
                                alert('Artikel berhasil dipindahkan ke Trash!');
                                const activeStatus = $('#status-tabs .nav-link.active').data('status');
                                fetchData(activeStatus); // Refresh tabel
                            } else {
                                alert('Gagal memindahkan artikel: ' + response.message);
                            }
                        },
                        error: function(xhr, status, error) {
                            console.error('Error:', status, error);
                            alert('Terjadi kesalahan saat memindahkan artikel.');
                        }
                    });
                },
                error: function(xhr, status, error) {
                    console.error('Error ambil data artikel:', status, error);
                    alert('Gagal mengambil data artikel.');
                }
            });
        }
    });
});

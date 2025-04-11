# Technical Test Sharing Vision | Frontend Post Article

Project ini adalah aplikasi manajemen artikel sederhana berbasis web. Bagian dari frontend GoArticle. 
Aplikasi ini memiliki fitur untuk menambahkan, mengedit, memindahkan artikel ke trash, serta menampilkan artikel yang dipublish dalam tampilan blog dengan pagination.

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, Bootstrap, jQuery
- **Deployment:** Localhost

## 📂 Fitur Aplikasi

- **All Posts**
  - Tab Navigasi: Published, Draft, Trashed
  - Aksi: Edit, Thrash
- **Add New Article**
  - Form input: Title, Content, Category
  - Tombol: Publish atau Draft
- **Edit Article**
  - Edit data artikel (Title, Content, Category)
  - Update status artikel: Publish atau Draft
- **Soft Delete**
  - Artikel akan berpindah ke tab "Trashed"
- **Preview Page**
  - Tampilkan artikel dengan status "Publish"
  - Dilengkapi pagination

## 🚀 Cara Menjalankan Project

### 1. Clone Repository
```bash
git clone https://github.com/Dstar18/goarticle-frontend
```
### 2. Pastikan Backend Golang sudah berjalan di komputer
Jika belum, silahkan cek di repo: https://github.com/Dstar18/GoArticle

### 3. Pindahkan project frontend ke Webserver (htdocs)

### 4. Buka di aplikasi dibrowser
```bash
http://localhost:{your_port}/goarticle-frontend/
```

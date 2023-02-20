function simpanProduk(form) {
    console.log(form);
    aplikasiDaftarProduk.inputProduk(form);
    aplikasiDaftarProduk.menampilkanDaftarProduk();
}
const dbDaftarProduk = {
    save(daftarProduk2) {
        localStorage.setItem('daftarProduk', JSON.stringify(daftarProduk2));
    },
    get() {
        return JSON.parse(localStorage.getItem('daftarProduk'));
    }
}
const aplikasiDaftarProduk = {
    produk: {
        index: -1,
        produk: null,
        harga: null,
        stok: null,
        gambar: null
    },
    daftarProduk: [],
    inputProduk: function (form) {
        this.produk.index = form.index.value;
        this.produk.produk = form.produk.value;
        this.produk.harga = form.harga.value;
        this.produk.stok = form.stok.value;
        this.produk.gambar = form.gambar.value;

        if(!this.produk.produk) {
            alert('produk tidak boleh kosong');
            return false
        }
        if(!this.produk.harga) {
            alert('harga tidak boleh kosong');
            return false
        }
        if(!this.produk.stok) {
            alert('stok tidak boleh kosong');
            return false
        }
        if(!this.produk.gambar) {
            alert('link gambar tidak boleh kosong');
            return false
        }
        
        if(this.produk.index == -1) {
            this.daftarProduk = this.daftarProduk || [];
            this.daftarProduk.push(copy(this.produk));
        } else {
            this.daftarProduk[this.produk.index] = copy(this.produk)
        }
        dbDaftarProduk.save(this.daftarProduk);
        this.resetFormProduk(form);
    },
    
    resetFormProduk: function(form) {
        this.produk.produk =null;
        this.produk.harga = null;
        this.produk.stok = null;
        this.produk.gambar = null;
        this.produk.index = -1;

        form.produk.value = this.produk.produk;
        form.harga.value = this.produk.harga;
        form.stok.value = this.produk.stok;
        form.gambar.value = this.produk.gambar;
        form.index.value = this.produk.index;

        document.getElementById('btn-save-produk').innerHTML = 'Simpan';
    },
    menampilkanDaftarProduk: function () {
        this.daftarProduk = dbDaftarProduk.get();
        const componentDaftarProduk = document.getElementById('daftar-produk');
        componentDaftarProduk.innerHTML = '';
        if (this.daftarProduk === null) {
            console.log ('tidak ada data');
        } else {
            this.daftarProduk.forEach((produk, index) => {
                componentDaftarProduk.innerHTML +=  `<h4><div class="flex justify-center gap-5"> <div class="card-actions justify-end">${produk.produk} <br> ${produk.harga} <br> stok: ${produk.stok} <br> <img src="${produk.gambar}" width= "100px"><button 
                class="btn btn-accent btn-active" onclick="aplikasiDaftarProduk.editProduk(${index})">Edit</button><button 
                class="btn btn-accent btn-active" onclick="aplikasiDaftarProduk.hapusProduk(${index})"> Hapus </button></div></div></h4>`;
            });
        }
        
    },
    hapusProduk: function (index) {
        if(confirm('Apakah anda yakin ingin menghaapus data ini?')) {
            this.daftarProduk.splice(index, 1);
            dbDaftarProduk.save(this.daftarProduk);
            this.menampilkanDaftarProduk();
        }
    },
    editProduk: function (index) {
        const produk = this.daftarProduk[index];
        const form = document.getElementById('form-produk');
        form.produk.value = produk.produk;
        form.harga.value = produk.harga;
        form.stok.value = produk.stok;
        form.gambar.value = produk.gambar;
        form.index.value = index;


        document.getElementById('btn-save-produk').innerHTML = 'Edit';
    }
}

function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

aplikasiDaftarProduk.menampilkanDaftarProduk();
function calculateTotal() {
    const packagePrice = Number(
        document.getElementById("package").value
    );

    const quantity = Number(
        document.getElementById("quantity").value
    );

    const result = document.getElementById("result");

    if (quantity < 1 || !Number.isInteger(quantity)) {
        result.innerHTML = "Masukkan jumlah kotak minimal 1.";
        return;
    }

    const total = packagePrice * quantity;

    result.innerHTML =
        "Total Pesanan: Rp" + total.toLocaleString("id-ID");
}

/**
 * Menghitung harga awal, memeriksa kode promo LAPERMINTIK (diskon 10%,
 * berlaku untuk semua kategori paket dengan minimal pemesanan 30 box),
 * dan menampilkan rincian harga awal, potongan diskon, serta total bayar akhir.
 */
function calculateTotal() {
    // Mengambil harga paket terpilih dan jumlah box dari form SE 1
    const packagePrice = Number(document.getElementById("package").value);
    const quantity = Number(document.getElementById("quantity").value);

    // Mengambil input kode promo dan menormalkannya (hapus spasi & ubah ke huruf kapital)
    const promoElement = document.getElementById("promo");
    const promoCode = promoElement ? promoElement.value.trim().toUpperCase() : "";

    // Elemen wadah hasil di halaman web
    const result = document.getElementById("result");

    // Validasi input jumlah box
    if (quantity < 1 || !Number.isInteger(quantity)) {
        result.innerHTML = "<p>Masukkan jumlah box minimal 1.</p>";
        return;
    }
    // Validasi harga paket agar tidak terjadi error/NaN
    if (Number.isNaN(packagePrice) || packagePrice <= 0) {
        result.innerHTML = "<p>Silakan pilih paket konsumsi yang valid.</p>";
        return;
    }

    // Perhitungan harga awal (harga paket x jumlah pesanan box)
    const hargaAwal = packagePrice * quantity;

    // Konfigurasi promo: diskon 10% untuk semua kategori dengan minimal 30 box
    const kodePromoValid = "LAPERMINTIK";
    const minimalBoxPromo = 30;
    const diskonPersen = 0.10;
    let potonganDiskon = 0;
    let statusPromo = "";

    // Logika percabangan kondisi (if / else)
    if (promoCode === kodePromoValid && quantity >= minimalBoxPromo) {
        potonganDiskon = hargaAwal * diskonPersen;
        statusPromo = `Promo ${kodePromoValid} aktif: Diskon 10% diterapkan (minimal ${minimalBoxPromo} box terpenuhi).`;
    } else if (promoCode === kodePromoValid && quantity < minimalBoxPromo) {
        potonganDiskon = 0;
        const kurangBox = minimalBoxPromo - quantity;
        statusPromo = `Kode ${kodePromoValid} memerlukan minimal ${minimalBoxPromo} box (pesanan Anda masih kurang ${kurangBox} box).`;
    } else if (promoCode === "") {
        potonganDiskon = 0;
        statusPromo = "Tidak ada kode promo yang digunakan.";
    } else {
        potonganDiskon = 0;
        statusPromo = "Kode promo tidak valid.";
    }

    // Menghitung total bayar akhir setelah dikurangi potongan diskon
    const totalBayar = hargaAwal - potonganDiskon;

    // Menampilkan rincian lengkap ke layar
    result.innerHTML = `
        <p>Harga Awal: Rp${hargaAwal.toLocaleString("id-ID")}</p>
        <p>Potongan Diskon: -Rp${potonganDiskon.toLocaleString("id-ID")}</p>
        <p><strong>Total Bayar Akhir: Rp${totalBayar.toLocaleString("id-ID")}</strong></p>
        <p>${statusPromo}</p>
    `;
}
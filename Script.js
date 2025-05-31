function decisionTree(uts, uas, tugas) {
    const rataRata = (uts + uas + tugas) / 3;

    let kategori = "";
    let jalurKeputusan = [];

    jalurKeputusan.push(`Rata-rata nilai: ${rataRata.toFixed(1)}`);

    if (rataRata >= 85) {
        kategori = "TINGGI";
        jalurKeputusan.push("Rata-rata ≥ 85 → Kategori TINGGI");
    }
    else if (rataRata >= 70) {
        jalurKeputusan.push("Rata-rata 70-84 → Cek nilai UTS");

        if (uts >= 75) {
            kategori = "TINGGI";
            jalurKeputusan.push(`UTS = ${uts} ≥ 75 → Kategori TINGGI`);
        } else {
            jalurKeputusan.push(`UTS = ${uts} < 75 → Cek nilai Tugas`);

            if (tugas >= 80) {
                kategori = "SEDANG";
                jalurKeputusan.push(`Tugas = ${tugas} ≥ 80 → Kategori SEDANG`);
            } else {
                kategori = "SEDANG";
                jalurKeputusan.push(`Tugas = ${tugas} < 80 → Kategori SEDANG`);
            }
        }
    }
    else if (rataRata >= 60) {
        jalurKeputusan.push("Rata-rata 60-69 → Cek nilai UAS");

        if (uas >= 70) {
            kategori = "SEDANG";
            jalurKeputusan.push(`UAS = ${uas} ≥ 70 → Kategori SEDANG`);
        } else {
            kategori = "RENDAH";
            jalurKeputusan.push(`UAS = ${uas} < 70 → Kategori RENDAH`);
        }
    }
    else {
        kategori = "RENDAH";
        jalurKeputusan.push("Rata-rata < 60 → Kategori RENDAH");
    }

    return {
        kategori: kategori,
        rataRata: rataRata,
        jalurKeputusan: jalurKeputusan
    };
}

document.getElementById('predictionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const uts = parseInt(document.getElementById('nilaiUTS').value);
    const uas = parseInt(document.getElementById('nilaiUAS').value);
    const tugas = parseInt(document.getElementById('nilaiTugas').value);

    const hasil = decisionTree(uts, uas, tugas);
    tampilkanHasil(hasil);
});

function tampilkanHasil(hasil) {
    const resultDiv = document.getElementById('result');

    let icon = "";
    let pesan = "";

    switch(hasil.kategori) {
        case "TINGGI":
            icon = "🏆";
            pesan = "Selamat! Prestasi sangat baik!";
            break;
        case "SEDANG":
            icon = "👍";
            pesan = "Baik! Pertahankan dan tingkatkan lagi!";
            break;
        case "RENDAH":
            icon = "💪";
            pesan = "Semangat! Masih bisa diperbaiki!";
            break;
    }

    resultDiv.innerHTML = `
        <div>${icon} Kategori Nilai: ${hasil.kategori}</div>
        <div style="font-size: 14px; margin-top: 10px;">
            Rata-rata: ${hasil.rataRata.toFixed(1)} | ${pesan}
        </div>
        <div class="decision-path">
            <h4>🌳 Jalur Keputusan Decision Tree:</h4>
            ${hasil.jalurKeputusan.map(step => `• ${step}`).join('<br>')}
        </div>
    `;

    resultDiv.className = `result ${hasil.kategori.toLowerCase()}`;
    resultDiv.style.display = 'block';
}

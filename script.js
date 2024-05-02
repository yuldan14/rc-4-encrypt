
function rc4(key, str) {
    var s = [], j = 0, x, res = '';
    for (var i = 0; i < 256; i++) {
        s[i] = i;
    }
    for (i = 0; i < 256; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
    }
    i = 0;
    j = 0;
    for (var y = 0; y < str.length; y++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
        res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
    }
    return res;
}

function encrypt() {
    const proses = document.querySelector('.proses-bar');
    const hasil = document.getElementById("result");

    // Menyembunyikan hasil yang sudah ditampilkan
    hasil.style.display = 'none';

    // Memastikan proses ditampilkan dan mengatur ulang properti animasi
    proses.style.display = 'flex';
    proses.style.opacity = 0;
    proses.style.width = '0%';

    // Mulai animasi
    setTimeout(() => {
        proses.style.opacity = 1;
        proses.style.width = proses.getAttribute('data-bar') + '%';
    }, 100);

    // Timeout untuk menunggu animasi selesai
    setTimeout(() => {
        var key = document.getElementById("key").value;
        var text = document.getElementById("text").value;
        var result = rc4(key, text);
        
        // Menampilkan hasil
        hasil.innerHTML = result;
        hasil.style.display = 'block';

        // Menghilangkan proses setelah menampilkan hasil
        proses.style.display = 'none';
    }, 2500); 
}


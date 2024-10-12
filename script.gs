function onFormSubmit(e) {
  // Log untuk debugging
  Logger.log('Event object: ' + JSON.stringify(e));
  if (e && e.namedValues) {
    Logger.log('Named values: ' + JSON.stringify(e.namedValues));
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1");
  var lastRow = sheet.getLastRow();
  var data = sheet.getRange(lastRow, 1, 1, sheet.getLastColumn()).getValues()[0];

  var timestamp, nama, noHP, email;

  // Fungsi helper untuk mengambil nilai dari array atau objek dengan aman
  function safeGet(obj, key, defaultValue = '') {
    if (obj && obj[key]) {
      return Array.isArray(obj[key]) ? obj[key][0] : obj[key];
    }
    return defaultValue;
  }

  if (e && e.namedValues) {
    // Jika dipanggil dari form submission
    timestamp = safeGet(e.namedValues, 'Timestamp', new Date().toString());
    nama = safeGet(e.namedValues, 'nama');
    noHP = safeGet(e.namedValues, 'no hp');
    email = safeGet(e.namedValues, 'email');
  } else {
    // Jika dipanggil dari spreadsheet atau trigger lain
    timestamp = data[0] ? data[0].toString() : new Date().toString();
    nama = data[1] || '';
    noHP = data[2] || '';
    email = data[3] || '';
  }

  // Log untuk debugging
  Logger.log('Data yang diterima: ' + JSON.stringify({timestamp, nama, noHP, email}));

  // Hanya lanjutkan jika semua data yang diperlukan tersedia
  if (nama && noHP && email) {
    // Kirim pesan WhatsApp
    sendWhatsAppMessage(timestamp, nama, noHP, email);

    // Kirim email
    sendEmail(timestamp, nama, noHP, email);
  } else {
    Logger.log('Data tidak lengkap, tidak mengirim pesan');
    Logger.log('nama: ' + nama);
    Logger.log('noHP: ' + noHP);
    Logger.log('email: ' + email);
  }
}

function sendWhatsAppMessage(timestamp, nama, noHP, email) {
  var url = ''; // Masukkan URL WhatsApp API Anda di sini
  var apiKey = ''; // Masukkan API key Anda di sini
  var sender = ''; // Masukkan nomor pengirim Anda di sini

  var message = "Halo " + nama + ",\n\n" +
                "Terima kasih telah mengisi formulir Google kami pada " + timestamp + ". Berikut adalah data yang Anda isi:\n" +
                "Nama: " + nama + "\n" +
                "No HP: " + noHP + "\n" +
                "Email: " + email + "\n\n" +
                "Kami akan segera menghubungi Anda untuk informasi lebih lanjut.";

  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify({
      'api_key': apiKey,
      'sender': sender,
      'number': noHP,
      'message': message
    })
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    Logger.log('Respons WhatsApp: ' + response.getContentText());
    Logger.log('Pesan WhatsApp berhasil dikirim ke ' + noHP);
  } catch(error) {
    Logger.log('Gagal mengirim pesan WhatsApp: ' + error);
  }
}

function sendEmail(timestamp, nama, noHP, email) {
  var subject = "Konfirmasi Pengisian Formulir";
  var body = "Halo " + nama + ",\n\n" +
             "Terima kasih telah mengisi formulir kami pada " + timestamp + ". Berikut adalah data yang Anda isi:\n\n" +
             "Nama: " + nama + "\n" +
             "No HP: " + noHP + "\n" +
             "Email: " + email + "\n\n" +
             "Kami akan segera menghubungi Anda untuk informasi lebih lanjut.\n\n" +
             "Salam,\nTim Komunitas Inovator Digital";

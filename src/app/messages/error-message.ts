export const validation_messages_register = {
    'name': [
        {type: 'required', message: 'Nama tidak boleh kosong'},
        {type: 'minlength', message: 'Nama kurang dari 2 karakter'},
      ],
      'email': [
        {type: 'required', message: 'Email tidak boleh kosong'},
        {type: 'email', message: 'Format email salah'},
        {type: 'pattern', message: 'Format id email salah'},
      ],

      'password': [
        {type: 'required', message: 'Password tidak boleh kosong'},
        {type: 'minlength', message: 'Password Kurang dari 8 karakter'},
      ],
      'cpassword': [
        {type: 'required', message: 'Komfirmasi Password tidak boleh kosong'},
      ],
}
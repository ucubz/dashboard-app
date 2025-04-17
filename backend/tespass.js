const bcrypt = require('bcrypt');

(async () => {
  const password = 'sekretaris123'; // Change this to what you want
  const hash = await bcrypt.hash(password, 10);
  console.log('Hashed password:', hash);
})();

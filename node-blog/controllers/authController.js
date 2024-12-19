import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Kullanıcı kayıt fonksiyonu
export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi' });
  } catch (error) {
    res.status(500).json({ error: 'Kullanıcı kaydedilirken bir hata oluştu' });
  }
};

// Giriş fonksiyonu
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Geçersiz kullanıcı adı veya şifre' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Geçersiz kullanıcı adı veya şifre' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Giriş yapılırken bir hata oluştu' });
  }
};

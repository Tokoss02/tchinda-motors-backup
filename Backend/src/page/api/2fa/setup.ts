import axios from 'axios';

export default async function handler(req, res) {
  const response = await axios.post(`http://localhost:3000/auth/2fa/setup`, {
    email: 'tchindamotors@gmail.com',
  });
  res.status(200).json(response.data);
}

import connection from '../../../lib/db'
import bcrypt from 'bcrypt'

export async function POST(request) {
  const data = await request.json();

  const { fullName, gender, email, mobile, address, profession, password, confirmPassword } = data

  // Add createdAt field with current timestamp
  const newData = {
    fullName: fullName,
    gender: gender,
    email: email,
    mobile: mobile,
    address: address,
    profession: profession,
    password: await bcrypt.hash(password, 12),
    createdAt: new Date()
  };

  const [results] = await connection.query(`SELECT * FROM users WHERE email='${email}'`)
  if (results.length > 0) {
    return Response.json({ msg: 'User Email Id Already Exist.' }, { status: 409 });
  } else {
    // Insert into database using your connection
    // connection.query('INSERT INTO users SET ?', newData);
    return Response.json({ msg: 'Data successfully submit' }, { status: 201 });
  }

}
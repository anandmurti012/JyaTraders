import bcrypt from 'bcrypt';
import connection from "../../../../lib/db";

export async function POST(request) {
  const data = await request.json();
  const { email, password } = data;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
  const values = [email, hashedPassword];

  try {
    await connection.execute(query, values);
    console.log('User successfully registered');
    return new Response(JSON.stringify({ msg: 'User successfully registered' }), { status: 200 });
  } catch (error) {
    console.error('Error registering user:', error);
    return new Response(JSON.stringify({ msg: 'Failed to register user' }), { status: 500 });
  }
}

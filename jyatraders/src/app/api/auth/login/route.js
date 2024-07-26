import bcrypt from 'bcrypt';
import connection from "../../../../lib/db";

export async function POST(request) {
  const data = await request.json();
  const { email, password } = data;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashed password:::;", hashedPassword);
  
  // Create a new data object with the hashed password and current date
  const newData = { 
    email:email, 
    password: hashedPassword, 
    createdAt: new Date()
  };

  // Insert into database using your connection
  connection.query('INSERT INTO users SET ?', newData, (error, results) => {
    if (error) {
      console.error('Database insertion failed:', error);
      return new Response(JSON.stringify({ msg: 'Database insertion failed' }), { status: 500 });
    }
    console.log('Hello done');
  });

  return new Response(JSON.stringify({ msg: 'Data successfully submit' }), { status: 200 });
}

 
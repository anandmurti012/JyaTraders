import { verifyToken } from '../../../../../../pages/api/auth/verifyToken';

export async function GET(request) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return new Response(JSON.stringify({ msg: 'No token provided' }), { status: 401 });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return new Response(JSON.stringify({ msg: 'Invalid token' }), { status: 401 });
  }

  // Proceed with the protected route logic
  return new Response(JSON.stringify({ msg: 'Protected route accessed', user: decoded }), { status: 200 });
}

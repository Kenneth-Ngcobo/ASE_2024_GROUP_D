import { handler } from '../../CheckRecipePopularity';

export default async function route(req, res) {
  if (req.method === 'GET') {
    await handler(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

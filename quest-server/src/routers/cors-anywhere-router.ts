import { Router, Request, Response } from 'express';

export class CorsAnywhereRouter {
    private readonly _router: Router;

    get router() {
        return this._router;
    }

    constructor() {
        this._router = Router();
        this._router.get('', async (req: Request, res: Response) => {
            const { url } = req.query;
            if (!url) {
                return res.status(400).send('URL is required');
            }

            try {
                const response = await fetch(url as string);
                const blob = await response.blob();
                const buffer = await blob.arrayBuffer();
                const data = Buffer.from(buffer);

                res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream');
                res.send(data);
            } catch (error) {
                console.error(error);
                res.status(500).send('Error fetching the blob');
            }
        });
    }
}

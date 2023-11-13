import { defineEndpoint } from '@directus/extensions-sdk';
import axios from 'axios';

export default defineEndpoint((router) => {
	router.post('/flow-manager/process', async (_req: any, res: any) => {
    const {
      url,
      staticToken,
      method,
      payload
    } = _req.body;

    try {
      const { data } = await axios.request({
        url,
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${staticToken}`
        },
        data: payload
      });

      res.send(data);
    } catch (e: any) {
      console.log(e);
      res.status(500).send({
        error: e?.response?.data,
        status: e.status
      })
    }

  });
});

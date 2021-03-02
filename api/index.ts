import { NowRequest, NowResponse } from '@vercel/node'
import axios from 'axios';

const backends = {
  "ninja": "https://mynano.ninja/api/node",
  "nanos": "https://nault.nanos.cc/proxy",
  "powernode": "https://proxy.powernode.cc/proxy",
  "rainstorm": "https://rainstorm.city/api"
}

export default (req: NowRequest, res: NowResponse) => {
  const backend = req.query.backend as string
  
  if(!backend){
    return res.status(400).json({error: 'No backend specified'})
  }

  if(!backends[backend]){
    return res.status(400).json({error: 'Backend not found'})
  }
  
  axios.post(backends[backend], {
    action: 'version'
  })
  .then(function (response) {
    console.log(response.data);
    res.json(response.data)
  })
  .catch(function (error) {
    console.log(error);
    res.status(500).json(error)
  });
}

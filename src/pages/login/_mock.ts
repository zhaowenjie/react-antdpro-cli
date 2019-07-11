function getFakeCaptcha(req: any, res: { json: (arg0: string) => void }) {
  return res.json('captcha-xxx');
}

export default {
  'POST  /mock/service/index/login': (
    req: { body: { password: any; mobile: any; type: any } },
    res: {
      send: (data: any) => void;
    },
  ) => {
    const { password, mobile, type } = req.body;
    console.log(req.body);
    if (password === '111' && mobile === '13167200059') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === 'ant.design' && mobile === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'GET  /api/login/captcha': getFakeCaptcha,
};

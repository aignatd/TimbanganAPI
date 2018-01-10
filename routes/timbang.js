var express = require('express');
var router = express.Router();

// Ignat, 11112017
var fixvalue = require('../utils/fixvalue.json');
var fungsi = require('../utils/fungsi');

/* GET timbang data */
router.post('/timbangan', function(req, res)
{
  var JenisTimbang = req.body["DataAutoTimbang"]["JenisTimbang"];
  var Warehouse = req.body["DataAutoTimbang"]["Warehouse"];

  console.log(JenisTimbang);
  console.log(Warehouse);

  if(Warehouse === "kbns")
  {
    if(JenisTimbang === 2)
    {
      if(global.strResultCom2 === "err" || global.strResultCom2 === "")
        res.status(fixvalue.Kode.Error).json(fungsi.DataTimbangGagal);
      else
        res.status(fixvalue.Kode.OK).json(fungsi.DataTimbangSukses(global.strResultCom2.toString().replace(/B/g, "")));
    }
  }
  else
  if(Warehouse === "plmr")
  {
    if(JenisTimbang === 1)
    {
      if(global.strResultCom1 === "err" || global.strResultCom1 === "")
        res.status(fixvalue.Kode.Error).json(fungsi.DataTimbangGagal());
      else
        res.status(fixvalue.Kode.OK).json(fungsi.DataTimbangSukses(parseInt(global.strResultCom1.toString(), 10)));
    }
    else
    if(JenisTimbang === 2)
    {
      if(global.strResultCom1 === "err" || global.strResultCom1 === "")
        res.status(fixvalue.Kode.Error).json(fungsi.DataTimbangGagal());
      else
        res.status(fixvalue.Kode.OK).json(fungsi.DataTimbangSukses(parseInt(global.strResultCom1.toString(), 10)));
    }
  }
  else
    res.status(fixvalue.Kode.Error).json(fungsi.DataTimbangGagal());
});

module.exports = router;

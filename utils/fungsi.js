/**
 * Created by ignat on 05-Jan-17.
 */

var fixvalue = require('./fixvalue.json')
var strPesan = fixvalue.Pesan;
var strResponID = fixvalue.Kode;
var strJSON;
global.strResultCom1 = "";
global.strResultCom2 = "";

module.exports =
{
  DataTimbangGagal	:	function()
  {
    strJSON = {"CoreResponse" : {"Kode"	:	strResponID.Gagal, "Pesan"	:	strPesan.DataTimbangGagal}};
    return strJSON;
  },
  DataTimbangSukses	:	function(result)
  {
    strJSON =	{"CoreResponse" : {"Kode"	:	strResponID.Sukses, "Pesan"	:	strPesan.DataTimbangSukses},
      "TimbanganRsp"	:	{"Timbangan" : result}};
    return strJSON;
  },
  DataTimbangKosong	:	function()
  {
    strJSON =	{"CoreResponse" : {"Kode"	:	strResponID.Sukses, "Pesan"	:	strPesan.DataTimbangKosong}};
    return strJSON;
  }
};

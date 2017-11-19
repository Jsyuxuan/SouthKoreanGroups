const express = require('express')
const router = express.Router()
const conn = require('../config/db')

const LINK = '/app/api/data/'

var jsonWrite = (res, err, data) => {
  if (err) throw err
  if (data.length === 0) {
    res.json({
      code: '1',
      msg: 'Failed To Obtain Data'
    })
  } else {
    res.json({
      code: '0',
      data: data
    })
  }
}

const $sqlMap = {
  user: {
    select: 'SELECT user_name,user_pwd FROM `gf_user` WHERE user_name=? AND user_pwd=?'
  },
  nav: {
    select: 'SELECT * FROM `gf_nav`',
    inset: 'INSERT INTO `gf_nav` (nav_name) VALUES ?',
    updata: 'UPDATE `gf_nav` SET id = ? WHERE nav_name = ?'
  }
}

conn.connect((err) => {
  if (err) {
    console.log('数据库连接失败 - :' + err)
    return
  }
  router
    .post(LINK + 'user', (req, res, next) => {
      const params = req.body
      const sql = $sqlMap.user.select
      conn.query(sql, [params.username, params.userpwd], (err, data) => {
        jsonWrite(res, err, data)
      })
    })
    .get(LINK + 'nav', (req, res, next) => {
      const sql = $sqlMap.nav.select
      conn.query(sql, (err, data) => {
        jsonWrite(res, err, data)
      })
    })
})

module.exports = router

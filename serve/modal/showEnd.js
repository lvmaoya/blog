const { connection } = require("./index");
const { beforeThreeMouth } = require("../utils/date");
const Genid = require("../utils/snowFlakeID");

// 与其他两页不同的是这个类型没有分页
exports.getIntersetThingDB = () => {
  // 首页，get请求出类别为fun的所有文章
  // is_privacy = 1表示非私有状态
  // status = 0表示发布，status == 1表示暂存，2表示删除

  const params = "select * from blog where is_privacy = 1 and status = 0 and father_category_id = 1";
  return new Promise((resolve) => {
    connection.query(params, function (err, rows, fields) {
      if (err) {
        resolve(err);
      } else {
        resolve(rows);
      }
    });
  });
};
// 获取详情页文章内容
exports.getDetailDB = (req, res) => {
  const params = "select * from content where article_id = " + req.query.id + " limit 1 ";
  return new Promise((resolve) => {
    connection.query(params, function (err, rows, fields) {
      if (err) {
        resolve(err);
      } else {
        resolve(rows[0]);
      }
    });
  });
};
// 为啥要单独获取？因为文章详情与点赞不在同一张表
exports.getDianZanNumDB = (req, res) => {
  // let table = judgeArticleCategory(req.query.id);
  const params = "select * from blog where article_id = " + req.query.id + " limit 1 ";
  return new Promise((resolve) => {
    connection.query(params, function (err, rows, fields) {
      if (err) {
        resolve(err);
      } else {
        resolve(rows[0]);
      }
    });
  });
};
// UPDATE `personal_web`.`tech_article` SET `prefer_num` = '54' WHERE (`article_id` = '2000000000000010');

exports.changeABackPreferNumDB = (req, res) => {
  // let table = judgeArticleCategory(req.body.id);
  let prefer_num = req.body.prefer_num;
  const params = "update blog set prefer_num = " + prefer_num + " where article_id = " + req.body.id + " limit 1 ";
  return new Promise((resolve) => {
    connection.query(params, function (err, rows, fields) {
      if (err) {
        resolve(err);
      } else {
        resolve(rows);
      }
    });
  });
};
exports.getPingLunDB = (req, res) => {
  const params =
    "select * from commentary where article_id = " + req.query.id + " and is_checked = 0 order by created_time desc";
  return new Promise((resolve) => {
    connection.query(params, function (err, rows, fields) {
      if (err) {
        resolve(err);
      } else {
        resolve(rows);
      }
    });
  });
};
// 需要传入文章类别，
exports.getArticleDB = (req, res, category) => {
  const currentPage = req.body.currentPage;
  const size = req.body.size;
  const startItem = (currentPage - 1) * size;

  const params =
    "SELECT SQL_CALC_FOUND_ROWS * FROM blog WHERE is_privacy = 1  and  status = 0" +
    " and father_category_id = " +
    category +
    " LIMIT " +
    startItem +
    "," +
    size +
    ";  SELECT FOUND_ROWS() as total;";
  return new Promise((resolve) => {
    connection.query(params, function (err, rows, fields) {
      if (err) {
        resolve(err);
      } else {
        resolve(rows);
      }
    });
  });
};
// 获取最近三个月的文章
exports.getRecentArticleDB = (req, res) => {
  const currentPage = req.body.currentPage;
  const size = req.body.size;
  const startItem = (currentPage - 1) * size;
  let time = beforeThreeMouth();
  const params =
    "SELECT SQL_CALC_FOUND_ROWS * FROM blog WHERE is_privacy = 1 and  status = 0 and father_category_id = 2 and published_time > '" +
    time +
    "' order by published_time desc LIMIT " +
    startItem +
    "," +
    size +
    ";  SELECT FOUND_ROWS() as total;";
  return new Promise((resolve) => {
    connection.query(params, function (err, rows, fields) {
      if (err) {
        resolve(err);
      } else {
        resolve(rows);
      }
    });
  });
};
exports.getHotArticleDB = (req, res) => {
  const currentPage = req.body.currentPage;
  const size = req.body.size;
  const startItem = (currentPage - 1) * size;

  const params =
    "SELECT SQL_CALC_FOUND_ROWS * FROM blog WHERE is_privacy = 1  and  status = 0 and father_category_id = 2 " +
    " order by pageview desc LIMIT " +
    startItem +
    "," +
    size +
    ";  SELECT FOUND_ROWS() as total;";
  return new Promise((resolve) => {
    connection.query(params, function (err, rows, fields) {
      if (err) {
        resolve(err);
      } else {
        resolve(rows);
      }
    });
  });
};
exports.getArticleByCategoryDB = (req, res) => {
  const currentPage = req.body.currentPage;
  const size = req.body.size;
  const startItem = (currentPage - 1) * size;
  const category_id = req.body.category_id;
  const params =
    "SELECT SQL_CALC_FOUND_ROWS * FROM blog WHERE is_privacy = 1 and  status = 0 and father_category_id = 2  and category_id = " +
    category_id +
    " LIMIT " +
    startItem +
    "," +
    size +
    ";  SELECT FOUND_ROWS() as total;";

  return new Promise((resolve) => {
    connection.query(params, function (err, rows, fields) {
      if (err) {
        resolve(err);
      } else {
        resolve(rows);
      }
    });
  });
};

exports.getArticleCategoryDB = (req, res) => {
  // 有两个是因为为以后的blog获取类别做准备
  let category = req.query.category == "tech_article" ? 2 : 3;
  const params = "select category_id,category_name from category where father_category_name = " + category;
  return new Promise((resolve) => {
    connection.query(params, function (err, rows, fields) {
      if (err) {
        resolve(err);
      } else {
        resolve(rows);
      }
    });
  });
};

exports.searchArticleDB = (req, res) => {
  const currentPage = req.body.currentPage ?? 1;
  let size = req.body.size ?? 10;
  const searchData = req.body.searchData;
  const startItem = (currentPage - 1) * size;

  if (searchData == "" || searchData == undefined) {
    return this.getArticleDB(req, res, 2);
  }
  let params =
    "select SQL_CALC_FOUND_ROWS blog.article_id,title,description,cover_image,pageview,prefer_num,published_time,author from blog,content where is_privacy = 1 and  status = 0 and father_category_id = 2 and blog.article_id = content.article_id and (title like '%" +
    searchData +
    "%' or description like '%" +
    searchData +
    "%' or content like '%" +
    searchData +
    "%') limit " +
    startItem +
    "," +
    size +
    ";  SELECT FOUND_ROWS() as total;";
  return new Promise((resolve) => {
    connection.query(params, function (err, rows, fields) {
      if (err) {
        resolve(err);
      } else {
        resolve(rows);
      }
    });
  });
};

exports.searchBlogDB = (req, res) => {
  const currentPage = req.body.currentPage ?? 1;
  let size = req.body.size ?? 10;
  const searchData = req.body.searchData;
  const startItem = (currentPage - 1) * size;

  if (searchData == "" || searchData == undefined) {
    return this.getArticleDB(req, res, 1);
  }
  let params =
    "select SQL_CALC_FOUND_ROWS blog.article_id,title,description,cover_image,pageview,prefer_num,published_time,author from blog,content where is_privacy = 1 and  status = 0 and father_category_id = 3 and blog.article_id = content.article_id and (title like '%" +
    searchData +
    "%' or description like '%" +
    searchData +
    "%' or content like '%" +
    searchData +
    "%') limit " +
    startItem +
    "," +
    size +
    ";  SELECT FOUND_ROWS() as total;";
  return new Promise((resolve) => {
    connection.query(params, function (err, rows, fields) {
      if (err) {
        resolve(err);
      } else {
        resolve(rows);
      }
    });
  });
};
exports.getUserInfoDB = () => {
  const params = "select * from user where userName = 'sunjianxiang'";
  return new Promise((resolve) => {
    connection.query(params, function (err, rows, fields) {
      if (err) {
        resolve(err);
      } else {
        resolve(rows);
      }
    });
  });
};

exports.changePVDataDB = (req, res) => {
  let id = req.body.id;
  const params = "update blog set pageview = pageview + 1  where article_id = " + id + " limit 1 ";
  return new Promise((resolve) => {
    connection.query(params, function (err, rows, fields) {
      if (err) {
        resolve(err);
      } else {
        resolve(rows);
      }
    });
  });
};

/**
 * @description: 新增类别
 * @param {}
 * @return {*}
 */
exports.commitCommentDB = (req, res) => {
  const genid = new Genid({ WorkerId: 1 });

  const commentary_id = genid.NextId();
  const article_id = req.body.articleId;
  const to_id = req.body.to_id === undefined ? null : req.body.to_id;
  const to_name = req.body.to_name === undefined ? null : req.body.to_name;
  const user_name = req.body.userName;
  const avatar = req.body.avatar;
  const content = req.body.content;
  const created_time = req.body.created_time;
  const comment_type = req.body.comment_type;

  const commentParams = [
    commentary_id,
    article_id,
    to_id,
    to_name,
    user_name,
    avatar,
    content,
    created_time,
    comment_type,
  ];
  const insertComment =
    "insert commentary (commentary_id, article_id, to_id,to_name, user_name, avatar, content, created_time, comment_type) values (?,?,?,?,?,?,?,?,?)";

  return new Promise((resolve, reject) => {
    connection.query(insertComment, commentParams, function (err, rows, fields) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

<template>
  <!-- 消除routerview中加过渡时没有根元素报错 -->
  <div>
    <div class="detailArticle" @click="handleBodyClick">
      <!-- <div class="ww"> -->
      <div class="w">
        <!-- <div v-html="detailArticle"></div> -->
        <v-md-preview :text="detailArticle"></v-md-preview>
        <div class="comment">
          <ul>
            <li>
              <span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-eye1"></use>
                </svg>
              </span>
              <span> {{ pageview > 10000 ? "pageview/10000" + "w" : pageview }} </span>
            </li>
            <li @click="handleDianzanClick">
              <span>
                <svg class="icon" aria-hidden="true" :style="isPraise ? 'color:#fc5531' : 'color:gray'">
                  <use xlink:href="#icon-dianzan1"></use>
                </svg>
              </span>
              <span> {{ dianZanNum }} </span>
            </li>

            <li @click.stop="handlePinglunClick" class="pinglun">
              <span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-xiazai16"></use>
                </svg>
              </span>
              <span> {{ commentNum }} </span>
            </li>
            <li @click="handleHongbaoClick">
              <el-tooltip placement="top">
                <template #content> 暂时不支持打赏 </template>
                <span>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-hongbao"></use>
                  </svg>
                </span>
              </el-tooltip>
            </li>
            <li @click="handleFenxiangClick">
              <span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-fenxiang1"></use>
                </svg>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div :class="`${drawerActive ? 'drawerActive drawer' : 'drawer'}`">
      <div class="drawerScroll">
        <div class="drawerHeader">
          <span>评论</span>
          <span @click.stop="handleCancelClick">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-cha"></use>
            </svg>
          </span>
        </div>
        <div class="drawerBody">
          <div class="commentListEdit">
            <div class="userImg" v-html="avatar"></div>
            <div id="commentForm">
              <textarea
                name="commentContent"
                ref="textareaRef"
                id="commentContent"
                placeholder="欢迎高质量的评论，低质的评论会被折叠"
                maxlength="1000"
                v-model="textareaText"
              ></textarea>
              <div class="commentOperate">
                <div class="comment-operate-l">
                  <span
                    >还能输入<em>{{ maxlength }}</em
                    >个字符</span
                  >
                </div>
                <div class="comment-operate-r">
                  <button class="btnComment" @click="handleCommentClick">评论</button>
                </div>
              </div>
            </div>
          </div>
          <div class="commentListContainer">
            <div class="commentListBox">
              <ul>
                <li class="commentLi" v-for="item in commentText" :key="item.commentary_id">
                  <div class="commentListItem">
                    <div class="userImg" v-html="multiavatar(item.avatar)"></div>
                    <div class="right-box">
                      <div class="new-info-box">
                        <div class="comment-top">
                          <div class="user-box">
                            <div class="name">
                              <div class="commentName">{{ item.user_name }}</div>
                              <div v-if="item.comment_type == 1" class="anwserName">
                                <span class="answerText">回复</span>
                                <span class="anwserNameContent">
                                  {{ item.to_name }}
                                </span>
                              </div>
                            </div>
                            <div class="date">
                              {{ formatTime(new Date(item.created_time)).toString().substring(2) }}
                            </div>
                          </div>
                          <div class="response-box" @click="handleResponseSBClick(item.commentary_id, item.user_name)">
                            <svg class="icon" aria-hidden="true">
                              <use xlink:href="#icon-xiazai16"></use>
                            </svg>
                          </div>
                        </div>
                        <div class="comment-center">
                          <div class="new-comment">{{ item.content }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="commentLookMore"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
    <footer-view></footer-view>
    <!-- 评论时提交用户名 -->
    <el-dialog v-model="userNameCommitVisible" title="昵称" width="30%" center>
      <el-input v-model="userName" placeholder="放心好了，仅用于展示评论" maxlength="10" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="userNameCommitVisible = false">取消</el-button>
          <el-button type="primary" @click="handleCommitUserName"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import FooterView from "../../components/footer/FooterView.vue";
import { useRoute } from "vue-router";
import {
  getArticleDetail,
  getDianZanNum,
  changeABackPreferNum,
  getPingLun,
  changePVData,
  commitComment,
} from "@/service/detail";
import { onBeforeMount, ref, onMounted } from "@vue/runtime-core";
import { isListMounted } from "@/utils/isListMounted";
import { watch } from "vue";
import cache from "@/utils/cache";
import { debounce } from "@/utils/debounce";
import cookie from "@/utils/cookie";
import multiavatar from "@multiavatar/multiavatar";
import { ElNotification } from "element-plus";
import { formatTime } from "@/utils/formatTime";
export default {
  name: "detailArticleView",
  components: {
    FooterView,
  },

  setup() {
    // 填写用户名对话框
    const userNameCommitVisible = ref(false);
    // 用户名
    let userName = ref("");
    userName.value = cache.getCache("un") || "";
    const route = useRoute();
    const articleId = route.query.id.toString();
    let detailArticle = ref("");
    isListMounted();

    // 获取时间戳加上一个0到100万的随机数
    let timeStamp = new Date().getTime();
    let random = Math.floor(Math.random() * 1000000);
    let avatarValue = timeStamp + random;
    if (cache.getCache("avatar")) {
      avatarValue = cache.getCache("avatar");
    }
    // else {
    //   cache.setCache("avatar", avatarValue);
    // }
    // 生成一个svg头像，传入的数值相等生成的头像一样
    let avatar = multiavatar(avatarValue);
    // 一个用户可以同时浏览多篇文章，点赞多篇文章，存入文章id，加载前判断
    let praisedArticle = ref([]);
    // ref([12, 23, 10, 9])
    // 多个用户
    const isPraise = ref(false);
    // 抽屉显示
    let drawerActive = ref(false);
    // 最大评论字数
    let maxlength = ref(1000);
    // 双向绑定
    let textareaText = ref("");

    // 点赞数量
    let dianZanNum = ref(0);
    let pageview = ref(0);
    watch(textareaText, (value) => {
      maxlength.value = 1000 - value.length;
    });

    // 初始化praiseArticle，如果有就初始化，没有就保持null
    praisedArticle.value = cache.getCache("praisedArticle") ?? [];

    // 检测这篇文章是否点过赞
    let isPraisedArticle = () => {
      for (let i of praisedArticle.value) {
        if (i == articleId) {
          isPraise.value = true;
          return;
        }
      }
    };
    // 如果有缓存，判断这篇文章是否点过赞
    isPraisedArticle();

    // 获取点赞数量和浏览次数（浏览次数为后来新增）
    const getPreferNum = async () => {
      const dianZanNumData = await getDianZanNum({ id: articleId });
      dianZanNum.value = dianZanNumData.data.data.dianZanNum;
      pageview.value = dianZanNumData.data.data.pageview;
    };
    // 统计文章访问思路：在cookie中记住文章id为一个数组，打开页面时如果数组里没有就发送请求增加其访问量
    const pvArticle = ref([]);
    pvArticle.value = cookie.returnArrCookie("pvArticle");

    const changePV = async () => {
      await changePVData({ id: articleId });
    };
    const changePageView = () => {
      if (pvArticle.value.length === 0) {
        changePV()
          .then(() => {
            cookie.setArrCookie("pvArticle", articleId);
          })
          .finally(() => {
            getPreferNum();
          });
      } else {
        if (pvArticle.value.includes(Number(articleId))) {
          return getPreferNum();
        } else {
          changePV()
            .then(() => {
              cookie.setArrCookie("pvArticle", articleId);
            })
            .finally(() => {
              getPreferNum();
            });
        }
      }
    };
    // 正确的做法是需要保证changepageview在前面，getprefernum在后面
    changePageView();

    // 获取评论
    const commentText = ref([]);
    const commentNum = ref(0);
    const getComment = async () => {
      const pingLunData = await getPingLun({ id: articleId });
      commentText.value = pingLunData.data.data.list;
      commentNum.value = pingLunData.data.data.total || 0;
    };
    getComment();
    onBeforeMount(async () => {
      const detailArticleData = await getArticleDetail({ id: articleId });
      detailArticle.value = detailArticleData.data.data.content;
    });

    // 两秒钟改一次
    // ！如果因为网卡，这里也会变红，可能会出现反向点赞
    const changePreferNum = debounce(async () => {
      await changeABackPreferNum({ id: articleId, prefer_num: dianZanNum.value });
    }, 2000);
    // 点赞功能
    const handleDianzanClick = () => {
      // 样式的变化
      isPraise.value = !isPraise.value;
      changePreferNum();
      // 如果点赞了
      if (isPraise.value === true) {
        praisedArticle.value.push(articleId);
        cache.setCache("praisedArticle", praisedArticle.value);
        dianZanNum.value = dianZanNum.value + 1;
      } else {
        praisedArticle.value = praisedArticle.value.filter((item) => item != articleId);
        cache.setCache("praisedArticle", praisedArticle.value);
        dianZanNum.value = dianZanNum.value - 1;
      }
    };
    // 评论
    const handlePinglunClick = () => {
      drawerActive.value = !drawerActive.value;
    };
    const handleHongbaoClick = () => {};
    const handleFenxiangClick = () => {
      // cookie.setCookie("sunjianxiang", "zhenshuai");
    };
    const handleBodyClick = () => {
      drawerActive.value = false;
    };
    const handleCancelClick = () => {
      drawerActive.value = false;
    };
    const handleCommitUserName = () => {
      // 关闭对话框，添加缓存，赋值userName
      userNameCommitVisible.value = false;
      cache.setCache("un", userName.value);
    };
    const textareaRef = ref();
    const to_id = ref();
    const to_user_name = ref();
    const handleCommentClick = async () => {
      // 检测为空不，检测是否有用户名
      if (textareaText.value === "") {
        ElNotification({
          message: "写都不写，评什么评（手动狗头）",
          duration: 3000,
          type: "error",
          showClose: false,
        });
      } else {
        if (userName.value === "") {
          userNameCommitVisible.value = true;
        } else {
          // 判断是否在回复别人
          if (textareaText.value.includes(`@` + to_user_name.value + "：")) {
            textareaText.value = textareaText.value.replace(`@` + to_user_name.value + "：", "");
          } else {
            to_id.value = undefined;
            to_user_name.value = "";
          }
          // 评论人：最长十个字,头像：一串数字，时间，to_id
          let comment = {
            articleId: articleId,
            to_id: to_id.value || undefined,
            to_name: to_user_name.value || undefined,
            userName: userName.value,
            avatar: avatarValue,
            content: textareaText.value,
            created_time: new Date().toLocaleString(),
            comment_type: 1,
          };

          if (to_id.value === null || to_id.value === undefined) {
            comment.comment_type = 0;
          }
          const commentRes = await commitComment(comment);
          if (commentRes.data.code === 0) {
            // 重新获取评论
            getComment();
            textareaText.value = "";
            cache.setCache("avatar", avatarValue);
            ElNotification({
              message: "评论成功！",
              duration: 2000,
              type: "success",
              showClose: false,
            });
          } else {
            ElNotification({
              message: "评论失败！",
              duration: 2000,
              type: "error",
              showClose: false,
            });
          }
        }
      }
    };

    const handleResponseSBClick = (user_id, user_name) => {
      textareaText.value = "@" + user_name + "：";
      textareaRef.value.focus();
      to_id.value = user_id;
      to_user_name.value = user_name;
    };
    onMounted(() => {});
    return {
      textareaRef,
      handleResponseSBClick,
      detailArticle,
      handleDianzanClick,
      handlePinglunClick,
      handleHongbaoClick,
      handleFenxiangClick,
      isPraise,
      drawerActive,
      handleBodyClick,
      handleCancelClick,
      maxlength,
      textareaText,
      dianZanNum,
      commentText,
      commentNum,
      pageview,
      avatar,
      userNameCommitVisible,
      handleCommentClick,
      userName,
      handleCommitUserName,
      formatTime,
      multiavatar,
    };
  },
};
</script>

<style lang="scss" scoped>
.w {
  border: none;
}
.comment {
  height: auto;
  padding: 1.5em 0em;
  margin: 0 32px 15px 32px;
  background-color: #f7f7f7;
  border-radius: 5px;
  ul {
    display: flex;
    justify-content: flex-end;
    li {
      margin-right: 1.325em;
      span {
        .icon {
          font-size: 1.4em;
          color: gray;
        }
        vertical-align: baseline;
        margin-right: 0.3em;
        cursor: pointer;
        user-select: none;
      }
    }
  }
}
.drawer {
  width: 30%;
  min-width: 432px;
  max-width: 532px;
  z-index: 517;
  height: 100vh;
  background-color: #fdfdfd;
  position: fixed;
  right: -532px;
  padding-top: 5em;
  top: 0;
  transition: right 1s;
  .drawerScroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    // 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。
    &::-webkit-scrollbar-button {
      display: none;
    }
    // 滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
    &::-webkit-scrollbar-thumb {
      background: rgba(80, 79, 79, 0.3);
      cursor: pointer;
      border-radius: 4px;
    }
    // 边角，即两个滚动条的交汇处
    &::-webkit-scrollbar-corner {
      display: none;
    }
    // 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件
    &::-webkit-resizer {
      display: none;
    }
  }

  .drawerHeader {
    padding: 24px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e8e8ed;
    .icon {
      color: gray;
    }
  }
  .drawerBody {
    display: flex;
    flex-direction: column;
    padding: 24px;
    padding-bottom: 5em;

    .commentListEdit {
      width: 100%;
      display: flex;
      justify-content: space-between;
      position: sticky;
      top: 0;
      background-color: #fdfdfd;
      z-index: 1234;
      padding-bottom: 10px;
      .userImg {
        margin-right: 8px;
        padding-top: 9px;
        :deep(svg) {
          width: 30px;
          height: 30px;
        }
        img {
          display: block;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid #e8e8ed;
        }
      }
      #commentForm {
        width: 100%;
        position: relative;
        background: rgba(245, 246, 247, 0.8);
        border-radius: 8px;
        padding: 14px 0;
        #commentContent {
          display: block;
          width: 100%;
          background: rgba(248, 249, 251, 0.8);
          border: none;
          padding: 0 16px;
          border-radius: 4px;
          resize: none;
          height: 88px;
          font-size: 14px;
          line-height: 22px;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          font-family: "SF Pro Display", Roboto, Noto, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
            sans-serif;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          outline: none;

          /*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
          // 滚动条整体部分
          &::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
          // 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。
          &::-webkit-scrollbar-button {
            display: none;
          }
          // 滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
          &::-webkit-scrollbar-thumb {
            background: rgba(80, 79, 79, 0.3);
            cursor: pointer;
            border-radius: 4px;
          }
          // 边角，即两个滚动条的交汇处
          &::-webkit-scrollbar-corner {
            display: none;
          }
          // 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件
          &::-webkit-resizer {
            display: none;
          }
        }
        .commentOperate {
          padding: 8px 16px 0 16px;
          display: flex;
          justify-content: space-between;
          .comment-operate-l {
            span {
              font-size: 12px;
              color: #999aaa;
              line-height: 17px;
              em {
                color: #222226;
                margin: 0 4px;
                font-style: normal;
                font-size: 12px;
              }
            }
          }
          .comment-operate-r {
            .btnComment {
              display: block;
              width: 60px;
              height: 24px;
              background: #6e8efb;
              color: white;
              border-radius: 16px;
              font-size: 14px;
              text-align: center;
              line-height: 24px;
              border: none;
            }
          }
        }
      }
    }
    .commentListContainer {
      padding-top: 12px;
      .commentListBox {
        .commentListItem {
          display: flex;
          width: 100%;
          .userImg {
            margin-right: 8px;
            padding-top: 16px;
            :deep(svg) {
              width: 30px;
              height: 30px;
            }
          }
          .right-box {
            padding-top: 16px;
            padding-bottom: 16px;
            width: 100%;
            margin-left: 8px;
            &:hover .response-box {
              display: block !important;
            }
            .comment-top {
              display: flex;
              justify-content: space-between;
              margin-bottom: 4px;
              line-height: 20px;
              font-size: 14px;
              .user-box {
                display: flex;
                .name {
                  display: flex;
                  color: #777888;
                  margin-right: 4px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;

                  .commentName {
                    max-width: 70px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                  .anwserName {
                    margin-left: 7px;
                    display: flex;
                    .answerText {
                      display: block;
                      margin-right: 7px;
                      font-style: italic;
                    }
                    .anwserNameContent {
                      display: block;
                      max-width: 65px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                  }
                }
                .date {
                  margin-left: 5px;
                  font-style: italic;
                  font-size: 12px;
                  color: #777888;
                }
              }
              .response-box {
                display: none;
                cursor: pointer;
                .icon {
                  transform: rotateY(180deg);
                  width: 1.2em;
                  height: 1.2em;
                }
              }
            }
            .comment-center {
              .new-comment {
                font-size: 14px;
                color: #222226;
                line-height: 22px;
                word-break: break-word;
              }
            }
          }
        }
      }
    }
  }
}
.drawerActive {
  right: 0;
}
@media screen and (max-width: 770px) {
  .w {
    width: 90%;
  }
}
@media screen and (max-width: 415px) {
  .w {
    width: 100%;
  }
  :deep(.github-markdown-body) {
    padding: 16px 16px 32px !important;
  }
  :deep(.el-dialog) {
    width: 96% !important;
  }
  .comment {
    margin: 0 32px 0 32px !important;
    ul {
      li {
        margin-right: 0;
      }
      justify-content: space-around;
    }
  }
  .drawer {
    height: auto;
    width: 100%;
    position: relative;
    right: 0;
    min-width: 300px;
  }
}
</style>

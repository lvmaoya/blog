// import  ClipboardJS  from "clipboard";
// import { ElNotification } from "element-plus";

// export function handleClipboard(element, text) {
//   console.log(element);
//   console.log(text);
//   const clipboard = new ClipboardJS(element, {
//     text: () => text,
//   });
//   clipboard.on("success", () => {
//     ElNotification({
//       type: "success",
//       message: "复制成功！",
//     });
//     clipboard.destroy();
//   });
//   clipboard.on("error", () => {
//     ElNotification({
//       type: "error",
//       message: "复制失败！",
//     });
//     clipboard.destroy();
//   });
// }

import sjRequest from "..";

export function getUserInfo(){
    return sjRequest.get({url:"/getUserInfo"})
}
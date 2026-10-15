let currentPath=$state(typeof window==='undefined'?'/':window.location.pathname);
function readPath(){currentPath=window.location.pathname;}
if(typeof window!=='undefined')window.addEventListener('popstate',readPath);
export const router={get path(){return currentPath},navigate(path){if(typeof window==='undefined')return;window.history.pushState({},'',path);readPath();window.scrollTo?.({top:0,behavior:'instant'});},replace(path){if(typeof window==='undefined')return;window.history.replaceState({},'',path);readPath();}};
export function pathFor(path){return path===currentPath?'aria-current="page"':'';}

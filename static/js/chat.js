window.onload = () => {


  // 给左边用户名列表注册滚动条
  $('.left').niceScroll({
    cursorcolor: "#54575C",
    cursorwidth: "5px",
    cursorborder: "0",
    cursorborderradius: "0",
  })
  // 给聊天窗口注册滚动条
  $('.chat-window').niceScroll({
    cursorcolor: "#54575C",
    cursorwidth: "5px",
    cursorborder: "0",
    cursorborderradius: "0",
  })



  const username = document.getElementsByClassName("name")[0].innerHTML;
  let ws = new WebSocket("ws://localhost:4000");

  const say = (e) => {
    let oDiv = document.createElement("div");
    let chatWindow = document.getElementsByClassName("chat-window")[0];
    oDiv.classList.add("message");
    chatWindow.appendChild(oDiv);
    let n = e.data.split("：");
    let name = document.createElement("div");
    name.classList.add("name");
    name.innerHTML = n[0];
    let say = document.createElement("div");
    say.classList.add("say");
    say.innerHTML = n[1];
    oDiv.appendChild(name);
    oDiv.appendChild(say);

    if (String(e.data.split("说")[0]) == String(username)) {
      oDiv.classList.add("self");
    }
  };

  const system = (e) => {
    let oDiv = document.createElement("div");
    let chatWindow = document.getElementsByClassName("chat-window")[0];
    oDiv.classList.add("message");
    chatWindow.appendChild(oDiv);
    let oMsg = document.createElement("div");
    oMsg.classList.add("system");
    oMsg.innerHTML = e.data;
    oDiv.appendChild(oMsg);
  };

  ws.onmessage = (e) => {
    if (e.data.indexOf("说") > -1) {
      say(e);
    } else if (e.data.indexOf("加入") > -1 || e.data.indexOf("退出") > -1) {
      system(e);
    }
  };

  const btn = document.getElementsByClassName("btn")[0];
  btn.addEventListener("click", function (e) {
    let msg = document.querySelector("input").value;
    ws.send(`${msg}`);
    msg = "";
  });


};


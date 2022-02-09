window.onload = () => {
  const btn = document.getElementsByClassName("btn")[0];

  const toLogin = async (username, passwd) => {
    const res = await axios({
      url: "/",
      method: "POST",
      Headers: {
        "Content-Type": "application/json",
      },
      data: {
        username,
        passwd,
      },
    });
    if (res.data.state == 0) {
      console.log("登录成功");
      window.location.href = res.data.url;
    } else if (res.data.state == 2) {
      console.log("密码错误");
    } else if (res.data.state == 3) {
      console.log("该用户已登录过了");
    } else {
      console.log("未知错误");
    }
  };

  btn.addEventListener("click", function (e) {
    e.stopPropagation(); //取消事件冒泡
    const userValue = document.getElementById("un").value;
    const passValue = document.getElementById("pwd").value;
    if (userValue && passValue) {
      toLogin(userValue, passValue);
    } else {
      alert("Please Enter");
    }
  });
};

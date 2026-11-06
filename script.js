document.querySelector("#today").textContent =
  new Intl.DateTimeFormat("ko-KR", { dateStyle: "full" }).format(new Date());

document.querySelector("#load").addEventListener("click", () => {
  document.querySelector("#result").textContent =
    "연결 성공 시 여기에 API 결과를 표시합니다.";
});
```

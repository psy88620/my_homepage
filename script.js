async function loadPublicData() {
  const output = document.querySelector("#result");
  output.textContent = "불러오는 중…";
  try {
    const response = await fetch("https://open.neis.go.kr/hub/mealServiceDietInfo");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    output.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    output.textContent = "데이터를 불러오지 못했습니다. 주소와 API 제공자의 CORS 안내를 확인하세요.";
    console.error(error);
  }
}
document.querySelector("#load").addEventListener("click", loadPublicData);

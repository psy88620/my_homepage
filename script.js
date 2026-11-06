
const ATPT = "N10";        // 교육청 코드
const SCHUL = "8140262";   // 학교 코드

const today = new Date().toLocaleDateString("sv-SE").replaceAll("-", ""); // 20261106 형식
document.querySelector("#today").textContent = new Date().toLocaleDateString("ko-KR", { dateStyle: "full" });

async function loadMeal() {
  const output = document.querySelector("#result");
  output.textContent = "불러오는 중…";
  try {
    const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json`
      + `&ATPT_OFCDC_SC_CODE=${ATPT}&SD_SCHUL_CODE=${SCHUL}&MLSV_YMD=${today}`;
    const data = await (await fetch(url)).json();
    const rows = data.mealServiceDietInfo?.[1].row;
    if (!rows) { output.textContent = "오늘은 급식 정보가 없습니다."; return; } // 주말·방학 = INFO-200
    output.innerHTML = rows.map(r =>
      `<h3>${r.MMEAL_SC_NM} <small>${r.CAL_INFO}</small></h3>
       <p>${r.DDISH_NM.replace(/\s*\([\d.]+\)/g, "")}</p>`   // 알레르기 번호 (1.5.6) 지우기
    ).join("");
  } catch (e) {
    output.textContent = "급식 정보를 불러오지 못했습니다.";
    console.error(e);
  }
}
document.querySelector("#load").addEventListener("click", loadMeal);

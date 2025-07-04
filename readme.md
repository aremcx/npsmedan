      "https://script.google.com/macros/s/AKfycbxOM5RXzKCQ88LqJsNM-WGzFGg49xDfwDdP6y2hvToFOSOnmRrHW_8gf0YJqf231gOV/exec"

      sheetID = 1iLW6x_SROed0J4_uSjqYLMFxXcgpzFmGPIHnE12N7NM

      function doPost(e) {
  const ss = SpreadsheetApp.openById("1iLW6x_SROed0J4_uSjqYLMFxXcgpzFmGPIHnE12N7NM");
  const sheet = ss.getSheetByName("Sheet1");

  const data = JSON.parse(e.postData.contents);

  Logger.log(data);

  sheet.appendRow([
    data.orgName,
    data.smedan,
    data.amount,
    data.discount,
    data.finalAmount,
    data.remarks,
    data.date,
    data.officerId
  ]);

  const output = ContentService.createTextOutput("Success");
  output.setMimeType(ContentService.MimeType.TEXT);
  output.appendHeader("Access-Control-Allow-Origin", "*"); // use your specific domain in production
  output.appendHeader("Access-Control-Allow-Methods", "POST");
  output.appendHeader("Access-Control-Allow-Headers", "Content-Type");

  return output;
}


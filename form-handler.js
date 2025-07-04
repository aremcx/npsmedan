function calculateDiscount() {
  const amount = parseFloat(document.getElementById("amount").value) || 0;
  const smedan = document.querySelector('input[name="smedan"]:checked')?.value;
  const eligible = smedan === "Yes";
  const discount = eligible ? amount * 0.15 : 0;
  document.getElementById("discount").value = discount.toFixed(2);
  document.getElementById("finalAmount").value = (amount - discount).toFixed(2);
}

document.getElementById("smedanForm").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("loader").style.display = "block";

  const data = JSON.stringify({
    orgName: document.getElementById("orgName").value,
    smedan: document.querySelector('input[name="smedan"]:checked')?.value || "No",
    amount: document.getElementById("amount").value,
    discount: document.getElementById("discount").value,
    finalAmount: document.getElementById("finalAmount").value,
    remarks: document.getElementById("remarks").value,
    date: document.getElementById("date").value,
    officerId: document.getElementById("officerId").value,
    state: document.getElementById("state").value,
    lga: document.getElementById("lga").value,
    postOffice: document.getElementById("postOffice").value
  });
  fetch("https://npsmedan.vercel.app/api/submit", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})
  .then(res => res.text())
  .then(response => {
    document.getElementById("loader").style.display = "none";
    alert("Submitted successfully ✅");
    document.getElementById("smedanForm").reset();
    document.getElementById("discount").value = "";
    document.getElementById("finalAmount").value = "";
    document.getElementById("lga").innerHTML = '<option value="">Select LGA</option>';
  })
  .catch(error => {
    document.getElementById("loader").style.display = "none";
    alert("Something went wrong ❌");
  });
});

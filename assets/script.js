let players = [];

document.getElementById("addPlayer").addEventListener("click", () => {
  const firstName = document.getElementById("playerFirstName").value;
  const lastName = document.getElementById("playerLastName").value;
  const score = parseInt(document.getElementById("playerScore").value);
  const country = document.getElementById("playerCountry").value;
  const imageInput = document.getElementById("playerImage");
  const imageFile = imageInput.files[0];

  if (firstName && lastName && country && !isNaN(score) && imageFile) {
    if (
      players.some(
        (player) =>
          player.firstName === firstName && player.lastName === lastName
      )
    ) {
      alert("Player with the same name already exists.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const player = {
        firstName,
        lastName,
        country,
        score,
        image: e.target.result,
      };
      players.push(player);
      sortPlayers();
      updateTable();
      updateTop3Players();
      clearInputs();
    };
    reader.readAsDataURL(imageFile);
  } else {
    alert("Please enter valid player details and upload an image");
  }
});

function updateTable() {
  const tableBody = document.getElementById("playerTable");
  tableBody.innerHTML = players
    .map(
      (player, index) => `
            <tr>
                <td class="border px-4 py-2">
                  <img src="${player.image}" alt="Player Image" class="w-16 h-16 object-cover rounded-full">
                </td>
                <td class="border px-4 py-2">${player.firstName}</td>
                <td class="border px-4 py-2">${player.lastName}</td>
                <td class="border px-4 py-2">${player.country}</td>
                <td class="border px-4 py-2">${player.score}</td>
                <td class="border px-4 py-2 space-x-8">
                    <span>
                      <button onclick="changeScore(${index}, 5)" class="bg-blue-500 text-white px-2 py-1">+5</button>
                      <button onclick="changeScore(${index}, -5)" class="bg-red-500 text-white px-2 py-1">-5</button>
                     </span>
                    <button onclick="deletePlayer(${index})" class="bg-gray-500 text-white px-2 py-1">Delete</button>
                </td>
            </tr>
        `
    )
    .join("");
}

function updateTop3Players() {
  const top3 = players.slice(0, 3);
  const top3Elements = ["🥇", "🥈", "🥉"];

  top3Elements.forEach((id, index) => {
    const element = document.getElementById(id);
    if (top3[index]) {
      element.innerHTML = `
                          <div class="border p-3 flex gap-5">
                            <div class="relative">
                                <img src="${top3[index].image}" alt="Player Image" class="w-16 h-16 object-cover rounded-full mx-auto mb-2">
                                <span class="absolute bottom-0 right-0 text-lg">${top3Elements[index]}</span>
                            </div>
                            <div class="">
                              <div class="font-bold">${top3[index].firstName} ${top3[index].lastName}</div>
                              <div>${top3[index].country}</div>
                              <div>Score: ${top3[index].score}</div>
                            </div>
                          </div> `;
    } else {
      element.innerHTML = "";
    }
  });
}

function changeScore(index, amount) {
  players[index].score += amount;
  sortPlayers();
  updateTable();
  updateTop3Players();
}

function deletePlayer(index) {
  players.splice(index, 1);
  updateTable();
  updateTop3Players();
}

function sortPlayers() {
  players.sort((a, b) => b.score - a.score);
}

function clearInputs() {
  document.getElementById("playerFirstName").value = "";
  document.getElementById("playerLastName").value = "";
  document.getElementById("playerScore").value = "";
  document.getElementById("playerCountry").value = "";
  document.getElementById("playerImage").value = "";
}

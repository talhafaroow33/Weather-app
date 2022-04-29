async function getUserData() {
  const response = await fetch("/api");
  const data = await response.json();

  return data;
}

async function displayList() {
  const data = await getUserData();

  for (user of data) {
    const { latitude, longitude, name } = user;

    const listItem = document.createElement("li");
    const userLatitude = document.createElement("span");
    const userLongitude = document.createElement("span");
    const userName = document.createElement("span");

    userLatitude.textContent = `latitude: ${latitude} - `;
    userLongitude.textContent = `longitude: ${longitude} - `;
    userName.textContent = `name: ${name}`;

    listItem.append(userLatitude, userLongitude, userName);
    document.getElementById("list").appendChild(listItem);
  }
}

displayList();

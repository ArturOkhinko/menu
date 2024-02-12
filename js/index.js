import MainController from "./http/mainController.js";

function selectNameOption(name, price) {
  if (price) {
    return name + ":" + " " + price;
  }
  return name;
}

async function renderMenu() {
  const data = await MainController.getDataForMenu();
  data.services.forEach((service) => {
    if (service.head === null) {
      const menu = document.createElement("div");
      const item = document.createElement("div");

      menu.className = "menu";
      item.className = "item" + " " + service.sorthead;
      item.id = service.id;

      const subparagraph = document.createElement("div");
      subparagraph.innerHTML = selectNameOption(service.name, service.price);

      const mainDOMNode = document.querySelector(".main");
      item.append(subparagraph);
      menu.append(item);
      return mainDOMNode.append(menu);
    }
    const itemMatchingId = document.getElementById(String(service.head));
    const item = document.createElement("div");
    const subparagraph = document.createElement("div");

    item.id = service.id;
    item.className = "item";
    subparagraph.className = "subparagraph" + " " + service.sorthead;
    subparagraph.innerHTML = selectNameOption(service.name, service.price);
    item.append(subparagraph);

    const childNodes = item.childNodes;

    for (const childNode of childNodes) {
      if (childNode.className.split(" ")[1] > service.sorthead) {
        return childNode.before(item);
      }
    }
    itemMatchingId.append(item);
  });
}

renderMenu();

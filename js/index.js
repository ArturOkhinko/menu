import MainController from "./http/MainController.js";

function insertCorrectPlace(insertedNode, sorthead, elementWidthSuitableId) {
  const childNodes = elementWidthSuitableId.childNodes;
  for (const childNode of childNodes) {
    if (childNode.sorthead > sorthead) {
      return childNode.before(insertedNode);
    }
  }
  return elementWidthSuitableId.append(insertedNode);
}

function createDetails(name, id, sorthead) {
  const details = document.createElement("details");
  details.id = id;
  details.sorthead = sorthead;

  const summary = document.createElement("summary");
  summary.innerHTML = name;
  summary.sorthead = sorthead;

  details.className = "item";
  details.append(summary);
  return details;
}

async function renderMenu() {
  const data = await MainController.getDataForMenu();

  data.services.forEach((service) => {
    if (service.head === null) {
      const mainDOMNode = document.querySelector(".main");
      const menu = document.createElement("div");
      menu.className = "menu";

      if (service.price === 0) {
        menu.append(createDetails(service.name, service.id, service.sorthead));
        return mainDOMNode.append(menu);
      }

      const item = document.createElement("p");
      item.className = "item";
      item.sorthead = service.sorthead;
      item.innerHTML = service.name + ":" + " " + service.price;
      menu.append(item);
      return mainDOMNode.append(menu);
    }

    const elementWidthSuitableId = document.getElementById(
      String(service.head)
    );

    if (service.node === 1) {
      const details = createDetails(service.name, service.id, service.sorthead);
      insertCorrectPlace(details, service.sorthead, elementWidthSuitableId);
    }
    if (service.node === 0) {
      const p = document.createElement("p");
      p.sorthead = service.sorthead;
      p.className = "subparagraph";
      p.innerHTML = service.name + ":" + " " + service.price;
      insertCorrectPlace(p, service.sorthead, elementWidthSuitableId);
    }
  });
}

renderMenu();

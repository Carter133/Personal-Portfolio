const projectItems = [
  {
    title: "Project 1",
    url: "#",
    description: "The first project I made.",
  },
  {
    title: "Project 2",
    url: "#",
    description: "The second project I made.",
  },
  {
    title: "Project 3",
    url: "#",
    description: "The third project I made.",
  },
];

const accordionDiv = document.getElementById("accordion");

projectItems.forEach((projectItems) => {
  const titleText = projectItems.title;
  const urlText = projectItems.url;
  const descriptionText = projectItems.description;

  const projectDiv = document.createElement("div");
  const titleDiv = document.createElement("div");
  titleDiv.classList.add("accordion-title");
  titleDiv.textContent = titleText;
  projectDiv.appendChild(titleDiv);

  const urlA = document.createElement("a");
  urlA.classList.add("accordion-url");
  urlA.href = "_blank";
  urlA.textContent = urlText;
  projectDiv.appendChild(urlA);

  const descriptionDiv = document.createElement("div");
  descriptionDiv.classList.add("accordion-description");
  descriptionDiv.textContent = descriptionText;
  projectDiv.appendChild(descriptionDiv);

  accordionDiv.appendChild(projectDiv);
});
console.log("hello");

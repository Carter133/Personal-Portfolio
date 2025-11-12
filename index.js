import { faker } from "https://esm.sh/@faker-js/faker";
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
  urlA.href = urlText;
  urlA.setAttribute("target", "_blank");
  urlA.textContent = urlText;
  projectDiv.appendChild(urlA);

  const descriptionDiv = document.createElement("div");
  descriptionDiv.classList.add("accordion-description");
  descriptionDiv.textContent = descriptionText;
  projectDiv.appendChild(descriptionDiv);

  projectDiv.addEventListener("click", () => {
    titleDiv.classList.toggle("active");
    urlA.classList.toggle("active");
    descriptionDiv.classList.toggle("active");
  });

  accordionDiv.appendChild(projectDiv);
});

class DatabaseObject {
  toString() {
    throw new Error("Not implemented");
  }
  create(testimonial) {
    throw new Error("Not implemented");
  }
}

class Testimonial extends DatabaseObject {
  constructor(params) {
    super();
    const { comment, rating, name, company, email } = params;
    this.name = name;
    this.company = company;
    this.email = email;
    this.comment = comment;
    this.rating = rating;
  }

  toString() {
    return `Rating by ${this.name} ${this.company} ${this.email}. Comment is ${this.comment} and their rating is ${this.rating}.`;
  }

  static create(params) {
    return new Testimonial(params);
  }
}

class TestimonialDao {
  static seeds = [
    {
      comment: faker.lorem.sentence(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      rating: faker.number.int(),
      company: faker.company.name(),
    },
    {
      comment: faker.lorem.sentence(),
    },
    {
      comment: faker.lorem.sentence(),
    },
  ];
  getAll() {
    throw new Error("Not implemented");
  }
}

class SessionStorageTestimonialDao extends TestimonialDao {
  constructor() {
    super();
    this.database = sessionStorage;
  }

  getAll() {
    const testimonialInSessionStorage = this.database.getItem("testimonials");
    const testimonialsData = testimonialInSessionStorage
      ? JSON.parse(testimonialInSessionStorage)
      : TestimonialDao.seeds;
    console.log(testimonialsData);
    return testimonialsData.map((testimonialData) => {
      return Testimonial.create(testimonialData);
    });
  }
  create(testimonial) {
    const testimonials = this.getAll();
    testimonials.push(testimonial);
    this.database.setItem("testimonials", JSON.stringify(testimonials));
  }
}

class CreateTestimonial {
  constructor(testimonialDao) {
    this.testimonialDao = testimonialDao;
  }

  createTestimonial(comment, rating, name, email, company) {
    const testimonialData = {
      comment,
      rating,
      name,
      email,
      company,
    };
    this.testimonialDao.create(testimonialData);
  }
}

const testimonialDao = new SessionStorageTestimonialDao();
const createTestimonial = new CreateTestimonial(testimonialDao);

const testimonialList = document.getElementById("testimonial-list");
const testimonials = testimonialDao.getAll();
for (let i = 0; i < testimonials.length; i++) {
  const testimonial = testimonials[i];
  const testimonialLi = document.createElement("li");
  testimonialLi.textContent = testimonial.toString();
  testimonialList.appendChild(testimonialLi);
}

const createTestimonialForm = document.querySelector("#testimonial form");
createTestimonialForm.addEventListener("submit", (event) => {
  const formData = new FormData(event.target);
  const comment = formData.get("comment");
  const rating = formData.get("rating");
  const name = formData.get("name");
  const email = formData.get("email");
  const company = formData.get("company");
  console.log(comment);
  createTestimonial.createTestimonial(comment, rating, name, email, company);
});

import { deepClone } from "../lib/parse-resume-from-pdf/deep-clone";
import {
  initialEducation,
  initialProfile,
  initialProject,
  initialWorkExperience,
} from "../lib/redux/resumeSlice";
import { Resume } from "../lib/redux/types";

export const END_HOME_RESUME: Resume = {
  profile: {
    name: "Emilton Francisco Nhampossa",
    summary:
      "Engenheiro de software obcecado em criar produtos excepcionais que as pessoas adoram",
    email: "test@gmail.com",
    phone: "123-456-7890",
    location: "HYD,IND",
    url: "linkedin.com/in/username",
  },
  workExperiences: [
    {
      company: "ABC Company",
      jobTitle: "Engenheiro De Software",
      date: "Maio 2023 - Presente",
      descriptions: [
        "Contribuiu e colaborou com equipas multifuncionais para construir o produto escalável consumido por públicos maiores",
        "Contribuiu e colaborou com equipas multifuncionais para construir o produto escalável consumido por públicos maiores",
        "Contribuiu e colaborou com equipas multifuncionais para construir o produto escalável consumido por públicos maiores",
      ],
    },
    {
      company: "DEF Organizacao",
      jobTitle: "Engenheiro De Software",
      date: "Maio 2022 - Maio 2023",
      descriptions: [
        "Contribuiu e colaborou com equipas multifuncionais para construir o produto escalável consumido por públicos maiores",
        "Contribuiu e colaborou com equipas multifuncionais para construir o produto escalável consumido por públicos maiores",
        "Contribuiu e colaborou com equipas multifuncionais para construir o produto escalável consumido por públicos maiores",
      ],
    },
    {
      company: "XYZ Company",
      jobTitle: "Engenheiro De Software",
      date: "Maio 2021 - Maio 2022",
      descriptions: [
        "Contribuiu e colaborou com equipas multifuncionais para construir o produto escalável consumido por públicos maiores",
      ],
    },
  ],
  educations: [
    {
      school: "XYZ Universidade",
      degree: "Licenciatura em Ciência da Computação",
      date: "Setembro 2018 - Agosto 2024",
      gpa: "8.55",
      descriptions: [
        "Contribuiu e colaborou com equipas multifuncionais para construir o produto escalável consumido por públicos maiores",
      ],
    },
  ],
  projects: [
    {
      project: "Projecto 1",
      date: "Outono 2021",
      descriptions: [
        "Contribuiu e colaborou com equipas multifuncionais para construir o produto escalável consumido por públicos maiores",
      ],
    },
  ],
  skills: {
    featuredSkills: [
      { skill: "Python", rating: 3 },
      { skill: "TypeScript", rating: 3 },
      { skill: "React", rating: 3 },
    ],
    descriptions: [
      "Tech: React Hooks, GraphQL, Node.js, SQL, Postgres, NoSql, Redis, REST API, Git",
      "Soft: Trabalho em equipa, resolução criativa de problemas, comunicação, mentalidade de aprendizagem, ágil",
    ],
  },
  custom: {
    descriptions: [],
  },
};

export const START_HOME_RESUME: Resume = {
  profile: deepClone(initialProfile),
  educations: [deepClone(initialEducation)],
  projects: [deepClone(initialProject)],
  custom: {
    descriptions: [],
  },
  workExperiences: END_HOME_RESUME.workExperiences.map(() =>
    deepClone(initialWorkExperience)
  ),
  skills: {
    featuredSkills: END_HOME_RESUME.skills.featuredSkills.map((item) => ({
      skill: "",
      rating: item.rating,
    })),
    descriptions: [],
  },
};

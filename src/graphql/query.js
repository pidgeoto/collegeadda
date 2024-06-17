import { gql } from "graphql-tag";

export const GET_TAGS_HOME = gql`
  query {
    tags {
      customId
      name
      priorityRank
      priorityBool
      cardImgUrl
    }
  }
`;
export const GET_TAGS_BY_CUSTOM_ID = gql`
  query GetTagsByCustomId($custom_Id: String!) {
    tagsByCustomId(customId: $custom_Id) {
      customId
      name
      priorityRank
      priorityBool
      collegesSet {
        uuid
        customId
        name
        ranking
        applicationDeadline
        cardImgUrl
        foundedYear
      }
    }
  }
`;
export const GET_COURSES = gql`
  query GetCourses {
    courses {
      customId
      courseName
      cardImgUrl
      duration
      courseShortname
      department
      priorityRank
      priorityBool
      courseType {
        name
      }
      colleges {
        name
      }
      specialization {
        name
      }
    }
  }
`;
export const GET_COURSE_BY_CUSTOM_ID = gql`
  query GetCourseByCustomid($custom_Id: String!) {
    courseByCustomId(customId: $custom_Id) {
      customId
      courseName
      description
      priorityRank
      priorityBool
      cardImgUrl
      duration
      courseShortname
      department
      keyArticle {
        content
      }
      courseType {
        name
      }
      colleges {
        customId
        name
        shortName
        ranking
        cardImgUrl
        accreditation
        tuitionFee
        foundedYear
        priorityRank
        priorityBool
        articles {
          info
          coursesAndFees
          admission
          placement
          faq
        }
        clgCategory {
          name
        }
        tags {
          name
        }
        city {
          name
        }
        state {
          name
        }
        country {
          name
        }
        affiliatedto {
          name
        }
        Courses {
          courseName
        }
      }
      applicableExams {
        customId
        cardImgUrl
        examName
        examShortname
        examDate
        levelOfExam
        modeOfExam
        examDuration
        resultDate
        applicationStartDate
        applicationEndDate
        colleges {
          name
        }
        examCenterCity {
          name
        }
      }
      specialization {
        name
      }
    }
  }
`;
export const GET_EXAMS = gql`
  query {
    exams {
      customId
      cardImgUrl
      examName
      examShortname
      examDate
      levelOfExam
      modeOfExam
      examDuration
      resultDate
      priorityRank
      priorityBool
      applicationStartDate
      applicationEndDate
      colleges {
        name
      }
      examCenterCity {
        name
      }
    }
  }
`;
export const GET_EXAM_BY_CUSTOM_ID = gql`
  query GetExamsByCustomid($custom_Id: String!) {
    examByCustomId(customId: $custom_Id) {
      customId
      cardImgUrl
      examName
      examShortname
      examDate
      levelOfExam
      modeOfExam
      examDuration
      resultDate
      keyArticle {
        content
      }
      courses {
        customId
        courseName
        cardImgUrl
        duration
        courseShortname
        department
        courseType {
          name
        }
        colleges {
          name
        }
        specialization {
          name
        }
      }
      applicationStartDate
      applicationEndDate
      colleges {
        customId
        name
        shortName
        ranking
        cardImgUrl
        accreditation
        tuitionFee
        foundedYear
        priorityRank
        priorityBool
        articles {
          info
          coursesAndFees
          admission
          placement
          faq
        }
        clgCategory {
          name
        }
        tags {
          name
        }
        city {
          name
        }
        state {
          name
        }
        country {
          name
        }
        affiliatedto {
          name
        }
        Courses {
          courseName
        }
      }
      examCenterCity {
        name
      }
    }
  }
`;
export const GET_COLLEGES = gql`
  query {
    colleges {
      customId
      name
      shortName
      ranking
      cardImgUrl
      accreditation
      tuitionFee
      foundedYear
      priorityRank
      priorityBool
      clgCategory {
        name
      }
      city {
        name
      }
      state {
        name
      }
      country {
        name
      }
      affiliatedto {
        name
      }
      Courses {
        courseName
      }
    }
  }
`;
export const GET_COLLEGES_BY_CUSTOM_ID = gql`
  query GetCollegesByCustomId($custom_Id: String!) {
    collegeByCustomId(customId: $custom_Id) {
      customId
      name
      shortName
      ranking
      cardImgUrl
      accreditation
      tuitionFee
      foundedYear
      priorityRank
      priorityBool
      keyArticle {
        info
        coursesAndFees
        admission
        placement
        faq
      }
      clgCategory {
        name
      }
      tags {
        name
      }
      city {
        name
      }
      state {
        name
      }
      country {
        name
      }
      affiliatedto {
        name
      }
      Courses {
        courseName
      }
    }
  }
`;
export const GET_UNIVERSITY = gql`
  query GetUniversity {
    affiliatedUniversities {
      customId
      name
      shortName
      cardImgUrl
      priorityRank
      priorityBool
      collegesSet {
        name
      }
      cityKey {
        name
      }
      stateKey {
        name
      }
      countryKey {
        name
      }
    }
  }
`;
export const GET_UNIVERSITY_BY_CUSTOM_ID = gql`
  query GetUniversityByCustomId($custom_Id: String!) {
    affiliatedUniversityByCustomId(customId: $custom_Id) {
      customId
      name
      shortName
      collegesSet {
        customId
        name
        shortName
        ranking
        cardImgUrl
        accreditation
        tuitionFee
        foundedYear
        priorityRank
        priorityBool
        keyArticle {
          info
          coursesAndFees
          admission
          placement
          faq
        }
        clgCategory {
          name
        }
        tags {
          name
        }
        city {
          name
        }
        state {
          name
        }
        country {
          name
        }
        affiliatedto {
          name
        }
        Courses {
          courseName
        }
      }
    }
  }
`;
export const GET_ARTICLES = gql`
  query getArticles {
    articles {
      customId
      title
      metaDesc
      cardImgUrl
      priority
      promoted
      priorityRank
      publicationDate
      relatedTo
    }
  }
`;
export const GET_ARTICLES_BY_CUSTOM_ID = gql`
  query GetArticleByCustomId($custom_Id: String!) {
    articleByCustomId(customId: $custom_Id) {
      customId
      title
      authorName
      ogTitle
      metaDesc
      cardImgUrl
      priority
      promoted
      priorityRank
      publicationDate
      relatedTo
      introContent
      content
      conclusionTitle
      conclusionContent
    }
  }
`;

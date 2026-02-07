import { SectionData, Statistics, SurveryResponse } from "../types/app";

export function getStatistics(
  responses: SurveryResponse[],
  sections: SectionData[],
) {
  return responses.reduce((acc, response) => {
    sections.forEach((section) => {
      const sectionRespose = response[section.id];
      section.questions.forEach((question) => {
        if (!acc[section.id]) acc[section.id] = {};

        if (question.type === "longText") {
          const value = sectionRespose[question.id] as string;
          const questionData = (acc[section.id][question.id] ?? []) as string[];
          questionData.push(value);
          acc[section.id][question.id] = questionData;
        } else {
          const values = sectionRespose[question.id] || [];
          const questionData = (acc[section.id][question.id] ?? {}) as Record<
            string,
            number
          >;
          (Array.isArray(values) ? values : [values]).forEach((value) => {
            questionData[value] = (questionData[value] ?? 0) + 1;
          });
          acc[section.id][question.id] = questionData;
        }
      });
    });

    return acc;
  }, {} as Statistics);
}

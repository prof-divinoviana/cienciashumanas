
import { ChartData, TableData, CrosswordData, ActivityImage } from "../types";

export interface CorrectionResult {
  question: string;
  studentAnswer: string;
  isCorrect: boolean;
  score: number; 
  feedback: string;
}

export interface AIResponse {
  generalComment: string;
  corrections: CorrectionResult[];
}

export interface EvaluationQuestion {
  id: number;
  textFragment: string;
  questionText: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
    e: string;
  };
  correctOption: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  explanation: string;
}

export interface GeneratedEvaluation {
  subject: string;
  grade: string;
  bimester: string;
  questions: EvaluationQuestion[];
  visualContent?: {
    type: 'image' | 'chart' | 'table' | 'crossword';
    data: any;
  };
}

export interface LessonPlan {
  title: string;
  objectives: string[];
  theory: string;
  methodology: {
    introduction: string; // 10 min
    development: string; // 30 min
    conclusion: string; // 10 min
  };
  suggestedActivity: string;
}

// Novo: Estrutura para atividade de aula do aluno
export interface ObjectiveQuestion {
  id: string;
  question: string;
  options: { a: string; b: string; c: string; d: string; e: string; };
  correctOption: string;
}

export interface DiscursiveQuestion {
  id: string;
  question: string;
}

export interface LessonActivity {
  objectives: ObjectiveQuestion[];
  discursives: DiscursiveQuestion[];
  visualContent?: {
    type: 'image' | 'chart' | 'table' | 'crossword';
    data: any; // Will be cast to specific type
  };
}

/**
 * Função utilitária para pausar a execução (usada no Retry)
 */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock responses for AI Service
 */

export const generateActivityImage = async (prompt: string): Promise<string> => {
  return `https://picsum.photos/seed/${encodeURIComponent(prompt)}/800/450`;
};

export const generateLessonActivity = async (lessonTitle: string, theory: string): Promise<LessonActivity> => {
  await sleep(1000);
  return {
    objectives: [
      { id: "1", question: `Sobre ${lessonTitle}, qual a principal característica abordada?`, options: { a: "Opção A", b: "Opção B", c: "Opção C", d: "Opção D", e: "Opção E" }, correctOption: "a" },
      { id: "2", question: "Como este tema se relaciona com a sociedade atual?", options: { a: "Opção A", b: "Opção B", c: "Opção C", d: "Opção D", e: "Opção E" }, correctOption: "b" },
      { id: "3", question: "Qual o impacto histórico deste fenômeno?", options: { a: "Opção A", b: "Opção B", c: "Opção C", d: "Opção D", e: "Opção E" }, correctOption: "c" },
      { id: "4", question: "Segundo a teoria apresentada, o que define este conceito?", options: { a: "Opção A", b: "Opção B", c: "Opção C", d: "Opção D", e: "Opção E" }, correctOption: "d" },
      { id: "5", question: "Qual a conclusão mais aceita sobre este debate?", options: { a: "Opção A", b: "Opção B", c: "Opção C", d: "Opção D", e: "Opção E" }, correctOption: "e" }
    ],
    discursives: [
      { id: "6", question: "Explique com suas palavras a importância deste tema para o Tocantins." },
      { id: "7", question: "Como você aplicaria os conceitos aprendidos em sua comunidade?" }
    ],
    visualContent: {
      type: 'image',
      data: { url: `https://picsum.photos/seed/${encodeURIComponent(lessonTitle)}/800/450`, caption: `Ilustração sobre ${lessonTitle}` }
    }
  };
};

export const generateLessonPlan = async (subject: string, theme: string, grade: string): Promise<LessonPlan> => {
  await sleep(1000);
  return {
    title: theme,
    objectives: ["Compreender os conceitos fundamentais", "Analisar criticamente a realidade", "Aplicar o conhecimento no cotidiano"],
    theory: `Esta é uma explicação teórica gerada automaticamente sobre ${theme} para a ${grade}ª série de ${subject}. O conteúdo aborda as principais correntes de pensamento e fatos históricos relevantes.`,
    methodology: {
      introduction: "Apresentação do tema e levantamento de conhecimentos prévios (10 min).",
      development: "Exposição dialogada e análise de documentos/textos (30 min).",
      conclusion: "Síntese coletiva e orientações para atividade (10 min)."
    },
    suggestedActivity: "Produção de um mapa mental ou pequeno ensaio reflexivo."
  };
};

export const generateBimonthlyEvaluation = async (
  subjectName: string,
  grade: string,
  bimester: string,
  topics: string[]
): Promise<GeneratedEvaluation> => {
  await sleep(1500);
  return {
    subject: subjectName,
    grade: grade,
    bimester: bimester,
    questions: [
      {
        id: 1,
        textFragment: "Texto base para a questão 1...",
        questionText: `Questão sobre ${topics[0]}...`,
        options: { a: "Alternativa A", b: "Alternativa B", c: "Alternativa C", d: "Alternativa D", e: "Alternativa E" },
        correctOption: "a",
        difficulty: 'Médio',
        explanation: "Explicação da resposta correta."
      },
      {
        id: 2,
        textFragment: "Texto base para a questão 2...",
        questionText: `Questão sobre ${topics[1] || topics[0]}...`,
        options: { a: "Alternativa A", b: "Alternativa B", c: "Alternativa C", d: "Alternativa D", e: "Alternativa E" },
        correctOption: "b",
        difficulty: 'Fácil',
        explanation: "Explicação da resposta correta."
      }
    ],
    visualContent: {
      type: 'chart',
      data: {
        title: "Dados Estatísticos",
        data: [
          { name: "Grupo A", value: 400 },
          { name: "Grupo B", value: 300 },
          { name: "Grupo C", value: 300 }
        ]
      }
    }
  };
};

export const evaluateActivities = async (
  lessonTitle: string,
  theoryContext: string,
  questionsAndAnswers: { question: string; answer: string }[]
): Promise<AIResponse> => {
  await sleep(1000);
  return {
    generalComment: "Excelente esforço! Suas respostas demonstram compreensão dos temas abordados.",
    corrections: questionsAndAnswers.map((qa, i) => ({
      question: qa.question,
      studentAnswer: qa.answer,
      isCorrect: true,
      score: 10,
      feedback: "Resposta muito bem fundamentada."
    }))
  };
};

export const generatePedagogicalSummary = async (
  context: "INDIVIDUAL" | "TURMA",
  data: {
    subject: string,
    grades: number[],
    notes: string[],
    studentName?: string,
    schoolClass: string
  }
): Promise<string> => {
  await sleep(1000);
  return `### Relatório Pedagógico ${context}
  
**Disciplina:** ${data.subject}
**Turma:** ${data.schoolClass}
${data.studentName ? `**Estudante:** ${data.studentName}` : ''}

#### Análise de Desempenho
O desempenho geral está dentro do esperado, com média de ${data.grades.reduce((a, b) => a + b, 0) / data.grades.length}.

#### Observações
- Participação ativa nas atividades.
- Boa compreensão dos conceitos de Ciências Humanas.
- Necessidade de aprofundamento em temas específicos.`;
};

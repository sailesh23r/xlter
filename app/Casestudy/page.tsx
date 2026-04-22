import connectToDatabase from "@/lib/mongodb";
import CaseStudy from "@/models/CaseStudy";
import CaseStudyGrid from "@/Components/CaseStudy/CaseStudyGrid";

interface CaseStudyDoc {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  skills: string[];
  liveUrl?: string;
  pdfUrl?: string;
  mockupUrl?: string;
  posterUrl?: string;
  createdAt: string;
}

async function getCaseStudies(): Promise<CaseStudyDoc[]> {
  try {
    await connectToDatabase();
    const data = await CaseStudy.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error("Failed to fetch case studies:", error);
    return [];
  }
}

export default async function CasestudyPage() {
  const casestudies = await getCaseStudies();

  return <CaseStudyGrid initialData={casestudies} />;
}
import {
  InformationPageView,
  informationMetadata,
} from "@/components/information-page";
export const metadata = informationMetadata("prompts");
export default function Page() {
  return <InformationPageView slug="prompts" />;
}

import {
  InformationPageView,
  informationMetadata,
} from "@/components/information-page";
export const metadata = informationMetadata("about");
export default function Page() {
  return <InformationPageView slug="about" />;
}

import {
  InformationPageView,
  informationMetadata,
} from "@/components/information-page";
export const metadata = informationMetadata("guide");
export default function Page() {
  return <InformationPageView slug="guide" />;
}

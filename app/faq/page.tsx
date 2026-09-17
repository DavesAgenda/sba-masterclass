import {
  InformationPageView,
  informationMetadata,
} from "@/components/information-page";
export const metadata = informationMetadata("faq");
export default function Page() {
  return <InformationPageView slug="faq" />;
}

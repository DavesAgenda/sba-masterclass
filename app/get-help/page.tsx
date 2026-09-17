import {
  InformationPageView,
  informationMetadata,
} from "@/components/information-page";
export const metadata = informationMetadata("get-help");
export default function Page() {
  return <InformationPageView slug="get-help" />;
}

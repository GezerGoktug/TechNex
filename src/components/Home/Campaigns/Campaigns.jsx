import { campaigns } from "../../../constants/content";
import CampaignItem from "./CampaignItem";


const Campaigns = () => {
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 my-12 text-white">
      {campaigns.map((campaign, index) => (
        <CampaignItem key={index} {...campaign} />
      ))}
    </section>
  );
};

export default Campaigns;

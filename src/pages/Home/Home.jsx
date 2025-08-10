import Banner from "../../components/Banner";
import PromotionCard from "../../components/PromotionCard";
import FAQ from "../../components/FAQ";
import Feature from "../../components/Feature";
import FeatureAssignment from "../../components/FeatureAssignment";
import NewsLetter from "../../components/NewsLetter";
import RecentAssignment from "../../components/RecentAssignment";
import Review from "../../components/Review";

const Home = () => {
  return (
    <div className="min-h-screen space-y-20 pt-6 pb-16">
      <Banner />
      <FeatureAssignment />
      <RecentAssignment />
      {/* <NewsLetter /> */}
      <Review />
      <Feature />
      <PromotionCard />
    </div>
  );
};

export default Home;

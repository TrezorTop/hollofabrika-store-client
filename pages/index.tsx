import s from "styles/Home.module.scss";
import { Card } from "../core/components/ui/Card/Card";

const Home = () => {
  return (
    <div className={s.home}>
      <Card className={s.card} />
      <Card className={s.card} />
      <Card className={s.card} />
      <Card className={s.card} />
      <Card className={s.card} />
    </div>
  );
};

export default Home;

import s from "styles/Home.module.scss";
import { Card } from "../core/shared/components/Card/Card";

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

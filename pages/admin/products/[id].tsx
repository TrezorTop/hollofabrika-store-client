import { useRouter } from "next/router";
import { AdminLayout } from "../layout";

export default function Product() {
  const router = useRouter();

  return <p>Router: {router.query.id}</p>;
}

Product.getLayout = AdminLayout;

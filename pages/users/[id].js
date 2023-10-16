import Layout from "@/components/layout";
import { useRouter } from "next/router";

export default function UsersByName() {

  const router = useRouter();
  const { id } = router?.query;

  return (
    <Layout>
      <p>Users By {id}</p>
    </Layout>
  )
}   
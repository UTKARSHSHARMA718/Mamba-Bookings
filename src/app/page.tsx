import { getAllListing } from "@/actions/getAllListings";
import Categories from "@/containers/Categories/Categories";
import MainProductListing from "@/containers/MainProductListing/MainProductListing";

export default async function Home() {
  const allListings = await getAllListing();
  console.log({allListings})

  return (
    <div>
      <Categories />
      <div>
        <MainProductListing />
      </div>
    </div>
  );
}

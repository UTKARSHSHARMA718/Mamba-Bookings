import Categories from "@/containers/Categories/Categories";
import EmptyPage from "@/components/EmptyPage/EmptyPage";
import MainProductListing from "@/containers/MainProductListing/MainProductListing";
import { getAllListing } from "@/actions/getAllListings";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { PAGE_SIZE } from "@/constants/const";

const Home: React.FC = async () => {
  const user = await getCurrentUser();
  const listingRes = await getAllListing({
    pageNumber: 1,
    pageSize: PAGE_SIZE,
  });

  const listings = listingRes?.data;

  if (!listings || !listings?.length) {
    return <EmptyPage
      title='No products for listing!'
      description='Please add some products to show them here.'
    />
  }

  return (
    <div>
      <Categories />
      <div>
        <MainProductListing
          allListings={listings || []}
          totalListings={listingRes?.total}
          {...{ user }}
        />
      </div>
    </div>
  );
}

export default Home;
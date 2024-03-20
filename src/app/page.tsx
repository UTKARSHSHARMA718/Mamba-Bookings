import Categories from "@/containers/Categories/Categories";
import MainProductListing from "@/containers/MainProductListing/MainProductListing";
import { getAllListing } from "@/actions/getAllListings";
import { getCurrentUser } from "@/actions/getCurrentUser";

type HomeProps = {
  searchParams: {
    categories: string;
    bathrooms: string;
    guest: string;
    location: string;
    rooms: string;
    startDate: string,
    endDate: string,
  }
}

const Home: React.FC<HomeProps> = async ({ searchParams }) => {
  const { 
    categories,
    bathrooms: bathroomCount, 
    guest: guestCount, 
    location: locationValue, 
    rooms: roomCount,
    startDate,
    endDate, 
  } = searchParams;
  const user = await getCurrentUser();
  const listings = await getAllListing({ 
    category: categories?.split(","), 
    bathroomCount: +bathroomCount, 
    guestCount: +guestCount, 
    roomCount: +roomCount,
    locationValue,
    startDate,
    endDate, 
  });

  return (
    <div>
      <Categories />
      <div>
        <MainProductListing
          allListings={listings || []}
          {...{ user }}
        />
      </div>
    </div>
  );
}

export default Home;